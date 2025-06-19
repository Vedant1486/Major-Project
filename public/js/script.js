(() => {
    "use strict";
  
    // Select all forms that require validation
    const forms = document.querySelectorAll(".needs-validation");
  
    // Loop over each form and prevent submission if invalid
    Array.from(forms).forEach((form) => {
      form.addEventListener("submit", (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
  
        form.classList.add("was-validated");
      });
    });
  })();
  