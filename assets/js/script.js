document.addEventListener("DOMContentLoaded", function(){
    const inputBook = document.getElementById("inputBook");
    const inputBookIsComplete = document.getElementById("inputBookIsComplete");
    const inputSearchBook = document.getElementById("searchBook");
    

    inputBook.addEventListener("submit", function(event) {
        event.preventDefault();
        addBook();
    });

    inputBookIsComplete.addEventListener("input", function(event) {
        event.preventDefault();
        checkButton();
    });

    inputSearchBook.addEventListener("keyup", function(event){
        event.preventDefault();
        searchBook();
    });

    inputSearchBook.addEventListener("submit", function(event){
        event.preventDefault();
        searchBook();
    });

    inputBookIsComplete.addEventListener("input", function (event) {
        event.preventDefault();
        checkButton();
      });

    if(isStorageExist()){
        loadDataFromStorage();
    }
});

document.addEventListener("ondatasaved", () => {
    console.log("Buku berhasil disimpan.");
  });
  
document.addEventListener("ondataloaded", () => {
    refreshDataFromBooks();
});
