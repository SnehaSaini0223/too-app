import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../auth/AuthContext';
import TaskContext from '../context/TaskContext';
import { data } from 'react-router';




const TaskForm = ({ isUpdate, setIsUpdate, data, closeBtn }) => {
    const init = {
        title: "",
        description: "",
        duedate: ""
    }
    const { addTask, updateTask } = useContext(TaskContext);
    const { user } = useContext(AuthContext);
    const [formData, setFormData] = useState(init);
    const handleChange = (e) => {
        let { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
            userid: user.id,
            modifiedon: Date()
        }));
    }
    useEffect(() => {
        if (isUpdate && data) {
            setFormData(data);
        }
    }, [isUpdate, data])

    const handleSubmit = () => {
        addTask(formData)
    }

    const handleUpdate = () => {
        updateTask(formData)
    }

    const handleCancle = () => {
        if (closeBtn) {
            closeBtn.current.click()
        }
        else {
            setIsUpdate(false);
        }
    }

    return (
        <>
            <h3 className='text-white'>{isUpdate ? "Update Task" : "Create Task"}</h3>
            <div className='mt-3 card' >
                <div className='card-body'>

                    <div className='mb-3'>
                        <label className='form-label'>Title</label>
                        <input type='text' name='title' className='form-control' value={formData.title} onChange={handleChange} />
                    </div>

                    <div className='mb-3'>
                        <label className='form-label'>Description</label>
                        <textarea className='form-control' name='description' rows={6} value={formData.description} onChange={handleChange}></textarea>
                    </div>

                    <div className='mb-3'>
                        <label className='form-label'>Due Date</label>
                        <input type='datetime-local' className='form-control' value={formData.duedate} name='duedate' onChange={handleChange} />
                    </div>
                    {
                        isUpdate ?

                            <>
                                <button className='btn btn-primary me-2' onClick={handleUpdate}>Update Task</button>
                                <button className='btn btn-primary' onClick={handleCancle}>Cancle</button>
                            </> :
                            <button className='btn btn-primary' onClick={handleSubmit}>Add Task</button>
                    }
                </div>
            </div>
        </>


    )
}

export default TaskForm;