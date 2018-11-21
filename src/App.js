import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import { Route, Link } from 'react-router-dom'
import sortBy from 'sort-by'
import Show from './Show.js'
import Search from './Search.js'
import './App.css'

class BooksApp extends Component {
  state = {
    books: []
  }
  componentDidMount() {
    BooksAPI.getAll().then((books) => { 
      this.setState({ books })
    })
  }
  updateBook = (book, shelf) => {
    book.shelf = shelf
      this.setState((state) => ({
          books: state.books.filter((c) => c.id !== book.id).concat([book]),
          display: "Book added to your library"
      }))
    BooksAPI.update(book, shelf)
  }
  
  render() {
    return (
      <div className="app">          
        <Route exact path="/search" render={({ history }) =>( 
          <Search 
          data={this.state.books}
          updateBook={this.updateBook}
          searchToggle={this.searchToggle}
          owned={this.state.books}
          />                                 
        )}/>
        <Route exact path="/" render={() =>( 
          <div className="list-books">
            <div className="list-books-title">
              <h1><span>MyReads</span></h1>
            </div>
            <div className="list-books-content">
              <div>
                <Show 
                data={this.state.books.filter((b) => b.shelf === "currentlyReading").sort(sortBy('title', 'id'))}
                updateBook={this.updateBook}
                title="Currently Reading"
                />
                <Show 
                data={this.state.books.filter((b) => b.shelf === "wantToRead").sort(sortBy('title', 'id'))}
                updateBook={this.updateBook}
                title="Want to Read"/>
                <Show 
                data={this.state.books.filter((b) => b.shelf === "read").sort(sortBy('title', 'id'))}
                updateBook={this.updateBook}
                title="Read"/> 
              </div>
            </div>
            <div className="open-search">
              <Link to="/search"></Link>
            </div>
          </div>  
        )}/>
      </div>
    )
  }
}
export default BooksApp
