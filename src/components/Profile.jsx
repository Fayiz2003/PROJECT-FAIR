import React, { useEffect, useState } from 'react'
import { Collapse } from 'react-bootstrap'
import profileimg from '../assets/profilepic.png'
import serverUrl from '../services/serverUrl'
import { editUserAPI } from '../services/allAPI'

const Profile = () => {
  const [preview,setPreview] = useState("")
   const [existingUserImg,setExistingUserImg] = useState("")
  const [userData,setUserData] = useState({
    username:'',email:'',password:'',github:'',linkedin:'',profilePic:''
  })

  const [open, setOpen] = useState(false);

  useEffect(()=>{
    if(sessionStorage.getItem("user")){
   const existingUserDetails = JSON.parse(sessionStorage.getItem("user"))
   setUserData({...userData,username:existingUserDetails.username,email:existingUserDetails.email,password:existingUserDetails.password,github:existingUserDetails.github,linkedin:existingUserDetails.linkedin})
   setExistingUserImg(existingUserDetails.profilePic)
    }
  },[open])

  useEffect(()=>{
  if(userData.profilePic){
    setPreview(URL.createObjectURL(userData.profilePic))
  }else{
    setPreview("")
  }
  },[userData.profilePic])

  const handleUpdateProfile = async ()=>{
    const {username,email,password,github,linkedin,profilePic} = userData
    if(github && linkedin){
      const reqBody = new FormData()
      reqBody.append("username",username)
      reqBody.append("email",email)
      reqBody.append("password",password)
      reqBody.append("github",github)
      reqBody.append("linkedin",linkedin)
      preview ? reqBody.append("profilePic",profilePic) : reqBody.append("profilePic",existingUserImg)
      const token = sessionStorage.getItem("token")
      if(token){
        const reqHeader = {
          "Content-Type":preview?"multipart/form-data:" : "application/json",
          "Authorization":`Bearer ${token}`
        }
        //api call
        try{
          const result = await editUserAPI(reqBody,reqHeader)
          if(result.status==200){
            sessionStorage.setItem("user",JSON.stringify(result.data))
            setOpen(!open)
          }else{
            console.log(result);
          }
        }catch(err){
          console.log(err); 
        }
      }
    }else{
      alert("Please fill the form completely!!!")
    }
  }

  return (
    <>
    <div className="d-flex justify-content-evenly">
      <h3 className="text-warning">Profile</h3>
      <button   onClick={() => setOpen(!open)} className='btn text-warning fw-bolder'> <i className="fa-solid fa-chevron-down"></i></button>
    </div>
    <Collapse in={open}>
        <div className='row align-items-center justify-cntent-center shadow rounded p-2 ' id="example-collapse-text">
          <label className='text-center mb-2'>
           <input onChange={e=>setUserData({...userData,profilePic:e.target.files[0]})} style={{display:'none'}} type="file" />  
          { 
          existingUserImg==""?
            <img width={'200px'} height={'200px'} src={preview?preview:profileimg} alt="" />
            :
            <img width={'200px'} height={'200px'} src={preview?preview:`${serverUrl}/uploads/${existingUserImg}`} alt="" />
          }

          </label>
          <div className="mb-2">
            <input value={userData.github} onChange={e=>setUserData({...userData,github:e.target.value})} type="text" placeholder='GITHUB URL' className='form-control'/>
          </div>
          <div className="mb-2">
            <input value={userData.linkedin} onChange={e=>setUserData({...userData,linkedin:e.target.value})} type="text" placeholder='LINKEDIN URL' className='form-control'/>
          </div>
          <div className="d-grid">
            <button onClick={handleUpdateProfile} className='btn btn-warning'>Update Profile</button>
          </div>
        </div>
      </Collapse>
    </>
  )
}

export default Profile