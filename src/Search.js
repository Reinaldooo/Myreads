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
    load: true
  }
  componentDidMount() {
    BooksAPI.getAll().then((books) => { 
      this.setState({ owned: books })
    })
  }  
  updateQuery = (query) => {
    this.setState({ query: query.trim() })
    const debounce = _.debounce((query) => { this.updateQueryShow(query) }, 300)  
    debounce(query) 
  } 
  updateQueryShow = (query) => {
    BooksAPI.search(query, 2).then((books) => { 
        this.setState({ books: books, load: false })
    }) 
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
            updateBook={this.props.updateBook}
            query={this.state.query}
            owned={this.state.owned}
            load={this.state.load}
            />
        </div>
      </div>
    )
  }
}
export default Search