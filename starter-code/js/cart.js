/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
var table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);
var cart;

function loadCart() {
  var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

// TODO: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {}

// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {

  // TODO: Find the table body
  let tableEl = document.getElementById('cart');
  // TODO: Iterate over the items in the cart
  for (let i = 0; Cart.cartItems.length; i++) {
    let itemsInCart = CartItems[i][0];
    let quantityOfItem = CartItems[i][1];
    const trEl = document.createElement('tr');
    const deleteLink = document.createElement('td');
    const displayQuantity = document.createElement('td');
    const displayItem = document.createElement('td');
    trEl.appendChild(deleteLink);
    trEl.appendChild(displayQuantity);
    trEl.appendChild(displayItem);
    deleteLink.textContent = 'X';
    displayQuantity.textContent = quantityOfItem;
    itemsInCart = itemsInCart;
    tableEl.appendChild(trEl);
  }
  // TODO: Add the TR to the TBODY and each of the TD's to the TR

}

function removeItemFromCart(event) {
  // TODO: When a delete link is clicked, use cart.removeItem to remove the correct item
  // TODO: Save the cart back to local storage
  // TODO: Re-draw the cart table

}

// This will initialize the page and draw the cart on screen
renderCart();