import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import Store from "./Redux/Store/Store.tsx";
import WrappedApp from "./App.jsx";
import SocketState from "./Context/Socket/SocketState.tsx";
import ChannelState from "./Context/publishers/ChannelState.tsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={Store}>
    <SocketState>
      {/* <ChannelState> */}
      <WrappedApp />
      {/* </ChannelState> */}
    </SocketState>
  </Provider>
);
