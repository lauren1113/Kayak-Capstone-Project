export default () => `
  <footer>
    <div id="footer">
      <img id="landscapeFooter" src="https://github.com/lauren1113/Kayak-Capstone-Project/blob/master/Documents/Design/Kayak%20Photos/akshay-nanavati-Fsj6YMcJ8zw-unsplash.jpg?raw=true"/>
      <p id="TY-footer">Thank you for visiting Kayak Fanatic!</p> <br>
      <p id="footerFormText">If you have questions or comments, or if you would like to contribute to the page by sharing your photos, reviews of floats you've been on, or current water conditions, please reach out below!</p>
      <form id="contactForm" action="https://formspree.io/xyynanol" method="POST">
        <label>Your email:<input type="text" name="_replyto"></label>
        <label>Your message:<textarea name="message"></textarea></label>
        <label>Submit a photo via URL:<input type="URL" name="photoURL"></label>
        <button type="submit">Send</button>
      </form>
    </div>
  </footer>
`;
