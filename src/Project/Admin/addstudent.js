import "./addstudent.css";
import axios from "axios";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";

function Addstudent() {
    const { name } = useParams();
    const [data, setData] = useState({ name: "", class: "", age: "", bloodgroup: "", gender: "", pass: "", fname: "", mname: "", email: "", fphn: "", mphn: "", address: "", foccup: "", moccup: "" });
    const [pop, setPop] = useState(false);
    const [alert, setAlert] = useState(false);
    const [email, setEmail] = useState(false);
    const [fphn,setFphn]=useState(false);
    const [mphn,setMphn]=useState(false);
    function insert(e) {
        const { name, value } = e.target;
        setData((pre) => (
            { ...pre, [name]: value }
        ))
        if (name == "email") {
            let mailCheck = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            (mailCheck.test(value) || value === "") ? setEmail(false) : setEmail(true);
        }
        else if(name=="fphn"){
            value.trim().length<10?setFphn(true):setFphn(false)
        }
        else{
            value.trim().length<10?setMphn(true):setMphn(false)
        }
    }
    function submit() {
        let inputArr = document.querySelectorAll("input");
        let check = [];
        inputArr.forEach(e => check.push(e.value.trim().length == 0))
        console.log(inputArr,check)
        if (check.some(e => e === true)) setAlert(true)
        else {
            data.pass = data.pass.substring(8) + data.pass.substring(4, 8) + data.pass.substring(0, 4);
            axios.post("http://localhost:3000/Student", data,{ headers: { Authorization: 'Basic U2FtOjIwNTY=' } })
                .then(res => console.log(res.data))
                .catch(err => console.log(err.message))
            setData({ name: "", class: "", age: "", bloodgroup: "", gender: "", pass: "", fname: "", mname: "", email: "", fphn: "", mphn: "", address: "", foccup: "", moccup: "" })
            setPop(true)
        }
    }
    pop && setTimeout(() => {
        setPop(false)
    }, 1500)
    return <div className="outer"><div className="Addstudent"><h2 className="h">Add Student</h2><Link to={`/Adminpage/${name}`}><FaArrowLeft />Back</Link>
        <p>Name</p>
        <p>Class</p>
        <p>Age</p>
        <input value={data.name} onChange={insert} name="name" />
        <select value={data.class} onChange={insert} name="class">
            <option>Select</option>
            <option>5-th</option>
            <option>6-th</option>
            <option>7-th</option>
            <option>8-th</option>
            <option>9-th</option>
            <option>10-th</option>
        </select>
        <input value={data.age} onChange={insert} name="age" type="number"/>
        <p>Blood Group</p>
        <p>Gender</p>
        <p>D.O.B</p>
        <input value={data.bloodgroup} onChange={insert} name="bloodgroup" />
        <select value={data.gender} onChange={insert} name="gender">
            <option>Select</option>
            <option>Male</option>
            <option>Female</option>
        </select>
        <input value={data.pass} type="date" onChange={insert} name="pass" />
        <h2 className="secondh2">Parent's Details</h2>
        <p>Father Name</p>
        <p>Mother Name</p>
        <p>Email</p>
        <input value={data.fname} onChange={insert} name="fname" />
        <input value={data.mname} onChange={insert} name="mname" />
        <input value={data.email} onChange={insert} name="email" />
        {email && <small className="small stuemail">Email should be valid</small>}
        <p>Father Phn.no</p>
        <p>Mother Phn.no</p>
        <p>Address</p>
        <input value={data.fphn} onChange={insert} name="fphn" type="number"/>
        {fphn&&<small className="small fphone">Enter valid phone Number</small>}
        <input value={data.mphn} onChange={insert} name="mphn" type="number"/>
        {mphn&&<small className="small mphone">Enter valid phone Number</small>}
        <input value={data.address} onChange={insert} name="address" />
        <p className="phn">Father Occupation</p>
        <p className="phn">Mother Occupation</p>
        <input className="phn" value={data.foccup} onChange={insert} name="foccup" />
        <input className="phn" value={data.moccup} onChange={insert} name="moccup" />
        <div className="btn"><button onClick={submit}>Submit</button></div>
        {pop && <div className="popup">Student Details Added Successfully !</div>}
        {alert && <div className="alert"><div>Please fill all the details<span onClick={() => setAlert(false)}>X</span></div></div>}
    </div>
    </div>
}
export default Addstudent