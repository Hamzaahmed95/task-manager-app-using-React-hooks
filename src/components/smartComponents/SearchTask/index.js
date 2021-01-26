import React from "react";
import "./index.css";
import Modals from "../../dumbComponents/modal/index";
import { TASKS } from "../../../constants/messages";

import InputField from "../../dumbComponents/customInputFields/index";
const SearchTask = props => {
  return (
    <div className="search_task_container">
      <div>
        <p
          style={{
            color: "#808080",
            fontWeight: "bold",
            fontSize: "18px",
            paddingTop: "10px",
            paddingBottom: "20px"
          }}
        >
          {TASKS}
        </p>
      </div>
      <div className="search_task_main_container">
        <div className="search_task_subcontainer">
          <div className="search_task_subcontainer_first">
            <InputField
              className="search_task_input"
              type="text"
              label="Search by task name"
              defaultValue=""
              onChange={props.handleChange}
              variant="filled"
            />
          </div>
          <div className="search_task_subcontainer_second">
            <Modals isEdit={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchTask;
