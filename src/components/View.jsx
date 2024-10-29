import React, { useContext, useEffect, useState } from 'react'
import Add from './Add'
import Edit from './Edit'
import { deleteProjectAPI, userProjectsAPI } from '../services/allAPI'
import { addResponseContext, editResponseContext } from '../contexts/ContextShare'

const View = () => {
  const {editResponse,setEditResponse} = useContext(editResponseContext)
  const {addResponse,setAddResponse} = useContext(addResponseContext)
  const [userProjects,setUserProjects] = useState([])
  useEffect(()=>{
  getUserProjects()
  },[addResponse,editResponse])
  console.log(userProjects);
  
  const getUserProjects = async()=>{
    const token = sessionStorage.getItem("token")
    if(token){
      const reqHeader = {
        "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`
      }
      //api call
      try {
        const result = await userProjectsAPI(reqHeader)
        console.log(result);
        if(result.status==200){
          setUserProjects(result.data) 

        }else{
          console.log(result);
          
        }
        
      } catch (err) {
        console.log(err);
        
      }
    }
  }

  const handleDeleteProject = async (pId)=>{
    const token = sessionStorage.getItem("token")
    if(token){
      const reqHeader = {
        "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`
      }
      try{
        const result = await deleteProjectAPI(pid,reqHeader)
        if(result.status==200){
          getUserProjects()
        }else{
          console.log(result);      
        }
      }catch(err){
        console.log(err);
      }
    }
  }

  return (
    <>
    <div className="d-flex justify-content-between mt-2">
      <h2 className="text-warning">All Projects</h2>
      <div> <Add/> </div>
    </div>
    <div className="mt-2">
      {
        userProjects?.length>0 ?
        userProjects?.map(project=>(
          <div key={project?._id} className="border rounded p-2 mb-3 d-flex justify-content-between">
        <h3>{project?.title}</h3>
        <div className="d-flex aign-items-center">
          <div > <Edit project={project} /> </div>
          <div className="btn">
            <a href={project?.github} target='_blank'> <i className="fa-brands fa-github"></i></a>
          </div>
          <button onClick={()=>handleDeleteProject(project?._id)} className='btn'> <i className="fa-solid fa-trash text-danger"></i></button>
        </div>
      </div>
        ))
      :
      <div className="fw-bolder text-warning m-3 text-center"></div>
      }
    </div>
    </>
  )
}

export default View