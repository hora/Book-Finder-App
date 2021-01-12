const msgWaiting = document.querySelector(".message-waiting");
const searchForm = document.getElementById("search-form");
const booksDisplay = document.getElementById("books-display");

const googleBooksURL = "https://www.googleapis.com/books/v1/volumes?q=";
const apiKey = "&key=AIzaSyCw6aeDwd2srAlaiVBFSSBvyl2O7atCTaA";

searchForm.addEventListener("submit", () => {
  msgWaiting.style.display = "none";
  const searchInput = document.getElementById("search-input").value;
  const searchQuery = `${googleBooksURL}${searchInput}${apiKey}`;

  getBooks(searchQuery);
});

async function getBooks(query) {
  const booksPromise = await fetch(query);
  const booksData = await booksPromise.json();

  displayBooks(booksData.items);
}

function displayBooks(books) {
  // clear any previous results
  booksDisplay.innerHTML = "";

  books.forEach((book) => {

    let volumeInfo = book.volumeInfo;
    let title = volumeInfo.title || "N/A";
    let authors = volumeInfo.authors || "N/A";
    let previewLink = volumeInfo.previewLink || "N/A";
    let publishdate = volumeInfo.publishedDate || "N/A";
    let publisher = volumeInfo.publisher || "N/A";
    let smallThumbnail = getThumbnail(volumeInfo);

    let bookDiv = document.createElement("div");

    bookDiv.classList.add("book-styling");
    bookDiv.innerHTML = `
    <h3>  ${title} </h3>
    <div class= "book-img">
     <img src= "${smallThumbnail}" alt= "Image book cover ">
     </div>
      <div class = "book-details">
        <small> <strong>Author(s)</strong>: ${authors}</small>
        <small> <strong>Publishers</strong>: ${publisher}</small>
        <small> <strong>Published</strong>: ${publishdate}</small>
      </div>
      <a href = "${previewLink}" class ="book-link" target="_blank">  Google Books Preview </a>
       `;

    booksDisplay.append(bookDiv);
  });
}

function getThumbnail(volumeInfo) {
  if (volumeInfo.imageLinks && volumeInfo.imageLinks.smallThumbnail) {
    return volumeInfo.imageLinks.smallThumbnail;
  } else {
    // if google books doesn't have a thumbnail, use a placeholder
    return "https://picsum.photos/130/190";
  }
}
