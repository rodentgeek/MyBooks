import React from "react";

class Section extends React.Component {
  render(){

    /* Creating text headings for each of the three sections... */

    let headerText = "Currently Reading";
    if(this.props.section === "wantToRead") headerText = "Want to Read";
    if(this.props.section === "read") headerText = "Read";
  
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{headerText}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              this.props.shelf.filter(books => books.shelf === this.props.section).map(data => (
                <li key={data.id}>
                  <div className="book">
                    <div className="book-top">

                     {
                      /* Need ternary expression because empty thumbnails returns undefined and throws error... */
                       (data.imageLinks) ? (
                          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${data.imageLinks.thumbnail})` }}></div>
                        ) : (
                          <div className="book-cover" style={{ width: 128, height: 193 }}></div>
                        )
                     }

                      <div className="book-shelf-changer">
                        <select value={data.shelf} onChange={ (event) => this.props.changeShelf(data, event.target.value) }>
                          <option value="none" disabled>Move to...</option>

                          { /* Adding check marks next to shelf name in drop down if the book is on that shelf */ }

                          <option value="currentlyReading"> { (data.shelf === "currentlyReading") && ('✔') } Currently Reading</option>
                          <option value="wantToRead"> { (data.shelf === "wantToRead") && ('✔') } Want to Read</option>
                          <option value="read"> { (data.shelf === "read") && ('✔') } Read</option>

                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{data.title}</div>

                    { /* Give each author it's own line or, if no author, say 'no author'... */ }

                    <div className="book-authors">
                      { (data.authors)?
                        (data.authors.map(auth => (<span key={auth}>{auth}<br/></span>))):
                        (<span>(No author)</span>)
                      }
                    </div>

                  </div>
                </li>
              ))
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default Section;