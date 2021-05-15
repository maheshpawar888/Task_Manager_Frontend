import React,{useState} from 'react';
import axios from 'axios'

const Add = (props) =>{

    // console.log(Date.now())

    const [task,setTask] = useState({
        taskName:'',
        status:'',
        user:{
            name:''
        },
        dueDate:Date.now(),
    })

    const { taskName,status,user,dueDate,calenderFocused,error} = task

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

    const onSubmit = async(e) =>{
        e.preventDefault();

        const date = dueDate
        // console.log(task)     
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        }
        
        const newTask = {
             taskName,
             dueDate,
             user,      
             status:status === '' ? 'Pending' : status
        }
        console.log(newTask)
        const body = JSON.stringify(newTask)
        
        axios.post('http://localhost:5000/tasks',body,config).then( (res)=>{
            console.log(res)
        }).catch( (e)=>{
            console.log(e)
        })
        props.history.push('/')
    }

    const ondateChange = (e) =>{
        const date = e.target.value;
        console.log(date)
        setTask( ()=>({ ...task,dueDate:date}))
        console.log(dueDate)
    }


    return(
        <div>
            
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
                        // value={}
                        className="form-control"
                        onChange = {onuserNameChange}
                    />
            </div>

            <input type="date"
                onChange={ondateChange} 

            />
            <button className="btn btn-success add_task_btn" 
            onClick = {e => onSubmit(e)}> 
                Add Task  
            </button>              
        </div>

    )
}

export default Add;