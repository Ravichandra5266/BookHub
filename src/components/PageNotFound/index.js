import "./index.css";

import { withRouter } from "react-router-dom";

const PageNotFound = (props) => {
  const onclickHome = () => {
    const { history } = props;
    history.replace("/");
  };
  return (
    <div className="notfound-container">
      <img
        src="https://res.cloudinary.com/dnmaskg3n/image/upload/v1675249086/erroring_2_ltrbel.png"
        alt="not found"
        className="notfound-img"
      />
      <h1 className="notfound-title">Page Not Found</h1>
      <p className="notfound-para">
        we are sorry, the page you requested could not be found,Please go back
        to the homepage.
      </p>
      <button type="button" className="notfound-btn" onClick={onclickHome}>
        Go Back to Home
      </button>
    </div>
  );
};

export default withRouter(PageNotFound);
