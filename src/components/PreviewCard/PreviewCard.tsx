import "./PreviewCard.css";
import { useRef } from "react";
import choose from "../../assets/hoverSound2.wav";
import Select from "../../assets/pokeonSaved.wav";
import { useNavigate } from "react-router-dom";

interface preview {
  url: string;
  name: string;
  type: string;
  id: number;
}
const PreviewCard = ({ id, url, name, type }: preview) => {
  const hover = useRef(new Audio(choose));
  const select = useRef(new Audio(Select));
  const navigate = useNavigate();
  function handelHover() {
    hover.current.play();
  }
  function handelSelect() {
    select.current.play();
    navigate(`/review/${id}`);
  }
  return (
    <div
      className="preview-card"
      onMouseOver={handelHover}
      onClick={handelSelect}
    >
      <img src={url} alt="pokemonImage" />
      <div className="preview-content">
        <h2>{name.toUpperCase()}</h2>
        <h3>{type.toUpperCase()}</h3>
      </div>
    </div>
  );
};

export default PreviewCard;
