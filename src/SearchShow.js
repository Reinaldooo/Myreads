import React, {Component} from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import sortBy from 'sort-by'
import Book from './Book'

class Search extends Component {
  render() {  
    this.props.data.sort(sortBy('title', 'id'))
    return (
      <div className="bookshelf">
        {/* {
        (this.props.query) && 
        <h4 className="bookshelf-title">Faded out books are already in one of your shelfs</h4>
        } */}
          <div className="bookshelf-books">
            {(this.props.load && this.props.query) && //This will show the loading animation
            <div className="spinner">
              <div className="bounce1"></div>
              <div className="bounce2"></div>
              <div className="bounce3"></div>
            </div>
            }
            {this.props.display !== undefined && <div className="flash-message"><Link to="/">Changes saved, click here to go back.</Link></div>}
            <ol className="books-grid">
              {(this.props.data !== undefined) && this.props.data.map((book) => (
                <Book key={book.id} book={book} owned={this.props.owned} updateSearch={this.props.updateSearch}/>
              ))
              }
            </ol>
          </div>
      </div>  
    )
  }
}
export default Search