import { useContext, useEffect, useState } from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import axios from "axios";
import { dom } from "./dom";
import { User } from "./Context";

export default function Requests() {
  const [run, setRun] = useState(1);
  const [requests, setRequests] = useState([]);
  const userInfo = useContext(User);
  const token = userInfo.auth.userAccessToken;
  useEffect(() => {
    axios.get(`https://${dom}/web/delete_profile_requests`, {
      headers : {
        'Authorization': `Bearer ${token}`
      }
    }
    )
    .then((data) => setRequests(data.data.data))
    .catch((err) => console.log(err));
  }, [run])

  const showRequests = requests.map((request, index) =>
    <tr key = {index}>
      <td>{index < 9? `0${index + 1}` : index + 1}</td>
      <td>#{request.id}</td>
      <td>{request.User.username}</td>
      <td>{request.User.wallet.balance}</td>
      <td>{(request.createdAt).slice(0, 10)}</td>
      <td><span onClick = {() => deleteRequest(request.id)} className = "delete-action">Accept</span></td>
    </tr>
)
async function deleteRequest (id) {
  try{
    let res = await axios.get(`https://${dom}/web/empty_then_delete/${id}`, {
        headers : {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    if(res.status === 200)
    setRun(run + 1);
  }
  catch {
    console.log("There Is An Error In Delete");
  }
}
  return(
    <>
      <Header />
      <Sidebar number = {9} />
      <div className = "content nav-item-content">
        <div className = "d-flex">
        <h1 className = "special-head">Delete Account Requests</h1>
        </div>
        <div className = "table-container">
          <table className = "special-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Request ID</th>
                <th>Username</th>
                <th>Balance</th>
                <th>Date</th>
                <th>ِAction</th>
              </tr>
            </thead>
            <tbody>
              {/* {showRequests} */}
              <tr>
                <td>01</td>
                <td>#23</td>
                <td>Sameer</td>
                <td>1900</td>
                <td>18/8/2024</td>
                <td><span className = "delete-action">Accept</span></td>
              </tr>
              <tr>
                <td>02</td>
                <td>#24</td>
                <td>Jana</td>
                <td>0</td>
                <td>16/8/2024</td>
                <td><span className = "delete-action">Accept</span></td>
              </tr>
              <tr>
                <td>03</td>
                <td>#25</td>
                <td>Reem</td>
                <td>0</td>
                <td>16/8/2024</td>
                <td><span className = "delete-action">Accept</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}