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
});