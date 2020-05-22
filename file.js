let bookcards = document.querySelector(".bookcards");

let myLibrary = [
    {
        title: "Winning Ugly",
        author: "Brad Gilbert",
        pages: 224,
        read: "Not read",    
    }
];

if(localStorage.length >= 1) {
    getStoredBooks();
} 

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = "Not read"
    
    // possibly refactor to prototypes for practice?
}

function addBookToLibrary () {
   // function that pushes a new book into the myLibrary Object
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let pages = document.querySelector("#pages").value;

    if(title == "" || author == "" || pages <= 0) { return };

    myLibrary.push(new Book(title, author, pages));
    storeBooks();
}

let newItem;
let index;
let bookRead;

function render() {

    // removes all HTML bookcard elements
    while(bookcards.firstChild) {
        bookcards.removeChild(bookcards.lastChild);
    }

    // creates new HTML bookcards
    for(index = myLibrary.length -1; index >= 0; index--) {
    // for(index = 0; index < myLibrary.length; index++) { 
        newBookCard = document.createElement("div");
        newBookCard.className = "bookcard";
        bookcards.appendChild(newBookCard);

        newItem = document.createElement("h3");
        newItem.className = "book-title"
        newItem.style.background = "red";
        newItem.innerHTML = `${myLibrary[index].title} by ${myLibrary[index].author}, ${myLibrary[index].pages} pages` ;
        newBookCard.appendChild(newItem);

        myLibrary[index].id = index;

        //renders remove button
        let removeBtn = document.createElement("p");
        removeBtn.className = "remove-btn"
        removeBtn.innerHTML = `Remove book`;
        newBookCard.appendChild(removeBtn);
    
        let bookIndex = myLibrary[index].id;

        // renders remove function
        removeBtn.addEventListener("click", function () {
            myLibrary.splice(bookIndex, 1)
            storeBooks();
            render();
        });
        
        // renders read toggle
        let readToggle = document.createElement("p");
        readToggle.className = "readToggle";
        readToggle.innerHTML = myLibrary[index].read;
        readToggle.style.background = "orange";
        newBookCard.appendChild(readToggle);

        // changes object property read to 0 or 1
        let i = index;
        readToggle.addEventListener("click", function () {
           if(myLibrary[i].read == "Not read") {myLibrary[i].read = "Read";}
           else {myLibrary[i].read = "Not read";}
           readToggle.innerHTML = myLibrary[i].read;
           storeBooks();
        });

    }
}

// function that saves library array to localStorage every time a new book is created
function storeBooks () {
    let myLibrary_serialized = JSON.stringify(myLibrary)
    localStorage.setItem("storedLibrary", myLibrary_serialized);
    console.log(localStorage);
}

// function that retrieved the books from localStorage
function getStoredBooks () {
    let myLibrary_deserialized = JSON.parse(localStorage.getItem("storedLibrary"));
    console.log(myLibrary_deserialized);
    myLibrary = myLibrary_deserialized;
}

const addBtn = document.querySelector(".addbtn");
// think of a smarter name for "something"
addBtn.onclick = something;
// the stuff that should happen when you click on add
function something () {
    addBookToLibrary();
    render();
}

    render();

