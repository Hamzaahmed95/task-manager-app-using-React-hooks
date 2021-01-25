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

const TaskList = props => {
  const [checked, setChecked] = useState([]); // categories

  const handleToggle = c => () => {
    // return the first index or -1
    const clickedCategory = checked.indexOf(c);

    const all = [...checked];
    console.log("clickedCategory: " + clickedCategory);

    if (clickedCategory === -1) {
      all.push(c);
      props.setCompleteTask(c, 1);
      console.log("ahmedd: checked!!" + c);
    } else {
      props.setCompleteTask(c, 0);
      console.log("ahmedd: unchecked!!" + c);
      all.splice(clickedCategory, 1);
    }

    setChecked(all);
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
                  {console.log("TaskLists: " + task.isCompleted)}
                  {task.isCompleted === 1 ? <del>{task.task}</del> : task.task}
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
