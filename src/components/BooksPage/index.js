import NavbarPage from "../NavbarPage";

import { BsSearch } from "react-icons/bs";

import { useState, useEffect } from "react";

import BookshelvesBtns from "../BookshelvesBtns";

import { TailSpin } from "react-loader-spinner";

import Cookies from "js-cookie";

import FooterPage from "../FooterPage";

import BookListDetails from "../BooksListDetails";

import "./index.css";

const bookshelvesList = [
  {
    id: "22526c8e-680e-4419-a041-b05cc239ece4",
    value: "ALL",
    label: "All",
  },
  {
    id: "37e09397-fab2-46f4-9b9a-66b2324b2e22",
    value: "READ",
    label: "Read",
  },
  {
    id: "2ab42512-3d05-4fba-8191-5122175b154e",
    value: "CURRENTLY_READING",
    label: "Currently Reading",
  },
  {
    id: "361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8",
    value: "WANT_TO_READ",
    label: "Want to Read",
  },
];
const apiStatusConstant = {
  initial: "Initial",
  success: "Success",
  failure: "Failure",
  inProgress: "InProgress",
};

const BooksPage = () => {
  const [booksStatus, setBooksStatus] = useState({
    activeBookShell: bookshelvesList[0].value,
    activeBookShellLabel: bookshelvesList[0].label,
    searchValue: "",
    fetchingStatus: apiStatusConstant.initial,
    booksListData: [],
  });

  const renderBooksApi = async () => {
    setBooksStatus((prevState) => ({
      ...prevState,
      fetchingStatus: apiStatusConstant.inProgress,
    }));

    const booksApi = `https://apis.ccbp.in/book-hub/books?shelf=${booksStatus.activeBookShell}&search=${booksStatus.searchValue}`;
    const token = Cookies.get("jwt_token");
    const options = {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const responseUrl = await fetch(booksApi, options);
    if (responseUrl.ok) {
      const responseData = await responseUrl.json();
      const updatedData = responseData.books.map((each) => ({
        id: each.id,
        authorName: each.author_name,
        coverPic: each.cover_pic,
        rating: each.rating,
        readStatus: each.read_status,
        title: each.title,
      }));
      setBooksStatus((prevState) => ({
        ...prevState,
        fetchingStatus: apiStatusConstant.success,
        booksListData: updatedData,
      }));
    } else {
      setBooksStatus((prevState) => ({
        ...prevState,
        fetchingStatus: apiStatusConstant.failure,
      }));
    }
  };

  useEffect(() => {
    renderBooksApi();
  }, [booksStatus.activeBookShell]);

  const setActiveBtn = (label, value) => {
    setBooksStatus(
      (prevState) => ({
        ...prevState,
        activeBookShellLabel: label,
        activeBookShell: value,
      }),
      renderBooksApi
    );
  };

  const onchangeSearch = (event) => {
    setBooksStatus((prevState) => ({
      ...prevState,
      searchValue: event.target.value,
    }));
  };

  const onclickSearch = () => {
    renderBooksApi();
  };

  const renderLoadingView = () => (
    <div className="books-loading-container">
      <TailSpin color="blue" height="50" width="50" />
    </div>
  );

  const renderSuccessView = () => (
    <div>
      {booksStatus.booksListData.length > 0 && (
        <h1 className="show-books-title">{`${booksStatus.activeBookShellLabel} Books`}</h1>
      )}
      <ul className="books-list-items-container">
        {booksStatus.booksListData.length > 0 ? (
          booksStatus.booksListData.map((each) => (
            <BookListDetails each={each} key={each.id} />
          ))
        ) : (
          <div className="empty-search-container">
            <img
              src="https://res.cloudinary.com/dnmaskg3n/image/upload/v1675684039/Group_i0rx3y.png"
              alt="search"
              className="emp-img"
            />
            <p className="emp-para">
              Your search for dsadsdsad did not find any matches.
            </p>
          </div>
        )}
      </ul>
    </div>
  );

  const onclickTry = () => {
    renderBooksApi();
  };

  const renderFailureView = () => (
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

  const renderAllBooks = () => {
    switch (booksStatus.fetchingStatus) {
      case apiStatusConstant.success:
        return renderSuccessView();
      case apiStatusConstant.failure:
        return renderFailureView();
      case apiStatusConstant.inProgress:
        return renderLoadingView();

      default:
        return null;
    }
  };

  return (
    <>
      <NavbarPage />
      <div className="books-page-container">
        <div className="search-container">
          <input
            type="search"
            placeholder="Search"
            className="search-input"
            value={booksStatus.searchValue}
            onChange={onchangeSearch}
          />
          <button type="button" className="search-btn" onClick={onclickSearch}>
            <BsSearch className="search-icon" />
          </button>
        </div>
        <h1 className="title">Bookshelves</h1>
        <div className="books-flex-conatiner">
          <ul className="books-btn-items-container">
            {bookshelvesList.map((each) => (
              <BookshelvesBtns
                each={each}
                key={each.id}
                setActiveBtn={setActiveBtn}
                isActive={each.label === booksStatus.activeBookShellLabel}
              />
            ))}
          </ul>
          <div className="lg-search-container">
            <input
              type="search"
              placeholder="Search"
              className="search-input"
              value={booksStatus.searchValue}
              onChange={onchangeSearch}
            />
            <button
              type="button"
              className="search-btn"
              onClick={onclickSearch}
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
        </div>
        {renderAllBooks()}
        <FooterPage />
      </div>
    </>
  );
};

export default BooksPage;
