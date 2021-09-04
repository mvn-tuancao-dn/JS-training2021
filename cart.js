import {products, onLoadCartNumber, setItemInCart } from './product.js';

var LOCAL_KEY = 'cart';
var KEY_CART_NUMBER = 'cartNumbers';

function getLocalCart() {
    return JSON.parse(localStorage.getItem(LOCAL_KEY));
}

function setLocalCart(itemCart) {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(itemCart));
}

var cartList = document.getElementById('list-cart');

function renderCartUI() {
    cartList.innerHTML = '';
    let itemCart = getLocalCart();
    if (itemCart == null || itemCart.length == 0) {
        cartList.innerHTML += `
            <div class="cart-empty">
                <p class="no-cart">No Items Found In Cart !</p>
                <a href="product.html" class="shop-now">Shop Now</a>
            </div>
            `;
        return;
    }
    cartList.innerHTML = `
        <div class="cart-row">
            <span class="cart-item cart-header cart-column">Product</span>
            <span class="cart-price cart-header cart-column">Price</span>
            <span class="cart-quantity cart-header cart-column">Quantity</span>
            <span class="cart-quantity cart-header cart-column">SubTotal</span>
            <span class="cart-header cart-column"></span>
        </div>
    `;
    for(let i = 0; i < itemCart.length; i++) {
        let c = itemCart[i];
        cartList.innerHTML += `
              
                <div class="cart-row">
                    <div class="cart-item cart-column">
                        <img class="cart-item-image" src="${c.image}" width="100" height="100">
                        <span class="cart-item-title">${c.title}</span>
                    </div>
                    <span class="cart-price cart-column">$${c.priceSale},00</span>
                    <div class="cart-quantity cart-column">
                        <input class="cart-quantity-input" type="number" value="${c.quantity}">
                    </div>
                    <div class="cart-quantity cart-column">
                        <span class="">$${c.priceSale * c.quantity },00</span>
                    </div>
                    <div class="cart-column">
                        <button class="btn-remove-cart">
                            <i class="fa fa-times" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
        `;
    }
}
window.onload = renderCartUI();


var buttonRemoveCart = document.getElementsByClassName('btn-remove-cart');
var itemCart = getLocalCart();
for(let i = 0; i < buttonRemoveCart.length ; i++) {
    var buttons = buttonRemoveCart[i];
    buttons.addEventListener('click', function(event) {
        var buttonse = event.target;
        buttonse.parentElement.parentElement.parentElement.remove();
        removeItemCart(itemCart[i]);
    });
}

function removeItemCart(product) {
    var productNumbers = localStorage.getItem(KEY_CART_NUMBER);
    var getlocal = getLocalCart();
    for( let i = 0; i < getlocal.length ; i++ ) {
        if(getlocal[i].id == product.id) {       
            productNumbers = productNumbers - getlocal[i].quantity;
            getlocal.splice(i, 1);
            break;
        }
    }
    
    localStorage.setItem(KEY_CART_NUMBER, productNumbers);
    document.querySelector(".cart-count span").textContent = productNumbers;
    if(productNumbers == 0){
        localStorage.removeItem(LOCAL_KEY);
        renderCartUI();
    }else{
        setLocalCart(getlocal);
    }
}