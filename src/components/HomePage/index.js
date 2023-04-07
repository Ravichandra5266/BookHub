import NavbarPage from "../NavbarPage";

import HomePageContent from "../HomePageContent";

import HomePageSlider from "../HomePageSlider";

import FooterPage from "../FooterPage";

import "./index.css";

const HomePage = () => (
  <div className="home-page-container">
    <NavbarPage />
    <HomePageContent />
    <HomePageSlider />
    <FooterPage />
  </div>
);

export default HomePage;
