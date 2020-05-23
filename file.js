let bookcards = document.querySelector(".bookcards");

let myLibrary = [
    {
        title: "Winning Ugly",
        author: "Brad Gilbert",
        pages: 224,
        read: "Not read",    
    }
];

if(localStorage.length > 0) {
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

    if(title == "" || author == "" || pages < 1) { return };

    myLibrary.push(new Book(title, author, pages));
    storeBooks();
}

let newItem;
let index;

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
        newItem.innerHTML = `${myLibrary[index].title} by ${myLibrary[index].author}, ${myLibrary[index].pages} pages` ;
        newBookCard.appendChild(newItem);

        myLibrary[index].id = index;

        let description = document.createElement("p");
        description.className = "description";
        description.innerHTML = "Description: This will be Google API fetched description (and maybe an image on the right?)";
        newBookCard.appendChild(description);

        // renders div for read & remove actions
        let actionDiv = document.createElement("div");
        actionDiv.className = "actions";
        newBookCard.appendChild(actionDiv);

        // renders read toggle
        let readToggle = document.createElement("p");
        readToggle.className = "readtoggle";
        readToggle.innerHTML = myLibrary[index].read;
        actionDiv.appendChild(readToggle);

        // changes object property read to 0 or 1
        let i = index;
        readToggle.addEventListener("click", function () {
             if(myLibrary[i].read == "Not read") {
                 myLibrary[i].read = "Read";
                readToggle.style.color = "green";
            }
            else {
                myLibrary[i].read = "Not read";
                readToggle.style.color = "black";
            }
           readToggle.innerHTML = myLibrary[i].read;
           storeBooks();
        });

        //renders remove button
        let removeBtn = document.createElement("p");
        removeBtn.className = "removebtn"
        removeBtn.innerHTML = `Remove`;
        actionDiv.appendChild(removeBtn);
    
        let bookIndex = myLibrary[index].id;

        // renders remove function
        removeBtn.addEventListener("click", function () {
            myLibrary.splice(bookIndex, 1)
            storeBooks();
            render();
        });
    }
}

// function that saves library array to localStorage every time a new book is created
function storeBooks () {
    let myLibrary_serialized = JSON.stringify(myLibrary)
    localStorage.setItem("storedLibrary", myLibrary_serialized);
}

// function that retrieved the books from localStorage
function getStoredBooks () {
    let myLibrary_deserialized = JSON.parse(localStorage.getItem("storedLibrary"));
    myLibrary = myLibrary_deserialized;
}

function goLibrary () {
    addBookToLibrary();
    render();
}
const addBtn = document.querySelector(".addbtn");
// think of a smarter name for "something"
addBtn.onclick = goLibrary;

render();

