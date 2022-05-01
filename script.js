
let myLibrary = [];
const btnAdd = document.getElementById("btn-add");
btnAdd.addEventListener("click", inputBook);

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleRead = function () {
    this.read = !this.read;
}

function inputBook() {
    const formInput = new FormData(document.getElementById("bookForm"));

    let title = formInput.get("title");
    let author = formInput.get("author");
    let pages = formInput.get("pages");
    let read = formInput.get("read") == "on";

    const book = new Book(title, author, pages, read);

    addBookToLibrary(book);
    displayNewBook(book);
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayNewBook(book) {
    const table = document.querySelector("table");
    const tableRow = document.createElement("tr");
    const tableCellTitle = document.createElement("td");
    const tableCellAuthor = document.createElement("td");
    const tableCellPages = document.createElement("td");
    const tableCellRead = document.createElement("td");
    const tableCellDelete = document.createElement("td");
    const readCheckbox = document.createElement("input");
    const btnDelete = document.createElement("button");

    tableCellTitle.textContent = book.title;
    tableCellAuthor.textContent = book.author;
    tableCellPages.textContent = book.pages;

    readCheckbox.type = "checkbox";
    readCheckbox.classList.add("check-read");
    readCheckbox.setAttribute("data-index", String(myLibrary.length));
    readCheckbox.addEventListener("change", changeRead);
    if (book.read) {
        readCheckbox.setAttribute("checked", "");
    }

    tableCellRead.appendChild(readCheckbox);

    btnDelete.textContent = "Delete";
    btnDelete.classList.add("btn-delete");
    btnDelete.setAttribute("data-index", String(myLibrary.length));
    btnDelete.addEventListener("click", deleteBook);
    tableCellDelete.appendChild(btnDelete);

    tableRow.appendChild(tableCellTitle);
    tableRow.appendChild(tableCellAuthor);
    tableRow.appendChild(tableCellPages);
    tableRow.appendChild(tableCellRead);
    tableRow.appendChild(tableCellDelete);
    table.appendChild(tableRow);
}

function deleteBook() {
    const table = document.querySelector("table");
    let index = this.dataset.index;
    table.deleteRow(index);

    myLibrary.splice(index - 1, 1);

    updateBookIndex();
}

function updateBookIndex() {
    const btnDelete = document.querySelectorAll(".btn-delete");
    const readCheckbox =document.querySelectorAll(".check-read");
    let i = 1;
    btnDelete.forEach(element => {
        element.setAttribute("data-index", String(i));
        i++;
    });
    i = 1;
    readCheckbox.forEach(element => {
        element.setAttribute("data-index", String(i));
    });
}

function changeRead() {
    let index = this.dataset.index;
    myLibrary[index - 1].toggleRead();
}
