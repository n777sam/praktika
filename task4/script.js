import { api, apiAuthor } from "./modules/api.js";

import {
  POST,
  DELETE,
  PUT,
  UPDATE,
  REMOVE,
  DEFAILT_VALUE,
} from "./modules/constants.js";

import { getEl, uuid } from "./modules/helpers.js";

let cards = [],
  blockElements = false;

const formEl = getEl("form");
const productCodeInput = getEl('input[name="id"]');
const productNameInput = getEl('input[name="productName"]');
const hrefToIMGInput = getEl('input[name="hrefToIMG"]');
const descriptionInput = getEl('textarea[name="description"]');
const providerInput = getEl('input[name="provider"]');
const listEl = getEl(".showcaseOfCards .row");
const elLoading = getEl(".movie-isloading");
const authorPlace = getEl(".author-name");
const authorPlacePlaceholder = getEl(".author-name-placeholder");

const addCard = (card, replace = false) => {
  const itemTemplate = `
  <div class="card" data-id="${card.id}">
  <div class="row">
      <div class="col-6">
          <div class="productId">Id:${card.id}</div>
      </div>
      <div class="col-6">
          <div class="card-edit mb-1" data-id="${card.id}" data-init="false">Редактировать</div>
          <div class="card-remove" data-id="${card.id}" data-init="false">Удалить</div>
      </div>
  </div>
  <div class="row">
      <div class="col-6">
          <div class="hrefToIMG"><img src="${card.hrefToIMG}"/></div>
      </div>
      <div class="col-6">
          <div class="productName">${card.productName}</div>
      </div>
  </div>
      <div class="row">
          <div class="col-6">
              <div class="description">${card.description}</div>
          </div>
          <div class="col-6">
              <div class="provider">Производитель: ${card.provider}</div>
          </div>
      </div>
  </div>
  `;

  if (replace) return itemTemplate;

  listEl.insertAdjacentHTML("beforeend", itemTemplate);
};

const loadingCardsAnimation = (val) => {
  if (val) {
    elLoading.classList.remove("d-none");
  } else {
    elLoading.classList.add("d-none");
  }
};

const getAuthor = async () => {
  try {
    const author = await apiAuthor();
    authorPlace.querySelector(".name").innerHTML = author.name;
    authorPlace.querySelector(".group").innerHTML = author.group;
    authorPlacePlaceholder.classList.add("d-none");
    authorPlace.classList.remove("d-none");
  } catch (e) {
    console.log(e);
  }
};
getAuthor();
async function getCards() {
  blockElements = true;
  listEl.innerHTML = "";
  loadingCardsAnimation(true);
  try {
    cards = await api();

    cards.forEach((card) => addCard(card));
    loadingCardsAnimation(false);

    initButtons();
  } catch (e) {
    console.log(e);
  }
  blockElements = false;
}
getCards();

const setDefaultBtn = async () => {
  if (blockElements) return;
  blockElements = true;

  cards.forEach(async (el) => {
    let id = el.id;
    document.querySelector(`.card[data-id="${id}"]`).remove();
    try {
      await api(DELETE, { id });
    } catch (e) {
      console.log(e);
    }
  });
  loadingCardsAnimation(true);
  cards = DEFAILT_VALUE;

  DEFAILT_VALUE.forEach(async (card) => {
    addCard(card);
    try {
      await api(POST, { body: card });
    } catch (e) {
      console.log(e);
    }
  });
  loadingCardsAnimation(false);
  initButtons();
  blockElements = false;
};

document
  .querySelector(".setupStartValue")
  .addEventListener("click", setDefaultBtn);

function initButtons() {
  const editBtns = getEl(".card-edit", true, listEl);
  const removeBtns = getEl(".card-remove", true, listEl);

  editBtns.forEach((input) => (input.onclick = (e) => handleClick(e, UPDATE)));

  removeBtns.forEach((btn) => (btn.onclick = (e) => handleClick(e, REMOVE)));
}

const handleClick = async (e, action) => {
  if (blockElements) return;
  blockElements = true;
  const itemEl = e.target.closest(".card");
  const { id } = itemEl.dataset;

  switch (action) {
    case UPDATE: {
      editCard(id);
      blockElements = false;
      break;
    }
    case REMOVE: {
      try {
        await api(DELETE, { id });
      } catch (e) {
        console.log(e);
      }

      itemEl.closest(".card").remove();
    }
    default:
      blockElements = false;
      return;
  }
};

const editCard = (id) => {
  let cardProduct = cards.filter((el) => el.id == id)[0];
  const form = document.querySelector("#form-product");
  for (let key in cardProduct) {
    form.querySelector(`[name="${key}"]`).value = cardProduct[key];
  }
};

formEl.onsubmit = async (e) => {
  e.preventDefault();
  if (blockElements) return;
  blockElements = true;

  const trimmedProductCode = productCodeInput.value.trim();
  const trimmedProductName = productNameInput.value.trim();
  const trimmedHrefToIMG = hrefToIMGInput.value.trim();
  const trimmedDescription = descriptionInput.value.trim();
  const trimmedProvider = providerInput.value.trim();

  if (
    trimmedProductName &&
    trimmedHrefToIMG &&
    trimmedDescription &&
    trimmedProvider
  ) {
    if (trimmedProductCode == "") {
      const newCard = {
        id: uuid(5),
        productName: trimmedProductName,
        hrefToIMG: trimmedHrefToIMG,
        description: trimmedDescription,
        provider: trimmedProvider,
      };

      try {
        await api(POST, { body: newCard });
        getCards();
      } catch (e) {
        console.log(e);
      }
    } else {
      const card = {
        id: trimmedProductCode,
        productName: trimmedProductName,
        hrefToIMG: trimmedHrefToIMG,
        description: trimmedDescription,
        provider: trimmedProvider,
      };
      let id = card.id;
      try {
        await api(PUT, { id, body: card });

        getEl(`.card[data-id="${id}"]`).outerHTML = addCard(card, true);

        initButtons();
      } catch (e) {
        console.log(e);
      }
    }
    productCodeInput.value = "";
    productNameInput.value = "";
    hrefToIMGInput.value = "";
    descriptionInput.value = "";
    providerInput.value = "";
  } else {
    alert('Не все поля заполнены!')
  }
  blockElements = false;
};
