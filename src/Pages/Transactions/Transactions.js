import { NavLink } from "react-router-dom";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { dom } from "../dom";
import { User } from "../Context";

export default function ShowAllTransactions() {
  const userInfo = useContext(User);
  const token = userInfo.auth.userAccessToken;
  const [transactions, setTransactions] = useState([{}]);

  useEffect(() => {
    axios.get(`https://localhost:3000/web/show_all_transactions`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then((response) => {
      setTransactions(response.data.data);
      console.log(response.data.data);
    })
    .catch((err) => console.log(err));
  }, [token]);

  const showTrans = transactions.map((transaction, index) => {
    const date = transaction.createdAt ? (transaction.createdAt).slice(0, 10) : 'N/A';
    const adminName = transaction.Admin ? transaction.Admin.username : '-';
    const username = transaction.wallet && transaction.wallet.User ? transaction.wallet.User.username : '';
    console.log(transaction);
    return (
      <tr key={index}>
        <td>{index < 9 ? `0${index + 1}` : index + 1}</td>
        <td>{adminName}</td>
        <td>{username}</td>
        <td>#{transaction.id}</td>
        <td><button className = "credit-bt">{transaction.type}</button></td>
        <td><button
          className = {transaction.status === "Success"
          ? "success"
          : transaction.status === "pending"
          ? "pending"
          : transaction.status === "Failed"
          ? "failed"
          : ''}>{transaction.status}</button></td>
        <td>{date}</td>
      </tr>
    );
  });

  return(
    <>
      <Header />
      <Sidebar number = {8} />
      <div className = "content nav-item-content">
        <div className = "d-flex align-c">
          <h1 className = "special-head mr-25">Transactions</h1>
          <NavLink className= "deposit" to = "/transactionrequests">Transactions Requests</NavLink>
        </div>
        <div className = "table-container">
        <table className = "special-table transaction-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Accountant</th>
                <th>Username</th>
                <th>Transaction ID</th>
                <th>Transaction Type</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {/* {showTrans} */}
              <tr>
                <td>1</td>
                <td>Ahmad Mohsen</td>
                <td>Mona</td>
                <td>#65</td>
                <td><button className = "credit-bt">Credit</button></td>
                <td><button className = "success">Success</button></td>
                <td>18/8/2024</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Samer Tr</td>
                <td>Hamza</td>
                <td>#66</td>
                <td><button className = "credit-bt">Credit</button></td>
                <td><button className = "failed">Failed</button></td>
                <td>18/8/2024</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Ahmad Mohsen</td>
                <td>Loujain</td>
                <td>#67</td>
                <td><button className = "credit-bt">Credit</button></td>
                <td><button className = "success">Success</button></td>
                <td>18/8/2024</td>
              </tr>
              <tr>
                <td>4</td>
                <td>-</td>
                <td>Mona</td>
                <td>#68</td>
                <td><button className = "credit-bt">Credit</button></td>
                <td><button className = "pending">Pending</button></td>
                <td>18/8/2024</td>
              </tr>
              <tr>
                <td>5</td>
                <td>-</td>
                <td>Mohanad</td>
                <td>#69</td>
                <td><button className = "credit-bt">Credit</button></td>
                <td><button className = "pending">Pending</button></td>
                <td>18/8/2024</td>
              </tr>
              <tr>
                <td>6</td>
                <td>-</td>
                <td>Ramy</td>
                <td>#70</td>
                <td><button className = "credit-bt">Credit</button></td>
                <td><button className = "pending">Pending</button></td>
                <td>18/8/2024</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}