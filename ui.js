import {
  cartBtn,
  cartWrapper,
  cartOverlay,
  input,
  searchWrapper,
  searchBtn,
  completeWrapper,
  body,
} from "./capture.js";

import {
  openSearch,
  searchHandler,
  closeSearch,
  handleSearchBtn,
} from "./search.js";
import { renderMenu, renderCart } from "./render.js";

import { products } from "./state.js";
export function formatPrice(price) {
  return new Intl.NumberFormat("id-ID").format(price);
}

export function getConfirmText() {
  return window.innerWidth <= 1024 ? "Proceed to pay" : "Confirm Order";
}

export function toggleCart() {
  const isOpen = cartWrapper.classList.toggle("active");

  if (window.innerWidth <= 1024) {
    cartOverlay.classList.toggle("active", isOpen);
  }
}

cartOverlay.addEventListener("click", (e) => {
  if (e.target === cartOverlay) {
    cartWrapper.classList.remove("active");
    cartOverlay.classList.remove("active");
  }
});

export function bindEvents() {
  cartBtn.addEventListener("click", toggleCart);
  searchWrapper.addEventListener("input", searchHandler);

  searchBtn.addEventListener("click", handleSearchBtn);
  // input.addEventListener("input", updateSearchIcon);
  body.addEventListener("click", closeSearch);

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      completeWrapper.classList.remove("active");
    }
  });

  window.addEventListener("resize", () => {
    renderCart();
  });
}
