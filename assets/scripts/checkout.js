window.addEventListener("DOMContentLoaded", () => {
  // content input check

  const contentInputs = document.querySelectorAll(".content__input input");

  contentInputs.forEach((input) => {
    input.addEventListener("focusout", (e) => {
      if (e.target.value !== "") {
        input.classList.add("isActive");
      } else input.classList.remove("isActive");
    });
  });

  // promocode input check

  const promocodeInput = document.querySelector("#promocodeInput"),
    promocodeBtn = document.querySelector("#promocodeBtn");

  promocodeInput.addEventListener("input", (e) => {
    if (e.target.value === "") {
      promocodeBtn.classList.add("disabled");
    } else promocodeBtn.classList.remove("disabled");
  });
});
