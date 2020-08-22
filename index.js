import { Header, Main, Footer } from "./components";

function render() {
  document.querySelector("#root").innerHTML = `
  ${Header()}
  ${Main()}
  ${Footer()}
`;
}

render();
