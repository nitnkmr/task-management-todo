import React, { useState } from 'react'
import './Filter.css'


const Filter = ({category,setCategory,searchValue,setSearchValue}) => {
    return (
        <>
        <div className="container">
            <div className="item">
                <input type="radio" name="category" id="all" value="all"  checked={category ==="all" } onChange={()=>setCategory("all")} />
                <label htmlFor="all">All</label>
            </div>
            <div className="item">
                <input type="radio" name="category" id="completed" value="completed" checked={category ==="completed" } onChange={()=>setCategory("completed")} />
                <label htmlFor="completed">Completed</label>
            </div>
            <div className="item">
                <input type="radio" name="category" id="incomplete" value="incomplete" checked={category ==="incomplete" } onChange={()=>setCategory("incomplete")} />
                <label htmlFor="incomplete">Incomplete</label>
            </div>
        </div>
        <div className="container">
            <input type="text" name="search" id="search" placeholder='Search Items...' value={searchValue} onChange={(e)=>setSearchValue(e.target.value)} />
            <input type="submit" value="Search" id='searchbtn' />

        </div>
        </>
    )
}

export default Filter