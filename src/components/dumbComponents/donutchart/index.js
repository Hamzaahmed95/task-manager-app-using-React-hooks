import React from "react";
import { DonutMultiple, DonutElement, DonutLabel } from "react-donut-component";

const DonutChart = () => (
  <DonutMultiple size="150px">
    <DonutElement color="#5688ED" name="">
      6
    </DonutElement>
    <DonutElement color="grey" name="">
      5
    </DonutElement>
    <DonutLabel style={{ fontSize: "9px" }}>60% completed Task</DonutLabel>
  </DonutMultiple>
);
export default DonutChart;
