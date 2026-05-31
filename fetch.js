const url = " data/menu.json";

export default async function getProducts() {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("failed to fetch");
    }
    const products = await res.json();

    return products;
  } catch (error) {
    console.error(error);
  }
}
