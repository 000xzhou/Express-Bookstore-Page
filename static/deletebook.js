// delete a book
function handleDelete(event) {
  const isbn = event.target.dataset.isbn;
  fetch(`https://express-bookstore-app.onrender.com/books/${isbn}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Successfully deleted:", data);
      // Remove the book from the DOM
      event.target.parentElement.remove();
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}
