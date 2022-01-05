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

// Method to execute in both page (re)load and url change
const method = (tabId) => {
  chrome.tabs.sendMessage(tabId, { data: getApiData() }, () => {});
};

// Fake data for now
const getApiData = () => {
  return fakeApiData.results[0];
};

const fakeApiData = {
  results: [
    {
      gender: 'female',
      name: {
        title: 'Ms',
        first: 'Anna',
        last: 'Pedersen',
      },
      location: {
        street: {
          number: 2904,
          name: 'Hestehavevej',
        },
        city: 'Aaborg Øst',
        state: 'Nordjylland',
        country: 'Denmark',
        postcode: 95687,
        coordinates: {
          latitude: '-33.4928',
          longitude: '127.5991',
        },
        timezone: {
          offset: '-6:00',
          description: 'Central Time (US & Canada), Mexico City',
        },
      },
      email: 'anna.pedersen@example.com',
      login: {
        uuid: '1bb34409-f043-4ad4-b82b-1879b6c85c20',
        username: 'sadbutterfly556',
        password: 'bigones',
        salt: 'apmP3pEG',
        md5: '4b985f7621606fd28257e48b1019af29',
        sha1: 'f1533b9d34a818b7ff74bf9b6cb35a6b2b651c39',
        sha256:
          'b2335199a5e1f8fe9caceadaef668ae78738377718f526557ca45ce0ef1213c9',
      },
      dob: {
        date: '1971-06-21T15:23:52.408Z',
        age: 51,
      },
      registered: {
        date: '2012-09-03T15:11:03.110Z',
        age: 10,
      },
      phone: '47537107',
      cell: '73283990',
      id: {
        name: 'CPR',
        value: '210671-7560',
      },
      picture: {
        large: 'https://randomuser.me/api/portraits/women/72.jpg',
        medium: 'https://randomuser.me/api/portraits/med/women/72.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/women/72.jpg',
      },
      nat: 'DK',
    },
  ],
  info: {
    seed: '4c9210aa44ce58db',
    results: 1,
    page: 1,
    version: '1.3',
  },
};
