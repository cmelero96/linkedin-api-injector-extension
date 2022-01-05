const manageApiData = ({ data }) => {
  const mainPanel = document.getElementById('ember34');

  mainPanel.parentNode.insertBefore(
    document.createTextNode(JSON.stringify(data)),
    mainPanel.nextSibling
  );
};

chrome.runtime.onMessage.addListener(manageApiData);
