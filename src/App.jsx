import {useState } from 'react'
import './App.css'
import Form from './component/form/Form'
import Filter from './component/filter/Filter'
import Cardcontainer from './component/cardcontainer/Cardcontainer'
import Navbar from './component/navbar/navbar'
import { MyContext } from './Context/Context'


function App() {
  const [category, setCategory] = useState("all")
  const [searchValue, setSearchValue] = useState("")
  const [editingData, setEditingData] = useState({})
  const [editing, setEditing] = useState(false)
  const [theme, setTheme] = useState(JSON.parse(localStorage.getItem("theme"))||false)

  window.dispatchEvent(new Event("storage"))
  return (
    <>
    <div className={theme?`wrapper dark`:`wrapper light`}>
      <MyContext.Provider value={{ editingData, setEditingData, editing, setEditing }}>
        <Navbar  theme={theme} setTheme={setTheme} />
        <Form theme={theme}/>
        <Filter category={category} setCategory={setCategory} searchValue={searchValue} setSearchValue={setSearchValue} />
        <Cardcontainer category={category} setCategory={setCategory} searchValue={searchValue} setSearchValue={setSearchValue} />
      </MyContext.Provider>
    </div>
    </>
  )
}

export default App
