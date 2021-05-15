import React, { useEffect, useState } from 'react';
// import TaskForm from './TaskForm';
import axios from 'axios';


const Edit = (props) =>{
    const id = props.match.params.id;

    const [task,setTask] = useState({
        _id:props.match.params.id,
        taskName:'',
        status:'',
        user:{
            name:''
        },
        dueDate:''
    })

    const onChange = e => setTask({...task, [e.target.name]: e.target.value})

    const onuserNameChange = (e)=>{
        const name = e.target.value;
        setTask({
            ...task,
            user:{
                name
            }
        })
    }


    const { taskName,status,user,dueDate} = task

    const ondateChange = (e) =>{
        const date = e.target.value;
        // console.log(date)
        setTask( ()=>({ ...task,dueDate:date}))
        console.log(dueDate)
    }

    const onSubmit = async() =>{
        
        const body = {
            ...task,
            status:status === '' ? 'Pending' : status
        }

        axios.put('http://localhost:5000/tasks/'+id,body).then( (res)=>{
            console.log(res.data)
        })
        props.history.push('/')
    }


    useEffect( () =>{
        axios.get('http://localhost:5000/tasks/'+id).then( (res) =>{
            console.log(res.data)
            setTask({
                ...task,...res.data
                // taskName:res.data.taskName,
                // status:res.data.status,
                // user:res.data.user
            })   
        })
    },[])

    return(
        <div>
            <h1> Edit </h1>
            <form onSubmit={ onSubmit }>
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
                <input type="date"
                    value={dueDate}
                    onChange={ondateChange} 

                />
                
                <button className="btn btn-success"> Update  </button>              
            </form>
        
        
        </div>
    )
}

export default Edit;

// <TaskForm
//     task = { task } 
//     onSubmit = { (task) => onSubmit(task) }
// />