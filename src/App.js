import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import Show from './Show.js'
import Search from './Search.js'
import './App.css'

class BooksApp extends Component {
  state = {
    books: [],
    showSearchPage: true
}

componentDidMount() {
    BooksAPI.getAll().then((books) => { 
      this.setState({ books: books })
    })
}

updateBook = (book, shelf) => {
   BooksAPI.update(book, shelf)
}
  
    render() {
      const currentlyReading = this.state.books.filter((b) => b.shelf === "currentlyReading")
      const read = this.state.books.filter((b) => b.shelf === "read")
      const wantToRead = this.state.books.filter((b) => b.shelf === "wantToRead")
      
      return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author"/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                <Search 
                data={currentlyReading}
                updateBook={this.updateBook}
                title="Search"/>
              </ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Show 
                data={currentlyReading}
                updateBook={this.updateBook}
                title="Currently Reading"/>

                <Show 
                data={wantToRead}
                updateBook={this.updateBook}
                title="Want to Read"/>

                <Show 
                data={read}
                updateBook={this.updateBook}
                title="Read"/>
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
