const main = document.querySelector(".main");

const CARDS = [
  // { price: 550, vol: 0, num: 1 },
  { price: 600, vol: 0.7, num: 2 },
  { price: 700, vol: 0, num: 3 },
  { price: 600, vol: 1, num: 4 },
  /* { price: 500, vol: 0.7, num: 5 },
  { price: 550, vol: 0.7, num: 6 },
  { price: 600, vol: 0.7, num: 7 },
  { price: 600, vol: 0.7, num: 8 },
  { price: 600, vol: 0.7, num: 9 }, */
  { price: 600, vol: 0.5, num: 10 },
  { price: 600, vol: 0.5, num: 11 },
  { price: 600, vol: 0, num: 12 },
  { price: 600, vol: 0, num: 13 },
  // { price: 650, vol: 0, num: 14 },
  { price: 550, vol: 0.7, num: 15 },
  /* { price: 600, vol: 0.5, num: 16 },
  { price: 680, vol: 1, num: 17 }, */
  { price: 600, vol: 0, num: 18 },
  // { price: 550, vol: 0, only: "только blue label", num: 19 },
  { price: 600, vol: 0.7, only: "только gold", num: 20 },
  /*{ price: 550, vol: 0, num: 21 },
  { price: 550, vol: 0, num: 22 }, */
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
  if (res > start * 1.65) {
    return min;
  } else {
    return res;
  }
};

function recursion(bet, coast) {
  if (coast + bet > coast * 1.65) {
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
  if (max > start * 1.65) {
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
  if (CARDS[i-1].num < 10) {
    num = `00${CARDS[i-1].num}`;
  } else {
    num = `0${CARDS[i-1].num}`;
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
