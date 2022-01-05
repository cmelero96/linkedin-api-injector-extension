const manageApiData = ({ data }) => {
  console.log(data);
};

chrome.runtime.onMessage.addListener(manageApiData);
