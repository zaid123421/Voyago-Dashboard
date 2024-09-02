import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import { dom } from "../dom";
import { User } from "../Context";

export default function Reservations(){
  
  const [reservations, setReservations] = useState([]);
  const [runUseEffect, setRun] = useState(0);
  const userInfo = useContext(User);
  const token = userInfo.auth.userAccessToken;

  useEffect(() => {
    axios.get(`https://${dom}/web/show_all_reservations`, {
      headers : {
        'Authorization': `Bearer ${token}`
      }
    }
    )
    .then((data) => setReservations(data.data.data))
    .catch((err) => console.log(err));
  }, [runUseEffect])


  const showReservations = reservations.map((reservation, index) =>
    <tr key = {index}>
      <td>{index < 9? `0${index + 1}` : index + 1}</td>
      <td>#{reservation.id}</td>
      <td>{reservation.User.username}</td>
      <td>{reservation.Trip.name}</td>
      <td>{(reservation.createdAt).slice(0, 10)}</td>
      <td><i onClick = {() => deleteReservation(reservation.id)} className = "fa-regular fa-trash-can table-icon"></i></td>
    </tr>
)

async function deleteReservation (id) {
  try{
    let res = await axios.delete(`https://${dom}/web/delete_reservation_by_id/${id}`, {
        headers : {
          'Authorization': `Bearer ${token}`
        }
      }
    );
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
      <Sidebar number = {7} />
      <div className = "content nav-item-content">
        <div className = "d-flex">
        <h1 className = "special-head">Reservations</h1>
        </div>
        <table className = "special-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Reservation ID</th>
              <th>Username</th>
              <th>Trip Name</th>
              <th>Reservation Date</th>
              <th>ِAction</th>
            </tr>
          </thead>
          <tbody>
            {showReservations}
            {/* <tr>
              <td>1</td>
              <td>#12</td>
              <td>Samer Mohammad</td>
              <td>3 days in mountains</td>
              <td>23/8/2024</td>
              <td><i className = "fa-regular fa-trash-can table-icon"></i></td>
            </tr>
            <tr>
              <td>2</td>
              <td>#13</td>
              <td>Ramez Mohsen</td>
              <td>Casablanca</td>
              <td>23/8/2024</td>
              <td><i className = "fa-regular fa-trash-can table-icon"></i></td>
            </tr>
            <tr>
              <td>2</td>
              <td>#14</td>
              <td>Ayman Alshamaa</td>
              <td>Casablanca</td>
              <td>23/8/2024</td>
              <td><i className = "fa-regular fa-trash-can table-icon"></i></td>
            </tr>
            <tr>
              <td>2</td>
              <td>#15</td>
              <td>Zaid Alshamaa</td>
              <td>Madrid</td>
              <td>23/8/2024</td>
              <td><i className = "fa-regular fa-trash-can table-icon"></i></td>
            </tr>
            <tr>
              <td>2</td>
              <td>#16</td>
              <td>Mohammad Alkhateb</td>
              <td>World Cup</td>
              <td>23/8/2024</td>
              <td><i className = "fa-regular fa-trash-can table-icon"></i></td>
            </tr>
            <tr>
              <td>2</td>
              <td>#17</td>
              <td>Monir Ahmad</td>
              <td>Santiago Beranbue</td>
              <td>23/8/2024</td>
              <td><i className = "fa-regular fa-trash-can table-icon"></i></td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </>
  );
}