import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link} from 'react-router';
import api from '../lib/axios';
import { ArrowLeftIcon, LoaderIcon, Notebook, Trash2Icon } from 'lucide-react';
import toast from 'react-hot-toast';

const ToDoDetailPage = () => {
  const [toDo, setToDo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false)
  
  const navigate = useNavigate();

  const {id} = useParams();

  console.log({id})

  

  useEffect(() =>{
    const fetchToDo = async() => {
      try {
        const res = await api.get(`/notes/${id}`)
        setToDo(res.data)
      } catch (error) {
          if (error.response.status === 429){
        toast.error("Slow down, you are making too many submissions", {
          duration:4000,
          icon:"☠️"
        })
        } else {toast.error("Error fetching To Do") }
      } finally{
        setLoading(false)
      }
    }
    fetchToDo()
  },[id])

  console.log({toDo})

  const handleDelete = async () => {
    //e.preventDefault(); //remove navigation behaviour
    if (!window.confirm("Are you sure you want to delete this todo?")) return;

    try {
      await api.delete(`/notes/${id}`)
      toast.success("To do deleted successfuly")
      navigate("/")
    } catch (error) {
      console.log("Error deleting: ", error)
      toast.error("Failed to delete to do")
    }
  }

  const handleSave = async () => {
      if(!toDo.title.trim() || !toDo.content.trim()){
        toast.error("Please add a title or content")
        return;
      }
      setSaving(true)
      try {
        await api.put(`/notes/${id}`, toDo)
        toast.success("To do updated successfuly")
        navigate("/")
      } catch (error) {
        console.log("Error deleting: ", error)
      toast.error("Failed to udpate to do")
      }finally{
        setSaving(false)
      }

    }

  if(loading){
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10"></LoaderIcon>
      </div>
    )
  }
  return (
   <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
           <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Notes
            </Link>
            <button onClick={handleDelete} className="btn btn-error btn-outline">
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
            
            </div>

            <div className="card bg-base-100">
             <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note title"
                  className="input input-bordered"
                  value={toDo.title}
                  onChange={(e) => setToDo({ ...toDo, title: e.target.value })}
                />
                </div>

                <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered h-32"
                  value={toDo.content}
                  onChange={(e) => setToDo({ ...toDo, content: e.target.value })}
                />
              </div>

              <div className="card-actions justify-end">
                <button className='btn btn-primary' disable={saving} onClick={handleSave}>
                  {saving? "Saving..." : "Save changes"}
                </button>
              </div>

             </div>

            </div>
          </div>
      </div>
      
    </div>
  )
}

export default ToDoDetailPage
