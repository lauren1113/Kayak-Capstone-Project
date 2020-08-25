export default links => `
  <nav id="navButtons">
    ${links
      .map(
        link => `<button class="navBtn"><a href="#">${link.text}</a></button>`
      )
      .join("")}
  </nav>
`;
