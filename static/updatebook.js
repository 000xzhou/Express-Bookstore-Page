const form = document.getElementById("book-form-edit");
const params = new URLSearchParams(window.location.search);
const isbn = params.get("isbn");

if (!isbn) {
  console.error("No ISBN provided");
} else {
  // create form data
  fetch(`https://express-bookstore-app.onrender.com/books/${isbn}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((book) => {
      // Populate the form with book details
      form.title.value = book.book.title;
      form.author.value = book.book.author;
      form.publisher.value = book.book.publisher;
      form.year.value = book.book.year;
      form.language.value = book.book.language;
      form.pages.value = book.book.pages;
      form.amazon_url.value = book.book.amazon_url;

      isEditing = true;
      currentEditingIsbn = isbn;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}
// submit response
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const updatedBook = {
    title: form.title.value,
    author: form.author.value,
    publisher: form.publisher.value,
    year: Number(form.year.value),
    language: form.language.value,
    pages: Number(form.pages.value),
    amazon_url: form.amazon_url.value,
  };

  fetch(`https://express-bookstore-app.onrender.com/books/${isbn}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedBook),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Successfully updated:", data);
      // Redirect to home page
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
});
