import React from 'react';

const table = (props) =>(
    <div>
    <h1>Tasks</h1>
    <table className="table table-striped">
        <thead>
        <tr>
            <th scope="col">User</th>
            <th scope="col">TaskName</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>

        </tr>
        </thead>
        <tbody>
          
        {data.tasks.map(task => (

            <tr key={task._id}>
                <td>{task.user.name}</td>
                <td>{task.taskName}</td>
                <td>{task.status}</td>
                <td><a href={'/edit/'+task._id} className="btn btn-primary"><i className="fa fa-edit" aria-hidden="true"> Edit</i></a></td>
                <td><button className="btn btn-danger" onClick={()=>onDelete(task._id,task.user.name)}><i className="fa fa-trash" aria-hidden="true"> Delete</i></button></td>
            </tr>
        ))} 
       </tbody>
    </table><br></br>
    
    </div>
)

export default table;


