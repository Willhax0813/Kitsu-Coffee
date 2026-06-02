import { cart } from "./state.js";
import { renderModal } from "./render.js";
import { modalOverlay } from "./capture.js";
import { reviewList } from "./capture.js";

export function openModal() {
  if (cart.length === 0) return;
  if (window.innerWidth <= 1024) return;

  renderModal();
  modalOverlay.classList.remove("hidden");
  modalOverlay.classList.add("active");
}

export function closeModal() {
  reviewList.innerHTML = "";
  modalOverlay.classList.add("hidden");
  modalOverlay.classList.remove("active");
}
