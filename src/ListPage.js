import React from "react";
import ListPageSection from "./ListPageSection";
import { Link } from "react-router-dom";

class List extends React.Component {

	render(){
		return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>                
            <ListPageSection shelf={this.props.shelf} changeShelf={this.props.changeShelf} section="currentlyReading" />
            <ListPageSection shelf={this.props.shelf} changeShelf={this.props.changeShelf} section="wantToRead" />
            <ListPageSection shelf={this.props.shelf} changeShelf={this.props.changeShelf} section="read" />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
	}
}

export default List;