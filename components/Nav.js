export default links => `
  <nav id="navButtons">
    ${links
      .map(
        link =>
          `<button class="navBtn"><a href="/${link.title}" data-navigo>${link.text}</a></button>`
      )
      .join("")}
  </nav>
`;
