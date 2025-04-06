const slides = document.querySelectorAll(".review-item");
const buttons = document.querySelectorAll(".slide-ctrl-container button");

// INITIALIZING
let current = Math.floor(Math.random() * slides.length);
let next = current < slides.length - 1 ? current + 1 : 0;
let prev = current > 0 ? current - 1 : slides.length - 1;

// UPDATING SLIDES
const update = () => {
  slides.forEach((slide) => {
    slide.classList.remove("active", "next", "prev");
  });
  slides[current].classList.add("active");
  slides[next].classList.add("next");
  slides[prev].classList.add("prev");
};

// RE ASSINGING VALUES
const goToNum = (number) => {
  current = number;
  next = current < slides.length - 1 ? current + 1 : 0;
  prev = current > 0 ? current - 1 : slides.length - 1;
  update();
};

// CALLING NEXT & PREV
const goToNext = () => {
  console.log("NEXT", current);
  current < slides.length - 1 ? goToNum(current + 1) : goToNum(0);
};
const goToPrev = () => {
  console.log("PREV", current);
  current > 0 ? goToNum(current - 1) : goToNum(slides.length - 1);
};

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", () =>
    i === 0 ? goToPrev() : goToNext()
  );
}

update();
