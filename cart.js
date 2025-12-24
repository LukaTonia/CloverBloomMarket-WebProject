
let cart = JSON.parse(localStorage.getItem('cloverCart')) || [];


function addToCart(title, price) {
    
    const existingItem = cart.find(item => item.title === title);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            title: title,
            price: price,
            quantity: 1
        });
    }

    updateCart();
    alert(title + " დაემატა კალათაში!");
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}


function updateCart() {
    
    localStorage.setItem('cloverCart', JSON.stringify(cart));

    const container = document.getElementById('cart-items-container');
    const totalElem = document.getElementById('cart-total');
    const countBadge = document.querySelector('.nav-cart-count');

    if (!container) return; 

    container.innerHTML = '';
    let totalPrice = 0;
    let totalCount = 0;

    cart.forEach((item, index) => {
        totalPrice += (item.price * item.quantity);
        totalCount += item.quantity;

        const itemHTML = `
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
        container.innerHTML += itemHTML;
    });

    if(totalElem) totalElem.innerText = totalPrice.toFixed(2) + " ₾";
    if(countBadge) countBadge.innerText = totalCount;
}


document.addEventListener('DOMContentLoaded', updateCart);