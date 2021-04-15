export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomIndex = function (list) {
  const randomIndex = getRandomInteger(0, list.length - 1);

  return list[randomIndex];
};

export const renderTemplate = (container, template) => {
  container.insertAdjacentHTML('beforeend', template);
};

export const renderElement = (container, element) => {
  container.append(element);
};

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML= template;

  return newElement.firstChild;
};

