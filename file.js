let bookcards = document.querySelector(".bookcards");

let myLibrary = [
    {
        title: "Winning Ugly",
        author: "Brad Gilbert",
        pages: 224,
        read: 0
        
    }
];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = 0
    
    // possibly refactor to prototypes for practice?
}

function addBookToLibrary () {
   // function that pushes a new book into the myLibrary Object
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let pages = document.querySelector("#pages").value;

    if(title == "" || author == "" || pages <= 0) { return };

    myLibrary.push(new Book(title, author, pages));
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
        newItem = document.createElement("div");
        newItem.style.background = "red";
        newItem.innerHTML = myLibrary[index].title;
        bookcards.appendChild(newItem);

        myLibrary[index].id = index;


        //renders remove button
        let removeBtn = document.createElement("p");
        removeBtn.innerHTML = `Remove book`;
        bookcards.appendChild(removeBtn);
    
        let bookIndex = myLibrary[index].id;

        // renders remove function
        removeBtn.addEventListener("click", function () {
            myLibrary.splice(bookIndex, 1)
            render();
        });

        
        // renders read toggle
        let readToggle = document.createElement("p");
        readToggle.innerHTML = myLibrary[index].read;
        readToggle.style.background = "orange";
        bookcards.appendChild(readToggle);

        // changes object property read to 0 
        let i = index;
        readToggle.addEventListener("click", function () {
           if(myLibrary[i].read == 0) {myLibrary[i].read = 1;}
           else {myLibrary[i].read = 0;}
           readToggle.innerHTML = myLibrary[i].read;
        });

    }
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

