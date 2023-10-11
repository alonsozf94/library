/* UI */

const myLibrary = [];
let libraryContainer = document.querySelector("#my-library table");
let addBookButton = document.querySelector("#add-book");
let form = document.querySelector(".form-background");
let closeFormButton = document.querySelector("#close-form");

let bookNameInput = document.querySelector("[name='book-name']");
let bookAuthorInput = document.querySelector("[name='book-author']");
let bookPagesInput = document.querySelector("[name='book-pages']");
let bookReadInput = document.querySelector("[name='book-read']");
let submitButton = document.querySelector("#submit-button");
let bookRows = [];

class Book {
  constructor(index, title, author, pages, isRead) {
    this.index = index;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }

  info() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${
      this.isRead ? "already read" : "not read yet"
    } `;
  }

  toggleRead(isRead) {
    this.isRead = isRead;
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  addBook(newBook) {
    if (!this.isInLibrary(newBook)) {
      this.books.push(newBook);
    }
  }

  removeBook(title) {
    this.books = this.books.filter((book) => book.title !== title);
  }

  getBook(title) {
    return this.books.find((book) => book.title === title);
  }

  isInLibrary(newBook) {
    return this.books.some((book) => book.title === newBook.title);
  }
}

const library = new Library();

/* UI Functions */
function createBookRow(newBook) {
  let bookRow = document.createElement("tr");
  bookRow.classList.add("book-row");
  bookRow.setAttribute("data-index", newBook.index);
  bookRow.innerHTML = `
    <td class="title">${newBook.title}</td>
    <td class="author">${newBook.author}</td>
    <td class="pages">${newBook.pages}</td>
    <td class="read">${newBook.isRead ? "Yes" : "No"}</td>
    <td><button class="delete-button"></button></td>
    <td><button class="read-button"></button></td>
    `;
  libraryContainer.appendChild(bookRow);
}

function toggleForm() {
  bookNameInput.value = "";
  bookAuthorInput.value = "";
  bookPagesInput.value = "";
  bookReadInput.checked = false;
  if (form.classList[1] === "off") {
    form.classList.replace("off", "on");
  } else {
    form.classList.replace("on", "off");
  }
}

function addBookActions() {
  /*Delete*/
  bookRows.forEach((element) => {
    element.querySelector(".delete-button").addEventListener("click", () => {
      element.remove();
      library.removeBook(element.querySelector(".title").innerHTML);
    });
  });

  /*Read*/
  bookRows.forEach((element) => {
    element.querySelector(".read-button").addEventListener("click", () => {
      let readCell = element.querySelector(".read");
      const book = library.getBook(element.querySelector(".title").innerHTML);
      if (book.isRead) {
        book.toggleRead(false);
        readCell.innerHTML = "No";
      } else {
        book.toggleRead(true);
        readCell.innerHTML = "Yes";
      }
    });
  });
}

function addBookToLibrary(newBook) {
  library.addBook(newBook);
  updateLibrary();
}

function updateLibrary() {
  /* Deletes current library */
  document.querySelectorAll(".book-row").forEach((element) => {
    element.remove();
  });

  /* Creates with new entries */
  library.books.forEach((book) => {
    createBookRow(book);
  });

  bookRows = Array.from(document.querySelectorAll(".book-row"));
  addBookActions();
}

/* Implementation */

const silmarillion = new Book(
  library.books.length,
  "The Silmarillion",
  "J.R. Tolkien",
  "365",
  false
);
const imitationOfChrist = new Book(
  library.books.length + 1,
  "Imitation of Christ",
  "Thomas Kempis",
  "100",
  false
);

addBookToLibrary(silmarillion);
addBookToLibrary(imitationOfChrist);

/* Listeners */

addBookButton.addEventListener("click", () => {
  toggleForm();
});

submitButton.addEventListener("click", (e) => {
  let newBook = new Book(
    library.books.length,
    bookNameInput.value,
    bookAuthorInput.value,
    bookPagesInput.value,
    bookReadInput.checked
  );
  toggleForm();
  addBookToLibrary(newBook);
  e.preventDefault();
});

closeFormButton.addEventListener("click", (e) => {
  toggleForm();
  e.preventDefault();
});

/* Implementation */
updateLibrary();
