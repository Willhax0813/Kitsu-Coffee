// imported file
import getProducts from "./fetch.js";

// global DOM Selector
const menuWrapper = document.querySelector(".menu-wrapper");
const input = document.querySelector("#input");
const suggestions = document.querySelector(".suggestions");
const cartList = document.querySelector(".cart-list");
const cartBtn = document.querySelector(".cart-btn");
const cartWrapper = document.querySelector(".cart-wrapper");
const mainContainer = document.querySelector(".main-container");
const cartSummary = document.querySelector(".cart-summary");
const modalOverlay = document.querySelector(".modal-overlay");
const modal = document.querySelector(".modal");
const reviewList = document.querySelector(".review-list");
const reviewSum = document.querySelector(".review-summary");

// zero state
let products = [];
const cart = [];

// DOM factory
function createMenuCard(product) {
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
function createCartList(item) {
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

function createCounter(item) {
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

function createModal(item) {
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
function createNotFound() {
  const notFoundDiv = document.createElement("div");

  notFoundDiv.classList.add("not-found");
  notFoundDiv.innerHTML = `
  <h3>😿 Coffee Not Found.</h3>
  <p>Try another keyword.</p>
  `;

  return notFoundDiv;
}

// event Handler
function toggleCart() {
  mainContainer.classList.toggle("cart-active");
  cartWrapper.classList.toggle("active");
}
function bindEvents() {
  cartBtn.addEventListener("click", toggleCart);
  input.addEventListener("input", searchHandler);
}
function searchHandler(e) {
  const keyword = e.target.value.toLowerCase();

  if (!keyword) {
    suggestions.innerHTML = "";
    suggestions.classList.remove("active");

    renderMenu(products);

    return;
  }

  const filtered = products.filter((product) =>
    product.name.toLowerCase().includes(keyword.toLowerCase()),
  );
  renderMenu(filtered);
  renderSuggestions(filtered);
}

function addToCart(product) {
  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  renderCart();
}

function removeFromCart(id) {
  const index = cart.findIndex((item) => item.id === id);

  if (index === -1) return;
  cart.splice(index, 1);
}

// helper
function decreaseQty(id) {
  const item = cart.find((item) => item.id === id);

  if (!item) return;

  item.qty--;
  if (item.qty <= 0) {
    removeFromCart(id);
  }
  renderCart();
}

function increaseQty(id) {
  const item = cart.find((item) => item.id === id);

  if (!item) return;

  item.qty++;

  renderCart();
}

function calculateSubtotal() {
  return cart.reduce((total, item) => {
    return total + item.price * item.qty;
  }, 0);
}

function calculateItemCount() {
  return cart.reduce((total, item) => {
    return total + item.qty;
  }, 0);
}

function formatPrice(price) {
  return new Intl.NumberFormat("id-ID").format(price);
}

// renderer
function renderMenu(productsData) {
  menuWrapper.innerHTML = "";

  if (productsData.length === 0) {
    menuWrapper.appendChild(createNotFound());
    return;
  }

  const fragment = document.createDocumentFragment();

  productsData.forEach((product) => {
    const menuCard = createMenuCard(product);
    fragment.appendChild(menuCard);
  });
  menuWrapper.appendChild(fragment);
}

function renderSuggestions(filteredProducts) {
  suggestions.innerHTML = "";
  if (filteredProducts.length === 0) {
    suggestions.classList.remove("active");
    return;
  }
  suggestions.classList.add("active");

  const fragment = document.createDocumentFragment();
  filteredProducts.forEach((product) => {
    const li = document.createElement("li");

    li.textContent = product.name;

    fragment.appendChild(li);
  });
  suggestions.appendChild(fragment);
}

function renderCartList() {
  cartList.innerHTML = "";

  if (cart.length === 0) {
    const emptyState = renderEmptyState();
    cartList.appendChild(emptyState);
    return;
  }

  const fragment = document.createDocumentFragment();
  cart.forEach((item) => {
    const cartItem = createCartList(item);

    fragment.appendChild(cartItem);
  });
  cartList.appendChild(fragment);
}

function renderSummary() {
  if (cart.length === 0) {
    cartSummary.innerHTML = "";
    cartSummary.classList.remove("active");
    return;
  }

  cartSummary.classList.add("active");
  cartSummary.innerHTML = `
  <div class="summary-row">
  <span>Items</span>
  <strong>x${calculateItemCount()}</strong>
  </div>

  <br>
    <div class="summary-row">
  <span>Subtotal</span>
  <strong>Rp.${formatPrice(calculateSubtotal())}</strong>
  </div>
  `;

  const confirm = document.createElement("button");
  confirm.textContent = "Confirm Order";
  confirm.classList.add("confirm-btn");

  confirm.addEventListener("click", () => {
    openModal();
  });

  cartSummary.appendChild(confirm);

  return cartSummary;
}

function renderEmptyState() {
  const emptyContainer = document.createElement("div");
  emptyContainer.classList.add("empty-container");
  const empty = document.createElement("li");
  empty.innerHTML = "🦊 Your cart is empty.<br> Add some coffee first.";
  empty.classList.add("empty-cart");
  emptyContainer.appendChild(empty);

  return emptyContainer;
}

function renderReview() {
  reviewList.innerHTML = "";
  const fragment = document.createDocumentFragment();
  cart.forEach((item) => {
    const review = createModal(item);

    fragment.appendChild(review);
  });

  reviewList.appendChild(fragment);
}

function renderReviewSum() {
  if (cart.length === 0) {
    reviewSum.innerHTML = "";
    reviewSum.classList.remove("active");
    return;
  }
  reviewSum.classList.add("active");
  reviewSum.innerHTML = `
  <div class="review-sum">
  <span>Items</span>
  <strong>x${calculateItemCount()}</strong>
  </div>



  <div class="review-sum">
  <span>Subtotal</span>
  <strong>Rp.${formatPrice(calculateSubtotal())}</strong>
  </div>

  `;

  const btnWrapper = document.createElement("div");
  const backBtn = document.createElement("button");
  const payBtn = document.createElement("button");

  btnWrapper.classList.add("btn-wrapper");
  backBtn.classList.add("back-btn");
  payBtn.classList.add("pay-btn");

  backBtn.textContent = "Return to Menu";
  payBtn.textContent = "Proceed to pay";

  backBtn.addEventListener("click", closeModal);

  btnWrapper.appendChild(backBtn);
  btnWrapper.appendChild(payBtn);

  reviewSum.appendChild(btnWrapper);

  return reviewSum;
}
function renderCart() {
  renderCartList();
  renderSummary();
}

function renderModal() {
  renderReview();
  renderReviewSum();
}

// Pop up modal
function openModal() {
  if (cart.length === 0) return;

  renderModal();
  modalOverlay.classList.remove("hidden");
  modalOverlay.classList.add("active");
}

function closeModal() {
  reviewList.innerHTML = "";
  modalOverlay.classList.add("hidden");
  modalOverlay.classList.remove("active");
}
// fetch
async function renderProducts() {
  products = await getProducts();
  renderMenu(products);
}
// call in fn /initiate fn
bindEvents();
renderProducts();
renderCart();
