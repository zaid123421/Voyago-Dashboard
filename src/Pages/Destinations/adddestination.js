import { NavLink, useNavigate } from "react-router-dom";
import { useState, useRef, useContext } from 'react';
import axios from "axios";
import { User } from "../Context";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import { dom } from "../dom";


export default function AddDestination(){
// useState
const [images, setImages] = useState([]);
const [form, setForm] = useState({
  name: "",
  location: "",
  description: ""
});

// useRef
const openImage = useRef(null);

// useNavigate
const nav = useNavigate();

// useContext
const userInfo = useContext(User);

// handling
function handleOpenImage() {
  openImage.current.click();
}

// Mapping
  const imagesShow = images.map((img, key) => (
  <div className = "image-container">
    <img src = {URL.createObjectURL(img)} alt = "Test" />
  </div>
  ));

const token = userInfo.auth.userAccessToken;

async function Submit(e){
  e.preventDefault();
  const data = new FormData();
  data.append("name", form.name);
  data.append("description", form.description);
  data.append("location", form.location);
  for (let i = 0; i < images.length; i++) {
    data.append('image', images[i]);
  }
  try {
    const res = await axios.post(`https://${dom}/web/add_destenation`, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      }
    );
    console.log(res.data);
    nav('/destinations')
  } catch (error) {
    console.log(error);
    console.log(token);
  }
}

// handleChange
  function handleChange(e){
    setForm({ ...form, [e.target.name]: e.target.value});
  }

  return(
    <>
      <Header />
      <Sidebar number = {6} />
      <div className = "content">
        <NavLink to = "/destinations">
          <i className="fa-solid fa-angle-left arrow-left position-absolute"></i>
        </NavLink>
        <h1 className = "fw-500 ml-25">Add A New Destination</h1>
        <p className = "ml-25 mt-20 fs-18">add the destination's details:</p>
        <div className = "add-destination-details">
          <div>
            <div className = "mb-15">
              <label htmlFor = "name" className = "fw-500">Name</label>
              <input
                autoFocus
                id = "name"
                type = "text"
                name = "name"
                placeholder="Add Destination's Name"
                value = {form.name}
                onChange = {handleChange}/>
            </div>
            <div>
              <label htmlFor = "location" className = "fw-500">Location</label>
              <input
                id = "location"
                type = "text"
                name = "location"
                placeholder = "Add Destination's Location"
                value = {form.location}
                onChange = {handleChange}/>
            </div>
          </div>
          <div className = "images-card">
            <h3 className = "fw-500 mb-20 mt-10 fs-16">Upload Destination's Photos</h3>
            <input
              ref = {openImage}
              hidden
              type = "file"
              onChange = {(e) => setImages([...e.target.files])}
              multiple />
            <div className = "cards-input" onClick= {handleOpenImage}>
              <i className="fa-solid fa-cloud-arrow-up upload-icon"></i>
              <p className="">Upload Images</p>
            </div>
            <div className = "images-container">{imagesShow}</div>
          </div>
          <div>
            <label htmlFor = "description" className = "fw-500">Description</label>
            <textarea
              id = "description"
              type = "textarea"
              name = "description"
              placeholder = "Type Some Words About The Destination..."
              value = {form.description}
              onChange = {handleChange}
            />
          </div>
        </div>
        <button onClick = {Submit} className = "add-destination">Add Destination<span className = "plus">+</span></button>
      </div>
    </>
  );
}