import React from 'react'
import { Link } from 'react-router-dom'
import sortBy from 'sort-by'
import Book from './Book'
import If from './If'


const SearchShow = (props) => {
  const data = props.data[0] ? props.data.sort(sortBy('title', 'id')) : undefined
  return (
    <div className="bookshelf">
      <div className="bookshelf-books">
        <If test={props.display !== undefined}>
          <div className="flash-message"><Link to="/">Changes saved, click here to go back.</Link></div>
        </If>
        <ol className="books-grid">
          <If test={props.emptyResults}>
            <div className="no-results">Sorry, no books found! Could you please try another term?</div>
          </If>
            {
              (!props.emptyResults && data) &&
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