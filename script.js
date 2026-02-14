let myLibrary = []; // an array to keep all the books

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