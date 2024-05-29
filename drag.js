const carousel = document.querySelector(".carousel");
const wrapper = document.querySelector(".wrapper");
const arrowBtns = document.querySelectorAll(".wrapper i");
const FirstCardWidth = carousel.querySelector(".card").offsetWidth;
const carouselChildrens = [...carousel.children];


let isDragging = false, startX, startScrollLeft, timeoutId;

let cardPerview = Math.round(carousel.offsetWidth / FirstCardWidth);


//insert copies of the last few cards that can fit carsouel at once
carouselChildrens.slice(-cardPerview).reverse().forEach(card =>{
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

carouselChildrens.slice(0, cardPerview).forEach(card =>{
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});
//add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
   btn.addEventListener("click", () => {
    carousel.scrollLeft += btn.id === "left" ? -FirstCardWidth : FirstCardWidth;
   });
});

const dragStart = (e) =>{
    isDragging = true;
    carousel.classList.add("dragging");
    //records the inline cursor and scroll position of carsouel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return; // is dragging is false return from here
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () =>{
    isDragging = false;
    carousel.classList.remove("dragging");
}
const autoPlay = () => {
    if (window.innerWidth < 800) return; //return if window is smaller than 800
    //Autoplay the carsouel after 2500ms
    timeoutId = setTimeout(() => carousel.scrollLeft += FirstCardWidth, 2500);
}
autoPlay();

const infiniteScroll = () => {
    if(carousel.scrollLeft === 0){
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth -(2* carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    } else if(Math.ceil(carousel.scrollLeft) ===  carousel.scrollWidth - carousel.offsetWidth){
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }
    //clear existing & start autoplay if mouse id not hovering over carsouel
    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () =>  clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);