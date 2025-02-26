// Add event listener to button upon page load
window.addEventListener("DOMContentLoaded", (event) => {
  console.log("Page loaded!");
  const formValidation = new FormValidation();
  formValidation.functionInit();
  showToastOnSuccess();
});

class Constants {
  static get firstName() {
    return document.getElementById("first-name");
  }
  static get lastName() {
    return document.getElementById("last-name");
  }
  static get email() {
    return document.getElementById("email");
  }
  static get checkedQuery() {
    return document.getElementsByName("query-type");
  }
  static get message() {
    return document.getElementById("message");
  }
  static get consent() {
    return document.getElementById("consent");
  }
  static get submit() {
    return document.getElementById("submit");
  }
  static get errorDialog() {
    // Query all elements with class name "error"
    return document.getElementsByClassName("form-group__error");
  }
}

class FormValidation {
  constructor() {
    // Initialize all above constants in Constants class
    this.firstName = Constants.firstName;
    this.lastName = Constants.lastName;
    this.email = Constants.email;
    this.message = Constants.message;
    this.checkedQuery = Constants.checkedQuery;
    this.consent = Constants.consent;
    this.errorDialogs = Array.from(Constants.errorDialog); // Create an aray from selected elements
    this.submit = Constants.submit;

    // Initialize an object for text fields for more convenient
    this.form = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      message: this.message,
    };

    // Initialize error messages
    this.errorMessage = {
      firstName: "This field is required",
      lastName: "This field is required",
      email: "This field is required",
      query: "Please select a query type",
      message: "This field is required",
      consent: "To submit this form, please consent to being contacted",
    };
  }

  functionInit() {
    // This will be parsed to the main function when page is loaded
    this.setupInputValidation();
    this.setupQueryTypeValidation();
    this.setupConsentValidation();
    this.setupSubmitHandler();
  }

  // Setup field validation
  setupInputValidation() {
    for (const key in this.form) {
      const input = this.form[key];
      const errorElement = this.getErrorElement(input.id);

      input.addEventListener("focusout", () => {
        this.fieldValidCheck(key, input, errorElement);
      });
      input.addEventListener("focusin", () => {
        errorElement.style.display = "none";
      });
    }
  }

  setupQueryTypeValidation() {
    const querryErrorElement = this.getErrorElement("query-type");
    this.checkedQuery.forEach((query) => {
      query.addEventListener("change", () => {
        // Whether the query is checked or not, if checked, hide the error message
        querryErrorElement.style.display = query.checked ? "none" : "block";
      });
    });
  }

  setupConsentValidation() {
    const consentErrorElement = this.getErrorElement("consent");
    this.consent.addEventListener("change", () => {
      consentErrorElement.style.display = this.consent.checked
        ? "none"
        : "block";
    });
  }

  // Setup submit handler

  setupSubmitHandler() {
    this.submit.addEventListener("click", (e) => {
      e.preventDefault();
      if (this.validateForm()) {
        this.submitForm();
      }
    });
  }

  // Utility functions

  getErrorElement(inputId) {
    return this.errorDialogs.find(
      (error) => error.getAttribute("data-for") === inputId
    );
  }

  fieldValidCheck(key, input, errorElement) {
    if (!input.value.trim()) {
      errorElement.textContent = this.errorMessage[key];
      errorElement.style.display = "block";
      console.log(`Please enter your ${key}`);
      return false;
    } else if (key === "email" && !this.isValidEmail(input.value.trim())) {
      errorElement.textContent = "Please enter a valid email address";
      errorElement.style.display = "block";
      console.log("Please enter a valid email address");
      return false;
    } else {
      errorElement.style.display = "none";
      return true;
    }
  }

  isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // Main functions
  validateForm() {
    let isValid = true; // Assume the form is valid

    for (const key in this.form) {
      const input = this.form[key];
      const errorElement = this.getErrorElement(input.id);
      if (!this.fieldValidCheck(key, input, errorElement)) {
        isValid = false; // Return failed if any field is invalid
      }
    }

    const queryErrorElement = this.getErrorElement("query-type");
    const selectedQuery = Array.from(this.checkedQuery).some(
      (query) => query.checked
    );

    if (!selectedQuery) {
      queryErrorElement.textContent = this.errorMessage.query;
      queryErrorElement.style.display = "block";
      console.log("Please select a query type");
      isValid = false; // Return failed if no query type is selected
    }

    const consentErrorElement = this.getErrorElement("consent");
    if (!this.consent.checked) {
      consentErrorElement.textContent = this.errorMessage.consent;
      consentErrorElement.style.display = "block";
      console.log("To submit this form, please consent to being contacted");
      isValid = false; // Return failed if consent is not checked
    }

    return isValid;
  }

  submitForm() {
    console.log("Form submitted!");
    const submittedInfo = {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      email: this.email.value,
      query: Array.from(this.checkedQuery).find((query) => query.checked).value,
      message: this.message.value,
    };
    localStorage.setItem("submittedInfo", JSON.stringify(submittedInfo));
    localStorage.setItem("showToast", true);
    window.location.reload();
  }
}

function showToastOnSuccess() {
  const showToast = localStorage.getItem("showToast");
  if (showToast) {
    const toast = document.getElementById("toast");
    setTimeout(() => {
      toast.classList.remove("toast--hidden");
    }, 10);

    setTimeout(() => {
      toast.classList.add("toast--hidden");
      localStorage.removeItem("showToast");
    }, 4000);
  } else {
    toast.classList.add("toast--hidden");
  }
}
