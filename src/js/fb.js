/* Content script for facebook. */

import sentiment from 'wink-sentiment';

const storyTextContents = node => (
  [].slice.call(node.querySelectorAll("p")).map(e => e.innerText).concat(
    [].slice.call(node.querySelectorAll("._3n1k")).map(e => e.innerText)
  ).join(' ')
);

const reportAndMaybeHideStory = (node) => {
  const text = storyTextContents(node);
  const { normalizedScore }  = sentiment(text);

  if (normalizedScore >= 0) {
    console.log("Detected story, not blocking ", text, normalizedScore);
    return;
  }

  if (Math.random() < 0.5) {
    console.log("Detected story, blocking ", text, normalizedScore);
    node.style.filter = 'blur(15px)';
    node.style.opacity = 0.2;
  } else {
    console.log("Detected story, not blocking ", text, normalizedScore);
  }
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
[].slice.call(document.querySelectorAll('div')).filter(s => s.id.startsWith("hyperfeed_story_id_")).forEach(s =>
  s => reportAndMaybeHideStory(s)
);