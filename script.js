const $msgWaiting = $(".message-waiting");
const $searchForm = $("#search-form");
const $booksDisplay = $("#books-display");

const googleBooksURL = "https://www.googleapis.com/books/v1/volumes?q=";
const apiKey = "&key=AIzaSyCw6aeDwd2srAlaiVBFSSBvyl2O7atCTaA";

$searchForm.on("submit", () => {
  $msgWaiting.hide();
  const searchInput = $("#search-input").val();
  const searchQuery = `${googleBooksURL}${searchInput}${apiKey}`;

  getBooks(searchQuery);
});

function getBooks(query) {
  $.ajax({
    url: query,
    method: "GET",
    datatype: "json"
  }).done((booksData) => {
    displayBooks(booksData.items);
  });
}

function displayBooks(books) {
  // clear any previous results
  $booksDisplay.empty();

  books.forEach((book) => {

    let volumeInfo = book.volumeInfo;
    let title = volumeInfo.title || "N/A";
    let authors = volumeInfo.authors || "N/A";
    let previewLink = volumeInfo.previewLink || "N/A";
    let publishdate = volumeInfo.publishedDate || "N/A";
    let publisher = volumeInfo.publisher || "N/A";
    let smallThumbnail = getThumbnail(volumeInfo);

    let $bookDiv = $("<div>").addClass("book-styling");

    $bookDiv.html(`
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
       `);

    $booksDisplay.append($bookDiv);
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
