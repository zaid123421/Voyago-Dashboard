import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import { dom } from "../dom";

export default function UserDetails() {
// useState
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [createdAt, setCreatedAt] = useState('');
const [run, setRun] = useState(0);

// useNavigate
const nav = useNavigate();

// Getting Id
  const id = window.location.pathname.split("/").slice(-1)[0];

// useEffect
  useEffect(() => {
    fetch(`http://${dom}/web/users/${id}`)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      setName(res.data.user.username)
      setEmail(res.data.user.email)
      setCreatedAt(res.data.user.createdAt)
    })
  }, [])

  async function deleteUser (id) {
    try{
      let res = await axios.delete(`http://${dom}/web/delete_user/${id}`,);
      if(res.status === 200)
      setRun((prev) => prev + 1);
      nav('/users')
    }
    catch {
      console.log("There Is An Error In Delete");
    }
  }

  return (
    <>
      <Header />
      <Sidebar number = {3} />
      <div className = "content">
          <NavLink to = "/users">
            <i className = "fa-solid fa-angle-left arrow-left"></i>
          </NavLink>
          <h1 className = "special-head ml-25">User Details</h1>
        <div className = "user-details-box">
          <div className = "user-details w-50">
            <div className = "d-flex align-c justify-sb mb-30">
              <h2 className = "fs-18">Name:</h2>
              <p className = "fs-14">{name}</p>
            </div>
            <div className = "d-flex align-c justify-sb mb-30">
              <h2 className = "fs-18">Email:</h2>
              <p className = "fs-14">{email}</p>
            </div>
            <div className = "d-flex align-c justify-sb">
              <h2 className = "fs-18">Created at:</h2>
              <p className = "fs-14">{createdAt.slice(0,10)}</p>
            </div>
          </div>
          <div className = "w-50 icons-box">
          <i onClick = {() => deleteUser(id)} className = "fa-regular fa-trash-can table-icon ml-15"></i>
          </div>
            <h2 className = "mt-30 mb-20">Reserved Trips</h2>
          <div className = "w-100 overflow-s ez">
            <div className = "pr-25">
            <table className = "reserved-trips-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Trip Name</th>
                  <th>Reservation Number</th>
                  <th>Delete Trip</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Sydney Sae Trip </td>
                  <td>#0235985</td>
                  <td><i className = "fa-regular fa-trash-can table-icon"></i></td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Canggu Tour</td>
                  <td>#0235475</td>
                  <td><i className = "fa-regular fa-trash-can table-icon"></i></td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Krakow Mus Trip</td>
                  <td>#0235987</td>
                  <td><i className = "fa-regular fa-trash-can table-icon"></i></td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Zaid</td>
                  <td>#0235987</td>
                  <td><i className = "fa-regular fa-trash-can table-icon"></i></td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Zaid</td>
                  <td>Super Admin</td>
                  <td><i className = "fa-regular fa-trash-can table-icon"></i></td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Zaid</td>
                  <td>Super Admin</td>
                  <td><i className = "fa-regular fa-trash-can table-icon"></i></td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Zaid</td>
                  <td>Super Admin</td>
                  <td><i className = "fa-regular fa-trash-can table-icon"></i></td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Zaid</td>
                  <td>Super Admin</td>
                  <td><i className = "fa-regular fa-trash-can table-icon"></i></td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Zaid</td>
                  <td>Super Admin</td>
                  <td><i className = "fa-regular fa-trash-can table-icon"></i></td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Zaid</td>
                  <td>Super Admin</td>
                  <td><i className = "fa-regular fa-trash-can table-icon"></i></td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Zaid</td>
                  <td>Super Admin</td>
                  <td><i className = "fa-regular fa-trash-can table-icon"></i></td>
                </tr>
              </tbody>
            </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}