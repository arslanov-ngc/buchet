window.addEventListener("DOMContentLoaded", () => {
  // tabs

  const tabContents = document.querySelectorAll(".tabContentElement");
  const tabParent = document.querySelector(".tabParentElement");
  const tabs = document.querySelectorAll(".tabElement");

  function hideTabs() {
    tabContents.forEach((item) => {
      item.style.display = "none";
    });
    tabs.forEach((item) => {
      item.classList.remove("tab--active");
    });
  }

  function showTabs(i = 0) {
    tabContents[i].style.display = "block";
    tabs[i].classList.add("tab--active");
  }

  hideTabs();
  showTabs();

  tabParent.addEventListener("click", (e) => {
    const event = e.target;
    if (event && event.classList.contains("tabElement")) {
      tabs.forEach((item, i) => {
        if (item == event) {
          hideTabs();
          showTabs(i);
        }
      });
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

  // phone number

  const phoneNumber = document.querySelector("#phone"),
    editPhoneBtn = document.querySelector("#editPhoneBtn");

  editPhoneBtn.addEventListener("click", (e) => {
    const IS_EDITABLE = !phoneNumber.isContentEditable;
    const VALUE = phoneNumber.textContent;
    const ERROR_MSG = "Извините, вы ввели неверный номер";

    if (IS_EDITABLE) {
      phoneNumber.classList.add("active");
      e.target.innerText = "ОК";
      phoneNumber.contentEditable = IS_EDITABLE;
    } else {
      if (
        VALUE === "" ||
        typeof parseInt(VALUE) !== "number" ||
        Number(VALUE).toString() == "NaN"
      ) {
        alert(ERROR_MSG);
      } else {
        phoneNumber.classList.remove("active");
        e.target.innerText = "Изменить";
        phoneNumber.contentEditable = IS_EDITABLE;
      }
    }
  });

  // modals

  modalController(
    "#userCardModalOpen",
    ".userCardModal__close",
    "#userCardWrapper",
    "#emptyUserCard",
    ".userCardModal",
    ".userCardModal__footer button",
    "#cardNumber",
    "#cardDate"
  );

  function modalController(
    _modalOpenBtn,
    _modalCloseBtn,
    _cardWrapper,
    _emptyCard,
    _modal,
    _modalBtn,
    _numberInp,
    _dateInp
  ) {
    const modalOpenBtn = document.querySelector(_modalOpenBtn),
      modalCloseBtn = document.querySelector(_modalCloseBtn),
      cardWrapper = document.querySelector(_cardWrapper),
      emptyCard = document.querySelector(_emptyCard),
      modal = document.querySelector(_modal),
      modalBtn = modal.querySelector(_modalBtn),
      numberInpt = modal.querySelector(_numberInp),
      dateInp = modal.querySelector(_dateInp),
      regExpForInputs = /^\d+$/;

    let currentNumber = "",
      currentDate = "",
      ALL_DATA = [],
      ID = 0;

    modalOpenBtn.addEventListener("click", modalOpener);

    modalCloseBtn.addEventListener("click", modalCloser);

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modalCloser();
      }
    });

    numberInpt.addEventListener("input", (e) => {
      if (regExpForInputs.test(e.target.value)) {
        currentNumber = e.target.value;
      }
    });

    dateInp.addEventListener("input", (e) => {
      if (regExpForInputs.test(e.target.value)) {
        currentDate = e.target.value;
      }
    });

    modalBtn.addEventListener("click", () => {
      if (currentNumber === "" || currentDate === "") {
        alert("Пожалуйста, проверьте номер карты!");
      } else {
        ALL_DATA.push({
          id: ID,
          number: currentNumber,
          date: currentDate,
        });

        ID++;
        modalCloser();
        addSingleData(ALL_DATA[ALL_DATA.length - 1]);
        checkHasData(ALL_DATA);
        numberInpt.value = "";
        dateInp.value = "";
        currentNumber = "";
        currentDate = "";
      }
    });

    function addSingleData(cardData) {
      const card = document.createElement("div");
      card.classList.add("card");
      card.id = cardData?.id;
      card.innerHTML = `
      <span>
        <img src="./assets/images/${
          cardData?.number[0] === "5" ? "humo" : "uzcard"
        }.webp" alt="uzcard">
        <p>${cardData?.number}</p>
      </span>
      <i class="fa fa-trash"></i>
    `;
      cardWrapper.appendChild(card);

      const deleteBtn = card.querySelector("i");
      deleteCard(deleteBtn, cardData?.id);
    }

    function deleteCard(btn, id) {
      btn.addEventListener("click", () => {
        ALL_DATA = ALL_DATA.filter((item) => item.id !== id);
        cardWrapper.removeChild(btn.parentElement);
        checkHasData(ALL_DATA);
      });
    }

    function checkHasData(array) {
      if (array.length < 1) {
        emptyCard.style.display = "flex";
        cardWrapper.style.display = "none";
        return;
      }
      cardWrapper.style.display = "flex";
      emptyCard.style.display = "none";
    }

    function modalOpener() {
      document.body.style.overflowY = "hidden";
      modal.classList.replace("deactive", "active");
    }

    function modalCloser() {
      modal.classList.replace("active", "deactive");
      document.body.style.overflowY = "visible";
    }
  }

  // address modal

  const modalOpenBtn = document.querySelector("#addressModalOpener"),
    modalCloseBtn = document.querySelector(".userAddressModal__close"),
    cardWrapper = document.querySelector(".userPanel .content__address"),
    emptyCard = document.querySelector("#emptyUserAddress"),
    modal = document.querySelector(".userAddressModal"),
    modalBtn = modal.querySelector(".userAddressModal__footer button"),
    cityInpt = modal.querySelector("#cityInp"),
    areaInpt = modal.querySelector("#areaInp"),
    streetInpt = modal.querySelector("#streetInp"),
    numHouseInpt = modal.querySelector("#num_houseInp");

  let currentCity = "",
    currentArea = "",
    currentStreet = "",
    currentNumHouse = "",
    ALL_DATA = [],
    ID = 0;

  modalOpenBtn.addEventListener("click", modalOpener);

  modalCloseBtn.addEventListener("click", modalCloser);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modalCloser();
    }
  });

  cityInpt.addEventListener("input", (e) => {
    if (e.target.value) {
      currentCity = e.target.value;
    }
  });
  areaInpt.addEventListener("input", (e) => {
    if (e.target.value) {
      currentArea = e.target.value;
    }
  });
  streetInpt.addEventListener("input", (e) => {
    if (e.target.value) {
      currentStreet = e.target.value;
    }
  });
  numHouseInpt.addEventListener("input", (e) => {
    if (e.target.value) {
      currentNumHouse = e.target.value;
    }
  });

  modalBtn.addEventListener("click", () => {
    if (
      currentCity === "" ||
      currentArea === "" ||
      currentStreet === "" ||
      currentNumHouse === ""
    ) {
      alert("Пожалуйста, проверьте введенные данные!");
    } else {
      ALL_DATA.push({
        id: ID,
        city: currentCity,
        area: currentArea,
        street: currentStreet,
        numHouse: currentNumHouse,
      });

      ID++;
      modalCloser();
      addSingleData(ALL_DATA[ALL_DATA.length - 1]);
      checkHasData(ALL_DATA);
      cityInpt.value = "";
      areaInpt.value = "";
      streetInpt.value = "";
      numHouseInpt.value = "";
      currentCity = "";
      currentArea = "";
      currentStreet = "";
      currentNumHouse = "";
    }
  });

  function addSingleData(cardData) {
    const { city, area, street, numHouse } = cardData;
    cardWrapper.innerHTML += `
      <div class="address">
        <h5>${city}, ${area}, ${street}, ${numHouse}</h5>
      </div>
    `;
  }

  function checkHasData(array) {
    if (array.length < 1) {
      emptyCard.style.display = "flex";
      cardWrapper.style.display = "none";
      return;
    }
    cardWrapper.style.display = "flex";
    emptyCard.style.display = "none";
  }

  function modalOpener() {
    document.body.style.overflowY = "hidden";
    modal.classList.replace("deactive", "active");
  }

  function modalCloser() {
    modal.classList.replace("active", "deactive");
    document.body.style.overflowY = "visible";
  }
});
