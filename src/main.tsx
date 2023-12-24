import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import StoreProvider from "./store/store.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <StoreProvider>
    <App />
    <ToastContainer />
  </StoreProvider>
  // </React.StrictMode>
);
