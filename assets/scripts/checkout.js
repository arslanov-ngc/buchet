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

  // yandex map

  const lat = 40.757441,
    long = 72.353742,
    zoom = 16.5;
  const mapSelect = document.getElementById("mapSelect");

  ymaps.ready(init);

  function init() {
    let myPlacemark,
      detectedPlaceName,
      myMap = new ymaps.Map(
        "yandexMap",
        {
          center: [lat, long],
          zoom: zoom,
        },
        {
          searchControlProvider: "yandex#search",
        }
      );

    // Listening for a click on the map
    myMap.events.add("click", function (e) {
      let coords = e.get("coords");

      // Moving the placemark if it was already created
      if (myPlacemark) {
        myPlacemark.geometry.setCoordinates(coords);
      }
      // Otherwise, creating it.
      else {
        myPlacemark = createPlacemark(coords);
        myMap.geoObjects.add(myPlacemark);
        // Listening for the dragging end event on the placemark.
        myPlacemark.events.add("dragend", function () {
          getAddress(myPlacemark.geometry.getCoordinates());
        });
      }
      getAddress(coords);
    });

    // Creating a placemark
    function createPlacemark(coords) {
      return new ymaps.Placemark(
        coords,
        {
          iconCaption: "Идет поиск...",
        },
        {
          preset: "islands#yellowDotIconWithCaption",
          draggable: true,
        }
      );
    }

    // Determining the address by coordinates (reverse geocoding).
    function getAddress(coords) {
      myPlacemark.properties.set("iconCaption", "Идет поиск...");
      ymaps.geocode(coords).then(function (res) {
        let firstGeoObject = res.geoObjects.get(0);
        detectedPlaceName = firstGeoObject.getAddressLine();
        mapSelect[0].innerText = detectedPlaceName;
        mapSelect[0].value = detectedPlaceName;

        myPlacemark.properties.set({
          // Forming a string with the object's data.
          iconCaption: [
            // The name of the municipality or the higher territorial-administrative formation.
            firstGeoObject.getLocalities().length
              ? firstGeoObject.getLocalities()
              : firstGeoObject.getAdministrativeAreas(),
            // Getting the path to the toponym; if the method returns null, then requesting the name of the building.
            firstGeoObject.getThoroughfare() || firstGeoObject.getPremise(),
          ]
            .filter(Boolean)
            .join(", "),
          // Specifying a string with the address of the object as the balloon content.
          balloonContent: firstGeoObject.getAddressLine(),
        });
      });
    }
  }
});
