import React from "react";

import Select from "./Select";
import { withA11y } from "@storybook/addon-a11y";
import "@ds.e/scss/lib/Select.css";

export default {
  title: "Molecules|Select",
  decorators: [withA11y],
};
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
export const Common = () => <Select options={options} />;
