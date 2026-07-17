const menuButton =
document.querySelector(".menu-toggle");


const menu =
document.querySelector(".menu-overlay");



menuButton.addEventListener(
    "click",
    () => {

        menu.classList.toggle("active");

    }
);

const navbar =
    document.querySelector(".navbar");

const topBar =
    document.querySelector(".top-bar");

window.addEventListener("scroll", () => {

    if(window.scrollY > 40){

        navbar.classList.add("scrolled");
        topBar.classList.add("hide");

    }

    else{

        navbar.classList.remove("scrolled");
        topBar.classList.remove("hide");

    }

});