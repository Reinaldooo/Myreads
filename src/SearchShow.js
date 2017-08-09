import React, {Component} from 'react'
// import * as BooksAPI from './BooksAPI'
// import Book from './Book'
import './App.css'

class Search extends Component {

  render() {  
    return (
      <div className="bookshelf">
        {
        (this.props.query !== '') && 
        <h4 className="bookshelf-title">Results for "{this.props.query}":</h4>  
        }
          <div className="bookshelf-books">
            <ol className="books-grid">
              {(this.props.data !== undefined) && this.props.data.map((book) => (
                <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
                    <div className="book-shelf-changer">
                      <select defaultValue={book.shelf} onChange={(event) => this.props.updateBook(book, event.target.value) }>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  {book.authors.map((author, index) => (
                    <div key={index}className="book-authors">{author}</div>
                  ))}
                </div>
                </li>
              ))
              }
            </ol>
          </div>
      </div>  
    )
  }
}

export default Search