function displayCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = '';

    cart.forEach(item => {
        cartItemsDiv.innerHTML += `<div class="cart-item">${item.nome} - $${item.preco}</div>`;
    });

    let totalSection = document.getElementById('total-section');
    totalSection.innerHTML = `<div class="total">Total: $${totalPrice.toFixed(2)}</div>`;
}

function clearCart() {
    localStorage.removeItem('cart');
    totalPrice = 0; // Zerar o totalPrice ao limpar o carrinho
    displayCart(); // Atualizar a exibição do carrinho após limpar
}

function finishPurchase() {
    alert('Thank you for your purchase!');
    clearCart(); // Limpar o carrinho após a compra
    window.location.href = "/sinet-master/index.html"; // Redirecionar para a página inicial
}

function stillPurchase() {
    window.location.href = "index.html"; // Redirecionar para a página de login
}

// Exibir o carrinho ao carregar a página
window.onload = function() {
    displayCart();
};
