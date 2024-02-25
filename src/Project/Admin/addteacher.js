import "./addteacher.css";
import axios from "axios";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
function Addteacher() {
    const { name } = useParams();
    const [data, setData] = useState({ name: "", age: "", gender: "", pass: "", classteacher: "", class: "", experience: "", qualification: "", major: "", phn: "", email: "", address: "" });
    const [pop, setPop] = useState(false);
    const [alert, setAlert] = useState(false);
    const [email, setEmail] = useState(false);
    const [phn,setPhn]=useState(false);
    function insert(e) {
        const { name, value } = e.target;
        setData((pre) => (
            {
                ...pre,
                [name]: value
            }
        ))
        if (name == "email") {
            let mailCheck = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            (mailCheck.test(value) || value === "") ? setEmail(false) : setEmail(true);
        }
        else if(name=="phn"){
            value.trim().length<10?setPhn(true):setPhn(false)
        }
    }
    function submit() {
        let inputArr = document.querySelectorAll("input");
        let check = [];
        inputArr.forEach(e => check.push(e.value.trim().length == 0))
        if (check.some(e => e === true)) {
            setAlert(true)
        }
        else {
            data.pass = data.pass.substring(8) + data.pass.substring(4, 8) + data.pass.substring(0, 4);
            axios.post("http://localhost:3000/Teacher", data, { headers: { Authorization: 'Basic U2FtOjIwNTY=' } })
                .then(res => console.log(res.data))
                .catch(err => console.log(err.message))
            setData({ name: "", age: "", gender: "", pass: "", classteacher: "", class: "", experience: "", qualification: "", major: "", phn: "", email: "", address: "" })
            setPop(true)
        }
    }
    pop && setTimeout(() => {
        setPop(false)
    }, 1500)
    return <div className="outertech"><div className="Addteacher"><h2 className="h">Add Teacher</h2><Link to={`/Adminpage/${name}`}><FaArrowLeft />Back</Link>
        <p className="one-p">Name</p>
        <p className="one-p">Age</p>
        <p className="one-p">D.O.B</p>
        <input className="onebox" value={data.name} onChange={insert} name="name" />
        <input className="onebox" value={data.age} onChange={insert} name="age" type="number" />
        <input className="onebox" value={data.pass} type="date" onChange={insert} name="pass" />
        <p className="two-p">Gender</p>
        <p className="two-p">Class Teacher</p>
        <p className="one-p" >Class</p>
        <select className="twoboxs" value={data.gender} onChange={insert} name="gender">
            <option>Select</option>
            <option>Male</option>
            <option>Female</option>
        </select>
        <select className="twoboxs" value={data.classteacher} onChange={insert} name="classteacher">
            <option>Select</option>
            <option>Yes</option>
            <option>No</option>
        </select>
        <select className="twoboxs" value={data.class} onChange={insert} name="class">
            <option>Select</option>
            <option>5-th</option>
            <option>6-th</option>
            <option>7-th</option>
            <option>8-th</option>
            <option>9-th</option>
            <option>10-th</option>
            <option>Nil</option>
        </select>
        <p>Experience</p>
        <p>Qualification</p>
        <input value={data.experience} onChange={insert} name="experience" type="number" />
        <input value={data.qualification} onChange={insert} name="qualification" />
        <p>Major</p>
        <p>Mobile.No</p>
        <input value={data.major} onChange={insert} name="major" />
        <input value={data.phn} onChange={insert} name="phn" type="number" />
        {phn&&<small className="small phone">Enter valid phone Number</small>}
        <p>Email</p>
        <p>Address</p>
        <input value={data.email} onChange={insert} name="email" />
        {email && <small className="small">Email should be valid</small>}
        <input value={data.address} onChange={insert} name="address" />
        <div className="btn"><button onClick={submit}>Submit</button></div>
        {pop && <div className="popup">Student Details Added Successfully !</div>}
        {alert && <div className="alert"><div>Please fill all the details<span onClick={() => setAlert(false)}>X</span></div></div>}
    </div>
    </div>
}
export default Addteacher