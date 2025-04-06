// THEME VARIABLES
const theme = "theme";
const dataTheme = "data-theme";
const themeTab = ".theme-tab";
const switcherBtn = ".switcher-btn";
const dark = "dark";
const light = "light";
const open = "open";
const active = "active";

// MODAL VARIABLES
const modalOpen = "[data-open]";
const modalClose = "[data-close]";
const isVisible = "is-visible";

// PORTFOLIO VARIABLES
const dataFilter = "[data-filter]";

// PORTFOLIO CARD VARIABLES
const portfolioData = "[data-item]";

// ROOT ELEMENT
const root = document.documentElement;

// PORTFOLIO CARD DATA-LIST
const portfolioCardData = [
  {
    id: "web-1",
    itemName: "web",
    imgPath: "./assets/images/portfolio-1.jpg",
    text: "Web Development",
    subText: "Food Website",
  },
  {
    id: "web-2",
    itemName: "web",
    imgPath: "./assets/images/portfolio-2.jpg",
    text: "Web Development",
    subText: "Skate Website",
  },
  {
    id: "web-3",
    itemName: "web",
    imgPath: "./assets/images/portfolio-3.jpg",
    text: "Web Development",
    subText: "Eating Website",
  },
  {
    id: "ui-1",
    itemName: "ui",
    imgPath: "./assets/images/portfolio-1.jpg",
    text: "UI Design",
    subText: "Cool Design",
  },
  {
    id: "app-1",
    itemName: "app",
    imgPath: "./assets/images/portfolio-5.jpg",
    text: "App Development",
    subText: "Game App",
  },
  {
    id: "app-2",
    itemName: "app",
    imgPath: "./assets/images/portfolio-6.jpg",
    text: "App Development",
    subText: "Gambling App",
  },
  {
    id: "app-3",
    itemName: "app",
    imgPath: "./assets/images/portfolio-7.jpg",
    text: "App Development",
    subText: "Money App",
  },
  {
    id: "ui-2",
    itemName: "ui",
    imgPath: "./assets/images/portfolio-8.jpg",
    text: "UI Design",
    subText: "Fantastic Design",
  },
];

// RENDERING PORTFOLIO CARDS
const portfolioGrid = document.getElementById("portfolioGrid");
portfolioCardData.forEach((item) => {
  const portfolioCardDiv = document.createElement("div");
  portfolioCardDiv.setAttribute("data-item", item.itemName);
  portfolioCardDiv.setAttribute("data-open", item.id);
  portfolioCardDiv.classList.add("portfolio-card");

  const cardBodyDiv = document.createElement("div");
  cardBodyDiv.classList.add("card-body");

  const imgEl = document.createElement("img");
  imgEl.src = item.imgPath;
  imgEl.alt = "portfolio icon";

  const cardPopupDiv = document.createElement("div");
  cardPopupDiv.classList.add("card-popup-box");

  const divEl = document.createElement("div");
  divEl.textContent = item.text;

  const headingEl = document.createElement("h3");
  headingEl.textContent = item.subText;

  portfolioGrid.appendChild(portfolioCardDiv);
  portfolioCardDiv.appendChild(cardBodyDiv);
  cardBodyDiv.appendChild(imgEl);
  cardBodyDiv.appendChild(cardPopupDiv);
  cardPopupDiv.appendChild(divEl);
  cardPopupDiv.appendChild(headingEl);
});

// FOR THEME
const toggleTheme = document.querySelector(themeTab);
const switcher = document.querySelectorAll(switcherBtn);
const currentTheme = localStorage.getItem(theme);

// FOR PORTFOLIO SEARCH
const searchInput = document.querySelector("#search");

// FOR PORTFOLIO
const filterLink = document.querySelectorAll(dataFilter);

// FOR PORTFOLIO CARD
const portfolioItems = document.querySelectorAll(portfolioData);

// FOR MODALS
const openModal = document.querySelectorAll(modalOpen);
const closeModal = document.querySelectorAll(modalClose);

// SETTING ACTIVE STATE
const setActive = (elm, selector) => {
  if (document.querySelector(`${selector}.${active}`) !== null) {
    document.querySelector(`${selector}.${active}`).classList.remove(active);
  }
  elm.classList.add(active);
};

// SETTING THEME LIGHT/DARK
const setTheme = (val) => {
  if (val === dark) {
    root.setAttribute(dataTheme, dark);
    localStorage.setItem(theme, dark);
  } else {
    root.setAttribute(dataTheme, light);
    localStorage.setItem(theme, light);
  }
};

// SETTING THEME BASED ON LOCAL-STORAGE
if (currentTheme) {
  root.setAttribute(dataTheme, currentTheme);
  switcher.forEach((btn) => {
    btn.classList.remove(active);
  });

  if (currentTheme === dark) {
    switcher[1].classList.add(active);
  } else {
    switcher[0].classList.add(active);
  }
}

// TOGGLING THEME OPEN/CLOSE
toggleTheme.addEventListener("click", function () {
  const tab = this.parentElement.parentElement;
  if (!tab.className.includes(open)) {
    tab.classList.add(open);
  } else {
    tab.classList.remove(open);
  }
});

// THEME LIGHT/DARK BUTTONS
for (const elm of switcher) {
  elm.addEventListener("click", function () {
    const toggle = this.dataset.toggle;
    setActive(elm, switcherBtn);
    setTheme(toggle);
  });
}

// PORTFOLIO SEARCH FUNCTIONALITY
searchInput.addEventListener("keyup", (e) => {
  const val = e.target.value.toLowerCase().trim();

  portfolioItems.forEach((card) => {
    if (card.dataset.item.includes(val)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});

// SETTING ACTIVE STATE ON PORTFOLIO NAV LINKS
for (const elm of filterLink) {
  elm.addEventListener("click", function () {
    setActive(elm, ".filter-link");

    const filter = this.dataset.filter;
    portfolioItems.forEach((card) => {
      if (filter === "all") {
        card.style.display = "block";
      } else if (card.dataset.item === filter) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
}

// RENDERING PORTFOLIO MODAL BODY
const portfolioModalBody = (id) => {
  const filteredData = portfolioCardData.filter((item) => item.id === id);

  const modelEl = document.querySelector(".modal");
  modelEl.setAttribute("id", filteredData[0].id);
  modelEl.classList.add(isVisible);

  const modalHeadingEl = document.getElementById("portfolio-modal-heading");
  modalHeadingEl.textContent = `${filteredData[0].text.split(" ")[0]} Project ${
    filteredData[0].id.split("-")[1]
  }`;

  const modalDialogEl = document.querySelector(".modal-dialog");

  const modalBodyEl = document.createElement("div");
  modalBodyEl.classList.add("modal-body");

  const imageWrapperEl = document.createElement("div");
  imageWrapperEl.classList.add("image-wrapper");

  const imgEl = document.createElement("img");
  imgEl.src = filteredData[0].imgPath;
  imgEl.alt = "portfolio image";

  const textWrapperEl = document.createElement("div");
  textWrapperEl.classList.add("text-wrapper");

  const p1El = document.createElement("p");
  const strongEl = document.createElement("strong");
  strongEl.textContent = `My ${filteredData[0].subText}`;

  const p2El = document.createElement("p");
  p2El.textContent =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, repudiandae.";

  const p3El = document.createElement("p");
  p3El.textContent =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, repudiandae.";

  modalDialogEl.appendChild(modalBodyEl);
  modalBodyEl.appendChild(imageWrapperEl);
  imageWrapperEl.appendChild(imgEl);
  modalBodyEl.appendChild(textWrapperEl);
  textWrapperEl.appendChild(p1El);
  p1El.appendChild(strongEl);
  textWrapperEl.appendChild(p2El);
  textWrapperEl.appendChild(p3El);
};

// FULL SITE MODAL / PORTFOLIO MODAL "OPEN BUTTON"
for (const elm of openModal) {
  elm.addEventListener("click", function () {
    const modalId = this.dataset.open;

    if (modalId === "about" || modalId === "contact") {
      document.getElementById(modalId).classList.add(isVisible);
    } else {
      portfolioModalBody(modalId);
    }
  });
}

// FULL SITE MODAL / PORTFOLIO MODAL "CLOSE BUTTON"
for (const elm of closeModal) {
  elm.addEventListener("click", function () {
    this.parentElement.parentElement.parentElement.classList.remove(isVisible);

    if (document.querySelector(".modal-dialog .modal-body") !== null) {
      setTimeout(() => {
        document.querySelector(".modal-dialog .modal-body").remove();
      }, 1000);
    }
  });
}

// PORTFOLIO MODAL CLOSE ON DOCUMENT CLICK
document.addEventListener("click", (e) => {
  if (e.target === document.querySelector(".modal.is-visible")) {
    document.querySelector(".modal.is-visible").classList.remove(isVisible);
    setTimeout(() => {
      document.querySelector(".modal-dialog .modal-body").remove();
    }, 1000);
  }
});

// PORTFOLIO MODAL CLOSE ON ESC KEY
document.addEventListener("keyup", (e) => {
  if (e.key === "Escape") {
    document.querySelector(".modal.is-visible").classList.remove(isVisible);
    setTimeout(() => {
      document.querySelector(".modal-dialog .modal-body").remove();
    }, 1000);
  }
});

// MARQUEE ANIMATION
const elmsDisplayed = getComputedStyle(root).getPropertyValue(
  "--marquee-elms-displayed"
);
const marqueeContent = document.querySelector("ul.marquee-content");

root.style.setProperty("--marquee-elms", marqueeContent.children.length);

for (let i = 0; i < elmsDisplayed; i++) {
  marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
}
