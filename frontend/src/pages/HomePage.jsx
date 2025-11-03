
import Navbar from '../components/Navbar.jsx'
import RateLimitedUI from '../components/RateLimitedUI.jsx'
import { useEffect, useState } from 'react';
import api from '../lib/axios.js';
import toast from 'react-hot-toast';
import ToDoCard from '../components/ToDoCard.jsx';
import ToDosNotFound from '../components/ToDosNotFound.jsx'

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [toDos, setToDos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const fetchToDos = async () =>{
      try {
        const res = await api.get("/notes")
        console.log(res.data)
        setToDos(res.data)
        setIsRateLimited(false)
      } catch (error) {
        console.log("Error fetching To Do's")
        if(error.response.status === 429){
          setIsRateLimited(true)
        }else{
          toast.error("Failed to load To Do's")
        }
      } finally {
        setLoading(false)
      }
    }
    fetchToDos();
  },[])

  
  return (
    <div className="min-h-screen">      
      <Navbar />
      {isRateLimited && <RateLimitedUI />}
      <div className='max-w-7xl mx-auto p-4 m-6'>
        {loading && <div className='text-center text-primary py-10'>Loading....</div>}

        {toDos.length === 0 && !isRateLimited && <ToDosNotFound />}

        {toDos.length > 0 && !isRateLimited &&
        (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {toDos.map(toDo => (
            <ToDoCard key={toDo._id} toDo={toDo} setToDos={setToDos}/>
            ))}

        </div>)
        }
      </div>
    </div>
  )
}

export default HomePage
