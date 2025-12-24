// --- PRODUCT DATA ---
const productsData = [
    { id: 1, title: "წითელი ღვინო", category: "სასმელი", price: 24.50, image: "media/products/redWine.png" },
    { id: 2, title: "თონის პური", category: "პურ-ფუნთუშეული", price: 1.20, image: "media/products/puriToni.webp" },
    { id: 3, title: "ყავა", category: "ჩაი, ყავა", price: 70.00, image: "media/products/coffee.webp" },
    { id: 4, title: "შოკოლადი", category: "ტკბილეული", price: 7.5, image: "media/products/milka.webp" },
    { id: 5, title: "რძე", category: "რძის ნაწარმი", price: 6.00, image: "media/products/milk.webp" },
    { id: 6, title: "მზესუმზირის ზეთი", category: "ბაკალეა", price: 8.50, image: "media/products/oil.jpg" },
    { id: 7, title: "ზეითუნის ზეთი", category: "ბაკალეა", price: 16.50, image: "media/products/olive-oil.jpg" },
    { id: 8, title: "ორაგული", category: "ზღვის პროდუქტები", price: 70, image: "media/products/salmon.webp" },
  { id: 9, title: "ჩაი", category: "ჩაი, ყავა", price: 4.99, image: "media/products/greenfield.jpg" },
  { id: 10, title: "ჩიფსი", category: "სნექი", price: 6, image: "media/products/chips.webp" },
  { id: 11, title: "თევზის კონსერვი", category: "კონსერვი", price: 8, image: "media/products/kilka.webp" },
  { id: 12, title: "ფინური სერველატი", category: "ძეხვეული", price: 21.20, image: "media/products/finn.jpg" },
  { id: 13, title: "საქონლის ხორცი", category: "ხორცი", price: 25, image: "media/products/beef.jpg" },
  { id: 14, title: "სველი სალფეთქი", category: "ჰიგიენა", price: 2.5, image: "media/products/wet-wipes.webp" },
  { id: 15, title: "ფელიქსი", category: "ცხოველთა კვება", price: 1.99, image: "media/products/felix.jpg" },
    { id: 16, title: "ვარდების თაიგული", category: "ყვავილები", price: 700, image: "media/products/rose.png" },
];

let cart = JSON.parse(localStorage.getItem('cloverCart')) || [];

//RENDER PRODUCTS ---
function renderProductGrid(filterCategory = 'all') {
    const grid = document.querySelector('.main-products-grid');
    if (!grid) return;

    grid.innerHTML = '';

    // Filter Logic:
    
    const filteredData = filterCategory === 'all' 
        ? productsData 
        : productsData.filter(p => {
           
          return p.category.includes(filterCategory);
        });

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

// CART LOGIC 
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

    
    const countBadge = document.querySelector('.nav-cart-count');
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (countBadge) countBadge.innerText = totalCount;

    
    const container = document.getElementById('cart-items-container');
    const totalElem = document.getElementById('cart-total');
    
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

//  FILTERING BUTTON LOGIC 
function filterProducts(category) {
    
    const buttons = document.querySelectorAll('.cat-btn');
    
    
    buttons.forEach(btn => {
        
        const btnText = btn.innerText.trim();
        
        if(btnText === category || (category === 'all' && btnText === 'ყველა')) {
            btn.classList.add('active'); 
        } else {
            btn.classList.remove('active'); 
        }
    });

    
    renderProductGrid(category);
}

//CHECKOUT LOGIC
function processCheckout() {
    if (cart.length === 0) {
        alert("კალათა ცარიელია! დაამატეთ პროდუქტები.");
        return;
    }
    
    document.getElementById('cartModal').style.display = 'none';
    
    document.getElementById('checkoutModal').style.display = 'block';
}

//  Final Submit
function handleCheckoutSubmit(e) {
    e.preventDefault(); 

    const btn = e.target.querySelector('button[type="submit"]');
    const name = document.getElementById('custName').value;
    
   
    const originalText = btn.innerText;
    btn.innerText = "მუშავდება...";
    btn.disabled = true;

    setTimeout(() => {
        
        alert(`მადლობა ${name}! თქვენი შეკვეთა მიღებულია.\nკურიერი მალე მოიტანს შეკვეთას.`);
        
        
        cart = [];
        updateCartUI();
        
        
        e.target.reset();
        document.getElementById('checkoutModal').style.display = 'none';
        
        
        btn.innerText = originalText;
        btn.disabled = false;
    }, 2000);
}

// INITIALIZATION 
document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();
    renderProductGrid();

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
//checkout logic
 
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

 //close modal on outside click
    window.addEventListener('click', (e) => {
        if(e.target == cartModal) cartModal.style.display = 'none';
        if(e.target == checkoutModal) checkoutModal.style.display = 'none';
    });
});