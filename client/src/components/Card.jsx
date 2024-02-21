import React, { useContext } from 'react'
import NoteContext from '../context/NoteContext'

const Card = (props) => {
    const context=useContext(NoteContext)
    const {deletenote}=context


    const {note,updateNote}=props

    return (
        <div className='col-md-3 my-3'>
            <div className="card" >
                    <div className="card-body">
                        <h5 className="card-title my-2">{note.title}</h5>
                        <p className="card-text">{note.description}</p>
                        <p className="card-text">{note.tag}</p>
                        <i className="fa-solid fa-trash mx-3" onClick={()=>deletenote(note._id)}></i>
                        <i className="fa-solid fa-pen-to-square mx-3" onClick={()=>updateNote(note)}></i>
                    
                    </div>
            </div>

        </div>
    )
}

export default Card