import React, { useContext, useRef } from 'react'
import TaskForm from './TaskForm';
import TaskContext from '../context/TaskContext';
import { formatDate } from '../helper/Index';

const Popup = ({ task }) => {
    const { deleteTask } = useContext(TaskContext);
    const { type, data } = task;
    const closeBtn = useRef(null);

    return (
        <div className="modal" tabIndex="-1" id="popup">
            <div className="modal-dialog">
                <div className="modal-content bg-primary text-white">
                    <div className="modal-header" data-bs-theme="dark">

                        <button ref={closeBtn} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {
                            type === "view" ?
                                <div className="p-2">
                                    <h3>{data?.title}</h3>
                                    <p>{data?.description}</p>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <p className="mb-0">modified on: {formatDate(data?.modifiedon)}</p>
                                        <p className="mb-0">due date: {formatDate(data?.duedate)}</p>
                                    </div>
                                </div>
                                : type === "edit" ?
                                    <TaskForm isUpdate={true} data={data} closeBtn={closeBtn} />
                                    :
                                    <div className="p-2">
                                        <p>Are you sure?Do you want to delete the Task?</p>
                                        <div className="d-flex align-items-center justify-content-end">
                                            <button className="btn btn-danger me-2" data-bs-dismiss="modal" onClick={() => deleteTask(data?.id)}>Yes</button>
                                            <button className="btn btn-warning" data-bs-dismiss="modal">No</button>
                                        </div>

                                    </div>
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Popup