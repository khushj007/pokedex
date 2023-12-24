import "./PokemonPage.css";
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/Loader/Loader";
import StatusBar from "../../components/StatusBar/StatusBar";
import choice from "../../assets/select1.wav";

const pokemonColors = [
  "#FF4500",
  "#4DB6AC",
  "#FFD700",
  "#4A90E2",
  "#FF69B4",
  "#8A2BE2",
];

const PokemonModal = () => {
  const { id } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState({
    name: "",
    url: "",
    height: 0,
    weight: 0,
    hp: 0,
    attack: 0,
    defence: 0,
    speed: 0,
  });
  const navigate = useNavigate();
  const choose = useRef(new Audio(choice));

  async function fetchData() {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}/`
      );

      if (data) {
        const img = `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${id}.svg`;

        const pokemon = {
          url: img,
          height: data.height,
          weight: data.weight,
          hp: data.stats[0].base_stat,
          attack: data.stats[1].base_stat,
          defence: data.stats[2].base_stat,
          speed: data.stats[5].base_stat,
          name: data.name,
        };

        setPokemon(pokemon);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  console.log(pokemon);
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="modal-container">
      {isLoading ? (
        <Loader height={300} width={300} />
      ) : (
        <div className="modal-content">
          <div className="left-modal">
            <img src={pokemon.url} alt="pokemon" />
            <div className="modal-buttons">
              <button>Save</button>
              <button
                onClick={() => {
                  choose.current.play();
                  navigate("/homepage");
                }}
              >
                HomePage
              </button>
            </div>
          </div>
          <div className="right-modal">
            <h1>INFROMATION</h1>

            <h2>Name : {`${pokemon.name}`}</h2>
            <div className="parameters">
              <div className="param">
                <p>Height :</p>
                <StatusBar width={pokemon.height} color={pokemonColors[0]} />
              </div>
              <div className="param">
                <p>Weight :</p>
                <StatusBar width={pokemon.weight} color={pokemonColors[1]} />
              </div>
              <div className="param">
                <p>Health Point :</p>
                <StatusBar width={pokemon.hp} color={pokemonColors[2]} />
              </div>
              <div className="param">
                <p>Attack :</p>
                <StatusBar width={pokemon.attack} color={pokemonColors[3]} />
              </div>
              <div className="param">
                <p>Defence :</p>
                <StatusBar width={pokemon.defence} color={pokemonColors[4]} />
              </div>
              <div className="param">
                <p>Speed :</p>
                <StatusBar width={pokemon.speed} color={pokemonColors[5]} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonModal;
