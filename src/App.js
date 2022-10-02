import logo from "./logo.svg";
import "./App.css";
import React, { useState, usestate } from "react";
import Header from "./components/Header";

function App() {
  const [todo, setTodo] = useState("");
  // //Temp State
  const [newTask, setNewTask] = useState("");
  const [updateData, setUpdateData] = useState("");
  // //Add task
  const addTask = (e) => {
    if (newTask) {
      let num = todo.length + 1;
      let newEntry = { id: num, title: newTask, status: false };
      setTodo([...todo, newEntry]);
      setNewTask("");
    }
  };
  // //Delete task
  const deleteTask = (id) => {
    let newTask = todo.filter((task) => task.id !== id);
    setTodo(newTask);
  };
  // //mark task as complete or oncomplete
  const markDone = (id) => {
    let newTask = todo.map((task) => {
      if (task.id === id) {
        return { ...task, status: !task.status };
      }
      return task;
    });
    setTodo(newTask);
  };
  // //cancel update
  const cancelUpdate = () => {
    setUpdateData("");
  };
  // //for update change task
  const changeTask = (e) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false,
    };
    setUpdateData(newEntry);
  };
  // //update task
  const updateTask = () => {
    let filterRecords = [...todo].filter((task) => task.id !== updateData.id);
    console.log("filterRecords");
    let updatedObject = [...filterRecords, updateData];
    setTodo(updatedObject);
    setUpdateData("");
  };

  return (
    <div className="container">
      <div className="app-wrapper">
        <div>
          <Header />
        </div>
        {/* Update Task */}
        {updateData && updateData ? (
          <>
            <div className="row">
              <div className="col">
                <input
                  value={updateData && updateData.title}
                  onChange={(e) => changeTask(e)}
                  placeholder="Enter To Do Here.... "
                />
              </div>
              <div className="col-auto">
                <button onClick={updateTask}>Update Task</button>
                <button onClick={cancelUpdate}>Cancel Task</button>
              </div>
            </div>
            <br />
          </>
        ) : (
          <>
            {/* Add Task */}
            <div className="row">
              <div className="col">
                <input
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Enter To Do Here.... "
                />
              </div>
              <div className="col-auto">
                <button  onClick={addTask}>
                  Add Task
                </button>
              </div>
            </div>
          </>
        )}

        {/* Display msg */}
        <div className="msg">
          {todo && todo.length ? "" : "No Task Present....!"}
        </div>
        {todo &&
          todo.map((task, index) => (
            <div key={task.id}>
              <div className="col taskBg">
                <div className={task.status ? "done" : ""}>
                  <span className="taskNumber">{index + 1}</span>
                  <span className="taskText">{task.title}</span>
                </div>
                <div className="iconWrap">
                  <span title="Completed">
                    <delete onClick={() => markDone(task.id)}>check</delete>
                  </span>
                  {task.status ? null : (
                    <span title="Edit">
                      <i class="fa-sharp fa-solid fa-user-pen"></i>
                      <delete
                        onClick={() =>
                          setUpdateData({
                            id: task.id,
                            title: task.title,
                            status: task.status ? true : false,
                          })
                        }
                      >
                        Edit
                      </delete>
                    </span>
                  )}

                  <span title="Delete">
                    <delete onClick={() => deleteTask(task.id)}>Delete</delete>
                  </span>
                </div>
              </div>
            </div>
          ))}
        {/* <input
          type="text"
          placeholder="Enter Task"
          className="task_input"
          // value={input}
          // onChange={inputHandler}
        />
        <button className="add_button">Add</button>
        <br /> */}
      </div>
    </div>
  );
}

export default App;
