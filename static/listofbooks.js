const listOfBooks = document.getElementById("list-of-books");

// fetches a list of books
fetch("https://express-bookstore-app.onrender.com/books")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    addBookToList(data.books);
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });

// put into HTML page
function addBookToList(book) {
  book.forEach((book) => {
    const listItem = document.createElement("li");
    listItem.classList.add("bookItem");
    listItem.innerHTML = `
        <strong>Title:</strong> ${book.title}<br>
        <strong>Author:</strong> ${book.author}<br>
        <strong>ISBN:</strong> ${book.isbn}<br>
        <strong>URL:</strong> <a href="${book.amazon_url}" target="_blank">${book.amazon_url}</a><br>
        <strong>Language:</strong> ${book.language}<br>
        <strong>Pages:</strong> ${book.pages}<br>
        <strong>Publisher:</strong> ${book.publisher}<br>
        <strong>Year:</strong> ${book.year}<br>
        <a class="edit-button" href="../updateBook.html?isbn=${book.isbn}">Edit</a>
        <button class="delete-button" data-isbn="${book.isbn}">Delete</button>
      `;
    listOfBooks.appendChild(listItem);

    // Add event listener to the delete button
    listItem
      .querySelector(".delete-button")
      .addEventListener("click", handleDelete);
  });
}
