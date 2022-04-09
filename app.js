const main = document.querySelector(".main");

const CARDS = [
  // { price: 550, vol: 0 },
  { price: 600, vol: 0.7 },
  { price: 700, vol: 0 },
  { price: 600, vol: 1 },
  /* { price: 500, vol: 0.7 },
  { price: 550, vol: 0.7 },
  { price: 600, vol: 0.7 },
  { price: 600, vol: 0.7 },
  { price: 600, vol: 0.7 }, */
  { price: 600, vol: 0.5 },
  { price: 600, vol: 0.5 },
  { price: 600, vol: 0 },
  { price: 600, vol: 0 },
  // { price: 650, vol: 0 },
  { price: 550, vol: 0.7 },
  /* { price: 600, vol: 0.5 },
  { price: 680, vol: 1 }, */
  { price: 600, vol: 0 },
  // { price: 550, vol: 0, only: "только blue label" },
  { price: 600, vol: 0.7, only: "только gold" },
  /*{ price: 550, vol: 0 },
  { price: 550, vol: 0 }, */
];

const createElement = (tagName, params, container, text) => {
  const element = document.createElement(tagName);

  if (text) {
    element.textContent = text;
  }

  Object.entries(params).forEach((param) => {
    element.setAttribute(String(param[0]), String(param[1]));
  });

  if (container) {
    container.appendChild(element);
  }

  return element;
};

const minCoast = (min, exp, start) => {
  const res = eval(`${min} ${exp}`);
  if (res > start * 1.35) {
    return min;
  } else {
    return res;
  }
};

function recursion(bet, coast) {
  if (coast + bet > coast * 1.35) {
    return recursion(bet - 50, coast);
  } else {
    return coast + bet;
  }
}

const price = (start) => {
  const nds = Math.ceil(start * 1.12);
  const margin = recursion(250, nds, start);
  const max = Math.ceil(margin / 50) * 50;
  const min = Math.floor(margin / 50) * 50;
  if (max > start * 1.35) {
    return min;
  } else {
    return max;
  }
};

for (let i = 1; i <= CARDS.length; i++) {
  const div = createElement("div", { class: "container" }, main);
  const text = createElement("div", { class: "container-text" }, div);
  createElement("h2", {}, text, `Цена: ${price(CARDS[i - 1].price)} руб.`);
  if (CARDS[i - 1].vol > 0) {
    createElement(
      "h3",
      {},
      text,
      CARDS[i - 1].vol === 1
        ? `Объём: ${CARDS[i - 1].vol} литр`
        : `Объём: ${CARDS[i - 1].vol} литра`
    );
  }
  let num;
  if (i < 10) {
    num = `00${i}`;
  } else {
    num = `0${i}`;
  }
  createElement(
    "img",
    { class: "container-image", alt: "image", src: `./assets/${num}.jpg` },
    div
  );
  if (CARDS[i - 1].only) {
    createElement("h2", {style: 'color: #696969'}, div, `В наличии ${CARDS[i - 1].only}`);
  }
}
