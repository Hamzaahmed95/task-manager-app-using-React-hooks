import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import Modals from "../modal/index";
import "./index.css";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9)
];

const TaskList = props => {
  const [checked, setChecked] = useState([]); // categories

  const EditChange = e => {
    alert(e);
  };
  const handleToggle = c => () => {
    // return the first index or -1
    const clickedCategory = checked.indexOf(c);
    const all = [...checked];

    if (clickedCategory === -1) {
      all.push(c);
    } else {
      all.splice(clickedCategory, 1);
    }
    console.log(all);
    setChecked(all);
    alert(c);
  };

  return (
    <div className="task_list_container">
      <TableContainer component={Paper}>
        <Table className="table_width" aria-label="simple table">
          <TableBody>
            {props.data.map(task => (
              <TableRow key={task.task}>
                <TableCell
                  component="th"
                  style={{
                    color: "#5285ec",
                    fontWeight: "400",
                    fontFamily: "adobe-clean, sans-serif",
                    fontSize: "16px"
                  }}
                  scope="row"
                >
                  <input
                    onChange={handleToggle(task.task)}
                    type="checkbox"
                    className="mr-2"
                  />
                  {task.task}
                </TableCell>
                <TableCell align="right">
                  <Modals isEdit={true} taskItem={task.task} />
                </TableCell>
                <TableCell
                  onClick={() => props.removeTask(task.task)}
                  align="right"
                >
                  <DeleteOutlinedIcon />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default TaskList;
