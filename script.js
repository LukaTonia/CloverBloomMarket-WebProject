
  var partnerModal = document.getElementById("partnershipModal");
  var partnerBtn = document.querySelector(".partnering");
  var partnerClose = document.getElementsByClassName("close-btn")[0];

  partnerBtn.onclick = function () {
    partnerModal.style.display = "block";
  };
  partnerClose.onclick = function () {
    partnerModal.style.display = "none";
  };

  var vacancyModal = document.getElementById("vacancyModal");

  var vacancyBtn = document.getElementById("vacancy-link");
  var vacancyClose = document.querySelector(".vacancy-close");

  vacancyBtn.onclick = function (event) {
    event.preventDefault();
    vacancyModal.style.display = "block";
  };
  vacancyClose.onclick = function () {
    vacancyModal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == partnerModal) {
      partnerModal.style.display = "none";
    }
    if (event.target == vacancyModal) {
      vacancyModal.style.display = "none";
    }
  };

