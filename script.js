const message = document.createElement("div");
message.classList.add("cookie-message");
message.innerHTML =
  "We use cookied for improved functionality and analytics. <button class='btn btn--close-cookie'>Got it!</button> ";

const header = document.querySelector(".header");
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
