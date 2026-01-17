// cart.js
import { auth, db } from './firebase.js';
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const cartItemsDiv = document.getElementById("cart-items");
const totalSpan = document.getElementById("total");
const placeOrderBtn = document.getElementById("place-order");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  cartItemsDiv.innerHTML = "";
  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    const div = document.createElement("div");
    div.innerHTML = `
      <p>${item.name} - ₹${item.price} 
        <button onclick="removeItem(${index})">Remove</button>
      </p>
    `;
    cartItemsDiv.appendChild(div);
  });
  totalSpan.innerText = total;
}

window.removeItem = function(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

renderCart();

// Place Order
placeOrderBtn.addEventListener("click", async () => {
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      alert("Please login to place order");
      return;
    }

    try {
      await addDoc(collection(db, "orders"), {
        userId: user.uid,
        items: cart,
        total: cart.reduce((sum, item) => sum + item.price, 0),
        createdAt: new Date()
      });
      alert("Order placed successfully!");
      localStorage.removeItem("cart");
      cart = [];
      renderCart();
    } catch(err) {
      alert(err.message);
    }
  });
});
