const nav = document.querySelector(".main_nav")
const hamburgerButton = document.querySelector(".navbar_toggle")

hamburgerButton.addEventListener("click", function(){
    nav.classList.toggle("show_nav")
})