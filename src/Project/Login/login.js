import "./login.css";
import axios from "axios";
import { useRef } from "react";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { admindetails } from "../Redux/reducer";

function Login() {
    const { login } = useParams();
    const Navigate = useNavigate();
    const dispatch=useDispatch();
    const inputRef = useRef();
    const [data, setData] = useState({ name: "", pass: "" });
    const [namechk, setNameclk] = useState(false);
    const [passchk, setPasschk] = useState(false);
    const [alert, setAlert] = useState(false);
    const [eye, setEye] = useState(false);
    function check(e) {
        let { name, value } = e.target;
        if (value.trim().length !== 0) {
            (name === "name") ? setNameclk(false) : setPasschk(false);
            setAlert(false)
        }
        name === "pass" && (value = value.substring(8) + value.substring(4, 8) + value.substring(0, 4));
        setData((pre) => ({
            ...pre,
            [name]: value
        }))
    }
    function validate() {
        data.name.trim().length === 0 ? setNameclk(true) : setNameclk(false);
        data.pass.trim().length === 0 ? setPasschk(true) : setPasschk(false);
        axios.get(`http://localhost:3000/${login}`, { headers: { Authorization: 'Basic U2FtOjIwNTY=' } })
            .then((res) => {
                res.data.map(e => {
                    if (e.name === data.name && e.pass === data.pass) {
                        Navigate(`/${login}page/${e.name}`);
                        localStorage.setItem("name",JSON.stringify(data.name));
                    }
                    else {
                        if (data.name.trim().length !== 0 && data.pass.trim().length !== 0) {
                            setAlert(true);
                            setData({ name: "", pass: "" })
                        }
                    }
                    return true
                })
            })
            .catch((err) => console.log(err))
    }
    const element = inputRef.current;
    function toggle() {
        (element.type === "password" && !eye) ? element.setAttribute("type", "text") : element.setAttribute("type", "password")
        eye ? setEye(false) : setEye(true)
    }
    return <div className="view">
        <div className="wrap">
            <h1>{login} Login</h1>
            <p>Your Name</p>
            <input className="intname" value={data.name} onChange={check} name="name" />
            {namechk && <small className="check1">Enter a valid name</small>}
            <p>Password</p><div className="i1">i</div><p className="info">Pass is your D.O.B</p>
            <input className="date" value={data.pass} type="password" ref={inputRef} readOnly />
            <input className="calender" type="date" onChange={check} name="pass" />
            {eye ? <FaEye className="eye" onClick={toggle} /> : <FaEyeSlash className="eye" onClick={toggle} />}
            {passchk && <small className="check2">Enter your password</small>}
            {alert && <p className="logsmall" >***Invalid Data entry***</p>}
            <p></p>
            <button onClick={validate}>Submit</button>
        </div>
    </div>
}
export default Login