import React from "react";
import ReactDOM from "react-dom";
import { HelloD3Data } from "./HelloD3Data";

it("It should mount", () => {
  const div = document.createElement("div");
  ReactDOM.render(<HelloD3Data data={[]} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
