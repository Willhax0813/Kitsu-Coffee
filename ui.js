import {
  cartBtn,
  cartWrapper,
  cartOverlay,
  input,
  searchBtn,
  completeWrapper,
  body,
} from "./capture.js";

import { searchHandler } from "./search.js";
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
export function bindEvents() {
  cartBtn.addEventListener("click", toggleCart);
  input.addEventListener("input", searchHandler);

  // input.addEventListener("keydown", (e) => {
  //   if (e.key === "Enter") {
  //     searchHandler();
  //   }
  // });

  searchBtn.addEventListener("click", () => {
    const hasValue = input.value.trim() !== "";

    if (hasValue) {
      input.value = "";
      completeWrapper.classList.remove("active");
      searchBtn.textContent = "🔍";
      renderMenu(products);
      input.focus();
      return;
    }
    input.classList.add("active");
    searchBtn.classList.toggle("active", hasValue);
    input.focus();
  });

  input.addEventListener("input", () => {
    const hasValue = input.value.trim() !== "";

    searchBtn.textContent = hasValue ? "✖" : "🔍";
    // searchBtn.classList.toggle("active", hasValue);
  });

  cartOverlay.addEventListener("click", (e) => {
    if (e.target === cartOverlay) {
      cartWrapper.classList.remove("active");
      cartOverlay.classList.remove("active");
    }
  });

  body.addEventListener("click", (e) => {
    const insideSearch = e.target.closest(".search-wrapper");

    if (!insideSearch) {
      input.classList.remove("active");

      input.value = "";
      completeWrapper.classList.remove("active");
      searchBtn.textContent = "🔍";
      // searchBtn.style.boxShadow = " 0 0 10px rgba(0,0,0,0.125)";
      renderMenu(products);
    }
  });

  window.addEventListener("resize", () => {
    renderCart();
  });
}
