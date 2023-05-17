let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}

let shoppingCart = document.querySelector('.shopping-cart');

document.querySelector('#cart-btn').onclick = () =>{
    shoppingCart.classList.toggle('active');
    searchForm.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}

let loginForm = document.querySelector('.login-form');

document.querySelector('#login-btn').onclick = () =>{
    loginForm.classList.toggle('active');
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    navbar.classList.remove('active');
}

let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
}

window.onscroll = () =>{
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}

var swiper = new Swiper(".product-slider", {
    loop:true,
    spaceBetween: 20,
    autoplay: {
        delay: 7500,
        disableOnInteraction: false,
    },
    centeredSlides: true,
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1020: {
        slidesPerView: 3,
      },
    },
});



//cart js

if(document.readyState == 'loading'){
  document.addEventListener('DOMContentLoaded', ready)
}
else{
  ready();
}

function removeItemCart(event){
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updateTotal();
}

function ready(){
  var removeItemButton = document.getElementsByClassName('fas fa-trash')
  console.log(removeItemButton)
  for(var i = 0; i< removeItemButton.length; i++){
    var button = removeItemButton[i]
    button.addEventListener("click", removeItemCart)
  }

  //the quantity 
  var quantityInputs = document.getElementsByClassName('quantity')
  for(var i = 0; i< quantityInputs.length; i++){
    var input = quantityInputs[i]
    input.addEventListener("change", quantityChange);
  }
  //add product to cart
  var addCart = document.getElementsByClassName("btn")
  for(var i = 0; i< addCart.length; i++){
    var button = addCart[i]
    button.addEventListener('click', addCartClicked)
  }
  //order button
  document.getElementsByClassName('order')[0].addEventListener('click', orfderButtonClick)
  updateTotal();
}

// order button 
function orfderButtonClick (){
alert("your order is placed" )
var cartContent = document.getElementsByClassName("cart-content")[0];
while(cartContent.hasChildNodes()){
  cartContent.removeChild(cartContent.firstChild)
}
updateTotal();
}

// Add to cart function
function addCartClicked(event){
  var button = event.target
  var product = button.parentElement
  var title = product.getElementsByClassName('product-title')[0].innerText
  var price = product.getElementsByClassName('price')[0].innerText
  var image = product.getElementsByClassName('product-image')[0].src
  addProduct(title, price, image);
  updateTotal();
}

function addProduct(title, price, image){
  var  cartBox = document.createElement("div");
  cartBox.classList.add("box");
  var cartItem = document.getElementsByClassName("cart-content")[0]
  var cartTitlte = cartItem.getElementsByClassName("cart-title")
  for(var i = 0; i< cartTitlte.length; i++){
  }

  var cartBoxContent = `<i class="fas fa-trash"></i>
  <img src="${image}" alt="" class="cart-img">
  <div class="content">
      <div class="cart-title"><h3>${title}</h3></div>
      <div class="price"><h2>${price}</h2></div>
      <input type="number" value="1" class="quantity"> 
  </div>`

  cartBox.innerHTML = cartBoxContent;
  cartItem.append(cartBox);
  cartBox.getElementsByClassName("fas fa-trash")[0].addEventListener("click", removeItemCart);
  cartBox.getElementsByClassName("quantity")[0].addEventListener("change", quantityChange);
}

//function quantity change 
function quantityChange(event){
  var input = event.target 
  if (isNaN(input.value) || input.value <= 0){
    input.value =1;
  }
  updateTotal();
}

//close cart 
let closeCart = document.querySelector("#close-cart")
closeCart.onclick = () => {
  shoppingCart.classList.remove("active");
}

//update the total 
function updateTotal(){
  var cartContent = document.getElementsByClassName("cart-content")[0];
  var cartBoxs = cartContent.getElementsByClassName("box");
  var total = 0; 
  for(var i = 0; i< cartBoxs.length; i++){
  var cartBox = cartBoxs[i];
  var priceElement = cartBox.getElementsByClassName("price")[0];
  var quantityElement = cartBox.getElementsByClassName("quantity")[0];
  var price = parseFloat(priceElement.innerText.replace("SR", ""));
  
  var quantity = quantityElement.value;
  total =Math.round( (total + price * quantity)*100)/100;
  }
  document.getElementsByClassName("total")[0].innerText = "SR" + total;


}

