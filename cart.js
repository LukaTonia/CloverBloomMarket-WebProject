// --- PRODUCT DATA ---
const productsData = [
    { id: 1, title: "წითელი ღვინო", category: "სასმელი", price: 24.50, image: "https://placehold.co/400x400/235439/white?text=Wine" },
    { id: 2, title: "პური თონი", category: "პურ-ფუნთუშეული", price: 1.20, image: "https://placehold.co/400x400/c9a260/white?text=Bread" },
    { id: 3, title: "ყავა მარცვალი", category: "ჩაი, ყავა", price: 18.00, image: "https://placehold.co/400x400/333/white?text=Coffee" },
    { id: 4, title: "შოკოლადი", category: "ტკბილეული", price: 4.50, image: "https://placehold.co/400x400/555/white?text=Choco" },
    { id: 5, title: "ყველი იმერული", category: "რძის ნაწარმი", price: 14.00, image: "https://placehold.co/400x400/777/white?text=Cheese" },
    { id: 6, title: "ზეთი", category: "ბაკალეა", price: 8.50, image: "https://placehold.co/400x400/888/white?text=Oil" },
    { id: 7, title: "ორაგული", category: "ზღვის პროდუქტები", price: 35.00, image: "https://placehold.co/400x400/999/white?text=Fish" },
    { id: 8, title: "სარეცხი სითხე", category: "ჰიგიენა", price: 12.00, image: "https://placehold.co/400x400/000/white?text=Soap" }
];

let cart = JSON.parse(localStorage.getItem('cloverCart')) || [];

// --- 1. RENDER PRODUCTS ---
function renderProductGrid(filterCategory = 'all') {
    const grid = document.querySelector('.main-products-grid');
    if (!grid) return;

    grid.innerHTML = '';

    const filteredData = filterCategory === 'all' 
        ? productsData 
        : productsData.filter(p => p.category === filterCategory || (filterCategory === 'სასმელი' && p.category === 'ჩაი, ყავა'));

    filteredData.forEach(product => {
        grid.innerHTML += `
            <div class="simple-card" style="background-image: url('${product.image}');">
                <div class="card-overlay">
                    <h3 class="card-title">${product.title}</h3>
                    <div class="card-bottom-row">
                        <span class="card-price">${product.price.toFixed(2)} ₾</span>
                        <button class="add-cart-btn" onclick="addToCart(${product.id})">
                            <i class="fa-solid fa-cart-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
}

// --- 2. CART LOGIC ---
function addToCart(id) {
    const product = productsData.find(p => p.id === id);
    if (!product) return;

    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            quantity: 1
        });
    }
    updateCartUI();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function updateCartUI() {
    localStorage.setItem('cloverCart', JSON.stringify(cart));

    // Update Badge
    const countBadge = document.querySelector('.nav-cart-count');
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (countBadge) countBadge.innerText = totalCount;

    // Update Modal List
    const container = document.getElementById('cart-items-container');
    const totalElem = document.getElementById('cart-total');
    // Also update total inside Checkout Modal
    const finalTotalElem = document.getElementById('final-total');

    if (container && totalElem) {
        container.innerHTML = '';
        let totalPrice = 0;

        if (cart.length === 0) {
            container.innerHTML = '<p style="text-align:center; color:#ccc; padding:20px;">კალათა ცარიელია</p>';
        }

        cart.forEach((item, index) => {
            totalPrice += (item.price * item.quantity);
            container.innerHTML += `
                <div class="cart-item">
                    <div class="item-info">
                        <h4>${item.title}</h4>
                        <small>${item.price.toFixed(2)} ₾ x ${item.quantity}</small>
                    </div>
                    <div class="item-actions" style="display:flex; align-items:center; gap:10px;">
                        <span class="item-price">${(item.price * item.quantity).toFixed(2)} ₾</span>
                        <button class="remove-btn" onclick="removeFromCart(${index})">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        });
        
        const formattedTotal = totalPrice.toFixed(2) + " ₾";
        totalElem.innerText = formattedTotal;
        if(finalTotalElem) finalTotalElem.innerText = formattedTotal;
    }
}

// --- 3. CHECKOUT LOGIC (UPDATED) ---

// Step 1: Open the Checkout Modal
function processCheckout() {
    if (cart.length === 0) {
        alert("კალათა ცარიელია! დაამატეთ პროდუქტები.");
        return;
    }
    // Close Cart Modal
    document.getElementById('cartModal').style.display = 'none';
    // Open Address Modal
    document.getElementById('checkoutModal').style.display = 'block';
}

// Step 2: Handle Final Submit
function handleCheckoutSubmit(e) {
    e.preventDefault(); // Stop page reload

    const btn = e.target.querySelector('button[type="submit"]');
    const name = document.getElementById('custName').value;
    
    // Loading State
    const originalText = btn.innerText;
    btn.innerText = "მუშავდება...";
    btn.disabled = true;

    setTimeout(() => {
        // Success Action
        alert(`მადლობა ${name}! თქვენი შეკვეთა მიღებულია.\nკურიერი დაგიკავშირდებათ მითითებულ მისამართზე.`);
        
        // Clear Cart
        cart = [];
        updateCartUI();
        
        // Reset Form & Close Modal
        e.target.reset();
        document.getElementById('checkoutModal').style.display = 'none';
        
        // Reset Button
        btn.innerText = originalText;
        btn.disabled = false;
    }, 2000);
}

// --- 4. INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();
    renderProductGrid();

    // 1. Cart Modal Logic
    const cartModal = document.getElementById('cartModal');
    const openCartBtn = document.getElementById('open-cart-btn');
    const closeCartBtn = document.querySelector('.cart-close');

    if(openCartBtn) {
        openCartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            cartModal.style.display = 'block';
        });
    }
    if(closeCartBtn) {
        closeCartBtn.addEventListener('click', () => {
            cartModal.style.display = 'none';
        });
    }

    // 2. Checkout Modal Logic
    const checkoutModal = document.getElementById('checkoutModal');
    const closeCheckoutBtn = document.querySelector('.checkout-close');
    const checkoutForm = document.getElementById('checkoutForm');

    if(closeCheckoutBtn) {
        closeCheckoutBtn.addEventListener('click', () => {
            checkoutModal.style.display = 'none';
        });
    }

    if(checkoutForm) {
        checkoutForm.addEventListener('submit', handleCheckoutSubmit);
    }

    // 3. Close Modals on Outside Click
    window.addEventListener('click', (e) => {
        if(e.target == cartModal) cartModal.style.display = 'none';
        if(e.target == checkoutModal) checkoutModal.style.display = 'none';
    });
});