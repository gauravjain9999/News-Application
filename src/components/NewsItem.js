import React, { Component } from 'react';

export class NewsItem extends Component {
  
  render() {
    let {title, description, imageUrl, newsUrl, author, date, source} = this.props;
    return (
      <div className="my-3">
        <div className='card'>
          <div style={{display: 'flex', justifyContent: 'flex-end',
          position: 'absolute', right: '0'}}>

          <span className="badge rounded-pill bg-danger">{source}</span>
          </div>
          <img src={imageUrl? imageUrl: 
          "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"} className='card-img-top' alt='...' />
          <div className='card-body'>
            <h5 className='card-title'>{title}</h5>
            <p className='card-text'>{description}</p>
            <p className="card-text"><small className="text-danger">By {author ? author: "Unknown"} on date {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl}  rel="noreferrer" target="_blank" className='btn btn-sm btn-primary'>
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
