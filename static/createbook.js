const form = document.getElementById("book-form");

// sumbit response
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const book = {
    isbn: form.isbn.value,
    title: form.title.value,
    author: form.author.value,
    publisher: form.publisher.value,
    year: Number(form.year.value), // Convert to number
    language: form.language.value,
    pages: Number(form.pages.value), // Convert to number
    amazon_url: form.amazon_url.value,
  };

  fetch("https://express-bookstore-app.onrender.com/books", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Successfully posted:", data);
      // Redirect to home page
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
});
