/* Content script for facebook. */

import sentiment from 'wink-sentiment';

const settings = {
  negativeNewsSetting: 5,
  unrealisticImagesSetting: 5,
  polarizedContentSetting: 5,
  keywordsSetting: []
};

/* Listen for changes in settings */
chrome.runtime.onMessage.addListener(
  (message, sender, sendResponse) => {
    switch(message.type) {
      case "setting":
        settings[message.data.name] = message.data.value;
        reprocessAllStories();
      break;
    }
  }
);

const storyTextContents = node => (
  [].slice.call(node.querySelectorAll("p")).map(e => e.innerText).concat(
    [].slice.call(node.querySelectorAll("._3n1k")).map(e => e.innerText)
  ).join(' ')
);

const doFilter = (node) => {
  node.style.filter = 'blur(15px)';
  node.style.opacity = 0.2;
}

const doUnfilter = (node) => {
  node.style.filter = null;
  node.style.opacity = 1.0;
}

const reprocessAllStories = () => {
  [].slice.call(document.querySelectorAll('div')).filter(s => s.id.startsWith("hyperfeed_story_id_")).forEach(s =>
    reportAndMaybeHideStory(s)
  );
}

const reportAndMaybeHideStory = (node) => {
  const text = storyTextContents(node);
  const normalizedText = text.toLowerCase();
  const { normalizedScore }  = sentiment(text);

  if (settings.keywordsSetting.filter(s => normalizedText.indexOf(s) !== -1).length > 0) {
    console.log('Blocking due to keyword ', settings.keywordsSetting.filter(s => text.indexOf(s) !== -1));
    doFilter(node);
    return;
  }

  if (normalizedScore <= 0) {
    console.log("Detected story, not blocking ", text, normalizedScore);

    const threshold = (settings.negativeNewsSetting / 10);
    const rv = Math.random();

    if (rv > threshold) {
      console.log("Detected story, blocking ", threshold, rv, text, normalizedScore);
      doFilter(node);
      return;
    } else {
      console.log("Detected story, not blocking ", threshold, rv, text, normalizedScore);
    }
  }

  doUnfilter(node);
}

const processMutation = (m) => {
  const values = [].slice.call(m.addedNodes);

  values.filter(
    s => s instanceof Element && s.id.startsWith("hyperfeed_story_id_")
  ).forEach(v => console.log("Detected story", storyTextContents(v), sentiment(storyTextContents(v))));

  // We actually get things in substreams for the user-shared
  // stores, so take the substreams then filter them for stories
  values.filter(
    s => s instanceof Element && s.id.startsWith("substream_")
  ).forEach(s => setTimeout(() => {
    /* We basically need to wait around for each substream to get
     * some contents */
    [].slice.call(s
      .querySelectorAll('div')
    ).filter(
      s => s.id.startsWith("hyperfeed_story_id_")
    ).forEach(
      s => reportAndMaybeHideStory(s)
    );
  }, 1500));
};

const observer = new MutationObserver((mutationsList, observer) => {
  mutationsList.forEach(m => processMutation(m));
});

observer.observe(document.querySelector('body'), {
  childList: true,
  subtree: true
});

// Query selectors in the document that we have now
reprocessAllStories();