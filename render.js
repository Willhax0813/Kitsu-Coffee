import { cart } from "./state.js";
import {
  createMenuCard,
  createCartList,
  createModal,
  createNotFound,
} from "./factory.js";

import { calculateItemCount, calculateSubtotal } from "./helper.js";

import { formatPrice, getConfirmText } from "./ui.js";
import { openModal, closeModal } from "./modal.js";
import {
  menuWrapper,
  cartList,
  cartSummary,
  reviewList,
  reviewSum,
} from "./capture.js";

export function renderMenu(productsData) {
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

export function renderCartList() {
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

export function renderSummary() {
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
  confirm.textContent = getConfirmText();
  confirm.classList.add("confirm-btn");

  confirm.addEventListener("click", () => {
    openModal();
  });

  cartSummary.appendChild(confirm);

  return cartSummary;
}

export function renderEmptyState() {
  const emptyContainer = document.createElement("div");
  emptyContainer.classList.add("empty-container");
  const empty = document.createElement("li");
  empty.innerHTML = "🦊 Your cart is empty.<br> Add some coffee first.";
  empty.classList.add("empty-cart");
  emptyContainer.appendChild(empty);

  return emptyContainer;
}

export function renderReview() {
  reviewList.innerHTML = "";
  const fragment = document.createDocumentFragment();
  cart.forEach((item) => {
    const review = createModal(item);

    fragment.appendChild(review);
  });

  reviewList.appendChild(fragment);
}

export function renderReviewSum() {
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
export function renderCart() {
  renderCartList();
  renderSummary();
}

export function renderModal() {
  renderReview();
  renderReviewSum();
}
