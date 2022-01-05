const manageApiData = ({ data }) => {
  const extensionId = 'api-injected-data';
  let apiInjectorPanel = document.getElementById(extensionId);

  if (apiInjectorPanel) {
    console.log('Emptying old panel...');
    // If the panel already existed, delete all of its contents
    while (apiInjectorPanel.firstChild) {
      apiInjectorPanel.firstChild.remove();
    }
  } else {
    console.log('Creating new panel...');
    // If the panel didn't exist, create it from scratch
    const mainUserPanel = document.querySelector(
      '.artdeco-card.ember-view.pv-top-card'
    );
    const newPanel = document.createElement('div');
    newPanel.id = extensionId;
    mainUserPanel.parentNode.insertBefore(newPanel, mainUserPanel.nextSibling);

    apiInjectorPanel = newPanel;
  }

  navigate(data, '__userData__', apiInjectorPanel);
  console.log('Injection finished.');
};

const navigate = (value, key, parentElement) => {
  const newDiv = createDiv(key, parentElement);

  if (typeof value !== 'object') {
    // Primitive type: String or number most likely
    newDiv.innerHTML = key.split('-').pop() + ': ' + value;
  } else if (Array.isArray(value)) {
    // Array of elements
    value.forEach((element, i) => navigate(element, `${key}-${i}`, newDiv));
  } else if (value !== null) {
    // Object
    for (property in value) {
      navigate(value[property], `${key}-${property}`, newDiv);
    }
  }
};

const createDiv = (id, parent) => {
  const element = document.createElement('div');
  element.id = id;
  element.innerHTML = id.split('-').pop();
  parent.appendChild(element);

  return element;
};

chrome.runtime.onMessage.addListener(manageApiData);
