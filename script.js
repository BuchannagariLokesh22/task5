const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    desc: "High-quality sound with noise cancellation.",
    image: "https://images.unsplash.com/photo-1585386959984-a415522316c6?auto=format&fit=crop&w=600&q=80",
    category: "Electronics",
    rating: 4
  },
  {
    id: 2,
    name: "Smartwatch",
    desc: "Track your fitness and health.",
    image: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=600&q=80",
    category: "Wearables",
    rating: 5
  },
  {
    id: 3,
    name: "DSLR Camera",
    desc: "Professional camera with amazing features.",
    image: "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=600&q=80",
    category: "Photography",
    rating: 5
  },
  {
    id: 4,
    name: "Gaming Mouse",
    desc: "Precision mouse for serious gamers.",
    image: "https://images.unsplash.com/photo-1613897745311-f5d20623dc8c?auto=format&fit=crop&w=600&q=80",
    category: "Accessories",
    rating: 4
  },
  {
    id: 5,
    name: "VR Headset",
    desc: "Immerse yourself in virtual reality.",
    image: "https://images.unsplash.com/photo-1606813909418-212781c95c35?auto=format&fit=crop&w=600&q=80",
    category: "Gadgets",
    rating: 4
  }
];

const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const searchInput = document.getElementById("search");
const categoryFilter = document.getElementById("categoryFilter");

let cart = [];

function renderProducts(filter = { search: "", category: "All" }) {
  productList.innerHTML = "";

  const filtered = products.filter(product => {
    return (
      product.name.toLowerCase().includes(filter.search.toLowerCase()) &&
      (filter.category === "All" || product.category === filter.category)
    );
  });

  filtered.forEach(product => {
    const stars = "★".repeat(product.rating) + "☆".repeat(5 - product.rating);
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" loading="lazy" />
      <div class="product-details">
        <h3>${product.name}</h3>
        <p>${product.desc}</p>
        <div class="rating">${stars}</div>
        <button class="add-btn" onclick="addToCart('${product.name}')">Add to Cart</button>
      </div>
    `;
    productList.appendChild(card);
  });
}

function addToCart(name) {
  cart.push(name);
  updateCart();
}

function updateCart() {
  cartItems.innerHTML = "";
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    cartItems.appendChild(li);
  });
  cartCount.textContent = cart.length;
  cartTotal.textContent = cart.length;
}

searchInput.addEventListener("input", () => {
  renderProducts({ search: searchInput.value, category: categoryFilter.value });
});

categoryFilter.addEventListener("change", () => {
  renderProducts({ search: searchInput.value, category: categoryFilter.value });
});

renderProducts();
