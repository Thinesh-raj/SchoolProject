import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6"
import "./update.css"

function UpdateTeacher() {
  const { id } = useParams();
  const { name } = useParams();
  const [data, setData] = useState({});
  const Navigate = useNavigate();
  const [alert, setAlert] = useState(false);
  const [pop, setPop] = useState(false);
  useEffect(() => {
    axios.get("http://localhost:3000/Teacher/" + id, { headers: { Authorization: 'Basic U2FtOjIwNTY=' } })
      .then(res => setData(res.data.find(e => e.id == id)))
      .catch(err => console.log(err.message))
  }, [id])
  function submit(id) {
    let inputArr = document.querySelectorAll("input");
    let check = [];
    inputArr.forEach(e => check.push(e.value.trim().length == 0))
    console.log(inputArr, check)
    if (check.some(e => e === true)) setAlert(true)
    else {
      data.pass = data.pass.substring(8) + data.pass.substring(4, 8) + data.pass.substring(0, 4);
      axios.put(`http://localhost:3000/Teacher/${parseInt(id)}`, data, { headers: { Authorization: 'Basic U2FtOjIwNTY=' } })
        .then(res => console.log(res.data))
        .catch(err => console.log(err.message))
      setPop(true)
    }
  }
  pop && setTimeout(() => {
    setPop(false)
    Navigate(`/adminpage/${name}`)
  }, 1500)
  return <div className="uptcover">
    <div className="update">
      <h1>Update Details</h1>
      <Link to={`/adminpage/${name}`} className="arrback"><FaArrowLeft />Back</Link>
      <p className="one-p">Name</p>
      <p className="one-p">Age</p>
      <p className="one-p">D.O.B</p>
      <input className="onebox" value={data.name} onChange={(e) => setData({ ...data, "name": e.target.value })} />
      <input className="onebox" value={data.age} onChange={(e) => setData({ ...data, "age": e.target.value })} type="number" />
      <input className="onebox" value={data.pass} type="date" onChange={(e) => setData({ ...data, "pass": e.target.value })} />
      <p className="two-p">Gender</p>
      <p className="two-p">Class Teacher</p>
      <p className="one-p" >Class</p>
      <select className="twoboxs" value={data.gender} onChange={(e) => setData({ ...data, "gender": e.target.value })}><option>Select</option><option>Male</option><option>Female</option></select>
      <select className="twoboxs" value={data.classteacher} onChange={(e) => setData({ ...data, "classteacher": e.target.value })}><option>Select</option><option>Yes</option><option>No</option></select>
      <select className="twoboxs" value={data.class} onChange={(e) => setData({ ...data, "class": e.target.value })}>
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
      <input value={data.experience} onChange={(e) => setData({ ...data, "experience": e.target.value })} type="number" />
      <input value={data.qualification} onChange={(e) => setData({ ...data, "qualification": e.target.value })} />
      <p>Major</p>
      <p>Mobile.No</p>
      <input value={data.major} onChange={(e) => setData({ ...data, "major": e.target.value })} />
      <input value={data.phn} onChange={(e) => setData({ ...data, "phn": e.target.value })} type="number" />
      <p>Email</p>
      <p>Address</p>
      <input value={data.email} onChange={(e) => setData({ ...data, "email": e.target.value })} />
      <input value={data.address} onChange={(e) => setData({ ...data, "address": e.target.value })} />
      <div className="btn"><button onClick={(e) => submit(data.id)}>Submit</button></div>
      {pop && <div className="popup">Teacher Details updated Successfully !</div>}
      {alert && <div className="alert"><div>Please fill all the details<span onClick={() => setAlert(false)}>X</span></div></div>}
    </div>
  </div>
}
export default UpdateTeacher