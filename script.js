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
        const price = parseFloat(parentButton.getAttribute("data-price"))

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
        const cartItemElement = document.createElement ("div");
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col")

        cartItemElement.innerHTML = `

    <div class="flex items-center justify-between">
        <div>
            <p class="font-bold">${item.name}</p>
            <p>Qtd: ${item.quantity}</p>
            <p class= "font-medium mt-2">R$ ${item.price.toFixed(2) }</p>
        </div>

        <div class="remove-from-cart-btn" data-name= "${item.name}">
       Remover 
        </div>

    </div>
     ` 

     total += item.price * item.quantity;

     cartItemsContainer.appendChild(cartItemElement)
    })
    cartTotal.textContent = total.toLocaleString("pt-BR", {
       style: "currency",
       currency: "BRL" 
    });

    cartCounter.innerHTML = cart.length;

}

//FUNCAO PARA REMOVER ITEM DO CARRINHO
cartItemsContainer.addEventListener("click", function (event){
    if(event.target.classList.contains("remove-from-cart-btn")){
        const name = event.target.getAttribute("data-name")

        removerItemCart(name);
    }
})
function removerItemCart(name){
    const index = cart.findIndex (item => item.name === name);

    if(index !== -1){
        const item = cart[index];
        
        if(item.quantity  > 1){
            item.quantity -=1
            updateCartModal();
            return
        }
        cart.splice(index, 1)
        updateCartModal();
    }

}

addressInput.addEventListener("input", function(event){
  let inputValue = event.target.value;

  if(inputValue !== "") {
    addressInput.classList.remove("border-red-500");
    addressWarn.classList.add("hidden")
    }
});
//FINALIZAR PEDIDO
checkoutBtn.addEventListener("click", function(){
   
    const isOpen = checkRestaurantOpen();
    if(!isOpen){
        
       
        Toastify({
            text: "RESTAURANTE ESTÁ FECHADO",
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "#ef4444",
            },
            }).showToast();


        return;
    }
    
    if(cart.length === 0 ) return;
    if(addressInput.value === ""){
        addressWarn.classList.remove("hidden")
        addressInput.classList.add("border-red-500")
        return;
        
    }

      //EVIAR API PARA WHATS
      const cartItems = cart.map((item)=>{
        return (
            `${item.name} Quantidade:  (${item.quantity}) Preço: R$${item.price} | `
        )
        
      }).join("")

      const message = encodeURIComponent(cartItems)
      const phone = "19991616111"

      window.open(`https://wa.me/${phone}?text=${message} Enderenço: ${addressInput.value}`, "_black")

      cart = [];
      updateCartModal();
})


//VERIFICAR A HORA E MANIPULAR O CARD HORARIO
function checkRestaurantOpen(){
    const data = new Date();
    const hora = data.getHours();
    return hora >= 18 && hora <22; 
    //TRUE = RESTAURANTE ABERTO
}


const spanItem = document.getElementById ("date-span")
const isOpen = checkRestaurantOpen();

if (isOpen){
spanItem.classList.remove("bg-red-500");
spanItem.classList.add("bg-green-600")
}else{
    spanItem.classList.remove("bg-green-600")
    spanItem.classList.add("bg-red-500")
}
