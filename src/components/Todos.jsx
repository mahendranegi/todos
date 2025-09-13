import React, { useEffect, useState } from "react";

function Todos() {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");
  const [notify, setNotify] = useState("");

  const handleOne = () => {
    document.body.style.background =
      "linear-gradient(135deg, #2c2c2c, #1a1a1a)";
  };

  const handleTwo = () => {
    document.body.style.background =
      "linear-gradient(90deg, #ffb400, #ff8800)";
  };

  const handleThree = () => {
    document.body.style.background = "rgb(25, 118, 210)";
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    if (error) setError(""); // clear error while typing
  };

  // Load saved todos from localStorage on mount
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTodos);
  }, []);

  const handleSubmit = () => {
    if (value.trim() === "") {
      setError("Please enter some text");
    } else {
      const updatedTodos = [...todos, value];
      setTodos(updatedTodos);
      setValue("");
      setError("");
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
    }
  };

  const handleDelete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));

    setNotify("The item is deleted..");
    setTimeout(() => setNotify(""), 2000);
  };

  return (
    <div className="todosContainer">
      <header>
        <div>
          <em onClick={handleOne}></em>
          <em onClick={handleTwo}></em>
          <em onClick={handleThree}></em>
        </div>
        <h2> Task Manager </h2>
      </header>

      <div className="taskManager">
        <div className="inputAlign">
          <input
            type="text"
            placeholder="Enter text here.."
            value={value}
            onChange={handleChange}
          />
          <button onClick={handleSubmit}>Add</button>
        </div>

        {/* Error message */}
        {error && <p style={{ color: "red", fontSize: "12px" }}>{error}</p>}

        {/* Notification (shows once, not inside loop) */}
        {notify && (
          <div
            className="deleteNotification">
            {notify}
          </div>
        )}

        <div className="todosSection">
          <ul>
            {todos.map((item, index) => (
              <li key={index}>
                {item}{" "}
                <i
                  className="fa-solid fa-trash-can"
                  onClick={() => handleDelete(index)}
                  style={{ cursor: "pointer", marginLeft: 10 }}
                ></i>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Todos;
