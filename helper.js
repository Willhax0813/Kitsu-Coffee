import { cart } from "./state.js";

export function calculateSubtotal() {
  return cart.reduce((total, item) => {
    return total + item.price * item.qty;
  }, 0);
}

export function calculateItemCount() {
  return cart.reduce((total, item) => {
    return total + item.qty;
  }, 0);
}
