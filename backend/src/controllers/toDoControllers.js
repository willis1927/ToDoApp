import { trusted } from "mongoose"
import ToDo from "../models/ToDoEntry.js"

export async function getAllNotes (_,res) {  
    try {
        const toDos = await ToDo.find().sort({createdAt:-1})
        res.status(200).json(toDos)
    }catch (error){
        console.error("Error in getAllNotes controller: ", error)
        res.status(500).json({message:"Internal server error"})
    }
 }

 export async function getNoteById(req,res){
    try {
        const toDo = await ToDo.findById(req.params.id);
        if(!toDo) return res.status(404).json({message:"item not found!"})
            res.json(toDo);
    } catch (error) {
        console.error("Error in getNoteById controller: ", error)
        res.status(500).json({message:"Internal server error"})
    }
 }

 export async function createNote(req,res){
    try {
        const {title,content} = req.body 
        const newToDo = new ToDo({title,content})

         const savedToDo = await newToDo.save();

         res.status(201).json(savedToDo)
    } catch (error) {
        console.error("Error in createNotes controller: ", error)
        res.status(500).json({message:"Internal server error"})
    }
   
}

 export async function updateNote(req,res){
    try {
        const {title,content} = req.body
        const updatedToDo = await ToDo.findByIdAndUpdate(
            req.params.id,
            {title,content},
            {new:true}
        )

        if(!updatedToDo) return res.status(404).json({message:"item not found!"})
        res.status(200).json(updatedToDo)
    } catch (error) {
        console.error("Error in updateNotes controller: ", error)
        res.status(500).json({message:"Internal server error"})
    }
   
    
}

 export async function deleteNote (req,res){
    try {
        const {title,content} = req.body
        const deletedNote = await ToDo.findByIdAndDelete(req.params.id)
        if(!deletedNote) return res.status(404).json({message:"item not found!"})
        res.status(200).json("item deleted")
    } catch (error) {
        console.error("Error in deleteNotes controller: ", error)
        res.status(500).json({message:"Internal server error"})
    }
}