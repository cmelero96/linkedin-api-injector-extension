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
    createContent(key, value, parentElement);
  } else if (Array.isArray(value)) {
    const arrayWrapper = createContainer('array', parentElement);

    value.forEach((element, i) => navigate(element, i, arrayWrapper));

    arrayWrapper.insertAdjacentText('afterbegin', `${key}: [`);
    arrayWrapper.insertAdjacentText('beforeend', `]`);
  } else if (value !== null) {
    const isMainObject = key === '__userData__';

    const objectWrapper = isMainObject
      ? createMainWrapper(parentElement) // Special case for the initial object
      : createContainer('object', parentElement);

    for (property in value) {
      navigate(value[property], property, objectWrapper);
    }

    if (!isMainObject) {
      objectWrapper.insertAdjacentText('afterbegin', `${key}: {`);
      objectWrapper.insertAdjacentText('beforeend', `}`);
    }
  }
};

const createContent = (id, value, parent) => {
  const element = document.createElement('li');
  parent.appendChild(element);

  element.innerHTML = `${id}: ${value}`;
  element.style.marginLeft = '1.5em';

  return element;
};

const createContainer = (type, parent) => {
  const wrapper = document.createElement('li');
  parent.appendChild(wrapper);

  const container = document.createElement(type === 'object' ? 'ul' : 'ol');
  wrapper.appendChild(container);
  container.style.marginLeft = '1.5em';

  return container;
};

const createMainWrapper = (parent) => {
  const wrapper = document.createElement('div');
  parent.appendChild(wrapper);

  return wrapper;
};

chrome.runtime.onMessage.addListener(manageApiData);
