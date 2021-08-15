const INCOMPLETE_BOOKSHELF_LIST_ID = "incompleteBookshelfList";
const COMPLETE_BOOKSHELF_LIST_ID = "completeBookshelfList";
const BOOK_ITEMID = "itemId";

// 1
function addBook() {
    const incompleteBookshelf = document.getElementById(INCOMPLETE_BOOKSHELF_LIST_ID);
    const completeBookshelfList = document.getElementById(COMPLETE_BOOKSHELF_LIST_ID);

    const textJudul = document.getElementById("inputBookTitle").value;
    const textPenulis = document.getElementById("inputBookAuthor").value;
    const textTahun = document.getElementById("inputBookYear").value;
    const selesaiDibaca = document.getElementById("inputBookIsComplete").checked;

    const book = makeBook(textJudul, `Penulis: ${textPenulis}`, `Tahun: ${textTahun}` , selesaiDibaca);
    
    //Untuk menyempurnakan codingan web storage
    const bookObject = composeBookObject(textJudul, textPenulis, textTahun, selesaiDibaca);

    book[BOOK_ITEMID] = bookObject.id;
    books.push(bookObject);
    //batas web storage

    if(selesaiDibaca){
        completeBookshelfList.append(book);
    }else {
        incompleteBookshelf.append(book);
    }

    updateDataToStorage();

}

// 2
function makeBook(judul, penulis, tahun, selesaiDibaca) {
    const textTitle = document.createElement("h3");
    textTitle.innerText = judul;
    const textAuthor = document.createElement("p");
    textAuthor.innerText = penulis;
    const textYears = document.createElement("p");
    textYears.innerText =  tahun;

    const bookAction = document.createElement("div");
    bookAction.classList.add("action");

    if(selesaiDibaca){
        bookAction.append(
            createUndoButton(), 
            createTrashButton()
        );
    }else{
        bookAction.append(
            createCheckButton(),
            createTrashButton()
        )
    }


    const container = document.createElement("article");
    container.classList.add("book_item")
    container.append(textTitle, textAuthor, textYears, bookAction);

    return container;

}

// 4
function createCheckButton() {
    return createButton("green", "Selesai Dibaca", function(event) {
        addBookToCompleted(event.target.parentElement.parentElement);
    });
}
// 5
function createTrashButton(){
    return createButton("red", "Hapus Buku", function(event){
        removeBook(event.target.parentElement.parentElement);
    });
}
// 6
function createUndoButton(){
    return createButton("green", "Belum Selesai Dibaca", function(event){
        undoBookFromCompleted(event.target.parentElement.parentElement);
    })
}

// 3
function createButton(buttonTypeClass, buttonText, eventListener) {
    const button = document.createElement("button");
    button.innerText = buttonText;
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function(event){
        eventListener(event);
    });
    return button;
}

// 7
function addBookToCompleted(bookElement) {
    const judulBuku = bookElement.querySelector("h3").innerText;
    const penulisBuku = bookElement.querySelectorAll("p")[0].innerText;
    const tahunBuku = bookElement.querySelectorAll("p")[1].innerText;

    const bukuBaru = makeBook(judulBuku, penulisBuku, tahunBuku ,  true );

    //Untuk menyempurnakan codingan web storage
    const buku = findBook(bookElement[BOOK_ITEMID]);
    buku.selesaiDibaca = true;
    bukuBaru[BOOK_ITEMID] = book.id;
    
    // const buku = document.getElementById(COMPLETE_BOOKSHELF_LIST_ID);
    // buku.append(bukuBaru);

    completeBookshelfList.append(bukuBaru);
    bookElement.remove(); 

    updateDataToStorage();
}

// 8
function removeBook(bookElement){
    const hapusBuku = window.confirm("Apakah yakin ingin menghapus buku ini?");

    if(hapusBuku) {
        const bookPosition = findBookIndex(bookElement[BOOK_ITEMID]);
        books.splice(bookPosition, 1);
        
        bookElement.remove();
        updateDataToStorage();
        alert("Buku terhapus");
    }else{
        alert("Buku gagal terhapus");
    }

}

// 9
function undoBookFromCompleted(bookElement){
    const incompleteBookshelfList = document.getElementById(INCOMPLETE_BOOKSHELF_LIST_ID);
    const judulBuku = bookElement.querySelector("h3").innerText;
    const penulisBuku = bookElement.querySelectorAll("p")[0].innerText;
    const tahunBuku = bookElement.querySelectorAll("p")[1].innerText;

    const bukuBaru = makeBook(judulBuku, penulisBuku, tahunBuku, false);

    //Untuk menyempurnakan codingan web storage
    const buku = findBook(bookElement[BOOK_ITEMID]);
    buku.selesaiDibaca = false;
    bukuBaru[BOOK_ITEMID] = buku.id;
    //batas web storage

    incompleteBookshelfList.append(bukuBaru);
    bookElement.remove();

    updateDataToStorage();
}

// 10
function checkButton(){
    const span = document.querySelector("span");
    if (inputBookIsComplete.checked) {
        span.innerText = "Selesai Dibaca";
    }else{
        span.innerText = "Belum Selesai Dibaca";
    }
}

// 11
function searchBook(){
    const searchBook = document.getElementById("searchBookTitle");
    const filter = searchBook.value.toUpperCase();
    const bookItem = document.querySelectorAll("section.book_shelf > .book_list > .book_item");
    for(let i=0; i<COMPLETE_BOOKSHELF_LIST_ID.length; i++){
        txtValue = bookItem[i].textContent || bookItem[i].innerText;
        if(txtValue.toUpperCase().indexOf(filter) > -1){
            bookItem[i].style.display = "";
        }else{
            bookItem[i].style.display = "none";
        }
    }
}