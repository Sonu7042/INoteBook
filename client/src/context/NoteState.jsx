import React, { useState } from 'react'
import NoteContext from './NoteContext'

const NoteState = ({ children }) => {

  const host = 'http://localhost:9000'

  const [notes, setNotes] = useState([])



  //fetching all the notes
  const getNotes = async () => {
    const response = await fetch(`${host}/getnotes`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        'auth-token': localStorage.getItem('token')

      }
    })
    const json = await response.json()

    const fetchData = json.data.map((item) => ({
      _id: item._id,
      title: item.title,
      description: item.description,
      tag: item.tag

    }))

    setNotes(fetchData)
  }



  const addNote=async(title, description, tag)=>{
    const response= await fetch(`${host}/addnote`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "auth-token":localStorage.getItem("token")
      },
      body:JSON.stringify({title, description, tag})
    })
    const json= await response.json()
    setNotes(notes.concat(json))

  }


  //delete note
  const deletenote=async(id)=>{
    const response= await fetch(`${host}/deletenote/${id}`,{
      method:"DELETE",
      headers:{
        'Content-Type':"application/json",
        'auth-token':localStorage.getItem('token')
      },
      
    })
    const json= await response.json()

    const deleteNote=notes.filter((item)=>{return item._id !==id })
    setNotes(deleteNote)

  }


  //edit note
  const editNote=async(id,title, description, tag)=>{
    const response=await fetch(`${host}/updatenote/${id}`,{
      method:"PUT",
      headers:{
        "Content-Type":'application/json',
        'auth-token':localStorage.getItem('token')
      },
      body:JSON.stringify({title, description, tag})
    })
    const json=await response.json()
    

    let newNote=JSON.parse(JSON.stringify(notes))
// this logic is for front update note
    for(let index=0; index<newNote.length; index++){
      const element = newNote[index]
      if (element._id === id) {
        newNote[index].title = title
        newNote[index].description = description
        newNote[index].tag = tag
        break
      }
      
    }
    setNotes(newNote)
  }



  return (
    <NoteContext.Provider value={{ notes, setNotes, getNotes, addNote ,deletenote,editNote}}>
      {children}
    </NoteContext.Provider>
  )
}

export default NoteState