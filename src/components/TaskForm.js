import React,{ useEffect, useState } from 'react';

const TaskForm = (props) =>{

    // console.log(props.task)
    const [data,setData] = useState( {
        taskName:props.task.taskName    ,
        status:'',
        user:{
            name:''
        }
    } )
    // console.log(data);

    const { taskName,status,user } = data

    const onChange = e => setData({...data, [e.target.name]: e.target.value})

    const onsubmit = (e) =>{
        e.preventDefault();
        // console.log(data)
        props.onSubmit(data)
    }

    const onuserNameChange = (e)=>{
        const name = e.target.value;
        setData({
            ...data,
            user:{
                name
            }
        })
    }

    useEffect( () =>{
        setData({
            ...data,
            ...props.task
        })
    },[])

    return(
        <div>
            
            <form onSubmit={ onsubmit }>
            <div className="form-group">
                    <label>Task Name</label>

                    <input type="text"
                            name="taskName"
                            value={taskName}
                            required
                            autoFocus
                            className="form-control"
                            onChange = {e=>onChange(e)}
                        />
                </div>
                <div>
                <label>Status</label>
                <input type="text"
                    name="status"
                    value={status}
                    className="form-control"
                    onChange = {e=>onChange(e)}
                />
                </div>        
                <div>
                <label>user name</label>
                <input type="text"
                            name="name"
                            value={user.name}
                            className="form-control"
                            onChange = {onuserNameChange}
                        />
                </div>
                <button className="btn btn-success"> Update  </button>              
            </form>
        
        
        </div>
    )
}

export default TaskForm;