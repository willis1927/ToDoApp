import mongoose from "mongoose";   

const  toDoSchema = new mongoose.Schema(
    {
        title: {
            type:String,
            required: true
        },
        content: {
            type:String,
            required: true
        },

    },
    {timestamps: true} // createdAt, updatedAt
);

const ToDo = mongoose.model("Todo", toDoSchema)

export default ToDo;