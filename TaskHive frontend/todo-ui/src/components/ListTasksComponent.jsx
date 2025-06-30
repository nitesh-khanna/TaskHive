import React, { useEffect, useState } from 'react'
import { completeTodo, deleteTodo, getAllTodos, incompleteTodo } from '../services/TodoService';
import { useNavigate } from 'react-router-dom';
import { getLoggedInUser, isAdminUser } from '../services/AuthService';

const ListTasksComponent = () => {
    const [todos, setTodos]= useState([])

    const navigator= useNavigate();

    const isAdmin = isAdminUser();

    useEffect(() => {
        getAllTodoList();
    }, [])

    function getAllTodoList(){
        getAllTodos().then((response) => {
            setTodos(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    function addNewToDo(){
        navigator('/add-todo')
    }

    function updateToDo(id){
        navigator(`/update-todo/${id}`)
    }

    function removeToDo(id){
        deleteTodo(id).then((response) => {
            console.log(response.data);
            getAllTodoList();
        }).catch(error => {
            console.error(error);
        })
    }

    function markCompleteToDo(id){
        completeTodo(id).then((response) => {
            console.log(response.data);
            getAllTodoList();
        }).catch(error => {
            console.error(error);
        })
    }

    function markIncompleteToDo(id){
        incompleteTodo(id).then((response) => {
            console.log(response.data);
            getAllTodoList();
        }).catch(error => {
            console.error(error);
        })
    }

    return (
        <div className='container' style={{marginTop: '10px'}}>
            <h2 className='text-center'>TO-DO List</h2>
            {
                isAdmin && 
                <button className='btn btn-primary mb-2' onClick={addNewToDo}>Add To-Do</button>
            }
            
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Completed</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        todos.map(todo =>
                            <tr key={todo.id}>
                                {/* <td>{employee.id}</td> */}
                                <td>{todo.title}</td>
                                <td>{todo.description}</td>
                                <td>{todo.completed ? 'YES' : 'NO'}</td>
                                <td>
                                    {/* {
                                        addButtons(todo)
                                        
                                    } */}
                                    {
                                        isAdmin &&
                                        <button className='btn btn-primary' onClick={() => updateToDo(todo.id)}>Update</button>
                                    }

                                    {
                                        isAdmin &&
                                        <button className='btn btn-danger' onClick={() => removeToDo(todo.id)} style={{ marginLeft: '10px' }}>Delete</button>
                                    }
                                    
                                    <button className='btn btn-success' onClick={() => markCompleteToDo(todo.id)} style={{marginLeft: '10px'}}>Complete</button>
                                    <button className='btn btn-warning' onClick={() => markIncompleteToDo(todo.id)} style={{marginLeft: '10px'}}>Incomplete</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListTasksComponent