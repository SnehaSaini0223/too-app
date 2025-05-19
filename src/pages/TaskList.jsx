import React, { useContext, useEffect, useReducer, useState } from 'react'
import TaskContext from '../context/TaskContext';
import { Link } from 'react-router-dom';
import { Eye, Edit, Trash } from 'lucide-react';
import Popup from '../components/Popup';
import { formatDate } from '../helper/Index';
const reducer = (state, action) => {
  switch (action.type) {
    case "VIEW": return { type: "view", data: action.payload }
    case "EDIT": return { type: "edit", data: action.payload }
    case "DELETE": return { type: "delete", data: action.payload }
    default: return state;
  }

}
const TaskList = () => {
  const { allTasks } = useContext(TaskContext);
  const [state, dispatch] = useReducer(reducer, { type: null, data: null });
  const [filteredTasks, steFilteredTasks] = useState(null)
  useEffect(() => {
    if (allTasks) {
      steFilteredTasks(allTasks)
    }
  }, [allTasks])
  const handleSearch = (e) => {
    let { value } = e.target;
    const filteredArr = allTasks.filter((task) => (
      task.title.toLowerCase().includes(value.toLowerCase())
    ))
    steFilteredTasks(filteredArr);

  }
  return (
    <div className='container mt-5 bg-primary p-5'>
      <div className='d-flex align-items-center justify-content-between bg-primary'>
        <h3 className='text-white'>Task List</h3>
        <Link to="/create-task" className='btn btn-info'>Add Task</Link>
      </div>

      <div className='mt-4'>
        <input onChange={handleSearch} type="text" className='form-control' placeholder='Search task' />

      </div>
      <div className='mt-4 text-white'>
        <div className='row align-items-center py-3 mb-2 rounded-1 bg-dark'>
          <div className='col-lg-1'>Sr.No.</div>
          <div className='col-lg-3'>Title</div>
          <div className='col-lg-4'>Description</div>
          <div className='col-lg-2'> Due Date</div>
          <div className='col-lg-2'>Actions</div>
        </div>
        {
          filteredTasks ?
            filteredTasks.map((task) => (
              <div key={task.id} className='row align-items-center py-3 mb-2 rounded-1 bg-dark'>
                <div className='col-lg-1'>{task.id}</div>
                <div className='col-lg-3'>{task.title}</div>
                <div className='col-lg-4'>{task.description}</div>
                <div className='col-lg-2'>{formatDate(task.duedate)}</div>
                <div className='col-lg-2'>
                  <span className='px-2' data-bs-toggle="modal" data-bs-target="#popup" onClick={() => dispatch({ type: "VIEW", payload: task })}>
                    <Eye size={20} />
                  </span>
                  <span className='px-2' data-bs-toggle="modal" data-bs-target="#popup" onClick={() => dispatch({ type: "EDIT", payload: task })} >
                    <Edit size={20} />
                  </span>
                  <span className='px-2' data-bs-toggle="modal" data-bs-target="#popup" onClick={() => dispatch({ type: "DELETE", payload: task })}>
                    <Trash size={20} />
                  </span>
                </div>

              </div>
            ))
            :
            <p>No Tasks to show</p>

        }
      </div>
      <Popup task={state} />

    </div>
  )
}

export default TaskList;