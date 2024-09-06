import { useContext, useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import axios from "axios";
import { User } from "../Context";
import { dom } from "../dom";

export default function AddTrip() {
  const [tripId, setTripId] = useState();

  const [cancellationHours, setCancellationHours] = useState(1);
  const [features, setFeatures] = useState([]);
  const [images, setImages] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [destinationId, setDestinationId] = useState("");
  const [attractions, setAttractions] = useState([]);
  const [attractionId, setAttrationId] = useState("");
  const [eventDuration, setEventDuration] = useState(1);
  const [selectType, setSelectType] = useState('');


  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [price, setPrice] = useState();
  const [capacity, setCapacity] = useState(5);
  const [description, setDescription] = useState('');
  const [feature, setFeature] = useState([]);
  const [meeting, setMeeting] = useState('');

  const [action, setAction] = useState('');

  const [isDetailsSaved, setIsDetailsSaved] = useState(false);

  // useRef
  const openImage = useRef(null);

// handling
function handleOpenImage() {
  openImage.current.click();
}

// Navigate
  const nav = useNavigate();

// useContext
  const userInfo = useContext(User);
  const token = userInfo.auth.userAccessToken;

// Mapping
  const imagesShow = images.map((img, key) => (
  <div className = "image-container">
    <img src = {URL.createObjectURL(img)} alt = "Test" />
  </div>
  ));

  function handleLeft() {
    if (capacity > 5) {
      setCapacity(capacity - 5);
    }
  }

  function handleRight() {
    setCapacity(capacity + 5);
  }

  function handleLeftHours() {
    if (cancellationHours > 1) {
      setCancellationHours(cancellationHours - 1);
    }
  }

  function handleRightHours() {
    setCancellationHours(cancellationHours + 1);
  }

  function handleLeftEvent() {
    if (eventDuration > 1) {
      setEventDuration(eventDuration - 1);
    }
  }

  function handleRightEvent() {
    setEventDuration(eventDuration + 1);
  }

  // Get Features
  useEffect(() => {
    axios.get(`https://${dom}/web/features_included`)
      .then((response) => {
        setFeatures(response.data.features);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleCheckboxChange = (event, id) => {
    if (event.target.checked) {
      setFeature([...feature, id]);
    } else {
      setFeature(feature.filter(item => item !== id));
    }
  };

  const showMealsFeatures = features.map((feature, index) => {
    if(feature.type === "Meals"){
      return(
        <li className = "mb-10">
          <input onChange ={(e) => handleCheckboxChange(e,feature.id)} id = {feature.id} type = "checkbox" className = "checkbox-special"/>
          <label htmlFor= {feature.id} className = "checkbox-label cursor-p position-relative">{feature.name}</label>
        </li>
      );
    }
  });

  const showTransportingFeatures = features.map((feature, index) => {
    if(feature.type === "Transporting"){
      return(
        <li className = "mb-10">
          <input onChange = {(e) => handleCheckboxChange(e, feature.id)} id = {feature.id} type = "checkbox" className = "checkbox-special"/>
          <label htmlFor= {feature.id} className = "checkbox-label cursor-p position-relative">{feature.name}</label>
        </li>
      );
    }
  });

  const showServicesFeatures = features.map((feature, index) => {
    if(feature.type === "Services"){
      return(
        <li className = "mb-10">
          <input onChange = {(e) => handleCheckboxChange(e, feature.id)} id = {feature.id} type = "checkbox" className = "checkbox-special"/>
          <label htmlFor= {feature.id} className = "checkbox-label cursor-p position-relative">{feature.name}</label>
        </li>
      );
    }
  });

  const showFeesFeatures = features.map((feature, index) => {
    if(feature.type === "Fees"){
      return(
        <li className = "mb-10">
          <input onChange = {(e) => handleCheckboxChange(e, feature.id)} id = {feature.id} type = "checkbox" className = "checkbox-special"/>
          <label htmlFor= {feature.id} className = "checkbox-label cursor-p position-relative">{feature.name}</label>
        </li>
      );
    }
  });

  const showActivitiesFeatures = features.map((feature, index) => {
    if(feature.type === "Activities"){
      return(
        <li className = "mb-10">
          <input onChange = {(e) => handleCheckboxChange(e, feature.id)} id = {feature.id} type = "checkbox" className = "checkbox-special"/>
          <label htmlFor= {feature.id} className = "checkbox-label cursor-p position-relative">{feature.name}</label>
        </li>
      );
    }
  });

  // Get Destinations
  useEffect(() => {
    axios.get(`https://${dom}/web/destenations`)
    .then((response) => {
      setDestinations(response.data.data);
    })
    .catch((err) => console.log(err));
  }, []);

  // Detstinations Select Names
    const showDestinationsNames = destinations.map((destination, index) => {
      return(
        <option value = {destination.id}>{destination.name}</option>
      )
    });

  // Get Attractions
  useEffect(() => {
    axios.get(`https://${dom}/web/attractions`)
    .then((response) => {
      setAttractions(response.data.data);
    })
    .catch((err) => console.log(err));
  }, []);

  // Attractions Select Names
  const showAttrationsNames = attractions.map((attraction, index) => {
    return(
      <option value = {attraction.id}>{attraction.name}</option>
    )
  });

  const [days, setDays] = useState([
    [
      {
        action: '',
        title: '',
        attraction_id: "",
        start_date: '',
        duration: '',
        description: '',
        type: "",
        price_adult: null,
        price_child: null,
        additional_note: ''
      }
    ]
  ]);

  const handleAddDay = () => {
    setDays([...days, [{}]]);
  };

  const handleAddEvent = (dayIndex) => {
    const updatedDays = [...days];
    if (updatedDays[dayIndex].length === 0) {
      updatedDays[dayIndex] = [{
        action: '',
        title: '',
        attraction_id: "",
        start_date: '',
        duration: '',
        description: '',
        type: "",
        price_adult: null,
        price_child: null,
        additional_note: ''
      }];
    } else {
      updatedDays[dayIndex] = [...updatedDays[dayIndex], {
        action: '',
        title: '',
        attraction_id: "",
        start_date: '',
        duration: '',
        description: '',
        type: "",
        price_adult: null,
        price_child: null,
        additional_note: ''
      }];
    }
    setDays(updatedDays);
  };

  const handleEventChange = (dayIndex, eventIndex, field, value) => {
    const updatedDays = [...days];
    updatedDays[dayIndex][eventIndex] = {
      ...updatedDays[dayIndex][eventIndex],
      [field]: value
    };
    setDays(updatedDays);
  };

  const handleDeleteDay = (dayIndex) => {
    if (days.length > 1) {
      const updatedDays = days.filter((_, index) => index !== dayIndex);
      setDays(updatedDays);
    } else {
      alert('There must be at least one day.');
    }
  };

  const handleDeleteEvent = (dayIndex, eventIndex) => {
    const updatedDays = [...days];
    if (updatedDays[dayIndex].length === 1) {
      alert('In A Day We Must Have At Least One Event');
    } else {
      updatedDays[dayIndex] = updatedDays[dayIndex].filter((_, index) => index !== eventIndex);
      setDays(updatedDays);
    }
  };

  const prepareDataForSubmission = () => {
    return {
      name: name,
      destenation_id: destinationId,
      start_date: startDate,
      price: price,
      capacity: capacity,
      description: description,
      features: feature,
      meeting_point_location: meeting,
      TimeLimitCancellation: cancellationHours,
      days: days.map(day => day.map(event => ({
        action: event.action || "",
        title: event.title || "",
        attraction_id: parseInt(event.attraction_id) || null,
        start_date: event.start_date || "",
        duration: parseInt(event.duration) || null,
        description: event.description || "",
        type: event.type || null,
        price_adult: event.price_adult || null,
        price_child: event.price_child || null,
        additional_note: event.additional_note || ""
      })))
    };
  };

  function handleSelectDestination(event) {
    const selectedId = parseInt(event.target.value, 10);
    setDestinationId(selectedId);
  }

  function handleSelectAttraction(event) {
    const selectedId = parseInt(event.target.value, 10);
    setAttrationId(selectedId);
  }

  async function addTripDetails(e){
    e.preventDefault();
    const data = prepareDataForSubmission();
    console.log(data);
    try {
      const res = await axios.post(`https://${dom}/web/add_trip`,
        data, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        }
      );
      console.log(res);
      if(res.data.msg === "fault"){
        alert("You Must Add Events !")
      } else {
        setTripId(res.data.data.trip_id);
        setIsDetailsSaved(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function addTrip(e){
    e.preventDefault();
    const formData = new FormData();
    formData.append('tripId', tripId);
    for (let i = 0; i < images.length; i++) {
      formData.append('image', images[i]);
    }
    try {
      const res = await axios.post(`https://${dom}/web/upload_trip_images`,
        formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        }
      );
      console.log("Success !");
      nav('/trips');
    } catch (error) {
      console.log(error);
    }
  }

  return(
    <>
      <Header />
      <Sidebar number = {4} />
      <div className = "content">
        <div className = "destination-details-header mb-15">
          <NavLink to = "/trips">
            <i className="fa-solid fa-angle-left arrow-left transaction-arrow"></i>
          </NavLink>
          <h1 className = "special-head-arrow special-head">Add Trip A New Trip</h1>
        </div>
        <div className = "mt-25 main-add-trip-box">
          <p className = "fs-24">Add the trip's details</p>
          <div className = "special-box add-trip-box">
            <div>
              <label>Trip Name</label>
              <input
              className = "trip-name-input"
              value = {name}
              onChange = {(e) => setName(e.target.value)}
              placeholder = "Example: Sunset"></input>
            </div>
            <div className = "mt-15">
              <label>Start Date</label>
              <input
              className = "trip-name-input"
              value = {startDate}
              onChange = {(e) => setStartDate(e.target.value)}
              type = "date"></input>
            </div>
            <div className = "mt-15">
              <label>Price</label>
              <input
              className = "trip-name-input"
              type = "number"
              value = {price}
              onChange = {(e) => setPrice(e.target.value)}
              placeholder = "Example: 350$"></input>
            </div>
            <div className = "mt-15 capacity-div">
              <label>Capacity</label>
              <button onClick = {handleLeft} className = "bt mr-10">
                <i className = "fa-solid fa-arrow-down"></i>
              </button>
              <div className = "group">
                {capacity}
              </div>
              <button onClick = {handleRight} className="bt ml-10">
                <i className ="fa-solid fa-arrow-up"></i>
              </button>
            </div>
            <div className = "div-select mt-15 position-relative">
              <label htmlFor = "destination" className = "fw-500">Destination</label>
              <div className="d-flex align-c">
              <select
                onChange={handleSelectDestination}
                className="cursor-p fs-15"
                value={destinationId || ""}
              >
                <option value="" disabled>
                  Select Destination
                </option>
                {showDestinationsNames}
              </select>
              <i className = "fa-solid fa-chevron-down arrow-select position-relative cursor-p"></i>
              </div>
            </div>
            <div className = "mt-15 main-description">
              <label>Description</label>
              <textarea
              value = {description}
              onChange = {(e) => setDescription(e.target.value)}
              placeholder = "Explain More About The Trip"></textarea>
            </div>
          </div>
          <div className = "special-box images-card">
              <h3 className = "fw-500 mb-20 mt-10 fs-16 ml-15">Upload Destination's Photos</h3>
              <input
                ref = {openImage}
                hidden
                type = "file"
                onChange = {(e) => setImages([...e.target.files])}
                multiple />
              <div className = "cards-input" onClick= {handleOpenImage}>
                <i className ="fa-solid fa-cloud-arrow-up upload-icon"></i>
                <p className="">Upload Images</p>
              </div>
              <div className = "images-container">{imagesShow}</div> 
            </div>
            <p className = "fs-24">What's included in the trip?</p>
            <div className = "special-box features-box">
              <div>
                <span className = "position-relative fs-20">Meals:</span>
                <ul>
                  {/* {showMealsFeatures} */}
                  <li className = "mb-10">
                    <input checked type = "checkbox" className = "checkbox-special"/>
                    <label className = "checkbox-label cursor-p position-relative">Breakfast</label>
                  </li>
                  <li className = "mb-10">
                    <input type = "checkbox" className = "checkbox-special"/>
                    <label className = "checkbox-label cursor-p position-relative">Lunch</label>
                  </li>
                  <li className = "mb-10">
                    <input type = "checkbox" className = "checkbox-special"/>
                    <label className = "checkbox-label cursor-p position-relative">Dinner</label>
                  </li>
                  <li className = "mb-10">
                    <input type = "checkbox" className = "checkbox-special"/>
                    <label className = "checkbox-label cursor-p position-relative">Snacks</label>
                  </li>
                </ul>
              </div>
              <div>
                <span className = "position-relative fs-20">Transporting</span>
                <ul>
                  {/* {showTransportingFeatures} */}
                  <li className = "mb-10">
                    <input checked type = "checkbox" className = "checkbox-special"/>
                    <label className = "checkbox-label cursor-p position-relative">Transporting</label>
                  </li>
                  <li className = "mb-10">
                    <input type = "checkbox" className = "checkbox-special"/>
                    <label className = "checkbox-label cursor-p position-relative">Airport/Station Transfer</label>
                  </li>
                </ul>
              </div>
              <div>
                <span className = "position-relative fs-20">Fees:</span>
                <ul>
                  {/* {showFeesFeatures} */}
                  <li className = "mb-10">
                    <input type = "checkbox" className = "checkbox-special"/>
                    <label className = "checkbox-label cursor-p position-relative">Taxes And Fees</label>
                  </li>
                  <li className = "mb-10">
                    <input type = "checkbox" className = "checkbox-special"/>
                    <label className = "checkbox-label cursor-p position-relative">Free Transporting</label>
                  </li>
                  <li className = "mb-10">
                    <input checked type = "checkbox" className = "checkbox-special"/>
                    <label className = "checkbox-label cursor-p position-relative">Entrance Fees to Attractions</label>
                  </li>
                </ul>
              </div>
              <div>
                <span className = "position-relative fs-20">Services:</span>
                <ul>
                  {/* {showServicesFeatures} */}
                  <li className = "mb-15">
                    <input type = "checkbox" className = "checkbox-special"/>
                    <label className = "checkbox-label cursor-p position-relative">Tour Guide</label>
                  </li>
                  <li className = "mb-15">
                    <input checked type = "checkbox" className = "checkbox-special"/>
                    <label className = "checkbox-label cursor-p position-relative">Air Conditioning</label>
                  </li>
                  <li className = "mb-15">
                    <input checked type = "checkbox" className = "checkbox-special"/>
                    <label className = "checkbox-label cursor-p position-relative">Free Wi-Fi</label>
                  </li>
                  <li className = "mb-15">
                    <input type = "checkbox" className = "checkbox-special"/>
                    <label className = "checkbox-label cursor-p position-relative">Luggage Storage</label>
                  </li>
                  <li className = "mb-15">
                    <input type = "checkbox" className = "checkbox-special"/>
                    <label className = "checkbox-label cursor-p position-relative">Travel Documentation Assisance</label>
                  </li>
                </ul>
              </div>
              <div>
                <span className = "position-relative fs-20">Activities</span>
                <ul>
                  {/* {showActivitiesFeatures} */}
                  <li className = "mb-15">
                    <input type = "checkbox" className = "checkbox-special"/>
                    <label className = "checkbox-label cursor-p position-relative">Activity Equipment</label>
                  </li>
                  <li className = "mb-15">
                    <input checked type = "checkbox" className = "checkbox-special"/>
                    <label className = "checkbox-label cursor-p position-relative">Family Friendly Activities</label>
                  </li>
                  <li className = "mb-15">
                    <input type = "checkbox" className = "checkbox-special"/>
                    <label className = "checkbox-label cursor-p position-relative">Photo/Video Package</label>
                  </li>
                </ul>
              </div>
            </div>
            <p className = "fs-24">Where is the meeting point?</p>
            <p className = "fs-24">Edit trip's notes:</p>
            <div className = "special-box meeting-box">
              <p className = "mb-10">Here is the meeting point where all the travels should meet at.</p>
              <p>So, be careful when you adding this information</p>
              <textarea
              value = {meeting}
              onChange = {(e) => setMeeting(e.target.value)}
              />
            </div>
            <div className = "special-box cancellation-box">
              <h3 className = "fw-600">Cancellation</h3>
              <p className = "ml-25 mt-5 position-relative">Up to
                <div className="mt-15 mb-15">
                <button onClick = {handleLeftHours} className = "bt ml-10">
                  <i className = "fa-solid fa-arrow-down"></i>
                </button>
                <div className = "cancellation-hours">
                  {cancellationHours}
                </div>
                <button onClick = {handleRightHours} className = "bt mr-10">
                  <i className ="fa-solid fa-arrow-up"></i>
                </button>
                </div>
                hour(s) before the trip's start time.
              </p>
              <p className = "ml-25 mt-15 position-relative">
                this trip requires a minimum number of travelers. If it's canceled because the minimum
                isn't met, you'll be offered a different date/trip or a aull refuned.
              </p>
              <h3 className = "mb-10 mt-20 fw-600">Traveler Information</h3>
              <p className = "ml-25 position-relative">Adult Age: 15 - 60</p>
              <p className = "ml-25 position-relative">Child Age: 5 - 14</p>
            </div>
            <p className = "fs-24 span-2 mb-20">Itinerary of the trip</p>
        </div>
      <div>
      {days.map((day, dayIndex) => (
        <div className="day-box" key={dayIndex}>
          <div className = "d-flex">
            <p className="fs-24 fw-bold">Day {dayIndex + 1}</p>
            <button className = "delete-event" onClick={() => handleDeleteDay(dayIndex)}>
              <i className="fa-regular fa-trash-can"></i>
            </button>
          </div>
          <button onClick={() => handleAddEvent(dayIndex)}>Add Event</button>
          {day.map((event, eventIndex) => (
            <div className = "event-box" key={eventIndex}>
              <div>
              <h3 className = "fw-600">Event {eventIndex + 1}:</h3>
              <button className = "delete-event" onClick={() => handleDeleteEvent(dayIndex, eventIndex)}>
                <i className = "fa-regular fa-trash-can"></i>
              </button>
              </div>
              <div>
                <label>Action:</label>
                <input
                  placeholder="Action"
                  type="text"
                  value = {event.action}
                  onChange={(e) => handleEventChange(dayIndex, eventIndex, 'action', e.target.value)}
                />
              </div>
              <div>
                <label>Title</label>
                <input
                  placeholder="Title"
                  className="title-input"
                  value={event.title}
                  onChange={(e) => handleEventChange(dayIndex, eventIndex, 'title', e.target.value)}
                />
                <span>Or</span>
              </div>
              <div>
                <label className = "label-type position-relative">Attraction:</label>
                <select
                  className = "ml-15 cursor-p"
                  value={event.attraction_id || ""}
                  onChange = {(e) => handleEventChange(dayIndex, eventIndex, 'attraction_id', e.target.value)}
                >
                <option value = "" disabled>
                  Select attraction
                </option>
                  {showAttrationsNames}
                </select>
              </div>
              <div>
                <label>Start Date:</label>
                <input
                  type="date"
                  value={event.start_date}
                  onChange={(e) => handleEventChange(dayIndex, eventIndex, 'start_date', e.target.value)}
                />
              </div>
              <div>
                <label>Duration:</label>
                <input
                  placeholder = "Duration Of The Trip"
                  type="text"
                  value = {event.duration}
                  onChange={(e) => handleEventChange(dayIndex, eventIndex, 'duration', e.target.value)}
                />
              </div>
              <div>
                <label>Description:</label>
                <textarea
                  className = "ml-15"
                  placeholder="Add Some Words About The Trip."
                  value={event.description}
                  onChange={(e) => handleEventChange(dayIndex, eventIndex, 'description', e.target.value)}
                />
              </div>
              <div>
                <label className = "label-type position-relative">Type:</label>
                <select
                  className = "cursor-p ml-15 optional-select"
                  value = {event.type || ""}
                  onChange = {(e) => handleEventChange(dayIndex, eventIndex, 'type', e.target.value)}
                >
                  <option value = "" disabled>
                    Select Type
                  </option>
                  <option value="Optional">Optional</option>
                  <option value="Mandatory">Mandatory</option>
                </select>
              </div>
              <div>
                <label className = "event-price-label">Price of Adult:</label>
                <input
                  className = "input-price"
                  type = "number"
                  value = {event.price_adult || ''}
                  onChange = {(e) => handleEventChange(dayIndex, eventIndex, 'price_adult', e.target.value)}
                />
                <span className = "ml-10 dollar-sign">$</span>
              </div>
              <div>
                <label className = "event-price-label">Price of Child:</label>
                <input
                  className = "input-price"
                  type = "number"
                  value = {event.price_child || ''}
                  onChange = {(e) => handleEventChange(dayIndex, eventIndex, 'price_child', e.target.value)}
                />
                <span className = "ml-10 dollar-sign">$</span>
              </div>
              <div>
                <label>Additional Notes:</label>
                <textarea
                  className = "ml-15"
                  placeholder = "Additional Notes"
                  value = {event.additional_note}
                  onChange = {(e) => handleEventChange(dayIndex, eventIndex, 'additional_note', e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      ))}
      <div className = "mb-50 d-flex buttons">
      <button onClick = {addTripDetails} className = "add-trip-bt">Save Trip Details</button>
      <button className = "add-trip-bt" onClick={handleAddDay}>Add Day</button>
      </div>
    </div>
      <button
        onClick={addTrip}
        className={`add-trip-bt ${!isDetailsSaved ? 'disabled' : ''}`}
        disabled={!isDetailsSaved}
      >
        Add Trip
      </button>
      </div>
    </>
  );
}