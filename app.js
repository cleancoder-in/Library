const myLibrary = [];

const booksContainer = document.querySelector(".booksContainer");
window.addEventListener("DOMContentLoaded", render);

//class

class Book {
  constructor({ title, author, pages, rating, read }) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.rating = rating;
    this.read = read;
    this.info = function () {
      return `${this.title} by ${this.author}, ${pages}, is ${read}`;
    };
  }

  toggle() {
    this.read = !this.read;
  }
}

//main functions
function addBookToLibrary(obj) {
  myLibrary.push(new Book(obj));
  render();
}

function deleteBookFromLibrary(id) {
  if (confirm("Do you really want to delete it?")) {
    myLibrary.splice(id, 1);
    render();
  }
}

function render() {
  const bookCards = getBookCards();
  booksContainer.innerHTML = bookCards;
  handleCardEvents();
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
function toggleReadStatus(e, id) {
  let book = myLibrary[id];
  book.toggle();
  e.target.textContent = getReadStatus(book.read);
  if (book.read) e.target.classList.remove("not-read");
  else e.target.classList.add("not-read");
}

function getReadStatus(readValue) {
  if (readValue) return "read";
  else return "not read";
}

function handleCardEvents() {
  const Btns = document.querySelectorAll(".btn");
  Btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let id = e.target.parentElement.parentElement.dataset.id;
      //remove btn clicked
      if (btn.textContent === "remove") deleteBookFromLibrary(id);
      // read/not-read btn clicked
      else toggleReadStatus(e, id);
    });
  });
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
  if (isNull()) {
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
  return {
    title: document.getElementById("modalTitle").value,
    author: document.getElementById("modalAuthor").value,
    pages: document.getElementById("modalPage").value,
    rating: document.getElementById("modalRating").value,
    read: document.getElementById("modalRead").checked,
  };
}
function isNull() {
  if (!document.getElementById("modalTitle").value) emptyFormField = true;
  if (!document.getElementById("modalAuthor").value) emptyFormField = true;
  if (!document.getElementById("modalPage").value) emptyFormField = true;
  if (!document.getElementById("modalRating").value) emptyFormField = true;
  return emptyFormField;
}
