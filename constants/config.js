import { Token } from "./token.js";

export class DefaultConfig {
  static apiURL = "https://api.github.com/users";
  static githubReadToken = Token.githubReadToken ? Token.githubReadToken : "";
  static githubURL = "https://github.com";
  static username = "octocat";
  static theme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}
