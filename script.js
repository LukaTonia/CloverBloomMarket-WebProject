document.addEventListener("DOMContentLoaded", function () {


 
  var partnerModal = document.getElementById("partnershipModal");
  
  var partnerBtns = document.querySelectorAll(".partnering, #bottomPartnerBtn");
  var partnerClose = partnerModal.querySelector(".close-btn");

  partnerBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      partnerModal.style.display = "block";
    });
  });

 
  partnerClose.addEventListener("click", () => {
    partnerModal.style.display = "none";
  });


  var vacancyModal = document.getElementById("vacancyModal");
 
  var vacancyLinks = document.querySelectorAll(".vacancy-trigger");
  var vacancyClose = vacancyModal.querySelector(".vacancy-close");

  
  vacancyLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault(); 
      vacancyModal.style.display = "block";
    });
  });

  
  vacancyClose.addEventListener("click", () => {
    vacancyModal.style.display = "none";
  });

 
  window.addEventListener("click", (event) => {
    if (event.target == partnerModal) {
      partnerModal.style.display = "none";
    }
    if (event.target == vacancyModal) {
      vacancyModal.style.display = "none";
    }
  });

 

  function handleFormSubmit(event, formName) {
    event.preventDefault();

    const btn = event.target.querySelector("button");
    const originalText = btn.innerText;
    
    
    btn.innerText = "იგზავნება...";
    btn.disabled = true;

    setTimeout(() => {
      alert(`მადლობა! თქვენი ${formName} წარმატებით გაიგზავნა.`);
      event.target.reset();
      btn.innerText = originalText;
      btn.disabled = false;

    
      document.querySelectorAll(".modal").forEach((m) => (m.style.display = "none"));
    }, 1500);
  }

  const partnerForm = document.querySelector("#partnershipModal form");
  if (partnerForm) {
    partnerForm.addEventListener("submit", (e) =>
      handleFormSubmit(e, "მოთხოვნა")
    );
  }

  
  const vacancyForm = document.querySelector("#vacancyModal form");
  if (vacancyForm) {
    vacancyForm.addEventListener("submit", (e) =>
      handleFormSubmit(e, "განაცხადი")
    );
  }

  
  const newsletterForm = document.querySelector(".footer-form");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const input = this.querySelector("input");
      const btn = this.querySelector("button");

      if (input.value.trim() === "") return;

      const originalHTML = btn.innerHTML;
     
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
      btn.disabled = true;

      setTimeout(() => {
        alert("გამოწერა წარმატებულია");
        input.value = "";
        btn.innerHTML = originalHTML;
        btn.disabled = false;
      }, 1000);
    });
  }
});