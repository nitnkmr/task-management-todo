import React,{useState}from 'react'
import "./Navbar.css"
import { IoMdSunny } from "react-icons/io";
import { IoMoonOutline } from "react-icons/io5";
const Navbar = ({theme, setTheme}) => {


  
  localStorage.setItem("theme",theme.toString())
  

  return (
    <div className="nav">
        <div className="title">Task Management Dashboard</div>
        <div className="theme" onClick={()=>setTheme(!theme)}><IoMdSunny/></div>
    </div>
  )
}

export default Navbar