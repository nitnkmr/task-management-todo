import React, { useEffect, useState } from 'react'
import './Cardcontainer.css'
import Card from '../card/Card'





const Cardcontainer = ({ category,setCategory,searchValue,setSearchValue }) => {

    
    const [listItem, setListItems] = useState([]);
    function handleStorage() {
        setListItems(JSON.parse(localStorage.getItem("taskList")))    
    }


    useEffect(() => {
        window.addEventListener("storage", handleStorage)
        window.onload= handleStorage
        return ()=>{
            window.removeEventListener("storage", handleStorage,true)
        }
    }, [])
 
    useEffect(()=>{
        if(searchValue.length>2){
            let filteredItem = listItem.filter((ele,i)=> ele.title.toLowerCase().includes(searchValue.toLowerCase()))
            setListItems(()=>filteredItem)
            console.log(filteredItem)
        }
    },[searchValue])
    
    useEffect(()=>{
        if(category==="completed"){
            let filteredItem = JSON.parse(localStorage.getItem("taskList")).filter((ele,i)=> ele.pending==false)
            setListItems(()=>filteredItem)
            console.log(filteredItem)
        }
        if(category==="incomplete"){
            let filteredItem = JSON.parse(localStorage.getItem("taskList")).filter((ele,i)=> ele.pending==true)
            setListItems(()=>filteredItem)
            console.log(filteredItem)
        }

    },[category])

    return (
        <>
            <div className="card-container">
                <div className="parent">
                    {listItem.length>0 ? listItem.map((e, i) => <div className="div" key={i}><Card element={e} /></div>) : <h1>-:No Task Present:-</h1>}
                </div>
            </div>
        </>
    )
}

export default Cardcontainer