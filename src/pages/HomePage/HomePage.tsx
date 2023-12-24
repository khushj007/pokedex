import "./HomePage.css";
import { useState, useEffect, SetStateAction, useRef } from "react";
import axios from "axios";
import PreviewCard from "../../components/PreviewCard/PreviewCard";
import logo from "../../assets/pokemon.png";
import ball from "../../assets/pokeball.png";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

const HomePage = () => {
  const [cards, setCards] = useState<Array<any>>([]);
  const [offset, setOffset] = useState<number>(0);
  const [isError, setError] = useState<string>("");
  const [type, setType] = useState("All");
  let types = useRef({ array: ["all"] });

  const myDebounce = debounce(searchResult, 700);

  function debounce(func: any, time: number | undefined) {
    let timer: any = null;
    return (value: string) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(value);
      }, time);
    };
  }

  async function getData(val = false, ctype = "all") {
    try {
      setError("");
      toast.loading("Loading data");

      let pokemonDataArray: any[] = [];

      if (val && ctype !== "all") {
        const { data } = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`
        );

        const pokemons = await Promise.all(
          data.results.map(async (pokemon: { url: string }) => {
            const response = await axios.get(pokemon.url);
            return response.data;
          })
        );

        const filteredPokemons = pokemons.filter(
          (pokemon) => pokemon.types[0].type.name === ctype
        );
        setCards(filteredPokemons);
      } else {
        const { data } = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`
        );
        const pokemonUrls = data.results.map(
          (pokemon: { url: any }) => pokemon.url
        );
        pokemonDataArray = await Promise.all(
          pokemonUrls.map(async (url: string) => {
            const response = await axios.get(url);
            return response.data;
          })
        );
        setCards((prev) => [...prev, ...pokemonDataArray]);
      }

      const uniqueTypes = Array.from(
        new Set(pokemonDataArray.map((pokemon) => pokemon.types[0].type.name))
      );
      uniqueTypes.push("All");

      if (uniqueTypes.length > 1) {
        types.current = { array: uniqueTypes };
        console.log("ttypes", types.current);
      }

      toast.dismiss();
    } catch (error: any) {
      console.error("fetching error", error.message);
      setError(error.message);
      toast.error(`${error.message}`);
    }
  }

  console.log(cards);
  async function handelFilter(e: React.ChangeEvent<HTMLInputElement>) {
    getData(true, e.target.value.toLocaleLowerCase());
  }

  function searchResult(value: string) {
    const data = [...cards];

    const newData = data.filter((val) => val.name.includes(value));

    if (newData.length === 0) {
      toast.error("no pokemon present with the provided name");
      setCards([]);
      getData();
    } else {
      setCards(newData);
    }
  }

  function HandelInfiniteScrolling() {
    let complete_Height = document.documentElement.scrollHeight;
    let viewport_height = window.innerHeight;
    let scroll_Height = document.documentElement.scrollTop;

    if (complete_Height <= viewport_height + scroll_Height + 1) {
      setOffset((prev) => prev + 20);
    }
  }
  useEffect(() => {
    getData();
  }, [offset]);

  useEffect(() => {
    window.addEventListener("scroll", HandelInfiniteScrolling);
    return () => {
      window.removeEventListener("scroll", HandelInfiniteScrolling);
    };
  }, []);

  if (isError) {
    return <p>{isError}</p>;
  } else {
    return (
      <div className="home-page">
        {/* //navbar */}
        <nav className="navbar">
          {" "}
          <img src={logo} alt="Logo" />
          <div className="search">
            <input
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                myDebounce(e.target.value);
              }}
            />
            <img src={ball} alt="search" />
          </div>
          <select
            name="Types"
            value={type}
            className="filter"
            onChange={(e: any) => {
              handelFilter(e);
              setType(e.target.value);
            }}
          >
            {types.current.array.map((type) => {
              return (
                <option key={uuidv4()} value={type}>
                  {type}
                </option>
              );
            })}
          </select>
        </nav>
        <div className="cards-container">
          {cards.map((card: any) => {
            const url = `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${card.id}.svg`;
            return (
              <PreviewCard
                key={uuidv4()}
                name={card.name}
                url={url}
                type={card.types[0].type.name}
                id={card.id}
              />
            );
          })}
        </div>
      </div>
    );
  }
};

export default HomePage;
