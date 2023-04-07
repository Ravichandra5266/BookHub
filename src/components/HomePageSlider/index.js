import Cookies from "js-cookie";

import { useState, useEffect } from "react";

import { TailSpin } from "react-loader-spinner";

import { Link } from "react-router-dom";

import Slider from "react-slick";

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

import "./index.css";

const apiStatusConstant = {
  initial: "Initial",
  success: "Success",
  failure: "Failure",
  inProgress: "InProgress",
};

const HomePageSlider = () => {
  const [homeSliderStatus, setHomeSliderStatus] = useState({
    fetchingStatus: apiStatusConstant.initial,
    sliderData: null,
  });

  const fetchHomeSliderData = async () => {
    setHomeSliderStatus({
      fetchingStatus: apiStatusConstant.inProgress,
      sliderData: null,
    });
    const homeSliderApi = "https://apis.ccbp.in/book-hub/top-rated-books";
    const token = Cookies.get("jwt_token");
    const options = {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const responseUrl = await fetch(homeSliderApi, options);
    if (responseUrl.ok) {
      const responseData = await responseUrl.json();

      const updatedData = responseData.books.map((each) => ({
        id: each.id,
        authorName: each.author_name,
        coverPic: each.cover_pic,
        title: each.title,
      }));
      setHomeSliderStatus((prevState) => ({
        ...prevState,
        fetchingStatus: apiStatusConstant.success,
        sliderData: updatedData,
      }));
    } else {
      setHomeSliderStatus({
        fetchingStatus: apiStatusConstant.failure,
        sliderData: null,
      });
    }
  };

  useEffect(() => {
    fetchHomeSliderData();
  }, []);

  const renderLoadingView = () => (
    <div className="home-slider-loading-container">
      <TailSpin color="blue" height="50" width="50" />
    </div>
  );

  const renderSuccessView = () => {
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: false,
            dots: false,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    };
    return (
      <ul className="sliders">
        <Slider {...settings}>
          {homeSliderStatus.sliderData.map((each) => (
            <li key={each.id} className="slider-item">
              <Link to={`/bookshelves/${each.id}`} className="slider-link">
                <img
                  src={each.coverPic}
                  alt={each.title}
                  className="slider-img"
                />
                <h1 className="book-title">{each.title}</h1>
                <p className="book-author">{each.authorName}</p>
              </Link>
            </li>
          ))}
        </Slider>
      </ul>
    );
  };

  const onclickTry = () => {
    fetchHomeSliderData();
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

  const renderSlider = () => {
    switch (homeSliderStatus.fetchingStatus) {
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
    <div className="home-page-slider-continer">
      <h1 className="home-slider-title">Top Rated Books</h1>
      {renderSlider()}
    </div>
  );
};

export default HomePageSlider;
