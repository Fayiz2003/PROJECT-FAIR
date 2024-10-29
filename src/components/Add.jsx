import React ,{useContext, useEffect, useState} from 'react'
import { Button, Modal } from 'react-bootstrap'
import profileimg from '../assets/profilepic.png'
import { addProjectAPI } from '../services/allAPI'
import { addResponseContext } from '../contexts/ContextShare'
const Add = () => {
  const {addResponse,setAddResponse}  =  useContext(addResponseContext)
  const [imageFileStatus,setImageFileStatus] = useState(false)
  const [preview , setPreview] = useState(profileimg)
  const [projectData,setProjectData] = useState({
    title:'',languages:'',overview:'',github:'',website:'',projectImg:'' 
  })
  console.log(projectData);
  
  const [show, setShow] = useState(false);


  useEffect(()=>{
     if(projectData.projectImg.type=="image/png" || projectData.projectImg.type=="image/jpg" || projectData.projectImg.type=="image/jpeg"){
      setImageFileStatus(true)
      setPreview(URL.createObjectURL(projectData.projectImg))
     }else{
      setImageFileStatus(false)
      setPreview(profileimg)
      setProjectData({...projectData,projectImg:""})
     }
  },[projectData.projectImg])
  const handleClose = () => {
    setShow(false);
    setProjectData({  title:'',languages:'',overview:'',github:'',website:'',projectImg:'' })
  }

  const handleShow = () => setShow(true);

  const handleSaveProject = async ()=>{
    const {title,languages,overview,github,website,projectImg} = projectData
    if(title && languages && overview && github && website && projectImg){
      
      // reqBody must be in form data since data contains files
      const reqBody = new FormData()
      reqBody.append("title",title)
      reqBody.append("languages",languages)
      reqBody.append("overview",overview)
      reqBody.append("github",github)
      reqBody.append("website",website)
      reqBody.append("projectImg",projectImg)

      const token = sessionStorage.getItem("token")
      if(token){
        const reqHeader = {
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`
        }
        // api call - post request
        try{
          const result = await addProjectAPI(reqBody,reqHeader)
          console.log(result);
          if(result.status==200){
           handleClose()
          //  alert("project Added Successfully!!!")
          // share result via context
          setAddResponse(result)
          }else{
            alert(result.response.data)
          }
          
        }catch(err){
          console.log(err);
          
        }
      }
    }else{
      alert ("please fitt the form completely...")
    }
  }
  return (
    <>
    <button onClick={handleShow} className='btn btn-primary'> <i className="fa-solid fa-plus"></i> New Project</button>
    <Modal size='lg' centered show={show} onHide={handleClose} backdrop="static"  keyboard={false} >
        <Modal.Header closeButton>
          <Modal.Title>New Project Details!!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <div className="row align-items-center ">
          <div className="col-lg-4">
            <label >
              <input onChange={e=>setProjectData({...projectData,projectImg:e.target.files[0]})} style={{display:'none'}} type="file" />
              <img width={'200px'} height={'200px'} src={preview} alt="" />
            </label>
             { !imageFileStatus &&
              <div className="text-warning fw-bolder my-2">
              *Upload Only the folloeing file types (jpeg, jpg, png) here!!! 
             </div>
             }
          </div>
          <div className="col-lg-8">
            <div className="mb-2">
            <input value={projectData.title}  onChange={e=>setProjectData({...projectData,title:e.target.value})} type="text " placeholder='Project Title' className='form-control' />
            </div>
            <div className="mb-2">
            <input value={projectData.languages} onChange={e=>setProjectData({...projectData,languages:e.target.value})}  type="text " placeholder='Languages Used in Project' className='form-control' />
            </div>
            <div className="mb-2">
            <input value={projectData.overview} onChange={e=>setProjectData({...projectData,overview:e.target.value})}  type="text " placeholder='Project Overview' className='form-control' />
            </div>
            <div className="mb-2">
            <input value={projectData.github} onChange={e=>setProjectData({...projectData,github:e.target.value})}  type="text " placeholder='Project Github Link' className='form-control' />
            </div>
            <div className="mb-2">
            <input value={projectData.website} onChange={e=>setProjectData({...projectData,website:e.target.value})} type="text " placeholder='Project Website Link' className='form-control' />
            </div>
          </div>
         </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSaveProject} variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Add