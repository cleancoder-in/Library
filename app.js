const myLibrary = [];

const booksContainer = document.querySelector(".booksContainer");
window.addEventListener("DOMContentLoaded", listAllBooks);

//constructor
function Book({ title, author, pages, rating, read }) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.rating = rating;
  this.read = read;
  this.info = function () {
    return `${this.title} by ${this.author}, ${pages} pages, is ${read}`;
  };
}

Book.prototype.toggle = function () {
  this.read = !this.read;
};

function addBookToLibrary(obj) {
  myLibrary.push(new Book(obj));
  listAllBooks();
}

function deleteBookFromLibrary(id) {
  if (confirm("Do you really want to delete it?")) {
    myLibrary.splice(id, 1);
    listAllBooks();
  }
}

function listAllBooks() {
  const bookCards = getBookCards();
  booksContainer.innerHTML = bookCards;
  const Btns = document.querySelectorAll(".btn");
  Btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      //remove btn clicked
      if (btn.textContent === "remove") {
        let id = Number(e.target.parentElement.parentElement.dataset.id);
        deleteBookFromLibrary(id);
        // read/not-read btn clicked
      } else {
        let bookIndex = e.target.parentElement.parentElement.dataset.id;
        let book = myLibrary[bookIndex];
        toggleReadStatus(e, book);
      }
    });
  });
}

//helper functions
function getBookCards() {
  return myLibrary
    .map((book, index) => {
      let { title, author, pages, rating, read } = book;
      let classValue = "";
      if (!read) classValue = "not-read";
      read = getReadStatus(read);
      return `
      <div class="book" data-id="${index}">
            <div class="bookHeader">
                <p class="title">${title}</p>
                <p class="author">- ${author}</p>
                <p class="moreInfo"><span>Pages: <strong>${pages}</strong></span><span>Rating: <strong>${rating}</strong></span></p>
            </div>
            <div class="btnWrapper">
                <button class="btn">remove</button>
                <button class="btn ${classValue}">${read}</button>
            </div>
        </div>
    `;
    })
    .join(" ");
}
function toggleReadStatus(e, book) {
  book.toggle();
  e.target.textContent = getReadStatus(book.read);
  if (book.read) e.target.classList.remove("not-read");
  else e.target.classList.add("not-read");
}

function getReadStatus(readValue) {
  if (readValue) return "read";
  else return "not read";
}

//Library initialised with few books
addBookToLibrary({
  title: "To Kill a Mockingbird",
  author: "Harper Lee",
  pages: 323,
  rating: 4.26,
  read: true,
});

addBookToLibrary({
  title: "The Alchemist",
  author: "Paulo Coelho",
  pages: 197,
  rating: 3.91,
  read: false,
});

addBookToLibrary({
  title: "The Fault in Our Stars",
  author: "John Green",
  pages: 313,
  rating: 4.14,
  read: false,
});

addBookToLibrary({
  title: "Life of Pi",
  author: "Yann Martel",
  pages: 460,
  rating: 3.94,
  read: false,
});

/* dialog modal script */
//global variables
let emptyFormField = false;
let newBook = {};
//selection
const dialog = document.getElementById("dialog");
const openDialogBtn = document.querySelector(".addBookBtn");
const closeDialogBtn = document.querySelector("[aria-label = 'close']");
const submitDialogBtn = document.getElementById("confirmBtn");

//event listeners
openDialogBtn.addEventListener("click", () => {
  dialog.showModal();
});

closeDialogBtn.addEventListener("click", (e) => {
  e.preventDefault();
  dialog.close();
});

submitDialogBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (checkForNull()) {
    alert("Please fill all the fields");
    emptyFormField = false;
    return;
  }
  newBook = getFormData();
  dialog.close();
  addBookToLibrary(newBook);
});

//helper functions
function getFormData() {
  return (newBook = {
    title: document.getElementById("modalTitle").value,
    author: document.getElementById("modalAuthor").value,
    pages: document.getElementById("modalPage").value,
    rating: document.getElementById("modalRating").value,
    read: document.getElementById("modalRead").checked,
  });
}
function checkForNull() {
  if (!document.getElementById("modalTitle").value) emptyFormField = true;
  if (!document.getElementById("modalAuthor").value) emptyFormField = true;
  if (!document.getElementById("modalPage").value) emptyFormField = true;
  if (!document.getElementById("modalRating").value) emptyFormField = true;
  return emptyFormField;
}
