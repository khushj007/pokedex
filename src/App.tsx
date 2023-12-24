import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import HomePage from "./pages/HomePage/HomePage";
import PokemonModal from "./pages/PokemonPage/PokemonPage";
import MyPokemon from "./pages/MyPokemon/MyPokemon";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/homepage" element={<HomePage />}></Route>
          <Route path="/review/:id" element={<PokemonModal />}></Route>
          <Route path="/mypokemons" element={<MyPokemon />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
