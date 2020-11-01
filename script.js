const message = document.createElement("div");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabs = document.querySelectorAll(".operations__tab");
const operationsContent = document.querySelectorAll(".operations__content");
const header = document.querySelector(".header");
const section1 = document.getElementById("section--1");

message.classList.add("cookie-message");
message.innerHTML =
  "We use cookied for improved functionality and analytics. <button class='btn btn--close-cookie'>Got it!</button> ";

header.append(message);

document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    message.remove();
  });

// scroll to
document
  .querySelector(".btn--scroll-to")
  .addEventListener("click", function () {
    section1.scrollIntoView({
      behavior: "smooth",
    });
  });

// event delegation
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    const idScrollTo = e.target.getAttribute("href");
    document.querySelector(idScrollTo).scrollIntoView({ behavior: "smooth" });
  }
});

// handle tab clicked

tabsContainer.addEventListener("click", e => {
  const clickedButton = e.target.closest(".operations__tab");
  if (!clickedButton) return;
  const activeContent = document.querySelector(
    `.operations__content--${clickedButton.dataset.tab}`
  );

  tabs.forEach(t => t.classList.remove("operations__tab--active"));
  operationsContent.forEach(c =>
    c.classList.remove("operations__content--active")
  );

  clickedButton.classList.add("operations__tab--active");
  activeContent.classList.add("operations__content--active");
});

// handle change opacity when hovering the nav
const nav = document.querySelector(".nav");

const handleChangeOpacity = function (e) {
  if (!e.target.classList.contains("nav__link")) return;
  const logo = e.target.closest(".nav").querySelector("img");
  logo.style.opacity = this;
  const siblings = e.target.closest(".nav").querySelectorAll(".nav__link");
  siblings.forEach(link => {
    if (link !== e.target) link.style.opacity = this;
  });
};

nav.addEventListener("mouseover", handleChangeOpacity.bind(0.5));
nav.addEventListener("mouseout", handleChangeOpacity.bind(1));

// handle using IntersectionObsever for nav
const navHeight = nav.getBoundingClientRect().height;
const handleNavStick = (entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};
const headerObserver = new IntersectionObserver(handleNavStick, {
  root: null,
  rootMargin: `-${navHeight}px`,
  threshold: 0,
});
headerObserver.observe(header);

// Handle reveal sections
const allSections = document.querySelectorAll(".section");
const reviewSectionHandler = (entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target);
  });
};
const observer = new IntersectionObserver(reviewSectionHandler, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(section => {
  observer.observe(section);
  section.classList.add("section--hidden");
});

// Lazy loading images
const imgTargets = document.querySelectorAll("img[data-src]");

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});

imgTargets.forEach(img => imgObserver.observe(img));
