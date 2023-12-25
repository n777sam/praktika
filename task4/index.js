let editMode = false;
const startValue = [
  {
    productName: "Тест 1",
    hrefToIMG:
      "https://media.istockphoto.com/id/1062947134/ru/%D1%84%D0%BE%D1%82%D0%BE/%D1%81%D0%BE%D0%B1%D0%BE%D1%80-%D0%B2%D0%B0%D1%81%D0%B8%D0%BB%D0%B8%D1%8F-%D0%B1%D0%BB%D0%B0%D0%B6%D0%B5%D0%BD%D0%BD%D0%BE%D0%B3%D0%BE-%D0%B8-%D0%B7%D0%BE%D0%BB%D0%BE%D1%82%D1%8B%D0%B5-%D0%BF%D0%B5%D1%80%D0%B2%D1%8B%D0%B5-%D0%BB%D1%83%D1%87%D0%B8-%D1%81%D0%BE%D0%BB%D0%BD%D1%86%D0%B0.jpg?s=612x612&w=0&k=20&c=rSRPoCl78qvsYxaRhOa0xS_z10jDDnJvhteWLM5w8yo=",
    description: "Собор Василия Блаженного и золотые первые лучи солнца\n",
    provider: "Поставщик 1",
    productCode: "0",
  },
  {
    productName: "Электросамокат Xiaomi Mijia Electric Scooter Pro",
    hrefToIMG:
      "https://mi29.ru/image/cache/cache/1001-2000/1387/main/7dd9-99867-0-1-800x800.jpg",
    description:
      "Mijia Pro от компании Xiaomi - это модернизированный вариант популярного, всемирно признанного электросамоката.",
    provider: "Xiaomi ",
    productCode: "1",
  },
  {
    productName: "Телефон Apple iPhone 14 128Gb Midnight",
    hrefToIMG:
      "https://goodcom.ru/loaded/catalog/goods/thumbs/02449851a3eb11acc56c256af0cd7366.jpg",
    description:
      "Телефон Apple iPhone 14 работает под управление операционной системы iOS со стартовой версии 16.",
    provider: "Хорошая связь",
    productCode: "2",
  },
];

const setupStartValue = () => {
  clearCards();
  localStorage.setItem("cards", JSON.stringify(startValue));
  loadCards();
};

const clearCards = () => {
  document.querySelector(".showcaseOfCards .row").innerHTML = "";
};

const createCard = (cardData) => {
  let root;
  if (document.querySelector(`[data-id='${cardData.productCode}']`)) {
    root = document
      .querySelector(`[data-id='${cardData.productCode}']`)
      .closest(".col-6");
    document
      .querySelector(`[data-id='${cardData.productCode}']`)
      .closest(".col-6").innerHTML = "";
  } else {
    root = document;
  }
  const wrapperCard = document.createElement("div");
  wrapperCard.innerHTML = `
          <div class="card" data-id="${cardData.productCode}">
          <div class="row">
              <div class="col-6">
                  <div class="productId">Id:${cardData.productCode}</div>
              </div>
              <div class="col-6">
                  <div class="card-edit mb-1" data-id="${cardData.productCode}" data-init="false">Редактировать</div>
                  <div class="card-remove" data-id="${cardData.productCode}" data-init="false">Удалить</div>
              </div>
          </div>
          <div class="row">
              <div class="col-6">
                  <div class="hrefToIMG"><img src="${cardData.hrefToIMG}"/></div>
              </div>
              <div class="col-6">
                  <div class="productName">${cardData.productName}</div>
              </div>
          </div>
              <div class="row">
                  <div class="col-6">
                      <div class="description">${cardData.description}</div>
                  </div>
                  <div class="col-6">
                      <div class="provider">Производитель: ${cardData.provider}</div>
                  </div>
              </div>
          </div>
      `;
  if (root == document) {
    root
      .querySelector(".showcaseOfCards .row")
      .insertAdjacentHTML(
        "beforeend",
        '<div class="col-6 mb-4">' + wrapperCard.innerHTML + "</div>"
      );
  } else {
    root.insertAdjacentHTML("beforeend", wrapperCard.innerHTML);
  }
};

const getIdtoSaveCard = (cardData) => {
  if (cardData.get("productCode")) {
    editMode = true;
    return cardData.get("productCode");
  }
  let cards = JSON.parse(localStorage.getItem("cards"));
  let cardId = !!cards ? cards.length : 0;
  return cardId;
};

const saveCard = (cardData) => {
  let cards = localStorage.getItem("cards");
  if (!!cards) {
    cards = JSON.parse(cards);
    if (!editMode) {
      cards[cards.length] = cardData;
    } else {
      cards[cardData.productCode] = cardData;
      editMode = false;
    }
    localStorage.setItem("cards", JSON.stringify(cards));
  } else {
    localStorage.setItem("cards", JSON.stringify([cardData]));
  }
};

const loadCards = () => {
  let cards = localStorage.getItem("cards");
  if (!!cards) {
    cards = JSON.parse(cards);
    cards.forEach((el) => createCard(el));
  }
};

const editCard = (id) => {
  let cardProduct = JSON.parse(localStorage.getItem("cards")).filter(
    (el) => el.productCode == id
  )[0];
  const form = document.querySelector("#form-product");
  for (let key in cardProduct) {
    form.querySelector(`[name="${key}"]`).value = cardProduct[key];
  }
};
const removeCard = (id) => {
  let cardProducts = JSON.parse(localStorage.getItem("cards")).filter(
    (el) => el.productCode != id
  );
  console.log(cardProducts)
  localStorage.setItem("cards", JSON.stringify(cardProducts));
  console.log(
    document.querySelector(`.card[data-id="${id}"]`).closest(".col-6")
  );
  document.querySelector(`.card[data-id="${id}"]`).closest(".col-6").remove();
};

const validationForm = (formData) => {
  let cardData = {};
  for (let [key, value] of formData) {
    if (!value) return null;
    cardData[key] = value;
  }
  return cardData;
};

const initEdit = () => {
  document.querySelectorAll('.card-edit[data-init="false"]').forEach((el) => {
    el.addEventListener("click", () => {
      editCard(el.dataset.id);
    });
    el.dataset.init = "true";
  });
};

const initRemove = () => {
  document.querySelectorAll('.card-remove[data-init="false"]').forEach((el) => {
    el.addEventListener("click", () => {
      removeCard(el.dataset.id);
    });
    el.dataset.init = "true";
  });
};

document.addEventListener("DOMContentLoaded", () => {
  loadCards();
  initEdit();
  initRemove();
  document.querySelector("form .btn").addEventListener("click", () => {
    const form = document.querySelector("#form-product");
    const data = new FormData(form);
    document.querySelector('input[name="productCode"').value = "";
    let cardId = getIdtoSaveCard(data);
    data.set("productCode", cardId);
    let card = validationForm(data);
    if (card == null) {
      alert("Не все поля заполнены!");
      return;
    }
    form.reset();
    saveCard(card);
    createCard(card);
    initEdit();
    initRemove();
  });
  document.querySelector(".setupStartValue").addEventListener("click", () => {
    setupStartValue();
  });
});
