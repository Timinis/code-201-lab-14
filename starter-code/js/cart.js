/* global Cart */
'use strict';

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
  let tableBody = tableEl.getElementsByTagName('tbody')[0];
  tableBody.innerHTML = '';
  // TODO: Iterate over the items in the cart
  for (let i = 0; i < cart.items.length; i++) {
    const trEl = document.createElement('tr');
    const deleteLink = document.createElement('td');
    const displayQuantity = document.createElement('td');
    const displayItem = document.createElement('td');
    trEl.appendChild(deleteLink);
    trEl.appendChild(displayQuantity);
    trEl.appendChild(displayItem);
    deleteLink.textContent = 'X';
    displayQuantity.textContent = cart.items[i].quantity;
    displayItem.textContent = cart.items[i].product.name;
    var productImage = document.createElement('img');
    productImage.src = cart.items[i].product.filePath;
    productImage.height = 50;
    displayItem.appendChild(productImage);
    // itemsInCart = itemsInCart;
    tableBody.appendChild(trEl);

    deleteLink.addEventListener('click', function(e) {
      e.preventDefault();
      removeItemFromCart(cart.items[i].product);
    });
  }
  // TODO: Add the TR to the TBODY and each of the TD's to the TR

}

function removeItemFromCart(product) {
  // TODO: When a delete link is clicked, use cart.removeItem to remove the correct item
  cart.removeItem(product);
  // TODO: Save the cart back to local storage
  cart.save();
  // TODO: Re-draw the cart table
  showCart();

  let deleteMessage = document.createElement('div');
  deleteMessage.textContent = 'Item Removed';
  deleteMessage.className = 'confirmationMessage';

  document.getElementsByTagName('section')[1].appendChild(deleteMessage);

  setTimeout(function() {
    document.removeChild(deleteMessage);
  }, 2500);
}

// This will initialize the page and draw the cart on screen
renderCart();