import { cart } from "./state.js";
import { renderCart } from "./render.js";

export function addToCart(product) {
  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  renderCart();
}

export function removeFromCart(id) {
  const index = cart.findIndex((item) => item.id === id);

  if (index === -1) return;
  cart.splice(index, 1);
}

export function increaseQty(id) {
  const item = cart.find((item) => item.id === id);

  if (!item) return;

  item.qty++;

  renderCart();
}
export function decreaseQty(id) {
  const item = cart.find((item) => item.id === id);

  if (!item) return;

  item.qty--;
  if (item.qty <= 0) {
    removeFromCart(id);
  }
  renderCart();
}
