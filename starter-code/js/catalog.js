/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
var cart = new Cart(cartItems);


let itemInCart;
let quantitySelected;
// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {

  //TODO: Add an <option> tag inside the form's select for each product
  var selectElement = document.getElementById('items');
  var optionEl = document.createElement('option');
  optionEl.textContent = 'Select a Product';
  selectElement.appendChild(optionEl);
  for (var i = 0; i < Product.allProducts.length; i++) {
    optionEl = document.createElement('option');
    optionEl.textContent = Product.allProducts[i].name;
    optionEl.setAttribute = ('value', Product.allProducts[i].name);
    selectElement.appendChild(optionEl);
  }

}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {
  event.preventDefault();
  addSelectedItemToCart();
  cart.LocalStorage(itemInCart, quantitySelected);
  updateCounter();
  updateCartPreview();
  showConfirmation();
}



// TODO: Add the selected item and quantity to the cart
function addSelectedItemToCart() {
  let optionEl = document.getElementById('items');
  let quantityEl = document.getElementById('quantity');
  let selectedIndex = optionEl.options.selectedIndex;
  let itemSelected = optionEl.options[selectedIndex].value;
  let quantity = parseInt(quantityEl.value);
  // TODO: using those, add one item to the Cart
  cart.addItem(new CartItem(Product.allProducts[selectedIndex - 1], quantity));
  cart.save();
  itemInCart = itemSelected;
  quantitySelected = quantity;
  quantityEl.value = null;
  optionEl.selectedIndex = 0;
}

// TODO: Update the cart count in the header nav with the number of items in the Cart
function updateCounter() {
  var totalItemsInCart = 0;
  for(var i = 0; i < cart.items.length; i++) {
    totalItemsInCart = totalItemsInCart + cart.items[i].quantity;
  }
  document.getElementById("itemCount").innerHTML = totalItemsInCart;
}

function showItemsInCart() {
  let cartContentsEl = document.getElementById('cartContents');
  for(var i = 0; i < cart.items.length; i++) {
    let newCartItem = document.createElement('div');
    newCartItem.innerHTML = cart.items[i].quantity + ' ' + cart.items[i].product.name;
    cartContentsEl.appendChild(newCartItem);
  }
}

// TODO: As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
  let cartContentsEl = document.getElementById('cartContents');
  // TODO: Get the item and quantity from the form
  let lastAddedProduct = cart.items[cart.items.length - 1];

  // TODO: Add a new element to the cartContents div with that information
  let newCartItem = document.createElement('div');
  newCartItem.innerHTML = lastAddedProduct.quantity + ' ' + lastAddedProduct.product.name;
  cartContentsEl.appendChild(newCartItem);
}

function showConfirmation() {
  var message = document.createElement('div');
  message.className = 'confirmationMessage';
  message.innerHTML = "Product added to cart";
  var catalogEl = document.getElementById('catalog');
  catalogEl.appendChild(message);
  setTimeout(function() {
    catalogEl.removeChild(message);
  }, 2500);
}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
var catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
showItemsInCart();
updateCounter();