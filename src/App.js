import React from 'react';
import './App.css';
import { Route } from "react-router-dom";
import List from './ListPage';
import Search from './SearchPage';
import * as BooksAPI from './BooksAPI';

class BooksApp extends React.Component {

  state = {
    shelf: []
  }

  componentDidMount(){
    BooksAPI.getAll().then(data => {
      this.setState({
        shelf: data
      })
    })
  } 

  // This function adds a new book to the shelf...

  addShelf = (book, shelf) => {
    let newBook = book;
    newBook.shelf = shelf;

    BooksAPI.update({
      id: book.id
    }, shelf).then(() =>{
      this.setState(state => ({
        shelf: this.state.shelf.concat(newBook)
      }))
    })   
  }

  // The function moves a book from one shelf to another, or deleted from all shelves...

  changeShelf = (book, shelf) => {

    // Create a new variable called newState to mirror the existing state.  Then, remove (filter out) the book from the newState...  

    let newState = this.state.shelf.filter(books => books.id !== book.id); 

    // Finally, add the book back into newState with the new shelf section only if the selected shelf is not "none".  If the selected shelf is "none", then leave it off the newState...

    if(shelf !== "none") {
      let bookUpdatedShelf = book;
      bookUpdatedShelf.shelf = shelf;
      newState = newState.concat(bookUpdatedShelf);
    }

    BooksAPI.update({
      id: book.id
    }, shelf).then(() =>{
      this.setState(state => ({
        shelf: newState // Here, the updated state is set as newState
      }))
    })     
  }

  render(){
    return(
      <div className="app">
        <Route exact path="/" render={()=>(
          <List shelf={this.state.shelf} changeShelf={this.changeShelf} />
        )}/>
        <Route path="/search" render={()=>(
          <Search shelf={this.state.shelf} addShelf={this.addShelf} />
        )}/>
      </div>
    )
  }
}

export default BooksApp;