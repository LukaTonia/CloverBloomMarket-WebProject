
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

var bottomPartnerBtn = document.getElementById("bottomPartnerBtn");
  
  bottomPartnerBtn.onclick = function() {
    partnerModal.style.display = "block";
}
  

function handleFormSubmit(event, formName) {
  event.preventDefault(); 

 
  const btn = event.target.querySelector('button');
  const originalText = btn.innerText;
  btn.innerText = "იგზავნება..."; 
  btn.disabled = true;


  setTimeout(() => {
    alert(`მადლობა! თქვენი ${formName} წარმატებით გაიგზავნა.`);
    event.target.reset();
    btn.innerText = originalText;
    btn.disabled = false;
    
   
    document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
  }, 1500);
}


const partnerForm = document.querySelector('#partnershipModal form');
if (partnerForm) {
    partnerForm.addEventListener('submit', (e) => handleFormSubmit(e, 'მოთხოვნა'));
    
}

const vacancyForm = document.querySelector('#vacancyModal form');
if (vacancyForm) {
    vacancyForm.addEventListener('submit', (e) => handleFormSubmit(e, 'განაცხადი'));
}

const newsletterForm = document.querySelector('.footer-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault(); 

            const input = this.querySelector('input');
            const btn = this.querySelector('button');
            
          
            if(input.value.trim() === "") return;

        
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
