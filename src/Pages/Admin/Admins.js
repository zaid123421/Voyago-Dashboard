import axios from "axios";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import { dom } from "../dom";

export default function Admins() {
  const [admins, setAdmins] = useState([]);
  const [runUseEffect, setRun] = useState(0);

  useEffect(() => {
    axios.get(`https://${dom}/web/admins`, )
    .then((data) => setAdmins(data.data.admins))
    .catch((err) => console.log(err));
  }, [runUseEffect])

  const showAdmins = admins.map((admin, index) =>
    <tr key = {index}>
      <td>{index < 9? `0${index + 1}` : index + 1}</td>
      <td>{admin.username}</td>
      <td>{admin.role}</td>
      <td><Link to = {`${admin.id}`}><i className = "fa-solid fa-eye table-icon"></i></Link></td>
      <td><i onClick = {() => deleteUser(admin.id)} className = "fa-regular fa-trash-can table-icon"></i></td>
    </tr>
)

async function deleteUser (id) {
  try{
    let res = await axios.delete(`https://${dom}/web/delete_admin/${id}`,);
    if(res.status === 200)
    setRun((prev) => prev + 1);
  }
  catch {
    console.log("There Is An Error In Delete");
  }
}

  return(
    <div className = "Admins-container">
      <Header />
      <Sidebar number = {2} />
      <div className = "content">
        <h1 className = "special-head">Admins</h1>
        <div className="table-container">
        <table className = "special-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Role</th>
              <th>Details</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* {showAdmins} */}
            <tr>
              <td>01</td>
              <td>Zaid</td>
              <td>Super Admin</td>
              <td><Link><i className = "fa-solid fa-eye table-icon"></i></Link></td>
              <td><i className = "fa-regular fa-trash-can table-icon"></i></td>
            </tr>
            <tr>
              <td>02</td>
              <td>Moamen</td>
              <td>Trips Organizer</td>
              <td><Link><i className = "fa-solid fa-eye table-icon"></i></Link></td>
              <td><i className = "fa-regular fa-trash-can table-icon"></i></td>
            </tr>
            <tr>
              <td>03</td>
              <td>Kamel</td>
              <td>Accounant</td>
              <td><Link><i className = "fa-solid fa-eye table-icon"></i></Link></td>
              <td><i className = "fa-regular fa-trash-can table-icon"></i></td>
            </tr>
          </tbody>
        </table>
        </div>
          <NavLink className = "floating-button" to = "/addadmin">
            +
          </NavLink>
      </div>
    </div>
  );
}