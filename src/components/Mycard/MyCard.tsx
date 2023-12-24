import "./MyCard.css";
import { useRef } from "react";
import choose from "../../assets/hoverSound2.wav";
import gone from "../../assets/delete.wav";
import { toast } from "react-toastify";

interface preview {
  url: string;
  name: string;
  attack: number;
  defence: number;
  del: any;
  update: any;
}
const MyCard = ({ url, name, attack, defence, del, update }: preview) => {
  const hover = useRef(new Audio(choose));
  const select = useRef(new Audio(gone));

  function handelHover() {
    hover.current.play();
  }
  function deleteData() {
    {
      del(name);
      update((prev: number) => prev + 1);
      toast.error(`${name} is removed`);
      select.current.play();
    }
  }
  return (
    <div className="my-card">
      <img src={url} alt="pokemonImage" />
      <div className="my-content">
        <h2>{name.toUpperCase()}</h2>
        <h4>{`Attack : ${attack}`}</h4>
        <h4>{`Defence : ${defence}`}</h4>
        <button
          className="remove"
          onClick={deleteData}
          onMouseOver={handelHover}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default MyCard;
