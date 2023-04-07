import Cookies from "js-cookie";

import { TailSpin } from "react-loader-spinner";

import { AiFillStar } from "react-icons/ai";

import { useState, useEffect } from "react";

import NavbarPage from "../NavbarPage";

import FooterPage from "../FooterPage";

import "./index.css";

const apiStatusConstant = {
  initial: "Initial",
  success: "Success",
  failure: "Failure",
  inProgress: "InProgress",
};

const BookItemDetail = (props) => {
  const [fetchingStatus, setFetchingStatus] = useState({
    bookStatus: apiStatusConstant.initial,
    bookData: {},
  });

  const renderBookApi = async () => {
    setFetchingStatus((prevState) => ({
      ...prevState,
      bookStatus: apiStatusConstant.inProgress,
    }));
    const { match } = props;
    const { params } = match;
    const { id } = params;
    const bookApi = ` https://apis.ccbp.in/book-hub/books/${id}`;
    const token = Cookies.get("jwt_token");
    const options = {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const responseUrl = await fetch(bookApi, options);
    if (responseUrl.ok) {
      const responseData = await responseUrl.json();

      const dataModify = responseData.book_details;
      const updatedData = {
        aboutAuthor: dataModify.about_author,
        aboutBook: dataModify.about_book,
        authorName: dataModify.author_name,
        coverPic: dataModify.cover_pic,
        id: dataModify.id,
        rating: dataModify.rating,
        readStatus: dataModify.read_status,
        title: dataModify.title,
      };
      setFetchingStatus((prevState) => ({
        ...prevState,
        bookStatus: apiStatusConstant.success,
        bookData: updatedData,
      }));
    } else {
      setFetchingStatus((prevState) => ({
        ...prevState,
        bookStatus: apiStatusConstant.failure,
      }));
    }
  };

  useEffect(() => {
    renderBookApi();
  }, []);

  const renderLoadingBook = () => (
    <div className="book-loading">
      <TailSpin color="blue" height="50" width="50" />
    </div>
  );

  const renderSuccessBook = () => {
    const {
      aboutAuthor,
      aboutBook,
      authorName,
      coverPic,
      rating,
      readStatus,
      title,
    } = fetchingStatus.bookData;
    return (
      <div className="book-detail-container">
        <div className="book-detail-flex-container">
          <img src={coverPic} alt={title} className="book-detail-img" />
          <div className="boook-detail-content-container">
            <h1 className="book-detail-title">{title}</h1>
            <p className="book-detail-author">{authorName}</p>
            <div className="book-rating-flex-container">
              <p className="book-rating">Avg Rating</p>
              <AiFillStar className="star-icon" />
              <span className="book-rating-count">{rating}</span>
            </div>
            <p className="book-reading-status">
              Status : <span className="reading-status">{readStatus}</span>
            </p>
          </div>
        </div>
        <hr className="line" />
        <div>
          <h1 className="book-detail-about-auther">About Author</h1>
          <p className="book-detail-about-para">{aboutAuthor}</p>
          <h1 className="book-detail-about-book">About Book</h1>
          <p className="book-detail-about-book-para">{aboutBook}</p>
        </div>
      </div>
    );
  };

  const onclickTry = () => {
    renderBookApi();
  };

  const renderFailureBook = () => (
    <div className="slider-failure-container">
      <img
        src="https://res.cloudinary.com/dnmaskg3n/image/upload/v1674886994/Group_7737_ipxqpg.png"
        alt="failure"
      />
      <p className="failure-para">Something went wrong, Please try again.</p>
      <button className="try-again-btn" onClick={onclickTry}>
        Try Again
      </button>
    </div>
  );

  const renderBook = () => {
    switch (fetchingStatus.bookStatus) {
      case apiStatusConstant.success:
        return renderSuccessBook();

      case apiStatusConstant.failure:
        return renderFailureBook();
      case apiStatusConstant.inProgress:
        return renderLoadingBook();

      default:
        return null;
    }
  };

  return (
    <>
      <NavbarPage />
      <div className="book-container">{renderBook()}</div>
      <FooterPage />
    </>
  );
};

export default BookItemDetail;
