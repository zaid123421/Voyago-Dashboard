import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import { dom } from "../dom";

export default function AdminDetails() {
// useState
  const [run, setRun] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [createdAt, setCreatedAt] = useState();
  const [role, setRole] = useState();
// useNavigate
  const nav = useNavigate();
  
  // Getting Id
  const id = window.location.pathname.split("/").slice(-1)[0];

// useEffect
  useEffect(() => {
    fetch(`http://${dom}/web/admins/${id}`)
    .then((res) => res.json())
    .then((res) => {
      setName(res.data.admin.username)
      setEmail(res.data.admin.email)
      setCreatedAt((res.data.admin.createdAt).slice(0,10))
      setRole(res.data.admin.role)
    })
  }, [])
  
  async function deleteUser(id) {
    try{
      let res = await axios.delete(`http://${dom}/web/delete_admin/${id}`,);
      if(res.status === 200)
      setRun((prev) => prev + 1);
      nav('/admins')
    }
    catch {
      console.log("There Is An Error In Delete");
    }
  }
  return(
    <>
      <Header />
      <Sidebar number = {2} />
      <div className = 'content admin-details-page d-flex align-c justify-c'>
        <NavLink to = "/admins">
          <i className = "fa-solid fa-angle-left arrow-left"></i>
        </NavLink>
        <div className = 'admin-card-info'>
          <h1 className = "fw-500">Admin Details</h1>
          <div>
            <h3 className = "fw-500">Name</h3>
            <h4 className = "fw-300">{name}</h4>
          </div>
          <div>
            <h3 className = "fw-500">Email</h3>
            <h4 className = "fw-300">{email}</h4>
          </div>
          <div>
            <h3 className = "fw-500">Created at</h3>
            <h4 className = "fw-300">{createdAt}</h4>
          </div>
          <div>
            <h3 className = "fw-500">Role</h3>
            <h4 className = "fw-300">{role}</h4>
          </div>
          <div>
            <i onClick={() => deleteUser(id)} className="fa-regular fa-trash-can table-icon"></i>
          </div>
        </div>
      </div>
    </>
  );
}