const manageApiData = ({ data }) => {
  const mainPanel = document.getElementById('ember34');

  mainPanel.parentNode.insertBefore(
    document.createTextNode(JSON.stringify(data)),
    mainPanel.nextSibling
  );

  navigate(data, '__userData__', mainPanel);
};

const navigate = (value, key, parent) => {
  if (typeof value !== 'object') {
    // Primitive type: String or number most likely
    console.log(key + ': ' + value);
  } else if (Array.isArray(value)) {
    // Array of elements
    value.forEach((element, i) => navigate(element, `${key}-${i}`));
  } else if (value !== null) {
    // Object
    for (property in value) {
      navigate(value[property], `${key}-${property}`);
    }
  }
};
chrome.runtime.onMessage.addListener(manageApiData);
