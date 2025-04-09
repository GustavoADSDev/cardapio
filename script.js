// PEGANDO AS CONST
const menu = document.getElementById("menu")
const cartbtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const cartItemsContainer = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const checkoutBtn = document.getElementById("checkout-btn")
const closeModalBtn = document.getElementById("close-modal-btn")
const cartCounter = document.getElementById("cart-count")
const addressInput = document.getElementById("address")
const addressWarn = document.getElementById("address-warn")

let cart = [];
//FIM

// ABRIR O MODAL DO CARRINHO
cartbtn.addEventListener("click", function(){
    updateCartModal();
 cartModal.style.display = "flex"
})
// FIM

//FECHAR O MODAL QUANDO CLICAR FORA
cartModal.addEventListener("click", function(event){
    if(event.target === cartModal){
        cartModal.style.display = "none"
    }
})
//FIM 


//FECHAR QUANDO CLICAR NO BOTAO "FECHAR"
closeModalBtn.addEventListener("click", function(){
    cartModal.style.display = "none"
})
//FIM

// RECONHECER
menu.addEventListener("click", function(event){
    let parentButton  = event.target.closest(".add-to-card-btn")
    if(parentButton){
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat (parentButton.getAttribute("data-price"))

        addToCart(name, price)
//FIM

 //ADICIONAR NO CARRINHO
    
    }

})

//FUNCAO PARA ADD NO CARINHO
function addToCart(name,price){
    const existingItem = cart.find(item => item.name === name)

    if(existingItem){
        //SE O ITEM JÁ EXISTE,AUMENTA APENAS A QUANTIDADE
       existingItem.quantity += 1;
        return;
    }else{
        cart.push({
            name,
            price,
            quantity: 1,
        })
    }
    
    
  
    updateCartModal()

}

//ATUALIZAR O CARRINHO
function updateCartModal(){
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const cartItemElement = document.createElement ("div")

        cartItemElement.innerHTML = `
    <div>
        <div>
            <p>${item.name}</p>
            <p>${item.quantity}</p>
            <p>${item.price}</p>
        </div>

        <div>
        <button> Remover </button>
        </div>

    </div>
     `
     cartItemsContainer.appendChild(cartItemElement)
    })
}