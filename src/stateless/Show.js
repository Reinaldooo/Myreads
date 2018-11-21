import React from 'react'
// import * as BooksAPI from './BooksAPI'
import Book from './Book'

const Show = (props) => {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              (
                props.data[0] && props.data.map((book) => (
                  <Book key={book.id} book={book} onShelves="true" updateBook={props.updateBook} />
                ))
              )
              ||
              <div className="spinner">
                <div className="bounce1"></div>
                <div className="bounce2"></div>
                <div className="bounce3"></div>
              </div>
            }
          </ol>
        </div>
      </div>
    )
}
export default Show