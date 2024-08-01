import { menuArray } from "./data.js";

const menuItems = document.getElementById("menu-items");
const orderSectionContainer = document.getElementById(
  "order-section-container"
);
const paymentContainer = document.getElementById("payment-container");
const nameInput = document.getElementById("card-name");

let totalPrice = 0;
let order = [];

document.addEventListener("click", function (event) {
  if (event.target.dataset.add) {
    addItemToOrder(event.target.dataset.add);
  } else if (event.target.dataset.remove) {
    removeItemFromOrder(event.target.dataset.remove);
    console.log(event.target.dataset.remove);
  } else if (event.target.id === "complete-order") {
    displayPaymentModal();
  } else if (event.target.id === "pay-btn") {
    event.preventDefault();
    processPayment();
  }
});

function processPayment() {
  paymentModal.style.display = "none";

  const userName = nameInput.value;

  orderSection.innerHTML = `
      <div class="completed-order-txt">
          <p>Thanks, ${userName}! Your order is on its way!</p>
      </div>`;
}

function displayPaymentModal() {
  paymentModal.style.display = "flex";
}

function addItemToOrder(itemId) {
  const targetItemObj = menuArray.filter(function (item) {
    return item.id == itemId;
  })[0];

  if (!order.includes(targetItemObj)) {
    order.push(targetItemObj);
    totalPrice += targetItemObj.price;

    renderOrderSection();
    renderOrder();
  }
}

function removeItemFromOrder(itemId) {
  let targetItemObj = menuArray.filter(function (item) {
    return (item.id = itemId);
  })[0];

  if (order.includes(targetItemObj)) {
    order.pop(targetItemObj);

    totalPrice -= targetItemObj.price;

    renderOrderSection();
    renderOrder();
  }
}

function orderSectionHtml() {
  return `
    <div class="order-header">
      <p>Your Order</p>
    </div>
    <div id="order-items" class="order-items">
      // order items go here
    </div>
    <div class="total-container">
      <div class="total-price">
        <p>Total Price:</p>
      </div>
      <div class="total-price-figure">
        <p>$${totalPrice}</p>
      </div>
    </div>
    <div class=""btn-container>
      <button class="complete-btn" id="complete-order">Complete Order</button>
    </div>
  `;
}

function renderOrderItem() {
  let orderHtml = "";
  order.forEach(function (item) {
    orderHtml += `
      <div class="order-container">
        <div class="order-item">
          <p>${item.name}</p>
          <button class="remove-item-btn" data-remove="${item.id}">remove</button>
        </div>
        <div class="order-price">
          <p>$${item.price}</p>
        </div>
      </div>
    `;
  });
  return orderHtml;
}

function renderMenuHtml() {
  let menuHtml = "";

  menuArray.forEach(function (item) {
    menuHtml += `
      <div class="menu-item">
        <div class="menu-info">
          <div class="item-graphic">
            ${item.emoji}
          </div>
          <div>
            <p class="item-name">${item.name}</p>
            <p class="item-ingredients">${item.ingredients}</p>
            <p class="item-price">$${item.price}</p>
          </div>
        </div>
        <div class="add-btn-container">
          <button class="add-btn" data-add="${item.id}">+</button>
        </div>
      </div>
    `;
  });
  return menuHtml;
}

function renderOrder() {
  document.getElementById("order-items").innerHTML = renderOrderItem();
}

function renderOrderSection() {
  orderSectionContainer.innerHTML = orderSectionHtml();
}

function renderMenu() {
  menuItems.innerHTML = renderMenuHtml();
}

renderMenu();
