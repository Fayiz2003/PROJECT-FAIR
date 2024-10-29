import commonAPI from "./commonAPI"
import serverUrl from "./serverUrl"

// register called by Auth
export const registerAPI = async (reqBody)=>{
 return await commonAPI("POST",`${serverUrl}/register`,reqBody)
}

// login called by Auth
export const loginAPI = async (reqBody)=>{
    return await commonAPI("POST",`${serverUrl}/login`,reqBody)
   }

//    addProject API called by add
export const addProjectAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${serverUrl}/add-project`,reqBody,reqHeader)
}

// homeProjectsAPI called by Home
export const homeProjectsAPI = async ()=>{
    return await commonAPI("GET",`${serverUrl}/home-projects`,"")
}

// AllProjectsAPI called by project
export const allProjectsAPI = async (searchKey,reqHeader)=>{
    return await commonAPI("GET",`${serverUrl}/all-projects?search=${searchKey}`,"",reqHeader)
}

// userProjectsAPI called by view
export const userProjectsAPI = async (reqHeader)=>{
    return await commonAPI("GET",`${serverUrl}/user-projects`,"",reqHeader)
}

// removeProjectsAPI called by view
export const deleteProjectAPI = async (pid,reqHeader)=>{
    return await commonAPI("DELETE",`${serverUrl}/${pid}/remove-project`,{},reqHeader)
}

// editProjectAPI called by Edit : put request http://localhost:3000/pid/edit-project
export const editProjectAPI = async (pid,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${serverUrl}/${pid}/edit-project`,reqBody,reqHeader)
}

// editUserAPI called by Profile : put request http://localhost:3000/user/edit
export const editUserAPI = async (reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${serverUrl}/user/edit`,reqBody,reqHeader)
}

