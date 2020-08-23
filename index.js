import { Header, Main, Footer } from "./components";
import * as state from "./store";

function render(st) {
  document.querySelector("#root").innerHTML = `
  ${Header(st)}
  ${Nav(state.Links)}
  ${Main(st)}
  ${Footer()}
`;
  addNavEventListeners();
}

render(state.Home);

function addNavEventListeners() {
  document.querySelectorAll("nav a").forEach(link =>
    link.addEventListener("click", event => {
      event.preventDefault();
      let linkText = event.target.textContent;
      let pieceOfState = state[linkText];
      render(pieceOfState);
    })
  );
}
