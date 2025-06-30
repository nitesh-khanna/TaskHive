import React, { useEffect, useState } from 'react'
import { getTodo, saveTodo, updateTodo } from '../services/TodoService'
import { useNavigate, useParams } from 'react-router-dom'

const TaskComponent = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [completed, setCompleted] = useState(false)

    const {id} = useParams();
    const navigator = useNavigate();

    const [errors, setErrors]= useState({
        title: '',
        description: ''
    })

    useEffect(() =>{
        if(id){
            getTodo(id).then((response) =>{
                setTitle(response.data.title),
                setDescription(response.data.description),
                setCompleted(response.data.completed)
            }).catch(error =>{
                console.error(error);
            })
        }
    }, [id])

    function saveOrUpdateToDo(e){
        e.preventDefault();

        const todo= {title, description, completed}
        if(validateForm()){
            if(id){
            updateTodo(id , todo).then((response) => {
                console.log(response.data);
                navigator('/todos')
            }).catch(error => {
                console.error(error);
            })
            }
            else{
                saveTodo(todo).then((response) => {
                    console.log(response.data);
                    navigator('/todos')
                }).catch(error => {
                    console.error(error);
                })
            }
        }
    }

    function validateForm(){
        let valid= true;

        const errorsCopy= {... errors}

        if(title.trim()){
            errorsCopy.title=''
        }
        else{
            errorsCopy.title= 'Title is required';
            valid= false;
        }


        if(description.trim()){
            errorsCopy.description=''
        }
        else{
            errorsCopy.description= 'Description is required';
            valid= false;
        }

        setErrors(errorsCopy);

        return valid;
    }

    function pageTitle(){
        if(id) return <h2 className='text-center'>Update To-Do</h2>
        else return <h2 className='text-center'>Add To-Do</h2>
    }

  return (
    <div className='container'>
        <br /><br />
        <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
                {
                    pageTitle()
                }
                <div className="card-body">
                    <form>
                        <div className="form-group mb-2">
                            <label className="form-label">Title: </label>
                            <input
                                type='text'
                                placeholder='enter title'
                                name='title'
                                value={title}
                                className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                onChange={(e)=> setTitle(e.target.value)}   //using arrow function instead of defining seperate functions
                            ></input>
                            {errors.title && <div className='invalid-feedback'> {errors.title} </div>}
                        </div>


                        <div className="form-group mb-2">
                            <label className="form-label">Description: </label>
                            <input
                                type='text'
                                placeholder='enter description'
                                name='description'
                                value={description}
                                className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                onChange={(e)=> setDescription(e.target.value)}   //using arrow function instead of defining seperate functions
                            ></input>
                            {errors.description && <div className='invalid-feedback'> {errors.description} </div>}
                        </div>


                        <div className="form-group mb-2">
                            <label className="form-label">ToDo Completed: </label>
                            <select
                                // className={`form-control ${errors.department ? 'is-invalid' : ''}`}
                                className='form-control'
                                value={completed} 
                                onChange={(e)=>setCompleted(e.target.value)}
                            >
                                <option value="false">No</option>
                                <option value="true">Yes</option>
                            </select>
                            {/* {errors.department && <div className='invalid-feedback'> {errors.department} </div>} */}
                        </div>
                        

                        <button className='btn btn-success' onClick={saveOrUpdateToDo}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TaskComponent