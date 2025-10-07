import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { store } from "../Store.ts";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
// import Home from "./Pages/Home.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        {/* <Home /> */}
      </BrowserRouter>
    </Provider>
  </StrictMode>
);



