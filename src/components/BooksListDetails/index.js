import { AiFillStar } from "react-icons/ai";

import { Link } from "react-router-dom";

import "./index.css";

const BookListDetails = (props) => {
  const { each } = props;
  const { id, authorName, rating, title, coverPic, readStatus } = each;
  return (
    <Link to={`/bookshelves/${id}`} className="book-link">
      <li className="book-item">
        <div className="img-container">
          <img src={coverPic} alt={title} className="book-img" />
        </div>
        <div className="book-content">
          <h1 className="each-book-title">{title}</h1>
          <p className="each-book-author">{authorName}</p>
          <div className="rating-flex-container">
            <p className="each-book-rating">Avg Rating</p>
            <AiFillStar className="star-icon" />
            <span className="each-book-rating-count">{rating}</span>
          </div>
          <p className="each-book-reading-status">
            Status : <span className="each-reading-status">{readStatus}</span>
          </p>
        </div>
      </li>
    </Link>
  );
};

export default BookListDetails;
