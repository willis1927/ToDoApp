import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router"
import { formatDate } from "../lib/utils";
import api from "../lib/axios"
import toast from "react-hot-toast";

const ToDoCard = ({toDo, setToDos}) => {

  const handleDelete = async (e,id) => {
    e.preventDefault(); //remove navigation behaviour
    if (!window.confirm("Are you sure you want to delete this todo?")) return;

    try {
      await api.delete(`/notes/${id}`)
      setToDos((prev) => prev.filter(toDo => toDo._id !== id))
      toast.success("To do deleted successfuly")
    } catch (error) {
      console.log("Error deleting: ", error)
      toast.error("Failed to delete to do")
    }
  }


  return <Link to={`/note/${toDo._id}`} className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-orange-500" >
    
    <div className="card-body">
        <h3 className="card-title text-base-content">{toDo.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{toDo.content}</p>
    <div className="card-actions justify-between items-center mt-4">
        <span className="text-sm text-base-content/60">
        {formatDate(new Date(toDo.createdAt))}
        
        </span>
        <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />
            <button className="btn btn-ghost btn-xs text-error" onClick={(e) => handleDelete(e,toDo._id)}>
                <Trash2Icon className="size-4" />
            </button> 
        </div>

    </div>
    
    </div>    
  </Link>
};

export default ToDoCard
