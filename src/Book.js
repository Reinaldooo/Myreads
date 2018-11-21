import React from 'react';
import noCover from './images/no-cover.jpg'

const Book = ({ book, owned, onShelves, updateBook, updateSearch }) => {

  const background = (book) => {
    if (book.imageLinks) {
      return {
        "backgroundImage": `url("${book.imageLinks.thumbnail}")`
      }
    } else {
      return {
        "backgroundImage": `url(${noCover})`
      }
    }
  }

  const own = owned && owned.find((b) => b.id === book.id)

  const selectClass = (b) => {
    if (own) {
      return "book-shelf-changer-owned"
    } else {
      return "book-shelf-changer"
    }
  }

  const selectShelf = (b) => {
    if (onShelves) return b.shelf;
    return "none"
  }

  const updateShelf = (b, shelf) => {
    if (onShelves) {
      updateBook(b, shelf)
    } else {
      updateSearch(b, shelf)
    }
  }

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={background(book)}></div>
          <div className={selectClass(book)}>
            <select defaultValue={selectShelf(book)} onChange={(event) => updateShelf(book, event.target.value)}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>

        <div className="book-title">{book.title}</div>
        {
          book.authors && book.authors.map((author, index) => (
            <div key={index} className="book-authors">{author}</div>
          ))
        }
      </div>
    </li>
  );
}

export default Book;
