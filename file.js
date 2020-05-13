
let myLibrary = [
    {
        title: "Winning Ugly",
        author: "Brad Gilbert",
        pages: 224,
        read: 1
    }
];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function() { 
        return `${title} by ${author}, ${pages} pages`;
    }
}

function addBookToLibrary () {
   // function that pushes a new book into the myLibrary Object
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let pages = document.querySelector("#pages").value;

    if(title == "" || author == "" || pages <= 0) { return };

    myLibrary.push(new Book(title, author, pages));
}