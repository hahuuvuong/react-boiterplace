import React from "react";
import ReactDom from "react-dom";

import { Margin, Text, Select } from "@ds.e/react";

import "@ds.e/scss/lib/Utilities.css";
import "@ds.e/scss/lib/Text.css";
import "@ds.e/scss/lib/Margin.css";
import "@ds.e/scss/lib/global.css";
import "@ds.e/scss/lib/Select.css";
const options = [
  {
    label: "Strict Black",
    value: "Strict-black",
  },
  {
    label: "Heavenly Green",
    value: "heavenly-green",
  },
  {
    label: "Sweet Pink",
    value: "pink",
  },
];
ReactDom.render(
  <div style={{ padding: "40px" }}>
    <Select options={options} />
  </div>,
  document.querySelector("#root")
);
