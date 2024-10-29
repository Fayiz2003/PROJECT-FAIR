import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Landing from '../assets/landingimg.png'
import ProjectCard from '../components/ProjectCard'
import { Card } from 'react-bootstrap'
import { homeProjectsAPI } from '../services/allAPI'
Card
const Home = () => {
const [allHomeProjects,setAllHomeProjects] = useState([])
  const navigate =  useNavigate()


console.log(allHomeProjects);
useEffect(()=>{
  getAllHomeProjects()
},[])

  const getAllHomeProjects = async ()=>{
    try{
      const result = await homeProjectsAPI()
      if(result.status==200){
        setAllHomeProjects(result.data)
      }
    }catch(err){
      console.log(err);
      
    }
  }

  const handleProjects = ()=>{
    if(sessionStorage.getItem('token')){
      navigate('/projects')
    }else{
        alert("please login to get full access to our team")
    }
  }
  return (
    <>
    <div style={{height:'100vh'}} className="d-flex jutify-content-center align-items-center rounded shadow w-100">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <h1 style={{fontSize:'80px'}}><i className="fa-brands fa-docker"></i>  Project Fair</h1>
            <p style={{textAlign:'justify'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio eveniet, alias inventore corporis beatae nihil aspernatur deleniti praesentium nam possimus, laborum, et quod voluptas odit? Corporis dolore animi mollitia dolorem?</p>
          {
          sessionStorage.getItem("token") ?
          <Link to={'/dashboard'} className='btn btn-warning'>MANAGE YOUR PROJECTS</Link> 
          :
          <Link to={'/login'} className='btn btn-warning'>START TO EXPLORE</Link>
           }
          </div>
          <div className="col-lg-6">
            <img className='img-fluid ms-5' src={Landing} alt="" />
          </div>
        </div>
      </div>
    </div>
    <div className="my-5 text-center">
      <h1 className="mb-5">Explore Our Projects</h1>
      <marquee>
        <div className="d-flex">

          {
            allHomeProjects?.length>0 &&
            allHomeProjects?.map(project=>(
              <div key={project?._id} className="me-5">
            <ProjectCard displayData={project} />
          </div>
            ))
          }
          
        </div>
      </marquee>
      <button onClick={handleProjects} className='btn btn-link mt-5'>CLICK HERE TO VIEW MORE PROJECTS...</button>
    </div>
    <div className="d-flex justify-content-center align-items-center flex-column">
        <h1>out Testimonials</h1>
        <div className="d-flex justify-content-evenly align-items-center mt-3 w-100">
           <Card style={{ width: '18rem' }}>
         <Card.Body>
           <Card.Title className='d-flex justify-content-center align-items-center flex-column'>
            <img width={'60px'} height={'60px'}  src="https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-File.png" alt="" />
            <span>Max Miller</span>
           </Card.Title>
           <Card.Text>
           <div className='d-flex justify-content-center align-items-center'>
            <i className='fa-solid fa-star text-warning'></i>
            <i className='fa-solid fa-star text-warning'></i>
            <i className='fa-solid fa-star text-warning'></i>
            <i className='fa-solid fa-star text-warning'></i>
           </div>
             Some quick example text to build on the card title and make up the
             bulk of the card's content.
           </Card.Text>
         </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }}>
         <Card.Body>
           <Card.Title className='d-flex justify-content-center align-items-center flex-column'>
            <img width={'60px'} height={'60px'}  src="https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Photo.png" alt="" />
            <span>Max Miller</span>
           </Card.Title>
           <Card.Text>
           <div className='d-flex justify-content-center align-items-center'>
            <i className='fa-solid fa-star text-warning'></i>
            <i className='fa-solid fa-star text-warning'></i>
            <i className='fa-solid fa-star text-warning'></i>
            <i className='fa-solid fa-star text-warning'></i>
           </div>
             Some quick example text to build on the card title and make up the
             bulk of the card's content.
           </Card.Text>
         </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }}>
         <Card.Body>
           <Card.Title className='d-flex justify-content-center align-items-center flex-column'>
            <img width={'60px'} height={'60px'}  src="https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Images-HD.png" alt="" />
            <span>Max Miller</span>
           </Card.Title>
           <Card.Text>
           <div className='d-flex justify-content-center align-items-center'>
            <i className='fa-solid fa-star text-warning'></i>
            <i className='fa-solid fa-star text-warning'></i>
            <i className='fa-solid fa-star text-warning'></i>
            <i className='fa-solid fa-star text-warning'></i>
           </div>
             Some quick example text to build on the card title and make up the
             bulk of the card's content.
           </Card.Text>
         </Card.Body>
        </Card>
        
        </div>

        
    </div>
    </>
  )
}

export default Home