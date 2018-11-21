import React, { Component } from 'react'
import * as BooksAPI from '../BooksAPI'
import SearchShow from '../stateless/SearchShow'
import { Link } from 'react-router-dom'
import './App.css'
import { DebounceInput } from 'react-debounce-input';

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
    let cleanQuery = query.trim()
    this.setState({ query: cleanQuery })
    BooksAPI.search(cleanQuery, 2).then((books) => {
      this.setState({ books: books || [], load: false })
    })
  }
  updateSearch = (book, shelf) => {
    this.props.updateBook(book, shelf)
    if (shelf === "none") {
      this.setState({ owned: this.state.owned.filter((b) => b.id !== book.id), display: true })

    } else {
      book.shelf = shelf
      this.setState({ owned: this.state.owned.concat([book]), display: true })
    }
  }
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <DebounceInput
              placeholder="Search by title or author"
              value={this.state.query}
              minLength={2}
              debounceTimeout={500}
              onChange={(e) => this.updateQuery(e.target.value)} />
          </div>
        </div>
        <div className="search-books-results">
          {
            this.state.books.length > 0 &&
            <SearchShow
              data={this.state.books}
              updateSearch={this.updateSearch}
              query={this.state.query}
              owned={this.state.owned}
              load={this.state.load}
              display={this.state.display}
            />
          }
        </div>
      </div>
    )
  }
}
export default Search