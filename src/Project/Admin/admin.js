import "./admin.css";
import axios from "axios";
import bg from "../Images/logo.png";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { setShow, showtype } from "../Redux/reducer";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowLeft, FaTrashArrowUp, FaUserPen, FaUser, FaArrowUp19, FaVenusMars, FaEnvelope, FaPhone, FaLocationDot, FaChevronDown } from "react-icons/fa6";
function Admin() {
    const { adminname } = useParams();
    const dispatch = useDispatch();
    const type = useSelector(showtype);
    const Navigate = useNavigate();
    const [part, setPart] = useState([]);
    const [leave, setLeave] = useState([]);
    const [alert1, setAlert1] = useState(false);
    const [adminData, setAdmindata] = useState([]);
    const [teacherData, setTeacherdata] = useState([]);
    const [brief, setBrief] = useState(null);
    const [ask, setAsk] = useState({ id: null, cnfm: false });
    const [btn, setBtn] = useState(0)
    const [logobj, setLogobj] = useState({ name: adminname, timein: null, timeout: null, active: null, date: new Date().toLocaleDateString() });
    let arrlen1 = teacherData.length / 5;
    let arrlen2 = Math.floor(teacherData.length / 5);
    teacherData.length <= 5 ? arrlen2 = 0 : ((arrlen1 % arrlen2) === 0 ? arrlen2 = arrlen2 + 0 : arrlen2 = arrlen2 + 1);
    useEffect(() => {
        axios.get("http://localhost:3000/Admin", { headers: { Authorization: 'Basic U2FtOjIwNTY=' } })
            .then(res => setAdmindata(res.data.find((e) => e.name === adminname)))
            .catch(err => console.log(err.message))
        axios.get("http://localhost:3000/Teacher", { headers: { Authorization: 'Basic U2FtOjIwNTY=' } })
            .then((res) => {
                setTeacherdata(res.data)
                setPart(res.data.slice(0, 5))
            })
            .catch(err => console.log(err.message))
        axios.get("http://localhost:3000/Leave", { headers: { Authorization: 'Basic U2FtOjIwNTY=' } })
            .then(res => setLeave(res.data))
            .catch(err => console.log(err.message))
        let item = localStorage.getItem("name")
        if (item.substring(1, item.length-1) != adminname) Navigate("/page/Admin")
    }, [adminname,Navigate])
    alert1 && setTimeout(() => {
        setAlert1(false)
    }, 2000)
    function deleterecord(id) {
        setAsk(false)
        setAlert1(true)
        if (teacherData.length !== 0) {
            axios.delete("http://localhost:3000/Teacher/" + id, { headers: { Authorization: 'Basic U2FtOjIwNTY=' } })
                .then((res) => {
                    setPart(part.filter(e => e.id != id));
                    let copy = teacherData.filter(e => e.id != id);
                    setTeacherdata(copy);
                    let diff1 = Math.floor(copy.length / 5);
                    let diff2 = copy.length / 5;
                    if (diff2 % diff1 == 0) {
                        let startindex = copy.length - 5;
                        let endindex = copy.length;
                        setPart(teacherData.slice(startindex, endindex))
                        setBtn(diff1 - 1)
                    }
                })
                .catch(err => console.log(err.data))
        }
    }
    function buttonhandler(order) {
        let endindex = order * 10 / 2;
        let startindex = endindex - 5;
        setPart(teacherData.slice(startindex, endindex))
    }
    function approved(i, id) {
        leave[i].approved = true;
        console.log(leave[i], id, i)
        axios.put(`http://localhost:3000/Leave/${id}`, leave[i], { headers: { Authorization: 'Basic U2FtOjIwNTY=' } })
            .then(res => {
                console.log(res.data)
                let copy = [...leave];
                copy[i].approved = true;
                setLeave(copy)
            })
            .catch(err => console.log(err.console))
    }
    function confirm(id) {
        setAsk({ id: id, cnfm: true })
    }
    function login(log) {
        dispatch(setShow(!type))
        if (log == "in") {
            setLogobj({ ...logobj, timein: new Date().toLocaleTimeString(), active: new Date().getHours() })
        }
        else {
            logobj.active = new Date().getHours() - logobj.active + " hrs";
            logobj.timeout = new Date().toLocaleTimeString();
            axios.post("http://localhost:3000/Login", logobj, { headers: { Authorization: 'Basic U2FtOjIwNTY=' } })
        };
    }
    return <div className={type ? "spread1" : "spread"}>
        <div className="admin">
            <div className="nav">
                <div className="wrap1">
                    <img src={bg} alt="404" />
                    <h1>Chettinad Rani Meyyammai Matric School</h1>
                </div>
                <div className="fr1"><div className="fadered1"><Link className="back" to="/"><FaArrowLeft />Back</Link></div></div>
            </div>
            <div className="head">
                <div className="header"><div className="slash"></div><h1> Admin {adminname}</h1></div>
                <div className="headpart">{type ? <div className="fadered"><button className="out" onClick={() => login("out")}>Check Out</button> </div> : <div className="fadegreen"><button onClick={() => login("in")}>Check In</button></div>}</div>
                <div className="headpart"><div className="fade"><Link to={"/addteacher/" + adminname}>Add Teacher</Link></div></div>
                <div className="headpart"><div className="fade"><Link to={"/addstudent/" + adminname}>Add Student</Link></div></div>
            </div>
            {type && <div className="extend">
                <div className="personal">
                    <h2>Personal Details</h2>
                    <div className="details"><FaUser className="fa" />{adminData.name}</div>
                    <div className="details"><FaArrowUp19 className="fa" />{adminData.age}</div>
                    <div className="details"><FaVenusMars className="fa" />{adminData.gender}</div>
                    <div className="details"><FaEnvelope className="fa" />{adminData.email}</div>
                    <div className="details"><FaLocationDot className="fa" />{adminData.address}</div>
                    <div className="details"><FaPhone className="fa" />{adminData.phn}</div>
                </div>
                <div className="leave">
                    <h2><FaEnvelope className="leave_i" />  Leave Request</h2>
                    <div className="request">
                        {
                            leave.map((e, index) => {
                                return <div className="leavelist">
                                    <span className="number">{index + 1}</span>
                                    <span>{e.name}</span>
                                    <span className="spancontent">{e.subject}</span><FaChevronDown className="spanicon" onClick={() => { brief == e.id ? setBrief(null) : setBrief(e.id) }} />
                                    {brief == e.id && <span className="p1">{e.subject}</span>}
                                    {e.approved ? <button >Approved</button> : <button className="leavebtn" onClick={() => approved(index, e.id)}>Pending</button>}
                                </div>
                            })
                        }
                    </div>
                </div>
                <div className="teacherlist">
                    <h2>Teacher List</h2>
                    <div className="headlist">
                        <span>Name</span>
                        <span>Phone</span>
                        <span >Qualification</span>
                        <span >Email</span>
                        <span >Major</span>
                        <span >Actions</span>
                    </div>
                    <div className="container">
                        {
                            part.map((e) => {
                                return <div className="list">
                                    <span>{e.name}</span>
                                    <span>{e.phn}</span>
                                    <span>{e.qualification}</span>
                                    <span>{e.email}</span>
                                    <span>{e.major}</span>
                                    <span className="action">
                                        <Link to={`/updateTeacher/${adminData.name}/${e.id}`} className="uptbtn"><FaUserPen className="itemicon1" /></Link>
                                        <button onClick={() => confirm(e.id)}><FaTrashArrowUp className="itemicon" /></button>
                                    </span>
                                </div>
                            })
                        }
                    </div>
                    <div className="btnorder">{
                        Array(arrlen2).fill("").map((ele, ind) => {
                            return <button onClick={() => { buttonhandler(ind + 1); setBtn(ind) }} className={btn == ind ? "btncolor" : "pagebtn"} id="btn">{ind + 1}</button>
                        })
                    }
                    </div>
                    {alert1 && <div className="alert1">Record was sucessfully Deleted</div>}
                    {ask.cnfm && <div className="cnfm"><h2>Are you sure to delete this record ?</h2>
                        <button onClick={() => deleterecord(ask.id)}>Yes</button><button onClick={() => setAsk({})}>No</button></div>}
                </div>
            </div>}
        </div>
    </div>

}
export default Admin