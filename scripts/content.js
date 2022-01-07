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

  const content = createContent(data, '__userData__');
  apiInjectorPanel.appendChild(content);
  console.log('Injection finished.');
};

const createContent = (value, key) => {
  if (typeof value !== 'object') {
    const contentElement = createElement(key, value);

    return contentElement;
  } else if (Array.isArray(value)) {
    const arrayWrapper = createContainer('array');

    value.forEach((element, i) => {
      const child = createContent(element, i, arrayWrapper);
      arrayWrapper.appendChild(child);
    });

    arrayWrapper.insertAdjacentText('afterbegin', `${key}: [`);
    arrayWrapper.insertAdjacentText('beforeend', `]`);

    return arrayWrapper;
  } else if (value !== null) {
    const isMainObject = key === '__userData__';

    const objectWrapper = isMainObject
      ? document.createElement('div') // Special case for the initial object
      : createContainer('object');

    for (property in value) {
      const child = createContent(value[property], property, objectWrapper);
      objectWrapper.appendChild(child);
    }

    if (!isMainObject) {
      objectWrapper.insertAdjacentText('afterbegin', `${key}: {`);
      objectWrapper.insertAdjacentText('beforeend', `}`);
    }

    return objectWrapper;
  }
};

const createElement = (id, value) => {
  const element = document.createElement('li');
  element.innerHTML = `${id}: ${value}`;
  element.style.marginLeft = '1.5em';

  return element;
};

const createContainer = (type) => {
  const wrapper = document.createElement('li');
  const container = document.createElement(type === 'object' ? 'ul' : 'ol');
  container.style.marginLeft = '1.5em';

  wrapper.appendChild(container);

  return container;
};

chrome.runtime.onMessage.addListener(manageApiData);
