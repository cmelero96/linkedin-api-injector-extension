// Only user profile urls, which start with 'https://www.linkedin.com/in/'
const urlFilter = /https:\/\/www\.linkedin\.com\/in\/.*/;

// Trigger the event on every URL update, only if it passes the URL filter
chrome.tabs.onUpdated.addListener((tabId, { url }) => {
  if (url && urlFilter.test(url)) {
    method(tabId);
  }
});

// Trigger the event on every page (re)load, if the current URL passes the filter
chrome.webNavigation.onCompleted.addListener(({ frameId, tabId, url }) => {
  // Consider only the main frame, which has id '0'
  if (frameId === 0 && urlFilter.test(url)) {
    method(tabId);
  }
});

// Bugfix 01: Make content script be executed after new tab without having to reload
chrome.webNavigation.onHistoryStateUpdated.addListener(() => {
  chrome.tabs.executeScript(null, { file: 'scripts/content.js' });
});

// Method to execute in both page (re)load and url change
const method = async (tabId) => {
  const data = await getApiData();
  chrome.tabs.sendMessage(tabId, { data }, () => {});
};

const getApiData = async () => {
  let apiResponse;

  await fetch('https://randomuser.me/api')
    .then((res) => {
      if (!res.ok) {
        return res.json();
      } else {
        throw { errorCode: res.status };
      }
    })
    .then((data) => (apiResponse = data))
    .catch((e) => (apiResponse = getFallbackData(e)));

  return apiResponse.results[0];
};

const getFallbackData = ({ message, errorCode }) => {
  return {
    results: [
      {
        error: {
          message:
            message ||
            'The API call was unsuccessful and nothing could be retrieved.',
          statusCode:
            errorCode ||
            'Unknown; this means something broke in the code. Please try again later.',
        },
      },
    ],
  };
};
