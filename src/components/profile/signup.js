import {useState} from "react";
import * as service
         from "../../services/auth-service";
import {useNavigate} from "react-router-dom";

const Signup = () => {
  const [newUser, setNewUser] = useState({});
  const navigate = useNavigate();
  const signup = () =>
    service.signup(newUser)
      .then(() => navigate('/profile'))
      .catch(e => alert(e));

  return (
    <div>
      <h1>Signup</h1>
      <input 
        className="m-1"
        placeholder="username"
        onChange={(e) =>
        setNewUser({...newUser,
          username: e.target.value})}/><br/>
      <input 
        className="m-1"
        placeholder="password"
        onChange={(e) =>
        setNewUser({...newUser,
          password: e.target.value})}/><br/>
      <input 
        className="m-1"
        placeholder="email"
        onChange={(e) =>
        setNewUser({...newUser,
          email: e.target.value})}/><br/>
      <button 
        className="m-1 btn btn-sm btn-primary"
        onClick={signup}>
        Signup</button>
    </div>
  );
}
export default Signup;