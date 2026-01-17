// app.js
import { auth, db } from './firebase.js';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// DOM elements
const loginBtn = document.getElementById("login-btn");
const signupBtn = document.getElementById("signup-btn");
const logoutBtn = document.getElementById("logout-btn");
const authModal = document.getElementById("auth-modal");
const authTitle = document.getElementById("auth-title");
const authSubmit = document.getElementById("auth-submit");
const authClose = document.getElementById("auth-close");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const cartCount = document.getElementById("cart-count");

// Login / Signup
authSubmit.addEventListener("click", async () => {
  const email = emailInput.value;
  const password = passwordInput.value;
  try {
    if(authTitle.innerText === "Login") {
      await signInWithEmailAndPassword(auth, email, password);
    } else {
      await createUserWithEmailAndPassword(auth, email, password);
    }
    authModal.classList.add("hidden");
  } catch(err) {
    alert(err.message);
  }
});

// Open / Close modal
loginBtn.addEventListener("click", () => { authTitle.innerText = "Login"; authModal.classList.remove("hidden"); });
signupBtn.addEventListener("click", () => { authTitle.innerText = "Signup"; authModal.classList.remove("hidden"); });
authClose.addEventListener("click", () => authModal.classList.add("hidden"));

// Logout
logoutBtn.addEventListener("click", async () => { await signOut(auth); });

// Update UI on auth change
onAuthStateChanged(auth, (user) => {
  if(user) {
    loginBtn.style.display = "none";
    signupBtn.style.display = "none";
    logoutBtn.style.display = "inline-block";
  } else {
    loginBtn.style.display = "inline-block";
    signupBtn.style.display = "inline-block";
    logoutBtn.style.display = "none";
  }
});

// Load products from Firestore
const productsContainer = document.getElementById("products");

async function loadProducts() {
  const productsSnapshot = await getDocs(collection(db, "products"));
  productsSnapshot.forEach(doc => {
    const product = doc.data();
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <img src="${product.image}" width="150">
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <button onclick="addToCart('${doc.id}', '${product.name}', ${product.price})">Add to Cart</button>
    `;
    productsContainer.appendChild(card);
  });
}

loadProducts();

// Cart logic
window.addToCart = function(id, name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({id, name, price});
  localStorage.setItem("cart", JSON.stringify(cart));
  cartCount.innerText = cart.length;
};
