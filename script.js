let msgWaiting = document.querySelector(".message-waiting");
let searchForm = document.getElementById("search-form");

const booksDisplay = document.getElementById("books-display");

let getGoogleBooks = "https://www.googleapis.com/books/v1/volumes?q=";

let apiKey = "&key=AIzaSyCw6aeDwd2srAlaiVBFSSBvyl2O7atCTaA";

searchForm.addEventListener("submit", () => {
  msgWaiting.style.display = "none";
  let searchInput = document.getElementById("searchInput").value;
  let searchResult = `${getGoogleBooks}${searchInput}${apiKey}`;

  async function getBooks() {
    const booksPromise = await fetch(searchResult);
    const getBook = await booksPromise.json();
    booksDisplay.innerHTML = "";
    getBook.items.map((book) => {
      console.log(book.volumeInfo);

      let title = book.volumeInfo.title;
      let authors = book.volumeInfo.authors;
      let previewLink = book.volumeInfo.previewLink;
      let publishdate = book.volumeInfo.publishedDate;
      let publisher = book.volumeInfo.publisher;
      let smallThumbnail = book.volumeInfo.imageLinks.smallThumbnail;

      let div = document.createElement("div");
      div.innerHTML = `
      
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
      div.classList.add("book-styling");

      booksDisplay.append(div);
    });
  }
  getBooks();
});
