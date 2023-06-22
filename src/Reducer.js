import uuid from 'react-native-uuid';

export const ACTIONS = {
  INIT_BOOKS: 'init_books',
  DATA_SAVED: 'data_saved',
  ADD_BOOK: 'add_book',
  EDIT_BOOK_DATA: 'edit_book_data',
  DELETE_BOOK: 'delete_book',
  EDIT_BOOK_TAGS: 'edit_book_tags',
  SET_BOOK_FILENAME: 'set_book_filename',
  SET_DURATION: 'set_duration',
};

const getNewBookTitle = (books) => {
  const bookTitles = books.map((m) => m.title);
  let bookTitle = 'Book 1';
  let bookNr = 1;
  while (bookTitles.indexOf(bookTitle) > -1) {
    bookNr += 1;
    bookTitle = `Book ${bookNr}`;
  }
  return bookTitle;
};

const reducer = ({ save, books }, action) => {
  switch (action.type) {
    // set initial books
    case ACTIONS.INIT_BOOKS:
      return {
        save: action.payload.save,
        books: action.payload.books,
      };
    case ACTIONS.DATA_SAVED:
      return { save: false, books };
    // add a new book
    case ACTIONS.ADD_BOOK: {
      const newBookTitle = getNewBookTitle(books);
      return {
        save: true,
        books: [
          {
            id: uuid.v4(),
            title: newBookTitle,
            duration: '',
            notes: '',
            filename: '',
            tags: [],
            created: Date.now(),
          },
          ...books,
        ],
      };
    }
    // edit book data
    case ACTIONS.EDIT_BOOK_DATA:
      return {
        save: true,
        books: books.map((l) => {
          if (l.id === action.payload.bookId) {
            return {
              ...l,
              title: action.payload.title,
              notes: action.payload.notes,
            };
          }
          return l;
        }),
      };
    // delete book
    case ACTIONS.DELETE_BOOK:
      return {
        save: true,
        books: books.filter((l) => l.id !== action.payload.id),
      };
    // edit tags for a book
    case ACTIONS.EDIT_BOOK_TAGS: {
      const bookIndex = books.findIndex((i) => i.id === action.payload.bookId);
      books[bookIndex].tags = action.payload.tags;
      return {
        save: true,
        books,
      };
    }
    // set book filename
    case ACTIONS.SET_BOOK_FILENAME:
      return {
        save: true,
        books: books.map((l) => {
          if (l.id === action.payload.bookId) {
            return {
              ...l,
              filename: action.payload.filename,
            };
          }
          return l;
        }),
      };
    // set book duration
    case ACTIONS.SET_DURATION:
      return {
        save: true,
        books: books.map((l) => {
          if (l.id === action.payload.bookId) {
            return {
              ...l,
              duration: action.payload.duration,
            };
          }
          return l;
        }),
      };
    default:
      return { save, books };
  }
};

export default reducer;
