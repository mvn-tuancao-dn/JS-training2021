// render product

/* Tạo 1 function để random ra ID của sản phẩm */
function randomId() {
    return Math.floor(Math.random() * 100000);
}

/* Khai báo một mảng danh sách các sản phẩm cần render ra ngoài HTML */
export var products = [
    {
        id: randomId(),
        image:
            'img/product1.jpg',
        title: 'Dầu gội da dầu',
        priceSale: 17,
        priceOld: 19,
    },
    {
        id: randomId(),
        image:
            'img/product2.jpg',
        title: 'Dầu dưỡng tóc hoa trà',
        priceSale: 20,
        priceOld: 23,
    },
    {
        id: randomId(),
        image:
            'img/product3.jpg',
        title: 'Nước cân bằng da mụn',
        priceSale: 21,
        priceOld: 25,
    },
    {
        id: randomId(),
        image:
            'img/product4.jpg',
        title: 'Nước cân bằng lão hóa',
        priceSale: 18,
        priceOld: 20,
    },
];
/* Tạo 1 biến productList để trỏ tới thẻ ul có class là .product-list */
var productsList = document.getElementById('product-list');

/* Tạo 1 function để render data đã định nghĩa ở phía trên ra HTML */
function renderProductUI(arr) {
    productsList.innerHTML = '';
   
    for (let i = 0; i < arr.length; i++) {
        let p = arr[i];
        productsList.innerHTML += `
            <li class="product-item col-3">
                <a href="#"><img src="${p.image}" alt="${p.title}" class="image-product"></a>
                <div class="product-infor">
                    <h4 class="product-title">
                        ${p.title}
                    </h4>
                    <div class="product-raiting">
                        <i class="far fa-star" aria-hidden="true"></i>
                        <i class="far fa-star" aria-hidden="true"></i>
                        <i class="far fa-star" aria-hidden="true"></i>
                        <i class="far fa-star" aria-hidden="true"></i>
                        <i class="far fa-star" aria-hidden="true"></i>
                    </div>
                    <div class="product-price">
                        <span class="price-sale">$${p.priceSale}</span> -
                        <span class="price-old">$${p.priceOld}</span>
                    </div>
                </div>
                <button type="button" class="btn-cart">
                    Thêm Vào Giỏ Hàng
                    <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
                </button>
            </li>
        `;
    }
}

/* gọi đến hàm render data để tiến hành render dữ liệu ra HTML */
if(productsList) {
    window.onload = renderProductUI(products);
}

/* shopping cart */

/* Khai báo biến key localstorage để lưu tổng số lượng sản phẩm có trong giỏ hàng */
var LOCAL_KEY = 'cart';
var KEY_CART_NUMBER = 'cartNumbers';
var TOTAL_CART = 'totals';

/* add event click cho button btn-cart để xử lý phần thêm sp vao giỏ hàng */
var buttonCart = document.querySelectorAll('.btn-cart');
for(let i = 0; i < buttonCart.length ; i++) {
    buttonCart[i].addEventListener('click', () => {
        cartNumbers(products[i]);
    });
}

/* Hàm load số sản phẩm trong giỏ hàng ra thẻ span trên header */
export function onLoadCartNumber() {
    var productNumbers = localStorage.getItem(KEY_CART_NUMBER);
    if(productNumbers) {
        document.querySelector(".cart-count span").textContent = productNumbers;
    } else {
        document.querySelector(".cart-count span").textContent = 0;
    }
}

window.onload = onLoadCartNumber();
/* Hàm tính số sản phẩm có trong giỏ hàng */
function cartNumbers(product) {
    /* Get số lượng sản phẩm trong giỏ hàng dưới local lên */
    var productNumbers = localStorage.getItem(KEY_CART_NUMBER);
    productNumbers = parseInt(productNumbers);
    /* Nếu tồn tại giỏ hàng thì sẽ cộng vào số lượng đã có */
    if(productNumbers) {
        localStorage.setItem(KEY_CART_NUMBER, productNumbers + 1);
        document.querySelector(".cart-count span").textContent = productNumbers + 1;
    } 
    /* Hoặc Nếu chưa có số lượng sản phẩm trong giỏ hàng thì set KEY_CART_NUMBER = 1 */
    else {
        localStorage.setItem(KEY_CART_NUMBER, 1);
        document.querySelector(".cart-count span").textContent = 1;
    }
    /* gọi hàm set 1 item vào giỏ hàng */
    setItemInCart(product);
}

/*  hàm set sản phẩm cộng với quantity   */
function setItemProduct (product, quantity){
    var itemCart = {
        id: product.id,
        image:product.image,
        title: product.title,
        priceSale: product.priceSale,
        priceOld: product.priceOld,
        quantity : quantity
    };
    return itemCart;
}

/* Hàm thêm 1 item vào giỏ hàng */
export function setItemInCart(product) {
    /* get itemCart từ localstorage lên */
    var itemCart = JSON.parse(localStorage.getItem(LOCAL_KEY));
    var total = JSON.parse(localStorage.getItem(TOTAL_CART));
    /* Nếu itemCart == null thì sẽ set 1 item mới vào itemCart với quantity = 1 */
    if(itemCart == null ){
     itemCart = [setItemProduct(product, 1)];
    }
    /*  - Hoặc ngược lại, nếu tồn tại itemCart rồi, thì duyệt qua từng item
        - Kiểm tra xem id của itemCart có bằng id của product add vào hay k
        - Nếu bằng nhau thì tăng quantity lên 1 và thoát khỏi vòng lặp
    */
    else { 
    /* Khai báo 1 biến flag để xác định product đã tồn tại trong itemCart hay chưa */
       let flag = false;
       for(let i = 0; i < itemCart.length; i++){
           if(itemCart[i].id == product.id){
               itemCart[i].quantity = itemCart[i].quantity + 1;
               flag = true;
               break;
           }
       }
    /* Hoặc nếu product không tồn tại trong itemCart (flag = false) thì sẽ push thêm product đó vào itemCart */
        if(!flag){
            itemCart.push(setItemProduct(product, 1));
        }
    }
    /* Set LOCAL_KEY xuống localstorage */
    localStorage.setItem(LOCAL_KEY, JSON.stringify(itemCart));
}


