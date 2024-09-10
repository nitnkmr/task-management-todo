import React, { useState, useContext, useEffect } from "react";
import { MyContext } from "../../Context/Context";
import { v4 as uuidv4 } from "uuid";
import "./Form.css";

const Form = ({ theme }) => {
  const { editingData, setEditingData, editing, setEditing } =
    useContext(MyContext);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duedate: "",
    pending: true,
    id: null,
  });

  useEffect(() => {
    if (editingData) {
      setFormData(editingData);
    }
  }, [editingData]);

  let uid = "";
  const handleSubmit = (e) => {
    e.preventDefault();
    //Time Calculation //
    let currentDateStr = new Date();
    currentDateStr = currentDateStr.toISOString().split("T")[0]
    let userDate = new Date(formData.duedate);
    let currentdate = new Date(currentDateStr)
    let diff_in_time = userDate.getTime() - currentdate.getTime()
    let diff_in_days = Math.round(diff_in_time/(1000*3600*24))
    console.log(diff_in_days)
    console.log(userDate)
    console.log(currentdate)
   
    if (diff_in_days < 0) {
      window.alert("You Can Not Put Previous Date");
    } else {
      if (!editing) {
        uid = uuidv4();
        let arr = [];
        if (localStorage.getItem("taskList")) {
          arr = JSON.parse(localStorage.getItem("taskList"));
          arr.push({ ...formData, id: uid });
          localStorage.setItem("taskList", JSON.stringify(arr));
          window.dispatchEvent(new Event("storage"));
        } else {
          localStorage.setItem(
            "taskList",
            JSON.stringify([{ ...formData, id: uid }])
          );
          window.dispatchEvent(new Event("storage"));
        }
      }
    }
    setFormData({
      title: "",
      description: "",
      duedate: "",
      pending: true,
      id: null,
    });
  };

  const handleEditing = (e, id) => {
    e.preventDefault();
 //Time Calculation //
 let currentDateStr = new Date();
     currentDateStr = currentDateStr.toISOString().split("T")[0]
 let userDate = new Date(formData.duedate);
 let currentdate = new Date(currentDateStr)
 let diff_in_time = userDate.getTime() - currentdate.getTime()
 let diff_in_days = Math.round(diff_in_time/(1000*3600*24))

 if (diff_in_days < 0) {
   window.alert("You Can Not Put Previous Date");
 }else{
    let arr = JSON.parse(localStorage.getItem("taskList"));
    let newArr = arr.filter((e) => e.id == id);
    let index = arr.indexOf(...newArr);

    arr.splice(index, 1, formData);
    localStorage.setItem("taskList", JSON.stringify(arr));
    window.dispatchEvent(new Event("storage"));
    setFormData({
      title: "",
      description: "",
      duedate: "",
      pending: true,
      id: null,
    });
  }
    setEditing(false);
  };

  return (
    <div className={theme ? "todo-form dark" : "todo-form light"}>
      <form
        action="#"
        onSubmit={(e) => {
          editing ? handleEditing(e, editingData.id) : handleSubmit(e);
        }}
      >
        <div className="title row">
          <label htmlFor="title" className={theme ? "dark" : "light"}>
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter title"
            value={formData.title}
            required
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div className="desc row">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            placeholder="Enter description"
            value={formData.description}
            required
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div className="submit row">
          <label htmlFor="due-date">Due Date:</label>
          <input
            type="date"
            id="due-date"
            name="duedate"
            required
            onChange={(e) =>
              setFormData({
                ...formData,
                [e.target.name]: e.target.value,
                pending: true,
              })
            }
            value={formData.duedate}
          />

          <button type="submit" id="submit">
            {editing ? "Edit Task" : "Add Task"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
