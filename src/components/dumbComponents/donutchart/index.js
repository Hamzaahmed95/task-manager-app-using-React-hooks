import React from "react";
import { DonutMultiple, DonutElement, DonutLabel } from "react-donut-component";

const DonutChart = props => (
  <DonutMultiple size="150px">
    <DonutElement color="grey" name="">
      {props.totalTasks}
    </DonutElement>
    <DonutElement color="#5688ED" name="">
      {props.totalTasks - props.totalTaskCompleted}}
    </DonutElement>
    <DonutLabel style={{ fontSize: "9px" }}>
      {((props.totalTaskCompleted / props.totalTasks) * 100).toFixed(2)}%
      completed Task
    </DonutLabel>
  </DonutMultiple>
);
export default DonutChart;
