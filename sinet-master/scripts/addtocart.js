
    let carts = document.querySelectorAll('.cart');
    let carrinho = document.querySelector('.offcanvas-body');
    let list_qnt = [];
    let totalPrice = 0; // Inicializamos o preço total como 0

    // Função para exibir o preço total dos itens no carrinho
    function displayTotalPrice() {
        const totalPriceElement = document.getElementById('total-price');
        totalPriceElement.textContent = `Total: R$ ${totalPrice.toFixed(2)}`;
        totalPrice += parseFloat(produtoPreco);
    }

    // Recuperar itens do carrinho do localStorage na inicialização
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.forEach(item => {
        for (let i = 0; i < item.quantidade; i++) {
            carrinho.innerHTML += `
                <div class="cart-item">
                    <p style="justify-self:start">${item.nome}</p>
                    <p class="preco">${item.preco}</p>
                    <button class="remove-item">&#10006;</button>
                </div>
            `;
            list_qnt.push(item.nome); // Adiciona o item ao contador
            totalPrice += Number(item.preco); // Atualiza o preço total com o preço do item
            
        }
    });

    // Atualizar o contador qnt com a quantidade atual de itens no carrinho
    document.querySelector('.rounded-pill').innerHTML = list_qnt.length;

    carts.forEach((cart, index) => {
        cart.addEventListener('click', () => {
            let produtos = document.querySelectorAll('.p-name');
            let preco = carts[index].children[0];
            const produtoNome = produtos[index].textContent;
            const produtoPreco = preco.textContent;
    
            console.log("produtoPreco:", produtoPreco); // Verificar o valor de produtoPreco
    
            // Verificar se produtoPreco é um número válido
            if (isNaN(parseFloat(produtoPreco))) {
                console.error("Erro: produtoPreco não é um número válido.");
                return;
            }
    
            const cartItem = {
                nome: produtoNome,
                preco: produtoPreco,
                quantidade: 1
            };
    
            updateLocalStorage(cartItem);
            // Adicionar o item ao carrinho
            carrinho.innerHTML += `
                <div class="cart-item">
                    <p style="justify-self:start">${produtoNome}</p>
                    <p class="preco">${produtoPreco}</p>
                    <button class="remove-item">&#10006;</button>
                    
                </div>
            `;
    
            console.log("produtoPreco convertido:", parseFloat(produtoPreco)); // Verificar o valor convertido de produtoPreco
    
            // Atualizar o preço total com o preço do item
            totalPrice += parseFloat(produtoPreco);
    
            console.log("totalPrice:", totalPrice); // Verificar o valor de totalPrice
    
            list_qnt.push(produtoNome); // Adiciona o item ao contador
            document.querySelector('.rounded-pill').innerHTML = list_qnt.length;
            displayTotalPrice(); // Atualizar o preço total após adicionar um item
        });
    });

    // Função para atualizar o localStorage com novos itens
    function updateLocalStorage(cartItem) {
        cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const existingItemIndex = cartItems.findIndex(item => item.nome === cartItem.nome);

        if (existingItemIndex !== -1) {
            cartItems[existingItemIndex].quantidade++;
        } else {
            cartItems.push(cartItem);
        }

        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }

    // Função para remover itens do localStorage
    function removeFromLocalStorage(produtoNome) {
        cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const itemIndex = cartItems.findIndex(item => item.nome === produtoNome);

        if (itemIndex !== -1) {
            if (cartItems[itemIndex].quantidade > 1) {
                cartItems[itemIndex].quantidade--;
            } else {
                cartItems.splice(itemIndex, 1);
            }
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        }
    }

    // Exibir o preço total ao carregar a página
    window.onload = function() {
        displayTotalPrice();
    };

