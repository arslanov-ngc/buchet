window.addEventListener("DOMContentLoaded", () => {
  // store info modal

  const storeInfoBtn = document.querySelector("#circle__opener"),
    storeInfoModal = document.querySelector("#info__store");

  storeInfoBtn.addEventListener("click", () => {
    if (storeInfoModal.classList.contains("deactive")) {
      storeInfoModal.classList.replace("deactive", "active");
    } else storeInfoModal.classList.replace("active", "deactive");
  });
  document.addEventListener("click", (e) => {
    if (storeInfoModal.classList.contains("active")) {
      if (
        e.target ===
        (document.querySelector(".store") || document.querySelector(".store"))
      ) {
        storeInfoModal.classList.replace("active", "deactive");
      }
    }
  });

  // contact modal

  const contactModal = document.querySelector(".contactModal"),
    contactModalOpener = document.querySelectorAll(".contact__modal__opener"),
    contactModalClose = document.querySelector(".contactModal__close");

  contactModalOpener.forEach((btn) => {
    btn.addEventListener("click", () => {
      contactModal.classList.replace("deactive", "active");
      document.body.style.overflowY = "hidden";
    });
  });
  contactModalClose.addEventListener("click", () => {
    contactModal.classList.replace("active", "deactive");
    document.body.style.overflowY = "visible";
  });

  contactModal.addEventListener("click", (e) => {
    if (e.target === contactModal) {
      contactModal.classList.replace("active", "deactive");
      document.body.style.overflowY = "visible";
    }
  });

  // product modal
  const productModal = document.querySelector(".productModal"),
    productModalOpener = document.querySelectorAll(".product__modal__opener"),
    productModalClose = document.querySelector(".productModal__close");

  productModalOpener.forEach((btn) => {
    btn.addEventListener("click", () => {
      productModal.classList.replace("deactive", "active");
      document.body.style.overflowY = "hidden";
    });
  });
  productModalClose.addEventListener("click", () => {
    productModal.classList.replace("active", "deactive");
    document.body.style.overflowY = "visible";
  });

  productModal.addEventListener("click", (e) => {
    if (e.target === productModal) {
      productModal.classList.replace("active", "deactive");
      document.body.style.overflowY = "visible";
    }
  });

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
