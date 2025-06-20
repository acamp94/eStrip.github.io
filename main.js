const products = [
    { id: 1, name: 'MacBook Pro', description: 'High performance laptop', price: 899.99, image: 'macbookpro.png' },
    { id: 2, name: 'Xbox One', description: 'Gaming console', price: 199.99, image: 'xboxone.png' },
    { id: 3, name: 'Computer Monitor', description: '24\" HD monitor', price: 129.99, image: 'monitor.png' },
    { id: 4, name: 'Gaming Mouse', description: 'Ergonomic mouse', price: 95.99, image: 'mouse.png' },
    { id: 5, name: 'Bluetooth Speaker', description: 'Portable speaker', price: 89.99, image: 'bluetooth.png' },
    { id: 6, name: 'Wireless Charger', description: 'iPhone compatible', price: 59.99, image: 'charger.png' },
    { id: 7, name: 'ElfBar', description: 'Disposable vape', price: 19.99, image: 'elfbar.png' },
    { id: 8, name: 'Xbox Controller', description: 'Wireless controller', price: 49.99, image: 'xbox_controller.png' },
    { id: 9, name: 'Subwoofer', description: 'Powerful sound', price: 129.99, image: 'subwoofer.png' }
];

function getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
    const countEl = document.getElementById('cart-count');
    if (!countEl) return;
    const cart = getCart();
    const total = cart.reduce((sum, item) => sum + item.qty, 0);
    countEl.textContent = total;
}

function addToCart(id) {
    const cart = getCart();
    const existing = cart.find(i => i.id === id);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ id, qty: 1 });
    }
    saveCart(cart);
    updateCartCount();
}

function changeQty(id, delta) {
    const cart = getCart();
    const item = cart.find(i => i.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
        return removeFromCart(id);
    }
    saveCart(cart);
    renderCart();
    updateCartCount();
}

function removeFromCart(id) {
    let cart = getCart();
    cart = cart.filter(i => i.id !== id);
    saveCart(cart);
    renderCart();
    updateCartCount();
}

function renderProducts() {
    const container = document.getElementById('product-list');
    if (!container) return;
    products.forEach(p => {
        const div = document.createElement('div');
        div.className = 'product';
        div.innerHTML = `
            <img src="${p.image}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>${p.description}</p>
            <p>$${p.price.toFixed(2)}</p>
            <button data-id="${p.id}">Add to Cart</button>
        `;
        div.querySelector('button').addEventListener('click', () => addToCart(p.id));
        container.appendChild(div);
    });
}

function renderCart() {
    const container = document.getElementById('cart-items');
    if (!container) return;
    const totalEl = document.getElementById('cart-total');
    container.innerHTML = '';
    const cart = getCart();
    let total = 0;
    if (cart.length === 0) {
        container.innerHTML = '<p>Your cart is empty.</p>';
        totalEl.textContent = '';
        return;
    }
    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (!product) return;
        total += product.price * item.qty;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <span class="item-name">${product.name}</span>
            <div class="qty-controls">
                <button class="decrement" data-id="${item.id}">-</button>
                <span class="item-qty">${item.qty}</span>
                <button class="increment" data-id="${item.id}">+</button>
            </div>
            <span class="item-price">$${(product.price * item.qty).toFixed(2)}</span>
            <button class="remove-item" data-id="${item.id}">Remove</button>
        `;
        container.appendChild(div);
        div.querySelector('.increment').addEventListener('click', () => changeQty(item.id, 1));
        div.querySelector('.decrement').addEventListener('click', () => changeQty(item.id, -1));
        div.querySelector('.remove-item').addEventListener('click', () => removeFromCart(item.id));
    });
    totalEl.textContent = `Total: $${total.toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    renderCart();
    updateCartCount();
});
