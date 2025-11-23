const navlinks= document.querySelectorAll(" .nav-menu .nav-link");
const menuOpenButton = document.querySelector("#menu-open-button"); // Selects the button with ID "menu-open-button"
const menuCloseButton = document.querySelector("#menu-close-button"); // Selects the button with ID "menu-close-button"

menuOpenButton.addEventListener("click", () => { 
    document.body.classList.toggle("show-mobile-menu"); // Adds/removes the class to show/hide the menu
});

// Close menu when close button is clicked
menuCloseButton.addEventListener("click", () => menuOpenButton.click());
// Close menu when the nav link is clicked
navlinks.forEach(link => {
    link.addEventListener("click", () => menuOpenButton.click());
})
// Initialize Swiper
const swiper = new Swiper('.slider-wrapper', {
  loop: true,
  grabcursor: true,
  spaceBetween: 25, 

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
   slidesPerView: 1,

  // Responsive breakpoints
  breakpoints: {
   
  
    768: {
      slidesPerView: 2, 
    },
    1024: {
      slidesPerView: 3, 
    },
  }
});