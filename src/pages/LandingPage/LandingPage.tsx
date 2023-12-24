import "./LandingPage.css";
import { useRef } from "react";
import introVideo from "../../assets/introVideo.mp4";
import Logo from "../../assets/pokemon.png";
import buttonSound from "../../assets/hoverSound.wav";
import select1 from "../../assets/select1.wav";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const hover = useRef(new Audio(buttonSound));
  const select = useRef(new Audio(select1));
  function handelMouseOver() {
    hover.current.play();
  }
  function navigateHoepage() {
    select.current.play();
    navigate("./homepage");
  }
  return (
    <div className="landing-container">
      <video autoPlay loop muted playsInline className="video-player">
        <source src={introVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="content">
        <img
          className="logo"
          src={Logo}
          alt="Logo"
          onMouseOver={handelMouseOver}
          onClick={navigateHoepage}
        />
        <h2>Click above to continue</h2>
      </div>
    </div>
  );
};

export default LandingPage;
