const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const Note = require('../model/Note')
const fetchuser = require('../middleware/fetchuser')


//this route for add note
router.post('/addnote', fetchuser, [
    body("title", 'enter atleast 3 characters').isLength({ min: 3 }),
    body("description", 'enter atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        res.status(400).json({ error: error.array() })
    }
    try {
        const { title, description, tag } = req.body
        const note = await Note.create({
            title, description, tag, user: req.user.id
        })
        res.status(200).json(note)
    }
    catch {
        res.status(500).json({ error: "Internal Server Problem" })
    }

})


// this route for fetch logged user's notes
router.get('/getnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.status(200).json({
            message: "Got all notes of logged user",
            data: notes

        })

    }
    catch {

    }
})


router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body
    try {
        let newNote = {}
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        let note = await Note.findById(req.params.id)
        if (!note) {
            res.status(400).json("Note found")
        }

        if (note.user.toString() !== req.user.id)
            res.status(400).json("Not Allowed")

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })

        res.status(200).json({
            message: "Note is updated Successfully",
            data: note
        })

    }
    catch {
        res.status(500).json("Internal Server Problem")
    }

})


router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {


        let note = await Note.findById(req.params.id)
        if (!note) {
            res.status(400).json("Not Found")
        }

        if (note.user.toString() !== req.user.id)
            res.status(400).json("Not Allowed")

        note = await Note.findByIdAndDelete(req.params.id)
        
        res.status(200).json({
            message: "Note is deleted Successfully",
            data: note
        })
    }
    catch {
        res.status(500).json("Internal Server Problem")
    }
})


module.exports = router

