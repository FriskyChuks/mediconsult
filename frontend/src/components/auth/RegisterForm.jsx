import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import axios from "axios";
import { Spinner } from "../layouts/Spinner";

import { useMessage } from "../contexts/MessageContext";

export default function RegisterForm({ baseURL , loading, setLoading}) {
  const navigate = useNavigate();
  const { showMessage } = useMessage();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const confirmPasswordRef = useRef(null);

  const p = document.getElementById("password_check");
  const pp = document.getElementById("confirm_password");
  const confirmpasswordInput = document.getElementById("confirmpasswordInput");

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    if (password < 8) {
      confirmpasswordInput.disabled = true;
    } else if (e.target.value === password) {
      confirmPasswordRef.current.style.setProperty(
        "background-color",
        "green",
        "important"
      );
      pp.textContent = "You are correct";
    } else {
      confirmPasswordRef.current.style.setProperty(
        "background-color",
        "white",
        "important"
      );
      pp.textContent = "You are wrong";
    }
  };

  const handlePasswordCheck = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 8) {
      p.textContent = "Password must not be less than 8 characters";
      p.style.color = "red";
      p.style.backgroundColor = "white";
    } else {
      p.textContent = "Good Password ✔";
      p.style.color = "green";
      p.style.backgroundColor = "white";
      confirmpasswordInput.disabled = false;
    }
  };

  const user = {firstname: firstname,lastname: lastname,email: email,phone: phone,
                password: password,re_password: confirmPassword};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    // Verify email and password
    await axios.get(`${baseURL}/accounts/get_user/${email}/${phone}/`)
      .then((res)=>{
        if(res.data[0].email===email){
          showMessage("A User with this Email already exists!", 'error')
          setLoading(false)
        } else if(res.data[0].phone===phone){
          showMessage("This Phone Number has already been used by another User!", 'error')
          setLoading(false)
        }
      }).finally( async()=>{
        // Create User
        try {
          await axios.post(`${baseURL}/auth/users/`,user).then(()=>{
            showMessage("Registration Successful, check your mail for activation", 'success')
            setLoading(false)
            navigate('/login')
          })
        } catch (err) {
          showMessage("There was an error creating your record", 'error')
          setLoading(false)
        }
      })
  };

  return (
    <>
      <div className="container-fluid booking">
        <div className="container py-5">
          <div className="row g-5 align-items-center">
            <div className="col-lg-12">
              <h1 className="text-white text-center mx-auto mb-3 p-2">
                Register with us
              </h1>
              <h3 style={{color:"red"}}> {showMessage} </h3>
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text" required={true}
                        className="form-control bg-white border-0"
                        id="firstname" placeholder="Your Firstname"
                        value={firstname}
                        onChange={(e) =>setFirstname(e.target.value)}
                      />
                      <label>Enter Firstname</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text" required={true}
                        className="form-control bg-white border-0"
                        id="lastname" placeholder="Your Lastname"
                        value={lastname}
                        onChange={(e) =>setLastname(e.target.value)}
                      />
                      <label>Enter Lastname</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div
                      className="form-floating date"
                      id="address" 
                      data-target-input="nearest"
                    >
                      <input
                        type="email" required={true}
                        className="form-control bg-white border-0"
                        id="email"
                        placeholder="Your Email Address"
                        data-target="email address"
                        value={email}
                        onChange={e=>setEmail(e.target.value)}
                      />
                      <label>Enter Email Address</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div
                      className="form-floating"
                      id="phone" 
                      data-target-input="nearest"
                    >
                      <input
                        type="number"
                        className="form-control bg-white border-0"
                        id="phone" required={true}
                        placeholder="Your phone number"
                        data-target="phone"
                        value={phone}
                        onChange={(e) =>setPhone(e.target.value)}
                      />
                      <label>Enter Phone number</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating date">
                      <input
                        type="password" required={true}
                        className="form-control bg-white border-0"
                        id="passwordInput"
                        placeholder="Enter your password"
                        data-target="password"
                        onChange={handlePasswordCheck}
                        value={password}
                      />
                      <label>Enter Password</label>
                    </div>
                    <p id="password_check"></p>
                  </div>
                  <div className="col-md-6">
                    <div
                      className="form-floating date"
                      id="date3"
                      data-target-input="nearest"
                    >
                      <input
                        type="password" required={true}
                        className="form-control bg-white border-0"
                        id="confirmpasswordInput"
                        placeholder="Confirm your password"
                        onChange={handleConfirmPassword}
                        value={confirmPassword}
                        ref={confirmPasswordRef}
                        name="confirmPassword"
                        disabled
                      />
                      <label>Confirm Password</label>
                    </div>
                    <p id="confirm_password"></p>
                  </div>
                  {/* <div className="col-md-6">
                                    <div className="form-floating">
                                        <select className="form-select bg-white border-0" id="select1">
                                            <option value="1">Destination 1</option>
                                            <option value="2">Destination 2</option>
                                            <option value="3">Destination 3</option>
                                        </select>
                                        <label>Destination</label>
                                    </div>
                                </div> */}
                  {/* <div className="col-12">
                                    <div className="form-floating">
                                        <textarea className="form-control bg-white border-0" placeholder="Special Request" id="message" style={{height: "100px"}}></textarea>
                                        <label>Special Request</label>
                                    </div>
                                </div> */}
                  <div className="col-12">
                    <button
                      className="btn btn-primary text-white w-100 py-3"
                      onClick={handleSubmit}
                    >
                      Register Now
                    </button>
                    {loading && <Spinner/>}
                  </div>
                  <div className="text-center">
                      <h6 className="text-white">Already registered? click &nbsp;
                        <Link className="text-white" to='/login'>here to Login</Link>
                      </h6>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
