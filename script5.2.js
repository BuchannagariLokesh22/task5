document.addEventListener("DOMContentLoaded", () => {
  const products = [
    {
      name: "Wireless Headphones",
      desc: "Noise-cancelling and powerful bass.",
      image: "https://images.unsplash.com/photo-1585386959984-a415522316c6?auto=format&fit=crop&w=600&q=80",
      category: "Electronics",
      rating: 4
    },
    {
      name: "Smartwatch",
      desc: "Track your health and receive notifications.",
      image: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=600&q=80",
      category: "Wearables",
      rating: 5
    },
    {
      name: "Smart Light",
      desc: "Voice-controlled color bulb.",
      image: "https://images.unsplash.com/photo-1555617127-4f30f0c195b4?auto=format&fit=crop&w=600&q=80",
      category: "Smart Home",
      rating: 5
    },
    {
      name: "Bluetooth Speaker",
      desc: "Small size, big sound.",
      image: "https://images.unsplash.com/photo-1584277269991-0d50aeac6539?auto=format&fit=crop&w=600&q=80",
      category: "Audio",
      rating: 4
    }
  ];

  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const cartTotal = document.getElementById("cart-total");
  const searchInput = document.getElementById("search");
  const categoryFilter = document.getElementById("categoryFilter");
  const toggleCartBtn = document.getElementById("toggle-cart");
  const cartPanel = document.getElementById("cart-panel");
  const clearCartBtn = document.getElementById("clear-cart");

  let cart = [];

  function renderProducts() {
    const keyword = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    productList.innerHTML = "";

    const filtered = products.filter(
      p => p.name.toLowerCase().includes(keyword) && (category === "All" || p.category === category)
    );

    filtered.forEach(p => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${p.image}" alt="${p.name}" loading="lazy">
        <div class="product-details">
          <h3>${p.name}</h3>
          <p>${p.desc}</p>
          <div class="rating">${"★".repeat(p.rating)}${"☆".repeat(5 - p.rating)}</div>
          <button class="add-btn">Add to Cart</button>
        </div>
      `;
      card.querySelector(".add-btn").addEventListener("click", () => {
        cart.push(p.name);
        updateCart();
      });
      productList.appendChild(card);
    });
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

  toggleCartBtn.addEventListener("click", () => {
    cartPanel.classList.toggle("hidden");
  });

  clearCartBtn.addEventListener("click", () => {
    cart = [];
    updateCart();
  });

  searchInput.addEventListener("input", renderProducts);
  categoryFilter.addEventListener("change", renderProducts);

  renderProducts();
});
