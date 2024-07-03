const myLibrary =[];

function Book(title, author, year, read){
    this.title = title;
    this.author = author;
    this.year = year;
    this.read = read;
    this.info = function(){
       console.log(`'${this.title}' by ${this.author}, published ${this.year}, ${this.read}.`);
    };
};

function addBookToLibrary(book){
    myLibrary.push(book);
}

let nightWatch = new Book("Night Watch", "Terry Pratchett", "2002", "already read");
addBookToLibrary(nightWatch);
let monstrousRegiment = new Book("Monstrous Regiment", "Terry Pratchett", "2003", "not read yet");
addBookToLibrary(monstrousRegiment);
let weeFreeMen = new Book("Wee Free Men", "Terry Pratchett", "2002", "reading now");
addBookToLibrary(weeFreeMen);
let youLikeItDarker = new Book("You like it Darker", "Stephen King", "2024", "reading now");
addBookToLibrary(youLikeItDarker);
let it = new Book("IT", "Stephen King", "1986", "already read");
addBookToLibrary(it);
let theDaughtersWar = new Book("The Daughter's War", "Christopher Buellman", "2024", "reading now");
addBookToLibrary(theDaughtersWar);

const library = document.querySelector(".library");
const formDivWrapper = document.querySelector("#form-div-wrapper");
const newBookBtn = document.querySelector("#new-book-btn");

function updateLibrary(books){
    library.replaceChildren();
    books.forEach(book=> {
        let bookEntry = document.createElement('div');
        bookEntry.classList.add("book-card");
        bookEntry.innerHTML = `<h3>${book.title}</h3><p>${book.author}</p><p>${book.year}</p><p class="read">${book.read}</p>
            <div class="buttons-div">
                <button class="card-btn" id="complete">Completed</button>
                <button class="card-btn" id="remove">Remove</button>
            </div>`;
        library.appendChild(bookEntry);
    createReadButtons();
    createRemoveButtons();    
    }
    )};

updateLibrary(myLibrary);

newBookBtn.addEventListener("click", ()=>{
    const formDiv = document.createElement("div");
    formDiv.classList.add("form-div");
    formDiv.innerHTML = `<form action="#">
                <label for="title">Title:</label>
                <input type="text" id="title" required>
                <label for="author">Author:</label>
                <input type="text" id="author" required>
                <label for="year">Year:</label>
                <input type="text" id="year" required>  
                <label for="read">Read:</label>
                <input type="text" id="read" required>
                <input type="submit" id="submit">
            </form>`;
    formDivWrapper.appendChild(formDiv);
    const bookDataForm = document.querySelector(".form-div");
    const createNewEntryBtn = document.querySelector("#submit");
    createNewEntryBtn.addEventListener('click',()=>{
        const newBookData = Array.from(bookDataForm.querySelectorAll("form input")).reduce((acc,input) => ({...acc, [input.id]: input.value}),
        {});
        addBookToLibrary(new Book(newBookData.title, newBookData.author, newBookData.year, newBookData.read));
        updateLibrary(myLibrary);
        formDivWrapper.innerHTML='';
});
})

function readButtonClickHandler(eventObj){
    let indexPos = myLibrary.findIndex(book=> book.title == eventObj.target.parentElement.parentElement.firstChild.innerHTML);
    myLibrary[indexPos].read = 'already read';
    updateLibrary(myLibrary);
}

function createReadButtons(){ 
    const readButtons = document.querySelectorAll("button#complete"); 
    readButtons.forEach(button =>{
        button.addEventListener("click", readButtonClickHandler);           
});
}

function removeButtonClickHandler(eventObj){
    let indexPos = myLibrary.findIndex(book=> book.title == eventObj.target.parentElement.parentElement.firstChild.innerHTML);
    myLibrary.splice(indexPos, 1);
    updateLibrary(myLibrary);
    };



function createRemoveButtons(){
    const removeButtons = document.querySelectorAll("button#remove"); 
    removeButtons.forEach(button =>{
        button.addEventListener("click", removeButtonClickHandler)
    });
};