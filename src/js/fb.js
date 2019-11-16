/* Content script for facebook. */

import sentiment from 'wink-sentiment';

const storyTextContents = node => (
  [].slice.call(node.querySelectorAll("p")).map(e => e.innerText).concat(
    [].slice.call(node.querySelectorAll("._3n1k")).map(e => e.innerText)
  ).join(' ')
);

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
      s => console.log("Detected story ", storyTextContents(s), sentiment(storyTextContents(s)))
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