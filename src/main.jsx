import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import "./index.css";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store/store.js";
// import store from "./redux/store.jsx";
// import 'rsuite/dist/rsuite.min.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
