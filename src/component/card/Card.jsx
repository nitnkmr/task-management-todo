import React, { useState,useContext } from 'react'
import "./Card.css"
import { MdEditSquare, MdDeleteForever } from "react-icons/md";
import { MyContext } from '../../Context/Context';




const Card = ({ element }) => {

  const { editingData, setEditingData ,editing, setEditing} = useContext(MyContext);
  const [status, setStatus] = useState(false)
 
  const handleDelete = (id) => {
    let confirmation = window.confirm("Do you want to delete this item.?")
    if (localStorage.getItem("taskList") && confirmation) {
      let arr = JSON.parse(localStorage.getItem("taskList"))
      let newArr = arr.filter((e) => id !== e.id)
      localStorage.setItem("taskList", JSON.stringify(newArr))
      window.dispatchEvent(new Event("storage"))
    }
  }


  const handleEdit = (id) => {
    let arr = JSON.parse(localStorage.getItem("taskList"))
    let newArr = arr.filter((e) => e.id == id)
    setEditingData(...newArr)
    setEditing(true)
  }

  
  const handleStatusChange = (e, id) => {
    setStatus(prev=>!prev)

    if (!e.target.checked) {
      
      let arr = JSON.parse(localStorage.getItem("taskList"))
      const updatedArr = arr.map(ele => {
        if (ele.id === id) {
          return { ...ele, pending: true };
        } else {
          return ele;
        }
      });

      localStorage.setItem("taskList", JSON.stringify(updatedArr))
      window.dispatchEvent(new Event("storage"))
    }

    if (e.target.checked) {
      let arr = JSON.parse(localStorage.getItem("taskList"))
      const updatedArr = arr.map(ele => {
        if (ele.id === id) {
          return { ...ele, pending: false };
        } else {
          return ele;
        }
      });
      localStorage.setItem("taskList", JSON.stringify(updatedArr))
      window.dispatchEvent(new Event("storage"))
    }
  }


  return (
    <>
      <div className="card-box">
        
        <div className="header flex">{element.title}</div>
        <div className="description flex">{element.description}</div>
        <div className="statusbar flex" style={element.pending?{backgroundColor:"rgb(255, 207, 207)"}:{backgroundColor:"rgb(200, 255, 255)"}}>
          <input type="checkbox" name="status" id="status" checked={!element.pending} onChange={(e) => handleStatusChange(e, element.id)} />
          <label htmlFor="status">Mark As Completed</label>
        </div>
        <div className="btn flex">
          <button><MdEditSquare size={20} color='#007bff' onClick={() => handleEdit(element.id)} /></button>
          <button><MdDeleteForever size={20} color='red' onClick={() => handleDelete(element.id)} /></button>
        </div>
        <div className="date">
          <div className="due-date">Due On : {element.duedate}</div>
        </div>
      </div>
    </>
  )
}

export default Card