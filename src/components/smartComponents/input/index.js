import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import "./index.css";
import InputField from "../../dumbComponents/customInputFields/index";

const CustomizedInputs = () => {
  const [value, setValue] = useState("");

  const handleSubmit = () => {};

  const handleChange = e => {
    setValue(e.target.value);
  };

  return (
    <div className="input_container" align="center">
      <>
        <InputField
          type="text"
          label="Enter email"
          defaultValue={value}
          onChange={e => handleChange(e)}
          variant="filled"
          id="reddit-input"
        />
        <InputField
          label="Enter password"
          type="password"
          defaultValue={value}
          onChange={e => handleChange(e)}
          variant="filled"
          id="reddit-input"
        />
        <Button
          onClick={handleSubmit}
          variant="contained"
          className="submitButton"
          disabled={!value}
        >
          submit
        </Button>
      </>
    </div>
  );
};

export default CustomizedInputs;
