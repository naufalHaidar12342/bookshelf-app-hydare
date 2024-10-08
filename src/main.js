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

// initialize variables for each elements in search form
const searchBookForm = document.getElementById("searchBook");
const searchBookTitle = document.getElementById("searchBookTitle");
const searchBookResult = document.getElementById("searchBookResult");
searchBookResult.classList.add("flex", "flex-col", "mt-8");

/* initialize variables for each elements in "Belum selesai dibaca" 
(have not finished reading it) shelf */
const listOfUnfinishedBooks = document.getElementById("incompleteBookList");

/* initialize variables for each elements in "Belum selesai dibaca" 
(have not finished reading it) shelf */
const listOfCompletedBooks = document.getElementById("completeBookList");

// initialize key for localStorage
const arrayOfBooks = [];
const BOOKSHELF_ITEM_KEY = "BOOKSHELF_ITEM";
const RENDER_BOOKSHELF = "RENDER_BOOKSHELF";
const SAVE_BOOKSHELF = "SAVE_BOOKSHELF";

function checkForLocalStorageSupport() {
	if (typeof Storage === undefined) {
		alert("Browser kamu tidak mendukung local storage");
		return false;
	}
	return true;
}

function generateUniqueIdForBook() {
	const dateForTimestamp = new Date();
	let timestamp = dateForTimestamp.getTime();
	return timestamp;
}

function createBookObject(
	bookUniqueId,
	bookTitle,
	bookAuthor,
	bookYear,
	isComplete
) {
	return {
		bookUniqueId,
		bookTitle,
		bookAuthor,
		bookYear,
		isComplete,
	};
}

function findBookTitle() {
	const bookTitleRequest = searchBookTitle.value.toLowerCase();
	const searchResultContainer = document.createElement("div");
	// searchResultContainer.classList.add(
	// 	"flex",
	// 	"flex-col",
	// 	"p-4",
	// 	"mt-4",
	// 	"border-2",
	// 	"border-bookshelf-dark",
	// 	"dark:border-bookshelf-light",
	// 	"rounded-lg"
	// );

	// create descriptive text as heading for search result section
	const searchResultTitle = document.createElement("span");
	searchResultTitle.classList.add("font-semibold", "mt-4");
	searchResultTitle.textContent = `Hasil pencarian untuk judul buku: ${bookTitleRequest}`;
	searchResultContainer.appendChild(searchResultTitle);

	// Retrieve the arrayOfBooks from localStorage
	let arrayOfBooks = JSON.parse(localStorage.getItem(BOOKSHELF_ITEM_KEY)) || [];

	// Filter the arrayOfBooks to find matching titles (case-insensitive)
	let filteredBooks = arrayOfBooks.filter((book) =>
		book.bookTitle.toLowerCase().includes(bookTitleRequest)
	);

	// Clear the search results
	searchBookResult.innerHTML = ""; // Clear previous results

	if (filteredBooks.length === 0) {
		// If no books match, display a not found message
		let notFoundDiv = document.createElement("div");
		let notFoundP = document.createElement("p");
		notFoundP.textContent = `Title: ${bookTitleRequest}`;
		let messageP = document.createElement("p");
		messageP.textContent =
			"Maaf, judul buku tidak ditemukan. Coba gunakan kata kunci lain atau tambahkan buku baru.";

		notFoundDiv.appendChild(searchResultTitle);
		notFoundDiv.appendChild(messageP);
		searchBookResult.appendChild(notFoundDiv);
	} else {
		// Create HTML components for the filtered books
		filteredBooks.forEach((book) => {
			const searchResultItemContainer = document.createElement("div");
			searchResultItemContainer.classList.add(
				"flex",
				"flex-col",
				"p-4",
				"mt-4",
				"border-2",
				"border-bookshelf-dark",
				"dark:border-bookshelf-light",
				"rounded-lg"
			);

			let foundBookTitle = document.createElement("p");
			foundBookTitle.textContent = `Judul: ${book.bookTitle}`;

			let foundBookAuthor = document.createElement("p");
			foundBookAuthor.textContent = `Author: ${book.bookAuthor}`;

			let foundBookYear = document.createElement("p");
			foundBookYear.textContent = `Tahun: ${book.bookYear}`;

			let bookReadingProgress = document.createElement("p");
			bookReadingProgress.textContent = `Selesai dibaca: ${
				book.isComplete ? "Ya" : "Belum"
			}`;

			// wrap each of the book details in searchResultItemContainer
			searchResultItemContainer.append(
				foundBookTitle,
				foundBookAuthor,
				foundBookYear,
				bookReadingProgress
			);

			searchResultContainer.append(searchResultItemContainer);

			searchBookResult.append(searchResultContainer);
		});
	}
}

function findBookUniqueIdFromBookshelf(bookId) {
	for (const book of arrayOfBooks) {
		if (book.bookUniqueId === bookId) {
			return book;
		}
	}
	return null;
}

function findBookIndex(bookUniqueId) {
	for (const index in arrayOfBooks) {
		if (arrayOfBooks[index].bookUniqueId === bookUniqueId) {
			return index;
		}
	}
	return -1;
}

function saveBook() {
	if (checkForLocalStorageSupport()) {
		localStorage.setItem(BOOKSHELF_ITEM_KEY, JSON.stringify(arrayOfBooks));
		document.dispatchEvent(new Event(SAVE_BOOKSHELF));
	}
}

function loadBooksFromLocalStorage() {
	const localStorageData = localStorage.getItem(BOOKSHELF_ITEM_KEY);
	let parsedData = JSON.parse(localStorageData);

	if (parsedData !== null) {
		for (const book of parsedData) {
			arrayOfBooks.push(book);
		}
	}

	document.dispatchEvent(new Event(RENDER_BOOKSHELF));
}

function generateBooks(bookObject) {
	const { bookUniqueId, bookTitle, bookAuthor, bookYear, isComplete } =
		bookObject;

	const textTitle = document.createElement("h3");
	textTitle.innerText = bookTitle;
	textTitle.setAttribute("data-testid", "bookItemTitle");
	textTitle.classList.add("font-semibold");

	const textAuthor = document.createElement("p");
	textAuthor.innerText = `Penulis: ${bookAuthor}`;
	textAuthor.setAttribute("data-testid", "bookItemAuthor");

	const textYear = document.createElement("p");
	textYear.innerText = `Tahun: ${bookYear}`;
	textYear.setAttribute("data-testid", "bookItemYear");

	const editButton = document.createElement("button");
	editButton.innerText = "Edit Buku";
	editButton.setAttribute("data-testid", "bookItemEditButton");
	editButton.classList.add(
		"border-2",
		"border-bookshelf-light",
		"rounded-md",
		"font-medium",
		"text-lg",
		"p-2"
	);
	// editButton.addEventListener("click", function () {
	// 	alert("Fitur belum tersedia");
	// });

	const deleteButton = document.createElement("button");
	deleteButton.innerText = "Hapus Buku";
	deleteButton.setAttribute("data-testid", "bookItemDeleteButton");
	deleteButton.classList.add(
		"border-2",
		"border-bookshelf-light",
		"rounded-md",
		"font-medium",
		"text-lg",
		"p-2"
	);

	deleteButton.addEventListener("click", function () {
		deleteBook(bookUniqueId);
	});

	const completeBookButton = document.createElement("button");
	completeBookButton.innerText = "Selesai Dibaca";
	completeBookButton.setAttribute("data-testid", "bookItemIsCompleteButton");
	completeBookButton.classList.add(
		"border-2",
		"border-bookshelf-light",
		"rounded-md",
		"font-medium",
		"text-lg",
		"p-2"
	);
	completeBookButton.addEventListener("click", function () {
		addBookToCompleteBookshelf(bookUniqueId);
	});

	const incompleteBookButton = document.createElement("button");
	incompleteBookButton.innerText = "Belum Selesai Dibaca";
	incompleteBookButton.setAttribute(
		"data-testid",
		"bookItemIsIncompleteButton"
	);
	incompleteBookButton.classList.add(
		"border-2",
		"border-bookshelf-light",
		"rounded-md",
		"font-medium",
		"text-lg",
		"p-2"
	);
	incompleteBookButton.addEventListener("click", function () {
		addBookToUnfinishedBookshelf(bookUniqueId);
	});

	// set up the buttons container
	const buttonsContainer = document.createElement("div");
	buttonsContainer.classList.add(
		"flex",
		"flex-col",
		"flex-wrap",
		"gap-2",
		"mt-2"
	);

	// add conditional rendering for button based on book progress
	if (isComplete) {
		buttonsContainer.append(incompleteBookButton, editButton, deleteButton);
	} else {
		buttonsContainer.append(completeBookButton, editButton, deleteButton);
	}

	// set up the book item container
	const bookItemContainer = document.createElement("div");
	bookItemContainer.classList.add(
		"flex",
		"flex-col",
		"p-4",
		"bg-bookshelf-primary",
		"text-bookshelf-dark",
		"rounded-lg"
	);
	bookItemContainer.setAttribute("data-testid", "bookItem");
	bookItemContainer.setAttribute("data-bookid", bookUniqueId);
	bookItemContainer.append(textTitle, textAuthor, textYear, buttonsContainer);

	return bookItemContainer;
}

function addBooks() {
	const bookTitle = addNewBookTitle.value;
	const bookAuthor = addNewBookAuthor.value;
	const bookYear = addNewBookYear.value;
	const bookProgress = addNewBookIsComplete.checked;

	const generatedUniqueId = generateUniqueIdForBook();
	const bookObject = createBookObject(
		generatedUniqueId,
		bookTitle,
		bookAuthor,
		bookYear,
		bookProgress
	);
	arrayOfBooks.push(bookObject);

	document.dispatchEvent(new Event(RENDER_BOOKSHELF));
	saveBook();
}

function addBookToCompleteBookshelf(bookUniqueId) {
	const bookTarget = findBookUniqueIdFromBookshelf(bookUniqueId);
	if (bookTarget == null) {
		return;
	}
	bookTarget.isComplete = true;
	document.dispatchEvent(new Event(RENDER_BOOKSHELF));
	saveBook();
}

function addBookToUnfinishedBookshelf(bookUniqueId) {
	const bookTarget = findBookUniqueIdFromBookshelf(bookUniqueId);
	if (bookTarget == null) {
		return;
	}
	bookTarget.isComplete = false;
	document.dispatchEvent(new Event(RENDER_BOOKSHELF));
	saveBook();
}

function deleteBook(bookUniqueId) {
	const bookTarget = findBookIndex(bookUniqueId);
	if (bookTarget == -1) {
		return;
	}
	arrayOfBooks.splice(bookTarget, 1);
	document.dispatchEvent(new Event(RENDER_BOOKSHELF));
	saveBook();
}

document.addEventListener("DOMContentLoaded", () => {
	addNewBookForm.addEventListener("submit", function (events) {
		events.preventDefault();
		addBooks();
	});
	if (checkForLocalStorageSupport()) {
		loadBooksFromLocalStorage();
	}
});

searchBookForm.addEventListener("submit", function (events) {
	events.preventDefault();
	findBookTitle();
});

document.addEventListener(SAVE_BOOKSHELF, () => {
	console.log("Buku berhasil disimpan!");
});

document.addEventListener(RENDER_BOOKSHELF, () => {
	// clearing the bookshelf
	listOfUnfinishedBooks.innerHTML = "";
	listOfCompletedBooks.innerHTML = "";

	for (const book of arrayOfBooks) {
		const createBook = generateBooks(book);
		if (book.isComplete) {
			listOfCompletedBooks.append(createBook);
		} else {
			listOfUnfinishedBooks.append(createBook);
		}
	}
});
