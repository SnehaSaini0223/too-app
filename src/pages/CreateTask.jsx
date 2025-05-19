
import React, { useContext, useState } from 'react'
import TaskForm from '../components/TaskForm'
import TaskContext from '../context/TaskContext'
import { formatDate } from '../helper/Index';

const CreateTask = () => {
  const { latestTask, recentTasks } = useContext(TaskContext);
  const [isUpdate, setIsUpdate] = useState(false);



  const handleEdit = () => {
    setIsUpdate(true);


  };


  return (
    <div className='container-fluid h-100'>
      <div className='row h-100'>
        <div className='col-lg-6 d-flex align-items-center justify-content-center h-100 flex-column bg-primary text-white'>
          <div className='w-50'>
            <TaskForm isUpdate={isUpdate} setIsUpdate={setIsUpdate} data={latestTask} />
          </div>
        </div>

        <div className='col-lg-6 d-flex align-items-center justify-content-center h-g-100 flex-column'>

          <div className='card bg-primary text-white rounded-0 w-75'>

            <div className='card-body'>
              <div className='d-flex align-items-center justify-content-between'>
                <h4>Latest Tasks</h4>
                <button onClick={handleEdit} className='btn btn-info'>Edit</button>

              </div>
              <div className='mt-4'>
                {
                  latestTask ?
                    <>
                      <h3>{latestTask.title}</h3>
                      <p>{latestTask.description}</p>
                      <div className='d-flex align-items-center justify-content-between'>
                        <p>Modified on: {formatDate(latestTask.modifiedon)}</p>
                        <p>Due Date: {formatDate(latestTask.duedate)}</p>
                      </div>
                    </> :
                    <p>Please add a task</p>
                }
              </div>

            </div>

          </div>

          <div className='card bg-primary text-white rounded-0 w-75 mt-4'>
            <div className='card-body'>
              <h3 className='mb-3'>Recent Task</h3>
              <div className='mb-3'>
                {
                  recentTasks ?
                    recentTasks.map((task) => (
                      <div className='d-flex align-items-center justify-content-between p-2 border border-warning'>
                        <p className='mb-0' >{task.title}</p>
                        <p className='mb-0'>{formatDate(task.duedate)}</p>
                      </div>

                    ))
                    :
                    <p>Please add Tasks</p>
                }

              </div>
            </div>
          </div>



        </div>
      </div>


    </div>
  )
}

export default CreateTask