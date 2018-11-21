import React from 'react'
import { Link } from 'react-router-dom'
import sortBy from 'sort-by'
import Book from './Book'

const SearchShow = (props) => {
  const data = props.data[0] ? props.data.sort(sortBy('title', 'id')) : undefined
  return (
    <div className="bookshelf">
    {console.log(props.query)}
      <div className="bookshelf-books">
        {
          (props.load && props.query) &&
          <div className="spinner">
            <div className="bounce1"></div>
            <div className="bounce2"></div>
            <div className="bounce3"></div>
          </div>
        }
        {
          props.display !== undefined && <div className="flash-message"><Link to="/">Changes saved, click here to go back.</Link></div>
        }
        <ol className="books-grid">
          {
            data &&
            data.map((book) => (
              <Book key={book.id} book={book} owned={props.owned} updateSearch={props.updateSearch} />
            ))
          }
        </ol>
      </div>
    </div>
  )
}
export default SearchShow