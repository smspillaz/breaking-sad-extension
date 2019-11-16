import "../css/popup.css";
import View from "./popup/greeting_component.jsx";
import React from "react";
import { render } from "react-dom";

render(
  <View/>,
  window.document.getElementById("app-container")
);
