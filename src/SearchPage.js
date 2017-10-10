import React from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from './BooksAPI';

class Search extends React.Component {

  state = {
    foundBooks: [],
    lastAdded: ""
  }   

  // The function below takes search term and makes an API request for data...

  changeTerm = (val) => {
    BooksAPI.search(val).then(data => {
      let books = (data.error)? [] : data; // if server returns no books, assign an empty array 
      this.setState({
        foundBooks: books
      })
    })
  } 

  // The function scrolls to the top of the page, prints a confirmation message there and adds an item to our shelf...

  addShelf = (book, shelf) => {
    this.setState({
      lastAdded: book.title
    })
    this.props.addShelf(book, shelf); // this function is on App.js
    window.scrollTo(0, 0);
  }

  // This function checks whether a book coming up in a search is already on the shelf...
  
  checkIfAlreadyOnShelf = (book) => {
    let x = false;
    this.props.shelf.forEach(shelf => {
      if(book.id === shelf.id) x = true;
    })
    return x;
  }

  render(){

    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input 
              type="text" 
              placeholder="Search by title or author"
              value={this.state.searchTerm}
              onChange={ (event) => this.changeTerm(event.target.value) }
            />
          </div>
        </div>

        <div className="search-books-results">

        { /*If the user just added a new book, a confirmation message atop the page appears...*/ }

        { (this.state.lastAdded) && 
          (<div className="just-added"><b>Last added:</b> {this.state.lastAdded}</div>)
        }

        { /*If the state is empty such as nothing has been entered in the search bar or the API returns nothing, don't render... */ }

        { (this.state.foundBooks.length > 0) && 
          (
            <ol className="books-grid">
              {this.state.foundBooks.map( data => (

                <li key={data.id}> 
                  <div className="book">
                    <div className="book-top">

                     {
                      /* Need ternary expression because some thumbnails are empty, returns undefined and throws error... */
                       (data.imageLinks) ? (
                          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${data.imageLinks.thumbnail})` }}></div>
                        ) : (
                          <div className="book-cover" style={{ width: 128, height: 193 }}></div>
                        )
                     }
              
                      <div className="book-shelf-changer">

                    { /* Check if a book is already on the shelf.  If it is, the drop down will provide the appropriate message...*/ }

                      { (this.checkIfAlreadyOnShelf(data))? 
                        (
                          <select value="none" readOnly>
                            <option value="none" disabled> This book is already on your shelf... </option>
                          </select>
                        ) : 
                        (
                          <select value="none" onChange={ (event) => this.addShelf(data, event.target.value) }>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                          </select>
                        )
                      }  

                      </div>
                    </div>
                    <div className="book-title">{ data.title }</div>

                    { /* Give each author it's own line or, if no author, say no author... */ }

                    <div className="book-authors">
                      { (data.authors)?
                        (data.authors.map(auth => (<span key={auth}>{auth}<br/></span>))):
                        (<span>(No author)</span>)
                      }
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          )
        }

        </div>
      </div>
    )
  }
}

export default Search