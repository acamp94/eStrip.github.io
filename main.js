window.onload = function() {
    // Example product data
    var products = [
        { id: 1, name: 'MacBook Pro', description: 'This is product 1', price: '$899.99', image: 'macbookpro.png' },
        { id: 2, name: 'Xbox One', description: 'This is product 2', price: '$199.99', image: 'xboxone.png' },
        { id: 3, name: 'Computer Monitor', description: 'This is product 3', price: '$129.99', image: 'monitor.png' },
        { id: 4, name: 'Gaming Mouse', description: 'This is product 4', price: '$95.99', image: 'mouse.png' },
        { id: 5, name: 'Bluetooth Speaker', description: 'This is product 5', price: '$89.99', image: 'bluetooth.png' },
        { id: 6, name: 'Wireless iPhone Charger', description: 'This is product 6', price: '$59.99', image: 'charger.png' },
        { id: 7, name: 'ElfBar', description: 'This is product 6', price: '$19.99', image: 'elfbar.png' },
        { id: 8, name: 'Xbox Controller', description: 'This is product 6', price: '$49.99', image: 'xbox_controller.png' },
        { id: 9, name: 'Subwoofer', description: 'This is product 6', price: '$129.99', image: 'subwoofer.png' }
    ];

    // Get the products element
    var productsEl = document.getElementById('products');

    // Populate products
for (var i = 0; i < products.length; i++) {
    var productEl = document.createElement('div');
    productEl.classList.add("product"); // add a class to the product div for CSS styling
    productEl.innerHTML =
        '<div class="product-content">' +
          '<h2>' + products[i].name + '</h2>' +
          '<p>' + products[i].description + '</p>' +
          '<div class="product-image-wrapper">' +
            '<img src="' + products[i].image + '" class="product-image" alt="' + products[i].name + ' image">' +
          '</div>' +
          '<p>Price: ' + products[i].price + '</p>' +
          '<button onclick="addToCart(event, ' + products[i].id + ')">Add to Cart</button>' +
        '</div>';
    productsEl.appendChild(productEl);
}



    // Get the height of the navigation bar
    var navHeight = document.querySelector('nav').offsetHeight;



    // Set the top margin or padding of the sidebar to the height of the navigation bar
    sidebar.style.marginTop = navHeight + 'px';
};

function addToCart(event, productId) {
    event.stopPropagation();
    alert('Added product ' + productId + ' to cart!');
}

//Get the button:
var mybutton = document.getElementById("mybutton");
console.log(mybutton); // This should output the button element to the console

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  console.log(document.body.scrollTop, document.documentElement.scrollTop); // This will output the scroll position
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
