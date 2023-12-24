import "./MyPokemon.css";
import { useEffect, useState } from "react";
import { useStore } from "../../store/store";
import { v4 as uuidv4 } from "uuid";
import MyCard from "../../components/Mycard/MyCard";
import { useNavigate } from "react-router-dom";

const MyPokemon = () => {
  const [myPokemons, setMypokemons] = useState([]);
  const { getData, deleteData }: any = useStore();
  const [update, setUpdate] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const data = getData();
    setMypokemons(data);
  }, [update]);
  return (
    <div className="mypokemon-container">
      <p
        className="prev"
        onClick={() => {
          navigate("/homepage");
        }}
      >
        HOME PAGE
      </p>
      {myPokemons.length === 0 ? (
        <p className="notice">Add Pokemons</p>
      ) : (
        myPokemons?.map(
          (val: {
            url: string;
            name: string;
            attack: number;
            defence: number;
            del: any;
            update: any;
          }) => {
            return (
              <MyCard
                key={uuidv4()}
                url={val.url}
                name={val.name}
                attack={val.attack}
                defence={val.defence}
                del={deleteData}
                update={setUpdate}
              />
            );
          }
        )
      )}
    </div>
  );
};

export default MyPokemon;
