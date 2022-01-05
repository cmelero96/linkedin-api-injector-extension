const manageApiData = ({ data }) => {
  const extensionId = 'api-injected-data';
  let apiInjectorPanel = document.getElementById(extensionId);

  if (apiInjectorPanel) {
    console.log('Emptying old panel...');
    // If the panel already existed, delete all of its contents except the title
    while (apiInjectorPanel.childNodes.length > 1) {
      apiInjectorPanel.removeChild(apiInjectorPanel.lastChild);
    }
  } else {
    console.log('Creating new panel...');
    // If the panel didn't exist, create it from scratch
    const mainUserPanel = document.querySelector(
      '.artdeco-card.ember-view.pv-top-card'
    );
    const newPanel = document.createElement('section');
    newPanel.id = extensionId;
    mainUserPanel.parentNode.insertBefore(newPanel, mainUserPanel.nextSibling);

    const panelTitle = document.createElement('header');
    panelTitle.id = 'api-injected-data-title';
    panelTitle.innerHTML = 'Data received from the API';
    newPanel.appendChild(panelTitle);

    apiInjectorPanel = newPanel;
  }

  navigate(data, '__userData__', apiInjectorPanel);
  console.log('Injection finished.');
};

const navigate = (value, key, parentElement) => {
  if (typeof value !== 'object') {
    // Primitive type: String or number most likely
    createContentDiv(key, value, parentElement);
  } else if (Array.isArray(value)) {
    // Array of elements
    const arrayWrapper = createWrapper(key, parentElement);
    value.forEach((element, i) => navigate(element, i, arrayWrapper));
  } else if (value !== null) {
    // Object
    const objectWrapper =
      key === '__userData__'
        ? createMainWrapper(parentElement) // Special case for the initial object
        : createWrapper(key, parentElement);

    for (property in value) {
      navigate(value[property], property, objectWrapper);
    }
  }
};

const createContentDiv = (id, value, parent) => {
  const element = document.createElement('div');
  parent.appendChild(element);

  element.innerHTML = `${id}: ${value}`;
  element.style.marginLeft = '1.5em';

  return element;
};

const createMainWrapper = (parent) => {
  const element = document.createElement('div');
  parent.appendChild(element);

  return element;
};

const createWrapper = (title, parent) => {
  const wrapper = document.createElement('details');
  parent.appendChild(wrapper);
  wrapper.setAttribute('open', '');
  wrapper.style.marginLeft = '1.5em';

  const titleElement = document.createElement('summary');
  wrapper.appendChild(titleElement);
  titleElement.innerHTML = title;

  const content = document.createElement('section');
  wrapper.appendChild(content);

  return content;
};

chrome.runtime.onMessage.addListener(manageApiData);
