import { products } from "./state.js";
import {
  completeWrapper,
  searchBtn,
  searchWrapper,
  input,
  body,
} from "./capture.js";
import { renderMenu, renderAutoComplete } from "./render.js";

export function searchHandler(e) {
  const keyword = e.target.value.toLowerCase();

  searchBtn.textContent = keyword ? "✖" : "🔍";

  if (!keyword) {
    completeWrapper.classList.remove("active");
    setTimeout(() => {
      completeWrapper.innerHTML = "";
    }, 200);

    renderMenu(products);

    return;
  }

  const filtered = products.filter((product) =>
    product.name.toLowerCase().includes(keyword.toLowerCase()),
  );
  renderMenu(filtered);
  renderAutoComplete(filtered);
}

export function openSearch() {
  searchWrapper.classList.toggle("active");
  input.classList.toggle("active");
  input.focus();
}

function clearField() {
  input.value = "";
  completeWrapper.classList.remove("active");
  searchBtn.textContent = "🔍";
  renderMenu(products);
  input.focus();
}

export function handleSearchBtn() {
  if (input.value.trim()) {
    clearField();
    return;
  }

  openSearch();
}

export function closeSearch(e) {
  const insideSearch = e.target.closest(".search-wrapper");

  if (!insideSearch) {
    searchWrapper.classList.remove("active");
    input.classList.remove("active");

    input.value = "";
    input.blur();
    completeWrapper.classList.remove("active");
    searchBtn.textContent = "🔍";
    renderMenu(products);
  }
}
