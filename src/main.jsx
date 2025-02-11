import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";  // ✅ Import Redux Provider
import { store } from "./app/store";  // ✅ Import Redux store
import App from "./App";
import "./index.css"; // ✅ Ensure global styles are imported

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>  {/* ✅ Wrap App with Provider */}
      <App />
    </Provider>
  </React.StrictMode>
);
