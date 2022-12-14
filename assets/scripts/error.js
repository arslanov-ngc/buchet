window.addEventListener("DOMContentLoaded", () => {
  // navbar

  const navbarMenuBtn = document.querySelector(".navbar__MenuBtn"),
    navbarCloseBtn = document.querySelector(".navbar__CloseBtn"),
    navbar = document.querySelector(".navbar__content");

  navbarMenuBtn.addEventListener("click", () => {
    navbar.classList.replace("deactive", "active");
  });
  navbarCloseBtn.addEventListener("click", () => {
    navbar.classList.replace("active", "deactive");
  });
});
