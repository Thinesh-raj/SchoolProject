import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./attendance.css"
import { FaArrowLeft } from "react-icons/fa6"
function Attendance() {
    const { name } = useParams();
    const { std } = useParams();
    const Navigate = useNavigate()
    const [data, setData] = useState([]);
    const ToDate = new Date().toLocaleDateString();
    const leave = { "classteacher": name, "date": ToDate, "std": std, "Attend": [] };

    useEffect(() => {
        axios.get(" http://localhost:3000/Student", { headers: { Authorization: 'Basic U2FtOjIwNTY=' } })
            .then(res => setData(res.data.filter(e => e.class == std)))
            .catch(err => console.log(err.message))
    }, [])

    data.map(e => { if (leave.Attend.length != data.length) leave.Attend.push({ "name": e.name, "present": "no", "date": ToDate }) })

    function check(student) {
        let obj = leave.Attend.find(e => e.name == student)
        obj.present = "yes";
    }

    function submit() {
        axios.post(" http://localhost:3000/Attendance", leave, { headers: { Authorization: 'Basic U2FtOjIwNTY=' } })
            .then(res => console.log(res.data))
            .catch(err => console.log(err.message))
        Navigate(`/Teacherpage/${name}`)
    }
    return <div className="outer">
        <div className="attendance">
            <p>Date : {ToDate}</p>
            <h1>{std} Attendance</h1>
            <Link className="backbtn" to={"/teacherpage/" + name}><FaArrowLeft />Back</Link>
            <table>
                <thead><tr>
                    <th>Name</th>
                    <th>Present</th>
                </tr></thead>
                {
                    data.map(e => {
                        return <tbody key={e.id}><tr>
                            <td>{e.name}</td>
                            <td><input type="radio" onChange={() => check(e.name)} /></td>
                        </tr></tbody>
                    })
                }
            </table>
            <button onClick={submit}>Submit</button>
        </div>
    </div>
}
export default Attendance