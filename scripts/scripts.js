window.addEventListener("DOMContentLoaded", () => {
  const app = new App();
  app.fetchSubjects();
  const utilities = new Utilities();
  utilities.themeInitOnLoad();
});

class Elements {
  static #constants = null;

  static constantInit() {
    if (this.#constants) return this.#constants;
    this.#constants = {
      themeSwitch: document.getElementById("theme-switch"),
      subjectList: document.querySelector("#subject-list"),
      homePage: document.querySelector("#home-page"),
      quizPage: document.querySelector("#quiz-page"),
      resultPage: document.querySelector("#result-page"),
      rowTopLogo: document.querySelector(".row-top__logo"),
      rowTopSubjectName: document.querySelector(".row-top__subject-name"),
      resultPageSubject: document.querySelector(".result-page__subject"),
      resultPageFinalScore: document.querySelector(".result-page__final-score"),
      resultPageTotal: document.querySelector(".result-page__total"),
      resultPageRestartBtn: document.querySelector(".result-page__restart-btn"),
    };

    return this.#constants;
  }

  static get constants() {
    return this.constantInit();
  }
}

class ApiActions {
  constructor() {
    this.API_URL = "./api/quizzes.json"; // Ensure the correct path to the API
  }

  async fetchData(endpoint) {
    try {
      const response = await fetch(`${this.API_URL}${endpoint}`);
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      return await response.json();
    } catch (error) {
      return [];
    }
  }

  async getSubjects() {
    return await this.fetchData("");
  }

  async getQuizzes(subjectId) {
    const subjects = await this.getSubjects();
    const quizzes = subjects.find((subject) => subject.id === subjectId);
    return quizzes ? quizzes.questions : [];
  }
}

class Utilities {
  themeInitOnLoad() {
    this.initThemeToggle();
  }

  initThemeToggle() {
    const themeSwitch = Elements.constants.themeSwitch;
    if (themeSwitch) {
      // Check for saved theme preference
      const savedTheme = localStorage.getItem("theme") || "light";
      const lightModeIcon = document.querySelector(".theme-switch__sun-box");
      const darkModeIcon = document.querySelector(".theme-switch__moon-box");

      if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        themeSwitch.checked = true;

        // Set initial icons for dark mode
        if (lightModeIcon && darkModeIcon) {
          lightModeIcon.innerHTML = /*html*/ `<img src="./assets/icons/icon-sun-light.svg" alt="sun in dark mode">`;
          darkModeIcon.innerHTML = /*html*/ `<img src="./assets/icons/icon-moon-light.svg" alt="moon in dark mode">`;
        }
      } else {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light");
        themeSwitch.checked = false;

        // Set initial icons for light mode
        if (lightModeIcon && darkModeIcon) {
          lightModeIcon.innerHTML = /*html*/ `<img src="./assets/icons/icon-sun-dark.svg" alt="sun in light mode">`;
          darkModeIcon.innerHTML = /*html*/ `<img src="./assets/icons/icon-moon-dark.svg" alt="moon in light mode">`;
        }
      }

      // Add event listener for theme toggle
      themeSwitch.addEventListener("change", () => {
        this.toggleTheme(themeSwitch.checked);
      });
    }
  }

  toggleTheme(isDark) {
    const lightModeIcon = document.querySelector(".theme-switch__sun-box");
    const darkModeIcon = document.querySelector(".theme-switch__moon-box");

    if (isDark) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");

      // Update icons for dark mode
      lightModeIcon.innerHTML = /*html*/ `<img src="./assets/icons/icon-sun-light.svg" alt="sun in dark mode">`;
      darkModeIcon.innerHTML = /*html*/ `<img src="./assets/icons/icon-moon-light.svg" alt="moon in dark mode">`;
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");

      // Update icons for light mode
      lightModeIcon.innerHTML = /*html*/ `<img src="./assets/icons/icon-sun-dark.svg" alt="sun in light mode">`;
      darkModeIcon.innerHTML = /*html*/ `<img src="./assets/icons/icon-moon-dark.svg" alt="moon in light mode">`;
    }
  }
}

class App {
  constructor() {
    this.apiActions = new ApiActions();
    const Constants = Elements.constants;
  }

  async fetchSubjects() {
    const subjectList = Elements.constants.subjectList;
    if (!subjectList) {
      return;
    }

    subjectList.innerHTML = "";
    const subjects = await this.apiActions.getSubjects();
    subjects.forEach((subject) => {
      const subjectItem = document.createElement("li");
      subjectItem.classList.add("home-page__subject-item");

      const subjectButton = document.createElement("button");
      subjectButton.id = subject.id;
      subjectButton.classList.add("home-page__subject-button");

      const iconWrapper = document.createElement("div");
      iconWrapper.classList.add("button-icon");
      iconWrapper.innerHTML = /*html*/ `<img class="subject-icon" src="./assets/icons/${subject.icon}.svg" />`;

      const textContent = document.createElement("span");
      textContent.textContent = subject.category;

      subjectButton.addEventListener("click", () => {
        this.fetchQuizzes(subject.id);
        this.showLogoBasedOnSubject(subject.id);
      });

      subjectButton.appendChild(iconWrapper);
      subjectButton.appendChild(textContent);
      subjectItem.appendChild(subjectButton);
      subjectList.appendChild(subjectItem);
    });
  }

  async showLogoBasedOnSubject(subjectId) {
    const subjects = await this.apiActions.getSubjects();
    const sub = subjects.find((subject) => subject.id === subjectId).icon;
    const subName = subjects.find(
      (subject) => subject.id === subjectId
    ).category;
    const logo = Elements.constants.rowTopLogo;
    logo.classList.remove("row-top__logo--hidden");
    logo.innerHTML = /*html*/ `<img class="subject-icon" src="./assets/icons/${sub}.svg" /><span class="row-top__subject-name">${subName}</span>`;
  }

  async fetchQuizzes(subjectId) {
    const homePage = Elements.constants.homePage;
    const quizPage = Elements.constants.quizPage;
    if (!homePage || !quizPage) {
      return;
    }
    homePage.classList.add("article-container--hidden");
    quizPage.classList.remove("article-container--hidden");
    quizPage.innerHTML = "";

    let currentQuiz = 1;
    let correctAnswers = 0;

    const quizzes = await this.apiActions.getQuizzes(subjectId);

    const renderQuiz = (quizIndex) => {
      const quiz = quizzes[quizIndex - 1];

      quizPage.innerHTML = /*HTML*/ `
        <form class="quiz-form quiz-form--active article-container" id="quiz-${subjectId}-${
        quiz.id
      }">
          <div class="quiz-form__left-side article-container__content-wrapper">
            <div class="quiz-form__question-wrapper">
              <p class="quiz-form__current-question">Question ${currentQuiz} of ${
        quizzes.length
      }</p>
              <h2 class="quiz-form__question-problem">${escapeHtml(
                quiz.question
              )}</h2>
            </div>
            <div class="quiz-form__progress-bar--full">
              <div class="quiz-form__progress-bar--fill" style="width: ${
                (currentQuiz / quizzes.length) * 100
              }%"></div>
            </div>
          </div>
          <div class=" article-container__content-wrapper">
            <ul class="quiz-form__options">${quiz.options
              .map(
                (choice, index) => /*html*/ `
              <li class="quiz-form__option-wrapper">
                <label for="choice-${subjectId}-${
                  quiz.id
                }-${index}" class="quiz-form__option">
                  <div class="quiz-form__letter">${indexToLetter(index)}</div>
                  <div>${escapeHtml(choice)}</div>
                  <input
                    type="radio"
                    id="choice-${subjectId}-${quiz.id}-${index}"
                    name="question-${quiz.id}"
                    value="${index}"
                    aria-label="quiz option">
                  <span class="quiz-form__result"></span>
                </label>
              </li>
              `
              )
              .join("")}
              <button class="quiz-form__submit-button">Submit</button>
              <div class="quiz-form__select-prompt quiz-form__select-prompt--hidden">
                <img src="./assets/icons/icon-error.svg" alt="error icon" />
                <p class="select-prompt-text">Please select an answer</p>
              </div>
            </ul>
          </div> 
        </form>
      `;

      const form = document.querySelector(`#quiz-${subjectId}-${quiz.id}`);
      const submitButton = form.querySelector(".quiz-form__submit-button");
      const getAllOptions = form.querySelectorAll("input[type=radio]");
      const optionResults = form.querySelectorAll(".quiz-form__result");
      const letters = form.querySelectorAll(".quiz-form__letter");
      const selectPrompt = form.querySelector(".quiz-form__select-prompt");

      form.addEventListener("change", () => {
        this.onSelectOption();
      });
      form.addEventListener("submit", (event) => {
        //Check if selected option is correct by comparing its index to quiz.answer (answer is an index, start with 0)
        event.preventDefault();
        const formData = new FormData(form);
        const selectedAnswer = formData.get(`question-${quiz.id}`);

        if (!selectedAnswer) {
          selectPrompt.classList.remove("quiz-form__select-prompt--hidden");
          return;
        } else {
          selectPrompt.classList.add("quiz-form__select-prompt--hidden");
        }
        const correctAnswer = quiz.answer;
        if (parseInt(selectedAnswer) === correctAnswer) {
          correctAnswers++;
        }

        letters.forEach((letter, index) => {
          if (index === correctAnswer) {
            letter.classList.add("quiz-form__letter--correct");
          } else {
            letter.classList.add("quiz-form__letter--incorrect");
          }
        });

        getAllOptions.forEach((option, index) => {
          if (index === correctAnswer) {
            option.parentElement.classList.add("quiz-form__option--correct");
          } else {
            option.parentElement.classList.add("quiz-form__option--incorrect");
          }
          option.disabled = true;
        });

        // Assign class to correct option and incorrect options

        // Show correct or incorrect to quiz-result span no matter what option user selected
        optionResults.forEach((result, index) => {
          if (index === correctAnswer) {
            result.innerHTML = `<img src="./assets/icons/icon-correct.svg" alt="correct">`;
          } else {
            result.innerHTML = `<img src="./assets/icons/icon-incorrect.svg" alt="incorrect">`;
          }
        });

        //Submit button function to show next question
        submitButton.textContent = "Next Question";
        submitButton.classList.add("next-button");
        submitButton.classList.remove("submit-button");
        this.onSelectOption();

        //When user click next question, they will see the next question
        submitButton.addEventListener(
          "click",
          () => {
            currentQuiz++;
            if (currentQuiz <= quizzes.length) {
              renderQuiz(currentQuiz);
            } else {
              this.showResult(correctAnswers, subjectId);
            }
          },
          { once: true }
        );
      });
    };

    renderQuiz(currentQuiz);
  }

  onSelectOption() {
    const selectedLabels = document.querySelectorAll(".quiz-form__option");
    selectedLabels.forEach((label) => {
      const input = label.querySelector("input[type=radio]");
      const letter = label.querySelector(".quiz-form__letter");
      if (input && input.checked) {
        label.classList.add("quiz-form__option--selected");
        letter.classList.add("quiz-form__letter--selected");
      } else {
        label.classList.remove("quiz-form__option--selected");
        letter.classList.remove("quiz-form__letter--selected");
      }
    });
  }

  async showResult(correctAnswers, subjectId) {
    // Add subjectId parameter
    const quizPage = Elements.constants.quizPage;
    const resultPage = Elements.constants.resultPage;

    if (!quizPage || !resultPage) {
      return;
    }

    // Hide quiz page and show result page
    quizPage.classList.add("article-container--hidden");
    resultPage.classList.remove("article-container--hidden");

    // Get current subject icon from the header
    const headerIconElement =
      Elements.constants.rowTopLogo.querySelector(".subject-icon");
    const headerSubjectElement = Elements.constants.rowTopLogo.querySelector(
      ".row-top__subject-name"
    );

    if (headerIconElement && headerSubjectElement) {
      // Extract the src attribute from the headerIconElement
      const headerIconSrc = headerIconElement.getAttribute("src");
      const headerSubjectText = headerSubjectElement.textContent;

      // Update result page subject icon and name
      const resultPageSubject = Elements.constants.resultPageSubject;
      resultPageSubject.innerHTML = /*html*/ `<img class="subject-icon" src="${headerIconSrc}" /><span class="row-top__subject-name">${headerSubjectText}</span>`;
    }
    // Update score
    const finalScore = Elements.constants.resultPageFinalScore;
    const totalQuestions = Elements.constants.resultPageTotal;
    const quizzes = await this.apiActions.getQuizzes(subjectId); // Now subjectId is available

    if (finalScore && totalQuestions && quizzes) {
      finalScore.textContent = correctAnswers;
      totalQuestions.textContent = quizzes.length;
    }

    // Add event listener to restart button
    const restartButton = Elements.constants.resultPageRestartBtn;
    if (restartButton) {
      restartButton.addEventListener("click", () => {
        // Reset pages
        resultPage.classList.add("article-container--hidden");
        const homePage = Elements.constants.homePage;
        if (homePage) {
          homePage.classList.remove("article-container--hidden");
        }
        // Reset logo
        const logo = Elements.constants.rowTopLogo;
        if (logo) {
          logo.classList.add("row-top__logo--hidden");
        }
      });
    }
  }
}

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function indexToLetter(index) {
  return String.fromCharCode(65 + index);
}

function manageFocus(element) {
  // Set focus to the first interactive element in the new view
  setTimeout(() => {
    const focusableElement = element.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusableElement) {
      focusableElement.focus();
    }
  }, 100);
}
