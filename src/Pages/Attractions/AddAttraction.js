import { NavLink, useNavigate } from "react-router-dom";
import { useState, useRef, useContext, useEffect } from 'react';
import axios from "axios";
import { User } from "../Context";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import { dom } from "../dom";


export default function AddAttraction(){
// useState
const [images, setImages] = useState([]);
const [destinations, setDestinations] = useState([]);
const [select, setSelect] = useState("Select Destination");
const [role, setRole] = useState();
const [form, setForm] = useState({
  name: "",
  description: "",
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
  data.append("destenation_id", role);
  data.append("description", form.description);
  for (let i = 0; i < images.length; i++) {
    data.append('image', images[i]);
  }
  try {
    const res = await axios.post(`http://${dom}/web/add_attraction`, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      }
    );
    console.log(res.data);
    nav('/attractions')
  } catch (error) {
    console.log(error);
  }
}

useEffect(() => {
  axios.get(`http://${dom}/web/destenations`)
    .then((response) => {
      setDestinations(response.data.data);
    })
    .catch((err) => console.log(err));
}, []);

const showDestinations = destinations.map((destination, index) => {
  return(
      <option value = {destination.id}>{destination.name}</option>
  )
});

// handleChange
  function handleChange(e){
    setForm({ ...form, [e.target.name]: e.target.value});
  }

  function handleSelect(event) {
    setRole(event.target.value)
  }

  return(
    <>
      <Header />
      <Sidebar number = {5} />
      <div className = "content">
        <NavLink to = "/attractions">
          <i className="fa-solid fa-angle-left arrow-left"></i>
        </NavLink>
        <h1 className = "fw-500 ml-25">Add A New Attraction</h1>
        <p className = "ml-25 mt-20 fs-18">add the attraction's details:</p>
        <div className = "add-destination-details">
          <div>
            <div className = "mb-15">
              <label htmlFor = "name" className = "fw-500">Name</label>
              <input
                autoFocus
                id = "name"
                type = "text"
                name = "name"
                placeholder = "Add Attraction's Name"
                value = {form.name}
                onChange = {handleChange}/>
            </div>
            <div className = "div-select">
              <label htmlFor = "destination" className = "fw-500">Destination</label>
              <select onChange = {handleSelect} className = "cursor-p fs-15">
                <option>Select Destination</option>
                {showDestinations}
              </select>
              <i className = "fa-solid fa-chevron-down arrow-select"></i>
            </div>
          </div>
          <div className = "images-card">
            <h3 className = "fw-500 mb-20 mt-10 fs-16">Upload Attraction's Photos</h3>
            <input
              ref = {openImage}
              hidden
              type = "file"
              onChange = {(e) => setImages([...e.target.files])}
              multiple />
            <div className = "cards-input" onClick= {handleOpenImage}>
              <i class="fa-solid fa-cloud-arrow-up upload-icon"></i>
              <p className="">Upload Images</p>
            </div>
            <div className = "images-container">{imagesShow}</div>
          </div>
          <div>
            <label htmlFor = "attraction" className = "fw-500">Description</label>
            <textarea
              id = "attraction"
              type = "textarea"
              name = "description"
              placeholder = "Type Some Words About The Attraction..."
              value = {form.description}
              onChange = {handleChange}
            />
          </div>
        </div>
        <button onClick = {Submit} className = "add-destination">Add Attraction<span className = "plus">+</span></button>
      </div>
    </>
  );
}