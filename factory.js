import { formatPrice } from "./ui.js";
import { addToCart, increaseQty, decreaseQty } from "./cart.js";

export function createMenuCard(product) {
  const li = document.createElement("li");
  li.classList.add("menu-card");

  const name = document.createElement("h3");
  name.textContent = product.name;
  const price = document.createElement("strong");
  price.textContent = `Rp.${formatPrice(product.price)}`;
  const category = document.createElement("p");
  category.textContent = product.category;

  const addItems = document.createElement("button");
  addItems.classList.add("add-cart");

  addItems.textContent = "Add to cart";

  addItems.addEventListener("click", () => addToCart(product));

  li.appendChild(name);
  li.appendChild(price);
  li.appendChild(category);
  li.appendChild(addItems);
  return li;
}
export function createCartList(item) {
  const li = document.createElement("li");
  li.classList.add("item-list");

  const name = document.createElement("h4");
  name.textContent = item.name;
  const price = document.createElement("p");
  price.textContent = `Rp.${formatPrice(item.price)}`;

  const wrapper = document.createElement("div");
  wrapper.classList.add("price-counter");

  const counter = createCounter(item);

  wrapper.appendChild(price);
  wrapper.appendChild(counter);

  li.appendChild(name);
  li.appendChild(wrapper);

  return li;
}

export function createCounter(item) {
  const countDiv = document.createElement("div");
  countDiv.classList.add("counter");
  const minBtn = document.createElement("button");

  minBtn.textContent = "-";
  minBtn.addEventListener("click", () => {
    decreaseQty(item.id);
  });
  const qty = document.createElement("p");
  qty.textContent = item.qty;

  const plusBtn = document.createElement("button");
  plusBtn.textContent = "+";

  plusBtn.addEventListener("click", () => {
    increaseQty(item.id);
  });

  countDiv.appendChild(minBtn);
  countDiv.appendChild(qty);
  countDiv.appendChild(plusBtn);

  return countDiv;
}

export function createModal(item) {
  const itemWrapper = document.createElement("div");
  const itemName = document.createElement("h3");
  const itemQty = document.createElement("span");
  const itemPrice = document.createElement("p");

  itemWrapper.classList.add("review-row");
  itemName.classList.add("review-name");
  itemQty.classList.add("review-qty");
  itemPrice.classList.add("review-price");

  itemName.textContent = item.name;
  itemQty.textContent = `x${item.qty}`;
  itemPrice.textContent = `Rp.${formatPrice(item.price * item.qty)}`;

  itemWrapper.appendChild(itemName);
  itemWrapper.appendChild(itemQty);
  itemWrapper.appendChild(itemPrice);

  return itemWrapper;
}
export function createNotFound() {
  const notFoundDiv = document.createElement("div");

  notFoundDiv.classList.add("not-found");
  notFoundDiv.innerHTML = `
  <h3>😿 Coffee Not Found.</h3>
  <p>Try another keyword.</p>
  `;

  return notFoundDiv;
}
