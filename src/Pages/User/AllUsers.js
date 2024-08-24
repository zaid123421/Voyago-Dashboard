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
    axios.get(`http://${dom}/web/users`, )
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
    let res = await axios.delete(`http://${dom}/web/delete_user/${id}`,);
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
        <div className = "d-flex">
        <h1 className = "special-head">Users</h1>
          <div className = "d-flex align-c ml-50">
            <label htmlFor="search">
              <i className="search-icon fa-solid fa-magnifying-glass" ></i>
            </label>
            <input
              id = "search"
              className = "special-search"
              placeholder = "Search"
              onChange = {handleSearch}
            />
          </div>
        </div>
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
          </tbody>
        </table>
        <NavLink className = "floating-button" to = "/adduser">
          +
        </NavLink>
      </div>
    </>
  );
}