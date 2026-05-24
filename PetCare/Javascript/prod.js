let cart = [];
let total = 0;

function addToCart(name, price) {
    cart.push({ name, price });
    updateCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function updateCart() {
    const cartItemsElement = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const cartCountElement = document.getElementById('cart-count');
    
    // Limpa a lista atual
    cartItemsElement.innerHTML = '';
    total = 0;

    if (cart.length === 0) {
        cartItemsElement.innerHTML = '<p class="empty-msg">O carrinho está vazio.</p>';
    } else {
        cart.forEach((item, index) => {
            total += item.price;
            
            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `
                <span>${item.name} - R$ ${item.price.toFixed(2)}</span>
                <button class="remove-btn" onclick="removeFromCart(${index})">🗑️</button>
            `;
            cartItemsElement.appendChild(div);
        });
    }

    totalPriceElement.innerText = total.toFixed(2);
    cartCountElement.innerText = cart.length;
}
// ... (mantenha suas funções addToCart, updateCart e removeFromCart como estão)

// ESTA É A PARTE QUE ESTÁ FALTANDO:
// Executa automaticamente assim que a página de PRODUTOS carregar
window.addEventListener('load', function() {
    console.log("Página carregada, verificando se há produtos da Home...");

    // 1. Pega o item que a Index deixou no "caderno de notas" (localStorage)
    const produtoSalvo = localStorage.getItem('produtoPendente');

    if (produtoSalvo) {
        // 2. Converte o texto de volta para um objeto JavaScript
        const item = JSON.parse(produtoSalvo);
        
        console.log("Produto encontrado:", item);

        // 3. Chama a função de adicionar ao carrinho (que você já tem no JS)
        addToCart(item.name, item.price);

        // 4. LIMPA o caderno para não adicionar o mesmo item toda vez que der F5
        localStorage.removeItem('produtoPendente');

        // 5. Faz a tela descer suavemente até o carrinho para o usuário ver
        const secaoCarrinho = document.getElementById('carrinho-secao');
        if (secaoCarrinho) {
            secaoCarrinho.scrollIntoView({ behavior: 'smooth' });
        }
    }
});