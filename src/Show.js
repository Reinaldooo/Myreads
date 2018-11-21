import React, { Component } from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import Book from './Book'

class Show extends Component {
  data = this.props.data

  render() {    
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              (
                this.props.data[0] && this.props.data.map((book) => (
                  <Book key={book.id} book={book} onShelves="true" updateBook={this.props.updateBook} />
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
}
export default Show