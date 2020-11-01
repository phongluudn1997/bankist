const message = document.createElement("div");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabs = document.querySelectorAll(".operations__tab");
const operationsContent = document.querySelectorAll(".operations__content");
const header = document.querySelector(".header");

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
    const section1 = document.getElementById("section--1");
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
const nav = document.querySelector(".nav__links");

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
