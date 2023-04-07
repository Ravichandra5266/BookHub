import { Link } from "react-router-dom";

import "./index.css";

const HomePageContent = () => {
  return (
    <div className="home-page-content-continer">
      <h1 className="home-title">Find Your Next Favorite Books?</h1>
      <p className="home-para">
        You are in the right place. Tell us what titles or genres you have
        enjoyed in the past, and we will give you surprisingly insightful
        recommendations.
      </p>
      <Link to="/bookshelves" className="find-books-btn">
        Find Books
      </Link>
    </div>
  );
};

export default HomePageContent;
