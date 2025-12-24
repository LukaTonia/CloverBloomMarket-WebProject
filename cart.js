
const productsData = [
    { id: 1, title: "წითელი ღვინო", category: "სასმელი", price: 24.50, icon: "fa-wine-bottle" },
    { id: 2, title: "პური თონი", category: "პურ-ფუნთუშეული", price: 1.20, icon: "fa-bread-slice" },
    { id: 3, title: "ყავა მარცვალი", category: "ჩაი, ყავა", price: 18.00, icon: "fa-mug-hot" },
    { id: 4, title: "შოკოლადი", category: "ტკბილეული", price: 4.50, icon: "fa-cookie-bite" },
    { id: 5, title: "ყველი იმერული", category: "რძის ნაწარმი", price: 14.00, icon: "fa-cheese" },
    { id: 6, title: "ზეთი", category: "ბაკალეა", price: 8.50, icon: "fa-bottle-droplet" },
    { id: 7, title: "ორაგული", category: "ზღვის პროდუქტები", price: 35.00, icon: "fa-fish" },
    { id: 8, title: "სარეცხი სითხე", category: "ჰიგიენა", price: 12.00, icon: "fa-pump-soap" }
];


let cart = JSON.parse(localStorage.getItem('cloverCart')) || [];


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
    
    alert(`${product.title} დაემატა კალათაში!`);
}


function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}


function updateCartUI() {
  
    localStorage.setItem('cloverCart', JSON.stringify(cart));

   
    const countBadge = document.querySelector('.nav-cart-count');
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (countBadge) countBadge.innerText = totalCount;

   
    const container = document.getElementById('cart-items-container');
    const totalElem = document.getElementById('cart-total');

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
                    <div class="item-actions">
                        <span class="item-price">${(item.price * item.quantity).toFixed(2)} ₾</span>
                        <button class="remove-btn" onclick="removeFromCart(${index})">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        });
        totalElem.innerText = totalPrice.toFixed(2) + " ₾";
    }
}


function renderProductGrid() {
    const grid = document.querySelector('.main-products-grid');
    if (!grid) return; 

    grid.innerHTML = '';
    productsData.forEach(product => {
        grid.innerHTML += `
            <div class="store-card">
                <div class="card-image"><i class="fa-solid ${product.icon}"></i></div>
                <div class="card-details">
                    <h3>${product.title}</h3>
                    <p class="category">${product.category}</p>
                    <div class="price-row">
                        <span class="price">${product.price.toFixed(2)} ₾</span>
                        <button class="add-btn" onclick="addToCart(${product.id})">
                            <i class="fa-solid fa-cart-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
}


function processCheckout() {
    if (cart.length === 0) {
        alert("კალათა ცარიელია!");
        return;
    }
    const btn = document.querySelector('.checkout-btn');
    if(btn) {
        btn.innerText = "მუშავდება...";
        btn.disabled = true;
        setTimeout(() => {
            alert("შეკვეთა გაფორმებულია!");
            cart = [];
            updateCartUI();
            document.getElementById('cartModal').style.display = 'none';
            btn.innerText = "შეკვეთის გაფორმება";
            btn.disabled = false;
        }, 1500);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();
    renderProductGrid();
});