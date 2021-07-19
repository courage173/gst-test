import React, { useState } from "react";
import Form from "../../utils/form/Form";
import styles from "./Home.module.css";
import { update, generateData, isFormValid } from "../../utils/form/formAction";

const Home = () => {
  const [state, setState] = useState({
    formdata: {
      search: {
        element: "input",
        value: "",
        config: {
          name: "search",
          type: "text",
          placeholder: "",
          label: "Search",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true,
      },
    },
  });
  const updateForm = (element) => {
    setState({ loginErrorMessage: "", message: "" });
    const newFormdata = update(element, state.formdata, "login");
    setState({
      formError: false,
      formdata: newFormdata,
    });
  };
  return (
    <div className={styles.container}>
      <Form
        id={"search"}
        formdata={state.formdata.search}
        change={(element) => updateForm(element)}
      />
    </div>
  );
};

export default Home;
