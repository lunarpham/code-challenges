import { DefaultConfig } from "./constants/config.js";
import { Elements } from "./constants/elements.js";

window.addEventListener("DOMContentLoaded", () => {
  const app = new App();
  app.runOnDOMLoad();
});

class App {
  constructor() {
    this.config = DefaultConfig;
    this.elements = Elements;
  }

  runOnDOMLoad() {
    this.fetchOnDOMLoad();
    this.fetchByInputUsername();
    this.themeInitOnLoad();
    this.toggleTheme();
  }

  /*Setup functions*/
  // Fetch default user on DOM load
  async fetchOnDOMLoad() {
    const defaultUser = await this.sendRequest(this.config.username);
    if (!defaultUser.ok) {
      return;
    }
    this.displayOnUI(defaultUser.json());
  }

  async fetchByInputUsername() {
    this.elements.searchForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const username = this.elements.searchInput.value.trim();
      const user = await this.sendRequest(username);
      if (!user.ok) {
        this.elements.searchError.classList.remove("search-bar__error--hidden");
        return;
      }
      this.displayOnUI(user.json());
      this.elements.searchError.classList.add("search-bar__error--hidden");
    });
  }

  // Send request to GitHub API
  async sendRequest(username) {
    try {
      const options = {
        headers: {},
      };

      // Add token to headers if it exists
      // Token stored in Token class in token.js
      if (
        this.config.githubReadToken &&
        this.config.githubReadToken.trim() !== ""
      ) {
        options.headers.Authorization = `token ${this.config.githubReadToken}`;
      }

      const response = await fetch(
        `${this.config.apiURL}/${username}`,
        options
      );

      return response;
    } catch (error) {
      console.error(error);
    }
  }

  // Display user data on UI
  async displayOnUI(userResponse) {
    const user = await userResponse;
    this.elements.avatar.src = user.avatar_url;
    this.elements.displayName.innerText = user.name;
    this.elements.username.innerText = `@${user.login}`;
    this.elements.username.href = user.login
      ? `${this.config.githubURL}/${user.login}`
      : "#";
    this.elements.joinDate.innerText = `Joined ${this.convertToAmericanShortDatetime(
      user.created_at
    )}`;
    this.elements.bio.innerText = user.bio
      ? user.bio
      : "This profile has no bio";
    this.elements.repos.innerText = user.public_repos;
    this.elements.followers.innerText = user.followers;
    this.elements.following.innerText = user.following;

    const socialInfo = {
      location: {
        label: user.location ? user.location : "Not Available",
        url: user.location
          ? `https://www.google.com/maps/search/?api=1&query=${this.convertStringForSearch(
              user.location
            )}`
          : "#",
      },
      website: {
        label: user.blog ? user.blog : "Not Available",
        url: user.blog ? user.blog : "#",
      },
      twitter: {
        label: user.twitter_username ? user.twitter_username : "Not Available",
        url: user.twitter_username
          ? `https://x.com/${user.twitter_username}`
          : "#",
      },
      workplace: {
        label: user.company ? user.company : "Not Available",
        url: user.company
          ? `${this.config.githubURL}/${this.convertStringForURL(user.company)}`
          : "#",
      },
    };

    for (const [key, value] of Object.entries(socialInfo)) {
      const thisElement = this.elements[key];
      const thisElementLabel = thisElement.querySelector("span");
      const thisElementLink = thisElement.querySelector("a");
      thisElementLabel.innerText = value.label;
      thisElementLink.href = value.url;
      if (thisElementLabel.innerText === "Not Available") {
        this.elements[key].classList.add("social-info__item--not-found");
      } else {
        this.elements[key].classList.remove("social-info__item--not-found");
      }
    }
  }

  // Initialize theme on DOM load
  themeInitOnLoad() {
    const colorTheme = this.config.theme;
    if (colorTheme === "dark") {
      this.elements.app.classList.add("dark-mode");
      this.elements.themeSwitch.checked = true;
    } else {
      this.elements.app.classList.remove("dark-mode");
    }
    this.themeSwitchButtonChange();
  }

  // Toggle theme on button click
  toggleTheme() {
    this.elements.themeSwitch.addEventListener("click", () => {
      this.elements.app.classList.toggle("dark-mode");
      this.themeSwitchButtonChange();
    });
  }

  // Change state of theme switch button based on current theme
  themeSwitchButtonChange() {
    if (this.elements.app.classList.contains("dark-mode")) {
      this.elements.themeSwitch.querySelector("p").innerText = "Light";
    } else {
      this.elements.themeSwitch.querySelector("p").innerText = "Dark";
    }
  }

  // Remove spaces and commas from string for search
  convertStringForSearch(inputString) {
    return inputString.replace(/,\s*/g, "").replace(/\s+/g, "+");
  }

  // Replace @ in workplace when passed as a URL
  convertStringForURL(inputString) {
    return inputString.replace("@", "");
  }

  //Convert ISO 8601 Datetime format to American short datetime format (DD MMM YYYY, eg: 13 Mar 2025)
  convertToAmericanShortDatetime(isoString) {
    const timeString = new Date(isoString);
    const monthsInShort = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const day = timeString.getUTCDate().toString().padStart(2, "0"); // Add pad (digit 0) to start of string if the date is 1-digit
    const month = monthsInShort[timeString.getUTCMonth()];
    const year = timeString.getFullYear();
    return `${day} ${month} ${year}`;
  }
}
