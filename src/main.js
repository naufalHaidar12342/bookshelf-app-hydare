// load theme on page load
if (
	localStorage.getItem("color-theme") === "dark" ||
	(!("color-theme" in localStorage) &&
		window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
	document.documentElement.classList.add("dark");
} else {
	document.documentElement.classList.remove("dark");
}

// dark and light mode toggle
let themeToggleButton = document.getElementById("theme-toggle");
themeToggleButton.addEventListener("click", () => {
	document.documentElement.classList.toggle("dark");
	if (document.documentElement.classList.contains("dark")) {
		localStorage.setItem("color-theme", "dark");
	} else {
		localStorage.setItem("color-theme", "light");
	}
});

// initialize variables for each elements in form
const addNewBookForm = document.getElementById("bookForm");
const addNewBookTitle = document.getElementById("bookFormTitle");
const addNewBookAuthor = document.getElementById("bookFormAuthor");
const addNewBookYear = document.getElementById("bookFormYear");
const addNewBookIsComplete = document.getElementById("bookFormIsComplete");
const addNewBookSubmitButton = document.getElementById("bookFormSubmit");

// initialize variables for each elements in search form
const searchBookTitle = document.getElementById("searchBookTitle");
const searchBookTitleSubmitButton = document.getElementById("searchSubmit");

/* initialize variables for each elements in "Belum selesai dibaca" 
(have not finished reading it) shelf */

/* initialize variables for each elements in "Belum selesai dibaca" 
(have not finished reading it) shelf */

// initialize key for localStorage
const arrayOfBooks = [];
const BOOKSHELF_ITEM_KEY = "BOOKSHELF_ITEM";
const RENDER_BOOKSHELF = "RENDER_BOOKSHELF";
const SAVE_BOOKSHELF = "SAVE_BOOKSHELF";

function checkForStorage() {
	if (typeof Storage === undefined) {
		alert("Browser kamu tidak mendukung local storage");
		return false;
	}
}
