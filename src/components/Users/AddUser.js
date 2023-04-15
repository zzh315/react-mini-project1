import React, { useState, useRef } from "react";
import Card from "../UI/Card";
import classes from "./AddUser.module.css";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";

const AddUser = (props) => {
  // const [enteredUsername, setEnteredUsernam] = useState("");
  // const [enteredAge, setEnteredAge] = useState("");
  // const [isValid, setIsvalid] = useState(true);
  const [error, setError] = useState();

  const nameInputRef = useRef();
  const ageInputRef = useRef();

  const okayHandler = () => {
    setError();
  };

  const addUserHandler = (event) => {
    event.preventDefault();
    // console.log(nameInputRef);  -> {current: input DOM element}
    const enteredName = nameInputRef.current.value;
    const enteredUserAge = ageInputRef.current.value;
    if (enteredUserAge.trim().length === 0 || enteredName.trim().length === 0) {
      setError({
        title: "Invalid Input",
        message: "Please enter a valid Username and age (non-empty values).",
      });
      return;
    }
    if (+enteredUserAge < 1) {
      setError({
        title: "Invalid age",
        message: "Please enter a valid age (>0).",
      });
      return;
    }
    props.onAddUser(enteredName, enteredUserAge);
    nameInputRef.current.value = "";
    ageInputRef.current.value = "";
  };

  // const usernameChangeHandler = (event) => {
  //   setEnteredUsernam(event.target.value);
  // };

  // const ageChangeHandler = (event) => {
  //   setEnteredAge(event.target.value);
  // }; no need as using ref for form submition

  return (
    <React.Fragment>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onOk={okayHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            name="username"
            id="username"
            type="text"
            // value={enteredUsername}
            // onChange={usernameChangeHandler}
            ref={nameInputRef}
          />
          <label htmlFor="age">Age(Years)</label>
          <input
            name="age"
            id="age"
            type="number"
            // value={enteredAge}
            // onChange={ageChangeHandler}
            ref={ageInputRef}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </React.Fragment>
  );
};

export default AddUser;
