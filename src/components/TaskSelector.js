import axios from 'axios';
import React,{ useEffect, useState } from 'react';


const TaskSelector = () =>{

    const [filters,setFilters] = useState({
        tname:'',
        uname:'',
        status:''
    })

    const [users,setUsers] = useState({
        users:[{
            users:[
                {
                    name:"test"
                }
            ]
        }]
    })
    console.log('------------------')
    // console.log(users)
    const {tname,uname,status} = filters

    const onstatusChange = (e) =>{
        setFilters({
            ...filters,
            status:e.target.value
        })
    }

    useEffect( async()=>{
        axios.get('http://localhost:5000/getUsers').then( (res)=>{
            // console.log(res.data)
            let users = [...new Set(res.data.users)];
            
            setUsers({
                // users:res.data
                // users:res.data
                users                    
            })
            
        })
    },[])
    console.log(users.users[0])

    return(
        <div className="header">

        <input type="text"  onChange={ (e)=>{
            setFilters({ uname:e.target.value  })
        }}></input>
        
    <select>
        
        <option> Select User  </option>
        <option>i</option>
            {users.users.map((tuser) => {
            
                <option value='fpl'>fpl</option>
                console.log(tuser.user)
        })}        

            </select>
            
        

        <select onChange={ onstatusChange }>
            <option value='Completed'> Completed </option>
            <option value='Pending'> Pending </option>
        </select>

        </div>
    )
}

export default TaskSelector;

// {
//     users.users.map( (user)=>(
//         <option> { user  }  </option>
//     ))
// }