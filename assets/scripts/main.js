window.addEventListener("DOMContentLoaded", () => {
  //  slider

  const promotionsParent = document.querySelector("#promotion__cards__wrapper"),
    promotions = promotionsParent.querySelectorAll(".card"),
    promotionsWidth = getComputedStyle(promotions[0]).width,
    promotionsPrevBtn = document.querySelector("#promotion__scroll__left"),
    promotionsNextBtn = document.querySelector("#promotion__scroll__right");

  slider(
    promotionsNextBtn,
    promotionsPrevBtn,
    promotionsWidth,
    promotions,
    promotionsParent
  );

  const shopsParent = document.querySelector("#shop__cards__wrapper"),
    shops = shopsParent.querySelectorAll(".card"),
    shopsWidth = getComputedStyle(shops[0]).width,
    shopsPrevBtn = document.querySelector("#shops__scroll__left"),
    shopsNextBtn = document.querySelector("#shops__scroll__right");

  slider(shopsNextBtn, shopsPrevBtn, shopsWidth, shops, shopsParent);

  function slider(nextBtn, prevBtn, width, items, itemsParent) {
    let offset = 0;

    prevBtn.style.display = "none";
    prevBtn.style.opacity = "0";
    nextBtn.style.opacity = "1";

    const slicedWidth = +width.slice(0, width.length - 2) + 19;

    nextBtn.addEventListener("click", () => {
      if (offset == slicedWidth * (items.length - 4)) {
        offset = slicedWidth * (items.length - 4);

        nextBtn.style.opacity = "0";
        setTimeout(() => {
          nextBtn.style.display = "none";
        }, 300);
      } else {
        offset += +width.slice(0, width.length - 2) + 19;
      }
      itemsParent.style.transform = `translateX(${-offset}px)`;

      if (offset > 0) {
        prevBtn.style.display = "flex";
        setTimeout(() => {
          prevBtn.style.opacity = "1";
        }, 300);
      }
    });

    prevBtn.addEventListener("click", () => {
      if (offset == 0) {
        offset = 0;
        prevBtn.style.opacity = "0";
        setTimeout(() => {
          prevBtn.style.display = "none";
        }, 300);
      } else {
        offset -= +width.slice(0, width.length - 2) + 19;
      }
      itemsParent.style.transform = `translateX(${-offset}px)`;

      if (offset == slicedWidth * (items.length - 4)) {
        nextBtn.style.opacity = "0";
        setTimeout(() => {
          nextBtn.style.display = "none";
        }, 300);
      } else {
        nextBtn.style.display = "flex";
        setTimeout(() => {
          nextBtn.style.opacity = "1";
        }, 300);
      }
    });
  }

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
});
