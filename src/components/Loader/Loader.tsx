import "./Loader.css";
import ball from "../../assets/pokeball.png";
interface loader {
  height: number;
  width: number;
}
const Loader = ({ height = 30, width = 30 }: loader) => {
  return (
    <div className="background">
      <img
        style={{ height: `${height}px`, width: `${width}px` }}
        src={ball}
        alt="Loader"
        className="flash-image"
      ></img>
    </div>
  );
};

export default Loader;
