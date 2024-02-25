import "./teacher.css";
import axios from "axios";
import bg from "../Images/logo.png";
import { useEffect, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { Link, useNavigate, useParams } from "react-router-dom";
function Teacher() {
    const Navigate = useNavigate()
    const { teachername } = useParams();
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const [input, setInput] = useState(false);
    const [timetable, setTimetable] = useState([]);
    const [leave, setLeave] = useState({});
    const [popup, setPopup] = useState(false);
    const [attend, setAttend] = useState(false);
    const today = new Date();
    const Day = today.getDay();
    const date = today.toLocaleDateString();
    const inputRef = useRef();
    useEffect(() => {
        axios.get("http://localhost:3000/Teacher", { headers: { Authorization: 'Basic U2FtOjIwNTY=' } })
            .then(res => setData(res.data.find(e => (e.name === teachername))))
            .catch(err => console.log(err.message))
        axios.get("http://localhost:3000/Timetable", { headers: { Authorization: 'Basic U2FtOjIwNTY=' } })
            .then(res => setTimetable(res.data.find(e => e.name == teachername).Periods.find((e, index) => index == Day)))
            .catch(err => console.log(err.message))
        axios.get("  http://localhost:3000/Leave", { headers: { Authorization: 'Basic U2FtOjIwNTY=' } })
            .then(res => setLeave(res.data.filter(e => e.name == teachername)))
            .catch(err => console.log(err.message))
        axios.get(" http://localhost:3000/Attendance", { headers: { Authorization: 'Basic U2FtOjIwNTY=' } })
            .then(res => setAttend((res.data.find(e => e.date == date).Attend).some(e => e.present == "yes")))
            .catch(err => console.log(err.message))
            let item = localStorage.getItem("name")
            if (item.substring(1,item.length-1)!=teachername) Navigate("/page/Teacher")
    }, [setData, setTimetable, setLeave, teachername, Day, date])
    function insert(e) {
        const { name, value } = e.target;
        setData((pre) => (
            {
                ...pre,
                [name]: value
            }
        ))
    }
    function update(id) {
        axios.put(`http://localhost:3000/Teacher/${id}`, data, { headers: { Authorization: 'Basic U2FtOjIwNTY=' } })
            .then(res => console.log(res.data))
            .catch(err => console.log(err.message))
        setInput(false)
    }
    return <div className="outer">
        <div className="teacher">
            <div className="nav">
                <div className="mod_div">
                    <img src={bg} alt="404" />
                    <h1>Chettinad Rani Meyyammai Matric School</h1>
                </div>
                <div className="backdiv"> <Link className="back" to="/"><FaArrowLeft />Back</Link></div>
            </div>
            <h2>Hi,{teachername}</h2>
            {show ? <button className="outbtn" onClick={() => setShow(false)}>Check Out</button> : <button onClick={() => setShow(true)}>Check In</button>}
            {data.classteacher == "Yes" && ((Day!=0&&Day!=6)&&(attend ? <>
            <input type="checkbox" id="alert" />
            <label className="label" htmlFor="alert">Attendence</label>
            <div className="attend-alert">Attendance Taken</div></> : <Link to={`/Attendance/${data.name}/${data.class}`}>Attendence</Link>))}
            <input type="checkbox" id="check" />
            <label htmlFor="check">Leave</label>
            <div className="hide"><button onClick={() => Navigate("/applyleave/" + teachername)}>Apply leave</button><button onClick={() => { setPopup(!popup) }}>Approval</button></div>
            <h2 className="h2">Person Details</h2>
            <div><p>Name : {data.name}</p></div>
            <div><p>Age : {data.age}</p></div>
            <div><p>Gender : {data.gender}</p></div>
            <div><p>D.O.B : {data.pass}</p></div>
            <h2 className="h2">Professional info</h2>
            <div><p>Experience : {data.experience}</p></div>
            <div><p>Qualification : {data.qualification}</p></div>
            <div><p>Major : {data.major}</p></div>
            <div><p>Classteacher : {data.class}</p></div>
            {input ? <div className="editdiv">
                <div className="edit1"><span>Mobile.no :</span><input value={data.phn} onChange={insert} name="phn" ref={inputRef} type="number"/></div>
                <div className="edit1 e-edit1"><span>Email :</span><input value={data.email} onChange={insert} name="email" type="email"/></div>
                <div className="p-edit1"><span>Address:</span><input value={data.address} onChange={insert} name="address" /></div>
                <button className="add" onClick={() => update(data.id)}>Save</button></div> :
                <div className="editdiv">
                    <div className="tag1"><p>Mobile.no : {data.phn}</p></div>
                    <div className="tag1"><p>Email : {data.email}</p></div>
                    <div className="p-address1"><p>Address : {data.address}</p></div>
                    <button className="editbtn" onClick={() => setInput(true)}>Edit</button></div>}
            <div className="timetable">
                {(Day === 6 || Day === 0) ? <h1>Today Leave {Day === 6 ? "Saturday" : "Sunday"}</h1> : <><h1>Today TimeTable</h1>
                    <div className="tt"><p>1st-Period : {timetable.one}</p></div>
                    <div className="tt"><p>5th-Period : {timetable.five}</p></div>
                    <div className="tt"><p>2nd-Period : {timetable.two}</p></div>
                    <div className="tt"><p>6th-Period : {timetable.six}</p></div>
                    <div className="tt"><p>3rd-Period : {timetable.three}</p></div>
                    <div className="tt"><p>7th-Period : {timetable.seven}</p></div>
                    <div className="tt"><p>4th-Period : {timetable.four}</p></div>
                    <div className="tt"><p>8th-Period : {timetable.eight}</p></div>
                </>}
            </div>
            {popup && <div className="leaverequest">
                <h1>Your Request</h1><button className="close" onClick={() => setPopup(false)}>Close</button>
                <div className="reqlist1"><p>Name</p><p className="req-p">Subject</p><span>Status</span></div>
                <div className="reqflow">
                    {leave.length == 0 ? <p className="reqp">No Request sent</p> : leave.map(e => {
                        return <div className="reqlist" key={e.id}><p>{e.name}</p><p className="req-p">{e.subject}</p>{e.approved ? <span className="approve">Approved</span> : <span>Pending</span>}</div>
                    })
                    }
                </div>
            </div>}
        </div>
    </div>
}
export default Teacher