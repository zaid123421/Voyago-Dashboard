import axios from "axios";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import { dom } from "../dom";

export default function Users() {
// useState
  const [users, setUsers] = useState([]);
  const [runUseEffect, setRun] = useState(0);
  const [search, setSearch] = useState('');

// useEffect
  useEffect(() => {
    axios.get(`https://${dom}/web/users`, )
    .then((data) => setUsers(data.data.users))
    .catch((err) => console.log(err));
  }, [runUseEffect])

// Handling Search
  function handleSearch(e) {
    setSearch(e.target.value)
  }

  const filteredData = users.filter((user) =>
    user.username.toLowerCase().startsWith(search)
  );

// Mapping
  const showUsers = filteredData.map((user, index) =>
    <tr key = {index}>
      <td>{index < 9? `0${index + 1}` : index + 1}</td>
      <td>{user.username}</td>
      <td>{user.balance}</td>
      <td><Link to = {`${user.id}`}><i className = "fa-solid fa-eye table-icon"></i></Link></td>
      <td><i onClick = {() => deleteUser(user.id)} className = "fa-regular fa-trash-can table-icon"></i></td>
    </tr>
)

// Delete User Function
async function deleteUser (id) {
  try{
    let res = await axios.delete(`https://${dom}/web/delete_user/${id}`,);
    if(res.status === 200)
    setRun((prev) => prev + 1);
  }
  catch {
    console.log("There Is An Error In Delete");
  }
}

  return(
    <>
      <Header />
      <Sidebar number = {3} />
      <div className = "content nav-item-content">
        <div className = "d-flex align-c">
        <h1 className = "special-head">Users</h1>
          <div className = "d-flex align-c ml-50 search-box">
            <label htmlFor="search">
              <i className="search-icon fa-solid fa-magnifying-glass position-relative" ></i>
            </label>
            <input
              id = "search"
              className = "special-search"
              placeholder = "Search"
              onChange = {handleSearch}
            />
          </div>
        </div>
        <div className="table-container">
        <table className = "special-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Balance</th>
              <th>Details</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {showUsers}
            <tr>
              <td>1</td>
              <td>Sameer</td>
              <td>1900</td>
              <td><i className = "fa-solid fa-eye table-icon"></i></td>
              <td><i className = "fa-regular fa-trash-can table-icon"></i></td>
            </tr>
            <tr>
              <td>2</td>
              <td>Mona</td>
              <td>1320</td>
              <td><i className = "fa-solid fa-eye table-icon"></i></td>
              <td><i className = "fa-regular fa-trash-can table-icon"></i></td>
            </tr>
            <tr>
              <td>3</td>
              <td>Loujain</td>
              <td>2160</td>
              <td><i className = "fa-solid fa-eye table-icon"></i></td>
              <td><i className = "fa-regular fa-trash-can table-icon"></i></td>
            </tr>
            <tr>
              <td>4</td>
              <td>Reem</td>
              <td>0</td>
              <td><i className = "fa-solid fa-eye table-icon"></i></td>
              <td><i className = "fa-regular fa-trash-can table-icon"></i></td>
            </tr>
            <tr>
              <td>5</td>
              <td>Jana</td>
              <td>0</td>
              <td><i className = "fa-solid fa-eye table-icon"></i></td>
              <td><i className = "fa-regular fa-trash-can table-icon"></i></td>
            </tr>
            <tr>
              <td>6</td>
              <td>Hamza</td>
              <td>540</td>
              <td><i className = "fa-solid fa-eye table-icon"></i></td>
              <td><i className = "fa-regular fa-trash-can table-icon"></i></td>
            </tr>
            <tr>
              <td>7</td>
              <td>Mohanad</td>
              <td>870</td>
              <td><i className = "fa-solid fa-eye table-icon"></i></td>
              <td><i className = "fa-regular fa-trash-can table-icon"></i></td>
            </tr>
            <tr>
              <td>8</td>
              <td>Ramy</td>
              <td>2500</td>
              <td><i className = "fa-solid fa-eye table-icon"></i></td>
              <td><i className = "fa-regular fa-trash-can table-icon"></i></td>
            </tr>
          </tbody>
        </table>
        </div>
        <NavLink className = "floating-button" to = "/adduser">
          +
        </NavLink>
      </div>
    </>
  );
}