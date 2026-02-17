let myLibrary = []; // an array to keep all the books

// get the dialog element and #openForm button
const dialog = document.querySelector("dialog");
const openForm = document.querySelector("#openForm");
// get the .close button
const closeForm = document.querySelector(".close");
// get the .container div
const container = document.querySelector(".container");

// write a constructor for making "Book" objects
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  this.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
  };
};

// create a function that can take some arguments, create a book from those arguments, and store the new book object into an array
function addBookToLibrary(title, author, pages, read) {
  Book.call(this, title, author, pages, read);

  const id = crypto.randomUUID(); // create a random unique id

  // create a book object that stores the book's id, title, author, number of pages, and read status
  const book = {
    id: id,
    title: this.title,
    author: this.author,
    pages: this.pages,
    read: this.read
  };

  // push the book object into myLibrary array
  myLibrary.push(book);
};

// Link prototypes and add prototype methods
Object.setPrototypeOf(addBookToLibrary.prototype, Book.prototype);

// add some dummy books to myLibrary
const book1 = new addBookToLibrary("The Hobbit" , "J.R.R. Tolkien", 295, "not read yet");
const book2 = new addBookToLibrary("The Very Hungry Caterpillar", "Eric Carle", 26, "read");
const book3 = new addBookToLibrary("The Gruffalo", "Julia Donaldson", 32, "reading");


// write a function that loops through the myLibrary array and displays each book on the page
function displayBook() {
  //for each book in myLibrary...
  for(let book of myLibrary) { 
    const bookDiv = document.createElement("div"); // create a div for each book
    bookDiv.classList.add("bookDiv"); // make bookDiv have a class of "bookDiv"

    // for each key in the book (because the book is an object)...
    for (let key in book) {
      // if key is "id" then add a "data-id" attribute that corresponds to the book's id to bookDiv
      if (key === "id") bookDiv.dataset.id = book[key];
      else {
        const p = document.createElement("p"); // create a paragraph element that will hold key's value
        p.classList.add(key); // add a class of the key's name to p

        switch (key) {
          // if key's name is "author"
          case "author":
            p.textContent = `Written By ${book[key]}`;  // set p's textContent to "written by [author]"
            break;
          
          // if key's name is "pages"
          case "pages":
            p.textContent = `${book[key]} pages`; // set p's textContent to "[pages number] pages"
            break;
          
          // anything else, just show the key's value
          default:
            p.textContent = book[key];
            break;
        };
        bookDiv.appendChild(p);  // append p to bookDiv
      };
    };
    // create a "remove" button
    const removeBtn = createBtn("remove", "Remove");
    // create an "edit" button
    const editBtn = createBtn("edit", "Edit");
    bookDiv.appendChild(editBtn); // append the edit button to bookDiv
    bookDiv.appendChild(removeBtn); // append the remove button to bookDiv

    // when removeBtn is clicked, remove the selected book
    removeBtn.addEventListener("click",() =>  {removeBook(book.id)});
    
    document.querySelector("div.container").appendChild(bookDiv); // append bookDiv to .container
  };
};

displayBook();

// create a function that adds a new book using #newBookForm's inputs
function formAddBook() {

  // get the form's title, author, pagesNum and readStatus input values
  const title = document.querySelector("#title");
  const author = document.querySelector("#author");
  const pages = document.querySelector("#pagesNum");
  const readStatus = document.querySelector("#readStatus");

  // if all the form's input are valid...
  if (document.querySelector("form").checkValidity()) {
    // create a new book using the inputs and push it to myLibrary
    new addBookToLibrary(title.value, author.value, pages.value, readStatus.value);

    // if .container has content:
    if (container.textContent !== "") {
      container.textContent = ""; // remove all content in .container
      displayBook() // show updated myLibrary array
      dialog.close(); // close the dialog

    // else, just show updated myLibrary array and close the dialog
    } else {
      displayBook();
      dialog.close()
    };

    // reset all the inputs
    title.value = "";
    author.value = "";
    pages.value = "";
    readStatus.value = "";
  };
};

// create a function that removes a selected book from myLibrary array
function removeBook(id) {
  // update myLibrary by filtering out the selected book using it's id
  myLibrary = myLibrary.filter((book) => book.id !== id);
  
  // reset .container's content and display the updated myLibrary array
  container.textContent = "";
  displayBook();
};

// create a function that takes a class and textContent parameter for creating a button
function createBtn(cls, content) {
  const btn = document.createElement("button");
  btn.classList.add(cls);
  btn.textContent = content;
  return btn;
};

// call formAddBook() when #addButton is clicked
document.getElementById("addButton").addEventListener("click", formAddBook);

// when openForm is clicked, open dialog
openForm.addEventListener("click", () => dialog.showModal());
// when closeForm is clicked, close dialog
closeForm.addEventListener("click", () => dialog.close());