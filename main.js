// imported file
import getProducts from "./fetch.js";
import { products } from "./state.js";
import { bindEvents } from "./ui.js";
import { renderMenu, renderCart } from "./render.js";

// fetch
async function renderProducts() {
  const data = await getProducts();
  products.length = 0;
  products.push(...data);

  renderMenu(products);
}
// call in fn /initiate fn
bindEvents();
renderProducts();
renderCart();
