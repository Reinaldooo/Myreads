import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import Show from './Show.js'
import Search from './Search.js'
import { Link } from 'react-router-dom'
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
      books: state.books.filter((c) => c.id !== book.id).concat([book])
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
          owned={this.state.books}/>                                 
          )}/>
          <Route exact path="/" render={() =>( 
                    <div className="list-books">
            <div className="list-books-title">
              <h1><span>MyReads</span></h1>
            </div>
            <div className="list-books-content">
              <div>
                <Show 
                data={this.state.books.filter((b) => b.shelf === "currentlyReading")}
                updateBook={this.updateBook}
                title="Currently Reading"
                />
 
                <Show 
                data={this.state.books.filter((b) => b.shelf === "wantToRead")}
                updateBook={this.updateBook}
                title="Want to Read"/>

                <Show 
                data={this.state.books.filter((b) => b.shelf === "read")}
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
