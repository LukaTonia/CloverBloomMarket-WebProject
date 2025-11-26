
  //--პარტნიორიობის ლოგიკა
  var partnerModal = document.getElementById("partnershipModal");
  var partnerBtn = document.querySelector(".partnering");
  var partnerClose = document.getElementsByClassName("close-btn")[0];

  // პარტნიორიობის გახსნა
  partnerBtn.onclick = function () {
    partnerModal.style.display = "block";
  };
  // პარტნიორიობის დახურვა
  partnerClose.onclick = function () {
    partnerModal.style.display = "none";
  };

  // ვაკანსიის ლოგიკა
  var vacancyModal = document.getElementById("vacancyModal");

  var vacancyBtn = document.getElementById("vacancy-link");
  var vacancyClose = document.querySelector(".vacancy-close");

  // ვაკანსიის გახსნა
  vacancyBtn.onclick = function (event) {
    event.preventDefault();
    vacancyModal.style.display = "block";
  };
  // ვაკანსიის დახურვა
  vacancyClose.onclick = function () {
    vacancyModal.style.display = "none";
  };

  //თუ ეკრანზე დავაჭერთ უბრალოდ ფანჯარა რომ დაიხუროს
  window.onclick = function (event) {
    if (event.target == partnerModal) {
      partnerModal.style.display = "none";
    }
    if (event.target == vacancyModal) {
      vacancyModal.style.display = "none";
    }
  };

