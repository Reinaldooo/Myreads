import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import SearchShow from './SearchShow'
import { Link } from 'react-router-dom'
import './App.css'
import _ from 'lodash'

class Search extends Component {
  state = {
    books: [],
    query: '',
    owned: this.props.data,
    load: true,
    display: undefined
  }
  componentDidMount() {
    BooksAPI.getAll().then((books) => { 
      this.setState({ owned: books })
    })
  }  
  updateQuery = (query) => {
    this.setState({ query: query.trim() })
    const debounce = _.debounce((query) => { this.updateQueryShow(query) }, 600)  
    debounce(query) 
  } 
  updateQueryShow = (query) => {
    BooksAPI.search(query, 2).then((books) => { 
        this.setState({ books: books, load: false })
    }) 
  }
  updateSearch = (book, shelf) => {
    this.props.updateBook(book, shelf)
    if(shelf === "none"){
      this.setState({ owned: this.state.owned.filter((b) => b.id !== book.id), display: true}) 
    
    } else {
     book.shelf = shelf
    this.setState({ owned: this.state.owned.concat([book]), display: true})
    }
    }
  render() {  
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
            <div className="search-books-input-wrapper">
              <input type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}
              />
            </div>
        </div>
        <div className="search-books-results">
            <SearchShow 
            data={this.state.books}
            updateSearch={this.updateSearch}
            query={this.state.query}
            owned={this.state.owned}
            load={this.state.load}
            display={this.state.display}
            />
        </div>
      </div>
    )
  }
}
export default Search