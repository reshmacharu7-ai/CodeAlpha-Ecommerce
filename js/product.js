const products = [
  { id: 1, name: 'Product 1', price: 100 },
  { id: 2, name: 'Product 2', price: 200 },
];

const container = document.getElementById('productsContainer');

products.forEach(product => {
  const div = document.createElement('div');
  div.innerHTML = `
    <h3>${product.name}</h3>
    <p>Price: ₹${product.price}</p>
    <button onclick="addToCart(${product.id})">Add to Cart</button>
  `;
  container.appendChild(div);
});

function addToCart(id) {
  const product = products.find(p => p.id === id);
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${product.name} added to cart!`);
}
