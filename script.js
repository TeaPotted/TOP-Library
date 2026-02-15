let myLibrary = []; // an array to keep all the books

// get the dialog element and #openForm button
const dialog = document.querySelector("dialog");
const openForm = document.querySelector("#openForm");
// get the .close button
const closeForm = document.querySelector(".close");

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
      const p = document.createElement("p"); // create a paragraph element that will hold key's value

      // if the key's name is not "id"
      if (key !== "id") {
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
      };
      
      bookDiv.appendChild(p);  // append p to bookDiv
    };
    
    document.querySelector("div.container").appendChild(bookDiv); // append bookDiv to .container
  };
};

displayBook();

// when openForm is clicked, open dialog
openForm.addEventListener("click", () => dialog.showModal());
// when closeForm is clicked, close dialog
closeForm.addEventListener("click", () => dialog.close());