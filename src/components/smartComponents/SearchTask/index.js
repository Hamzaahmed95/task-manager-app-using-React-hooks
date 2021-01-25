import React, { useState } from "react";
import "./index.css";
import Button from "@material-ui/core/Button";
import Modals from "../../dumbComponents/modal/index";

import InputField from "../../dumbComponents/customInputFields/index";
const SearchTask = props => {
  const [value, setValue] = useState("");
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
          Tasks
        </p>
      </div>
      <div className="search_task_main_container">
        <div className="search_task_subcontainer">
          <div className="search_task_subcontainer_first">
            <InputField
              className="search_task_input"
              type="text"
              label="Search by task name"
              defaultValue={value}
              onChange={props.handleChange}
              variant="filled"
              id="reddit-input"
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
