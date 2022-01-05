// Only user profile urls, which start with 'https://www.linkedin.com/in/'
const urlFilter = /https:\/\/www\.linkedin\.com\/in\/.*/;

// Trigger the event on every URL update, only if it passes the URL filter
chrome.tabs.onUpdated.addListener((_, { url }) => {
  if (url && urlFilter.test(url)) {
    method();
  }
});

// Trigger the event on every page (re)load, if the current URL passes the filter
chrome.webNavigation.onCompleted.addListener(({ frameId, url }) => {
  // Consider only the main frame, which has id '0'
  if (frameId === 0 && urlFilter.test(url)) {
    method();
  }
});

// Method to execute in both page (re)load and url change
const method = () => {
  console.log('Hello!');
};
