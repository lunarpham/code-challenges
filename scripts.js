window.addEventListener("DOMContentLoaded", (event) => {
  console.log("Page loaded!");
  const multistepForm = new MultistepForm();
  multistepForm.formInit();
});

class Elements {
  static #constants = null;

  static constantInit() {
    if (this.#constants) return this.#constants;
    this.#constants = {
      continueButton: document.querySelector("#continue-button"),
      fullName: document.querySelector("#full-name"),
      email: document.querySelector("#email"),
      formStep1: document.querySelector("#form-1"),
      formStep2: document.querySelector("#form-2"),
      formStep3: document.querySelector("#form-3"),
      numberOfSteps: document.querySelectorAll(".form-wrapper").length,
      formSteps: document.querySelectorAll(".form-wrapper"),
      selectedLabels: document.querySelectorAll(".form-step2__label"),
      checkboxes: document.querySelectorAll(".form-step2__select-option"),
      form1Sumary: document.querySelector("#form1-summary"),
      form2Sumary: document.querySelector("#form2-summary"),
      stepIndicator: document.querySelector(".indicator__current-step"),
      indicatorCircles: document.querySelectorAll(".indicator__circle"),
    };

    return this.#constants;
  }

  static get constants() {
    return this.constantInit();
  }
}

class MultistepForm {
  constructor() {
    const constants = Elements.constants;
    // Form wrappers
    this.formStep1 = constants.formStep1;
    this.formStep2 = constants.formStep2;
    this.formStep3 = constants.formStep3;

    // Form inputs
    // Form 1 Elements
    this.fullName = constants.fullName;
    this.email = constants.email;

    // Form 2 Elements
    this.selectedLabels = Array.from(constants.selectedLabels);
    this.checkboxes = Array.from(constants.checkboxes);
    this.selectedOptions = [];

    // Form 3 Elements
    this.form1Sumary = constants.form1Sumary;
    this.form2Sumary = constants.form2Sumary;

    // Indicator Elements
    this.numberOfSteps = constants.numberOfSteps;
    this.formSteps = Array.from(constants.formSteps);
    this.stepIndicator = constants.stepIndicator;
    this.indicatorCircles = Array.from(constants.indicatorCircles);
  }

  // Initialize the form
  formInit() {
    this.eventListeners();
    this.updateUI();
  }

  eventListeners() {
    this.initFunctionsForStep1();
    this.initFunctionsForStep2();
    this.initFunctionsForStep3();
  }

  // Initialize functions for each step

  initFunctionsForStep1() {
    this.formStep1.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!this.isValidEmail(this.email.value)) {
        alert("Please provide a valid email!");
      } else {
        const formData = {
          fullName: this.fullName.value,
          email: this.email.value,
        };
        this.saveToLocalStorage("formData", formData);
        this.moveToStep(2);
        this.updateUI();
      }
    });
  }

  initFunctionsForStep2() {
    this.selectionInspector();
    this.formStep2.addEventListener("submit", (event) => {
      event.preventDefault();
      if (this.selectedOptions.length === 0) {
        alert("Please select at least one topic!");
      } else {
        this.saveToLocalStorage("selectedOptions", this.selectedOptions);
        this.moveToStep(3);
        this.updateUI();
        this.displaySavedData();
      }
    });
  }

  initFunctionsForStep3() {
    this.formStep3.addEventListener("submit", (event) => {
      event.preventDefault();
      alert("✅ Success");
      this.clearLocalStorage();
      window.location.reload();
      this.updateUI();
    });
  }

  moveToStep(step) {
    if (step > this.numberOfSteps) {
      return;
    }
    const currentStep = document.querySelector(`#form-${step - 1}`);
    const nextStep = document.querySelector(`#form-${step}`);
    currentStep.classList.add("form-wrapper--hidden");
    nextStep.classList.remove("form-wrapper--hidden");
  }

  onSelectionChange() {
    let selectedOptions = [];

    // Process each label element
    this.selectedLabels.forEach((option) => {
      const checkbox = option.querySelector("input[type='checkbox']");

      if (checkbox && checkbox.checked) {
        option.classList.add("form-step2__label--checked");
        selectedOptions.push(checkbox.value);
      } else {
        option.classList.remove("form-step2__label--checked");
      }
    });

    this.selectedOptions = selectedOptions;

    // Log the new selected options
    console.log("Selected topics:", this.selectedOptions);
  }

  selectionInspector() {
    this.checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", this.onSelectionChange.bind(this));
    });

    this.onSelectionChange();
  }

  trackCurrentStep() {
    let currentStep = 1; // Default to step 1

    this.formSteps.forEach((step, index) => {
      if (!step.classList.contains("form-wrapper--hidden")) {
        currentStep = index + 1;
      }
    });

    return currentStep; // Return the current step number
  }

  updateIndicator(currentStep) {
    if (!currentStep) {
      currentStep = this.trackCurrentStep();
    }

    this.stepIndicator.textContent = `Step ${currentStep} of ${this.numberOfSteps}`;

    this.indicatorCircles.forEach((circle, index) => {
      circle.classList.remove(
        "indicator__circle--active",
        "indicator__circle--current"
      );

      if (index + 1 === currentStep) {
        circle.classList.add(
          "indicator__circle--active",
          "indicator__circle--current"
        );
      } else if (index + 1 < currentStep) {
        circle.classList.add("indicator__circle--active");
      }
    });
  }

  updateUI() {
    this.trackCurrentStep();
    this.updateIndicator();
  }

  displaySavedData() {
    const formData = this.getFromLocalStorage("formData");
    const selectedOptions = this.getFromLocalStorage("selectedOptions");

    console.log("Form data:", formData);
    console.log("Selected options:", selectedOptions);

    this.form1Sumary.innerHTML = `<p class="form-step3__s1-info">
              Name:
              <span class="form-step3__s1-info--highlight">${
                formData ? formData.fullName : "NaN"
              }</span>
            </p>
            <p class="form-step3__s1-info">
              Email:
              <span class="form-step3__s1-info--highlight">${
                formData ? formData.email : "NaN"
              }</span>
            </p>`;

    this.form2Sumary.innerHTML = "";
    this.selectedOptions.forEach((option) => {
      const listItem = document.createElement("li");
      listItem.classList.add("form-step3__s2-item");
      const markerDot = document.createElement("span");
      markerDot.className = "marker-dot";
      markerDot.textContent = "·";

      listItem.appendChild(markerDot);
      listItem.appendChild(document.createTextNode(option));

      this.form2Sumary.appendChild(listItem);
    });
  }

  saveToLocalStorage(key, value) {
    try {
      localStorage.setItem(
        key,
        typeof value === "string" ? value : JSON.stringify(value)
      );
    } catch (error) {
      console.error("Error saving to local storage:", error);
    }
  }

  getFromLocalStorage(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Error getting from local storage:", error);
    }
  }

  clearLocalStorage() {
    try {
      localStorage.clear();
    } catch (error) {
      console.error("Error clearing local storage:", error);
    }
  }

  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}
