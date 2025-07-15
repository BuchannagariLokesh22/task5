document.addEventListener("DOMContentLoaded", () => {
  const products = [
    {
      name: "Wireless Headphones",
      desc: "High-quality sound with noise cancellation.",
      image: "https://images.unsplash.com/photo-1585386959984-a415522316c6?auto=format&fit=crop&w=600&q=80",
      category: "Electronics",
      rating: 4
    },
    {
      name: "Smartwatch",
      desc: "Track your fitness and health.",
      image: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=600&q=80",
      category: "Wearables",
      rating: 5
    },
    {
      name: "DSLR Camera",
      desc: "Capture high-quality professional images.",
      image: "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=600&q=80",
      category: "Photography",
      rating: 5
    },
    {
      name: "Gaming Mouse",
      desc: "High-precision mouse for serious gamers.",
      image: "https://images.unsplash.com/photo-1613897745311-f5d20623dc8c?auto=format&fit=crop&w=600&q=80",
      category: "Accessories",
      rating: 4
    },
    {
      name: "VR Headset",
      desc: "Immerse yourself in the virtual world.",
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
  const toggleCartBtn = document.getElementById("toggle-cart");
  const cartPanel = document.getElementById("cart-panel");
  const clearCartBtn = document.getElementById("clear-cart");

  let cart = [];

  function renderProducts() {
    const search = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    productList.innerHTML = "";

    products
      .filter(product =>
        product.name.toLowerCase().includes(search) &&
        (category === "All" || product.category === category)
      )
      .forEach(product => {
        const stars = "★".repeat(product.rating) + "☆".repeat(5 - product.rating);
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
          <img src="${product.image}" alt="${product.name}" loading="lazy" />
          <div class="product-details">
            <h3>${product.name}</h3>
            <p>${product.desc}</p>
            <div class="rating">${stars}</div>
            <button class="add-btn">Add to Cart</button>
          </div>
        `;
        card.querySelector(".add-btn").addEventListener("click", () => {
          cart.push(product.name);
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
