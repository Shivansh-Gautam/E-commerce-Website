document.addEventListener('DOMContentLoaded', function () {
  function updateCart() {
    let cartTotal = 0;
    const cartRows = document.querySelectorAll('tbody tr'); // Select all product rows

    cartRows.forEach(row => {
      const priceElement = row.querySelector('td:nth-child(4)'); // Select price column
      const quantityElement = row.querySelector('input[type="number"]'); // Select quantity input
      const subtotalElement = row.querySelector('td:nth-child(6)'); // Select subtotal column

      if (!priceElement || !quantityElement || !subtotalElement) return; // Skip if any element is missing

      let price = parseFloat(priceElement.innerText.replace('₹', '').replace(',', '')) || 0;
      let quantity = parseInt(quantityElement.value) || 1;

      if (quantity < 1) {
        quantityElement.value = 1; // Prevent negative values
        quantity = 1;
      }

      let subtotal = price * quantity;
      subtotalElement.innerText = `₹${subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`; // Format price

      cartTotal += subtotal;
    });

    // Update subtotal and total
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartTotalElement = document.getElementById('cart-total');

    if (cartSubtotal && cartTotalElement) {
      cartSubtotal.innerText = `₹${cartTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
      cartTotalElement.innerHTML = `<strong>₹${cartTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</strong>`;
    }
  }

  // Attach event listeners to all quantity inputs
  document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('input', updateCart); // Listen for changes
  });

  // Initial update on page load
  updateCart();
});
