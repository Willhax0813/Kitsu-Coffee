import { products } from "./state.js";
import { completeWrapper } from "./capture.js";
import { renderMenu } from "./render.js";

export function searchHandler(e) {
  const keyword = e.target.value.toLowerCase();

  if (!keyword) {
    completeWrapper.innerHTML = "";
    completeWrapper.classList.remove("active");

    renderMenu(products);

    return;
  }

  const filtered = products.filter((product) =>
    product.name.toLowerCase().includes(keyword.toLowerCase()),
  );
  renderMenu(filtered);
  renderAutoComplete(filtered);
}

export function renderAutoComplete(filteredProducts) {
  completeWrapper.innerHTML = "";
  if (filteredProducts.length === 0) {
    completeWrapper.classList.remove("active");

    return;
  }

  completeWrapper.classList.add("active");

  const fragment = document.createDocumentFragment();
  filteredProducts.forEach((product) => {
    const li = document.createElement("li");

    li.classList.add("list-dropdown");
    li.textContent = product.name;

    fragment.appendChild(li);
  });

  completeWrapper.appendChild(fragment);
}
