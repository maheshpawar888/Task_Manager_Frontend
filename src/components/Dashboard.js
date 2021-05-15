import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import TaskSelector from './TaskSelector';
// import Users from './Users';


const Dashboard = () =>{

    const [data,setData] = useState({
        tasks:[],
        name:'',
        task:'',
        searchDate:''
    })

    const { tasks,name,task } = data;

    const onChange = e => setData({...data, [e.target.name]: e.target.value})


    const onDelete = async(id,name) =>{
        const body = {
            name
        }
        console.log(body)
        const task = await axios.delete('http://localhost:5000/tasks/'+id)
        console.log(task);
        getTasks()
    }

    const getTasks = async() =>{
        axios.get('http://localhost:5000/tasks').then( (res)=>{
            // console.log(res.data)
            setData({
                ...data.tasks,   
                tasks:res.data,
                
            })
        })
        
    }

    const onstatusChange = (e) =>{
        const status = e.target.value
        console.log(status)

        if(status==="All"){
            getTasks();
            return
        }      

        axios.get(`http://localhost:5000/tasks?status=${status}`).then( (res)=>{
            console.log(res.data)
            setData({
                ...data.tasks,   
                tasks:res.data,               
            })
        })
    }

    const ontextChange = () =>{
        console.log(task)      
        axios.get(`http://localhost:5000/task/${task}`).then( (res)=>{
            console.log(res.data)
            setData({
                ...data.tasks,   
                tasks:res.data,               
            })
        })
    }

    const ondateChange = (e) =>{
        e.preventDefault(); 
        const date = e.target.value;
        // setData( ()=>({ ...task,searchDate:date}))
        console.log(date)

        axios.get(`http://localhost:5000/gettasks/${date}`).then( (res)=>{
            console.log(res.data)
            // if(!res) return
            // setData({
            //     ...data.tasks,   
            //     tasks:res.data,               
            // })
        })
    }


    useEffect( () =>{
        // console.log('useState')
        getTasks();        
    },[])

    // useEffect( () =>{
    //     console.log('useState')      
    // },[data.tasks])

    return(
        <div>
            <div className="header">
                <h1 className="head_task">Tasks</h1>
                <Link to="/add" className="btn btn-success btn-md add-task"> Add Task </Link>
            </div>

            <input type="date"
                onChange={ondateChange}  
            />
            &nbsp;&nbsp;&nbsp;&nbsp;
            
            <input type="text"
                        name="task"
                        value={task}
                        placeholder="search by taskname"
                        required
                        autoFocus
                        onChange = {e=>onChange(e)}
            /> 
            &nbsp;&nbsp;&nbsp;&nbsp;
            <button className="btn btn-primary" onClick={ontextChange}> search </button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            
            <select onChange={ onstatusChange }>
                <option > Select Status </option>
                <option value="All"> All </option>
                <option value='Completed'> Completed </option>
                <option value='Pending'> Pending </option>
            </select>
        <hr></hr>
        <br></br>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col">User</th>
                    <th scope="col">TaskName</th>
                    <th scope="col">Status</th>
                    <th scope="col">DueDate</th>
                    <th scope="col">Action</th>

                </tr>
                </thead>
                <tbody>
                  
                {data.tasks.map(task => {
                         
                    return(
                    <tr key={task._id}>
                        <td>{task.user.name}</td>
                        <td>{task.taskName}</td>
                        <td>{task.status}</td>
                        <td>{task.dueDate}</td>
                        <td><Link to={'/edit/'+task._id} className="btn btn-primary"><i className="fa fa-edit" aria-hidden="true"> Edit</i></Link>
                    &nbsp;    <button className="btn btn-danger" onClick={()=>onDelete(task._id,task.user.name)}><i className="fa fa-trash" aria-hidden="true"> Delete</i></button></td>
                    </tr>
                    )
                })} 
               </tbody>
            </table><br></br>

        </div>
    )
}

export default Dashboard;