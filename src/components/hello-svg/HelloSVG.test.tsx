import React from "react";
import ReactDOM from "react-dom";
import { HelloSVG } from "./HelloSVG";

it("It should mount", () => {
  const div = document.createElement("div");
  ReactDOM.render(<HelloSVG />, div);
  ReactDOM.unmountComponentAtNode(div);
});
