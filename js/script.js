// VARS & CONSTANTS
const star = '&#x2B50';
const saleSeasonContainer = document.querySelector("#season-box");

// FUNCTION TO SORT PRICE FROM LOW TO HIGH
function sortPriceLowToHigh(a,b){
    if(a.price > b.price) {
        return 1;
    }else if(a.price < b.price) {
        return -1;
    }
    return 0;
}
// FUNCTION TO SORT PRICE FROM HIGH TO LOW
function sortPriceHighToLow(a,b){
    if(a.price > b.price) {
        return -1;
    }else if(a.price < b.price) {
        return 1;
    }
    return 0;
}

// FUNCTION TO SORT RATINGS FROM LOW TO HIGH
function sortRatingLowToHigh(a,b){
    if(a.rating > b.rating) {
        return 1;
    }else if(a.rating < b.rating) {
        return -1;
    }
    return 0;
}
// FUNCTION TO SORT RATINGS FROM HIGH TO LOW
function sortRatingHighToLow(a,b){
    if(a.rating > b.rating) {
        return -1;
    }else if(a.rating < b.rating) {
        return 1;
    }
    return 0;
}

// CHECKS THE SEARCH PARAMETERS AND APPROPRIATELY DEALS WITH THEM
(function() {
    let urlParams = new URLSearchParams(window.location.search);
    //FILTER SEACH RESULTS
    if(urlParams.has('searchTerm')) {
        let searchString = urlParams.get('searchTerm').toLowerCase();
        products = products.filter(function (product) {
            return product.title.toLowerCase().indexOf(searchString) > -1;
        })
    } 
    //SORTING
    else if (urlParams.has('sort')) {
        if(urlParams.get('sort') == "price-low-to-high") {
            products.sort(sortPriceLowToHigh);
        }else if (urlParams.get('sort') == "price-high-to-low") {
            products.sort(sortPriceHighToLow);
        }else if (urlParams.get('sort') == "rating-low-to-high") {
            products.sort(sortRatingLowToHigh);
        } else if(urlParams.get('sort') == "rating-high-to-low") {
            products.sort(sortRatingHighToLow);
        }
    } 
    // FILTER BY COLOR
    else if (urlParams.has('color')) {
        let searchString = urlParams.get('color');
        products = products.filter(function (product) {
            return product.color.indexOf(searchString) > -1;
        })
    } 
    // FILTER BY PRICE
    else if (urlParams.has('price')) {
        let searchString = urlParams.get('price').split("-");
        console.log(searchString[0], searchString[1]);
        products = products.filter(function (product) {
            return product.price >= searchString[0] && product.price <= searchString[1];
        })
    } 
    // FILTER BY RATING
    else if (urlParams.has('rating')) {
        let searchString = urlParams.get('rating');
        products = products.filter(function (product) {
            return product.rating == searchString;
        })
    }
    // IF AN ITEM TITLE IS CLICKED AN ID IS PASSED TO THE URLPARAMS AND USED TO OUTPUT OBJECT INFO
    else if(urlParams.has('id')){
        var chosenItemContainer = document.querySelector("#chosen-item");
        var productIndex = urlParams.get('id');
        chosenItemContainer.innerHTML += `<div class="row">
                                            <div class="col-sm-1">
                                                <div class="row small-picture small-picture-top"><img class="interior-picture-small" src="${products[productIndex].picture}"></img></div>
                                                <div class="row small-picture"><img class="interior-picture-small" src="${products[productIndex].picture}"></img></div>
                                                <div class="row small-picture"><img class="interior-picture-small" src="${products[productIndex].picture}"></img></div>
                                                <div class="row small-picture"><img class="interior-picture-small" src="${products[productIndex].picture}"></img></div>
                                            </div>
                                            <!-- SELECTED PICTURE -->
                                            <div class="col-sm-5">
                                                <div class="big-picture"><img class="interior-picture" src="${products[productIndex].picture}"></img></div>
                                            </div>
                                            <!-- CARD W/ ITEM INFO & UTILITIES -->
                                            <div class="col-sm-6">
                                                <div class="info-card">
                                                    <div class="card-body">
                                                    <h5 class="info-card-title">${products[productIndex].title}</h5>
                                                    <h6 class="info-card-subtitle mb-2 text-muted" id="priceInput">$${products[productIndex].price}.00<br></h6>
                                                    <p class="review-button id="priceButton">${star.repeat(products[productIndex].rating)} |</p>  
                                                    <a href="#" class="btn review-button">REVIEWS</a><br><br>                
                                                    <div class="form-group">
                                                        <label for="exampleFormControlSelect1">QUANTITY</label>
                                                        <select class="form-control quantity-selector" id="formSelect">
                                                        <option>1</option>
                                                        <option>2</option>
                                                        <option>3</option>
                                                        <option>4</option>
                                                        <option>5</option>
                                                        </select>
                                                    </div>
                                                    <br>
                                                    <a href="#" class="btn btn-outline-dark" id="add-to-cart">ADD TO CART</a>
                                                    <br><br><br><br>
                                                    <hr>
                                                    <h5 class="info-card-title">DETAILS</h5>
                                                    <hr>
                                                    <p class="info-card-text">- Color : ${products[productIndex].color} <br>- Quantity : ${products[productIndex].quantity} <br>- Scent : ${products[productIndex].scent}
                                                        <br>- Wick Type : ${products[productIndex].wickType}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>`
    }
})()

// UPDATES THE ITEM PRICE WHEN THE QUANTITY SELECTOR CHANGES 
if(document.URL.includes("/item.html")) {
    document.querySelector("#formSelect").addEventListener("change", function() {
        let urlParams = new URLSearchParams(window.location.search);
        var productIndex = urlParams.get('id'); 
        var value = document.querySelector("#formSelect");
        var getText = value.options[value.selectedIndex].text;
        priceInput.innerHTML = "$" + (products[productIndex].price * getText) + ".00";
    })
}

// FILLS RECOMMENDED BOXES WITH ITEM INFO
if(document.URL.includes("/index.html" || "/item.html" )) {
    const itemContainer = document.querySelector("#recommendedContainer");
    itemContainer.innerHTML =  
        `<div class="row text-center">
            <div class="col-sm recommended-box d-flex flex-column">
                <button type="button" class="btn add-to-cart" id="add-to-cart">ADD TO CART</button>
                <div class="recommended-box-info">
                <a class="recommended-box-text" href="../item.html?id=${products[0].id}">${products[0].title}</a>
                <p class="recommended-box-text">$${products[0].price}.00<br>${star.repeat(products[0].rating)}</p>  
                </div>
                <div class="container-fluid d-flex flex-column">
                    <img src="${products[0].picture}" class="recommended-box-picture"></img>
                </div>
            </div>
            <div class="col-sm recommended-box d-flex flex-column">
                <button type="button" class="btn add-to-cart" id="add-to-cart">ADD TO CART</button>
                <div class="recommended-box-info">
                <a class="recommended-box-text" href="../item.html?id=${products[1].id}">${products[1].title}</a>
                <p class="recommended-box-text">$${products[1].price}.00<br>${star.repeat(products[1].rating)}</p>  
                </div>
                <div class="container-fluid d-flex flex-column">
                    <img src="${products[1].picture}" class="recommended-box-picture"></img>
                </div>
            </div>
            <div class="col-sm recommended-box d-flex flex-column">
                <button type="button" class="btn add-to-cart" id="add-to-cart">ADD TO CART</button>
                <div class="recommended-box-info">
                <a class="recommended-box-text" href="../item.html?id=${products[2].id}">${products[2].title}</a>
                <p class="recommended-box-text">$${products[2].price}.00<br>${star.repeat(products[2].rating)}</p>  
                </div>
                <div class="container-fluid d-flex flex-column">
                    <img src="${products[2].picture}" class="recommended-box-picture"></img>
                </div>
            </div>
        </div>`
}

products.forEach(function(item){
    // FILLS SEASON PAGE
    if(document.URL.includes("/fall.html")){
        if(item.season == "fall") {
            saleSeasonContainer.innerHTML += `<div class="col-sm recommended-box d-flex flex-column">
                                            <button type="button" class="btn add-to-cart" id="add-to-cart">ADD TO CART</button>
                                            <div class="recommended-box-info">
                                                <a class="recommended-box-text" href="../item.html?id=${item.id}">${item.title}</a>
                                                <p class="recommended-box-text">$${item.price}.00<br>${star.repeat(item.rating)}</p>  
                                            </div>
                                            <div class="container-fluid d-flex flex-column">
                                                <img src="${item.picture}" class="recommended-box-picture"></img>
                                            </div>
                                        </div>`
        }
    }
    // FILLS WINTER PAGE
    else if(document.URL.includes("/winter.html")) {
        if(item.season == "winter") {
            saleSeasonContainer.innerHTML += `<div class="col-sm recommended-box d-flex flex-column">
                                            <button type="button" class="btn add-to-cart" id="add-to-cart">ADD TO CART</button>
                                            <div class="recommended-box-info">
                                                <a class="recommended-box-text" href="../item.html?id=${item.id}">${item.title}</a>
                                                <p class="recommended-box-text">$${item.price}.00<br>${star.repeat(item.rating)}</p>  
                                            </div>
                                            <div class="container-fluid d-flex flex-column">
                                                <img src="${item.picture}" class="recommended-box-picture"></img>
                                            </div>
                                        </div>`
        }
    }
    // FILLS SPRING PAGE
    else if(document.URL.includes("/spring.html")) {
        if(item.season == "spring") {
            saleSeasonContainer.innerHTML += `<div class="col-sm recommended-box d-flex flex-column">
                                            <button type="button" class="btn add-to-cart" id="add-to-cart">ADD TO CART</button>
                                            <div class="recommended-box-info">
                                                <a class="recommended-box-text" href="../item.html?id=${item.id}">${item.title}</a>
                                                <p class="recommended-box-text">$${item.price}.00<br>${star.repeat(item.rating)}</p>  
                                            </div>
                                            <div class="container-fluid d-flex flex-column">
                                                <img src="${item.picture}" class="recommended-box-picture"></img>
                                            </div>
                                        </div>`
        }
    }
    // FILLS SUMMER PAGE
    else if(document.URL.includes("/summer.html")) {
        if(item.season == "summer") {
            saleSeasonContainer.innerHTML += `<div class="col-sm recommended-box d-flex flex-column">
                                            <button type="button" class="btn add-to-cart" id="add-to-cart">ADD TO CART</button>
                                            <div class="recommended-box-info">
                                                <a class="recommended-box-text" href="../item.html?id=${item.id}">${item.title}</a>
                                                <p class="recommended-box-text">$${item.price}.00<br>${star.repeat(item.rating)}</p>  
                                            </div>
                                            <div class="container-fluid d-flex flex-column">
                                                <img src="${item.picture}" class="recommended-box-picture"></img>
                                            </div>
                                        </div>`
        }
    }
    // FILLS SALES PAGE
    else if(document.URL.includes("/sales.html")) {
        if(item.sale == true) {
            saleSeasonContainer.innerHTML += `<div class="col-sm recommended-box d-flex flex-column">
                                            <button type="button" class="btn add-to-cart" id="add-to-cart">ADD TO CART</button>
                                            <div class="recommended-box-info">
                                                <a class="recommended-box-text" href="../item.html?id=${item.id}">${item.title}</a>
                                                <p class="recommended-box-text">$${item.price}.00<br>${star.repeat(item.rating)}</p>  
                                            </div>
                                            <div class="container-fluid d-flex flex-column">
                                                <img src="${item.picture}" class="recommended-box-picture"></img>
                                            </div>
                                        </div>`
        }
    }
    // FILLS CART PAGE
    else if(document.URL.includes("/cart.html")){
        if(item.cart == true) {
            const cartContainer = document.querySelector("#cart-container");
            cartContainer.innerHTML  +=      `<hr>
                                    <div class="flex-row cart-container d-flex">
                                        <img class="cart-picture" src="${item.picture}">
                                        <p class="d-block cart-text"><a class="recommended-box-text cart-link" href="../item.html?id=${item.id}"><b>${item.title}</b></a><br>$${item.price}.00<br><br><br>______<br>Wick Type: ${item.wickType}<br>Color: ${item.color}<br>Scent: ${item.scent}</p>
                                        <label for="formSelect" class="cart-text quantity-text">QUANTITY</label>
                                        <div class="form-group">
                                            <select class="form-control" id="formSelect">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                            </select>
                                        </div>
                                    </div>
                                    <hr>`
        }
    }
})

// POPULATES THE SEARCH PAGE WITH ALL ITEMS IN THE ARRAY AT THE TIME
products.forEach(function(item) {
    const itemsContainer = document.querySelector("#items-list");
    const itemRating = star.repeat(item.rating);
    const itemTemplate =    `<div class="col-md-2 col-sm-5 col-12 search-result-item top d-flex flex-column">
                                <button type="button" class="btn add-to-cart" id="add-to-cart">ADD TO CART</button>
                                <div class="recommended-box-info">
                                    <a href="../item.html?id=${item.id}" class="item-title">${item.title}</a>
                                    <p class="recommended-box-text">$${item.price}.00<br>${itemRating}</p>  
                                </div>
                                <div class="container-fluid">
                                        <img class="recommended-box-picture" src="${item.picture}"> </img>
                                </div>
                            </div>`
    itemsContainer.innerHTML += itemTemplate;
})

/* 
PICTURE SOURCES :

    UNSPLASH:  https://unsplash.com/
    PIXABAY: https://pixabay.com/
    PEXELS: https://www.pexels.com/

HELP SOURCES : 

    W3SCHOOLS: https://www.w3schools.com/
    BOOTSTRAP DOCS: https://getbootstrap.com/docs/5.0/getting-started/introduction/

*/
