import "./StatusBar.css";

interface status {
  width: number;
  color: string;
}
const StatusBar = ({ width = 100, color = "red" }: status) => {
  return (
    <div className="status">
      <div
        className="status-bar"
        style={{ padding: "1px", width: `${width}%`, backgroundColor: color }}
      ></div>
      <p>{`${width}%`}</p>
    </div>
  );
};

export default StatusBar;
