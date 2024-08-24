import { useNavigate } from 'react-router';
import forgot_password_img from '../images/forgot-password.png';


export default function Authorization () {

  const nav = useNavigate();

  function handleClick() {
    nav('/dashboard');
  }

  return(
    <>
      <div style={{
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "absolute",
        transform: "translate(-50%, -50%)",
        top: "50%",
        left: "50%",
        fontSize: "18px",
        }}>
        <img style={{width: "350px", marginBottom: "50px"}} alt = "No Permissions" src = {forgot_password_img}/>
        Sorry, You Don't Have Permissions To Access This Page
        <button onClick = {handleClick} className = 'special-button'>Go Back To Dashboard</button>
      </div>
    </>
  )
}