import { NavLink } from "react-router-dom";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { User } from "../Context";
import { dom } from "../dom";

export default function TransactionRequests() {
  const [requests, setRequests] = useState([]);
  const userInfo = useContext(User);
  const token = userInfo.auth.userAccessToken;
  const [runUseEffect, setRunUseEffect] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/web/charge_requests`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setRequests(res.data.data))
      .catch((err) => console.log(err));
  }, [runUseEffect]);

  async function handleApprove(id) {
    try {
      let res = await axios.get(`http://${dom}/web/approve_charge/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Done !");
      setRunUseEffect((prev) => prev + 1);
    } catch (err) {
      console.error("Error approving charge:", err);
    }
  }

  async function handleReject(id) {
    try {
      let res = await axios.get(`http://${dom}/web/reject_charge/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Done Rejected !");
      setRunUseEffect((prev) => prev + 1);
    } catch (err) {
      console.error("Error rejecting charge:", err);
    }
  }

  const showRequests = requests.map((request, index) => {
    return (
      <tr key={request.id}>
        <td>{index + 1}</td>
        <td>{request.User.username}</td>
        <td>{request.amount}</td>
        <td>
            <i onClick={() => setSelectedImage(request.bank_ticket)} className = "fa-solid fa-eye table-icon"></i>
        </td>
        <td>{request.createdAt.slice(0, 10)}</td>
        <td className="only-this">
          <div className="d-flex justify-sb">
            <span onClick={() => handleApprove(request.id)}>Accept</span>
            <span onClick={() => handleReject(request.id)}>Refuse</span>
          </div>
        </td>
      </tr>
    );
  });

  return (
    <>
      <Header />
      <Sidebar number={8} />
      <div className="content nav-item-content">
        <div className="d-flex align-c">
          <NavLink to="/transactions">
            <i className="fa-solid fa-angle-left arrow-left position-absolute"></i>
          </NavLink>
          <h1 className="special-head ml-25">Transactions Requests</h1>
        </div>
        <table className="special-table transaction-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Transactions Amount</th>
              <th>Receipt</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* {showRequests} */}
            <tr>
              <td>3</td>
              <td>Mona</td>
              <td>1500</td>
              <td>
                <i className = "fa-solid fa-eye table-icon"></i>
              </td>
              <td>18/8/2024</td>
              <td className="only-this">
                <div className="d-flex justify-sb">
                  <span>Accept</span>
                  <span>Refuse</span>
                </div>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Mohanad</td>
              <td>2000</td>
              <td>
                <i className = "fa-solid fa-eye table-icon"></i>
              </td>
              <td>19/8/2024</td>
              <td className="only-this">
                <div className="d-flex justify-sb">
                  <span>Accept</span>
                  <span>Refuse</span>
                </div>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Ramy</td>
              <td>3500</td>
              <td>
                <i className = "fa-solid fa-eye table-icon"></i>
              </td>
              <td>18/8/2024</td>
              <td className="only-this">
                <div className="d-flex justify-sb">
                  <span>Accept</span>
                  <span>Refuse</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        {/* {selectedImage && (
          <div className="modal" onClick={() => setSelectedImage(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <span className="close" onClick={() => setSelectedImage(null)}>
                &times;
              </span>
              <img src={selectedImage} alt="Bank Ticket" />
            </div>
          </div>
        )} */}
      </div>
    </>
  );
}
