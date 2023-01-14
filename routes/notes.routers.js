const express = require('express');
const { Notes } = require('../models/notes.model');




//  -------------------------------------------------Routes----------------------------------------------------------

const notesroute = express.Router()
notesroute.use(express.json())




notesroute.get("/", (req, res) => {
    res.send("Hello create your notes and plan your day with us.")
})
// ==========================================================Get=====================================================================================================


notesroute.get("/allnotes", async (req,res)=>{
    try {
        const data= await Notes.find()
        res.send(data)
    } catch (error) {
        res.send(error)
        console.log("can't find");
    }
})

// ==============================================================Post=================================================================

notesroute.post("/create", async (req, res) => {
    const payload = req.body
    try {
        const note = new Notes(payload)
        await note.save()
        console.log(note);
        res.send({Message:"created a note"})
    } catch (error) {
        res.send({ Message: "something went wrong" })
        console.log(error);
    }

})

// ==========================================================Patch========================================================================

notesroute.patch("/:id",async(req,res)=>{
    try {
        const _id= req.params.id;
        const updatednotes= await Notes.findByIdAndUpdate(_id, req.body)
        res.send(updatednotes)
        console.log("updated");

    } catch (error) {
        res.status(400).send(error)
    }
})

// =============================================================Delete=================

notesroute.delete("/:id",async(req,res)=>{
    try {
        const _id= req.params.id;
        const deleted= await Notes.findByIdAndDelete(_id)
        res.send("deleted the data")
    } catch (error) {
        res.send(error)
        console.log("can't delete")
    }
})












module.exports = {
    notesroute
}