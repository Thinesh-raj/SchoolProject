import "./student.css"
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft, FaChevronLeft, FaChevronRight, FaThumbsDown } from "react-icons/fa6";
import bg from "../Images/logo.png"
import Graph from "./graph";

function Student() {
    const { studentname } = useParams();
    const Navigate = useNavigate();
    const [data, setData] = useState([]);
    const [input, setInput] = useState(false);
    const [attend, setAttend] = useState([]);
    const [graph, setGraph] = useState([]);
    const [pop, setpop] = useState(false);
    const today = new Date;
    const first = today.getDate() - today.getDay();
    const firstday = new Date(today.setDate(first)).getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const [date, setdate] = useState(firstday);
    const [currmonth, setCurrmonth] = useState(12);
    const currentdate = `${month}/${25}/${year}`;
    const weekdayone = `${currmonth}/${25}/${2023}`;
    let week = [];
    for (let i = date + 1; i < date + 6; i++) {
        if (currmonth % 2 == 0) {
            if (i > 31) { week.push(`${i - 31}/${currmonth}`) }
            else { week.push(`${i}/${currmonth}`) }
        }
        else {
            if (i > 30) { week.push(`${i - 30}/${currmonth}`) }
            else { week.push(`${i}/${currmonth}`) }
        }
    }
    let Week = week.slice(0, attend.length)
    useEffect(() => {
        axios.get("http://localhost:3000/Student", { headers: { Authorization: 'Basic U2FtOjIwNTY=' } })
            .then(res => setData(res.data.find(e => e.name === studentname)))
            .catch(err => console.log(err.message))
        let leave = []
        axios.get("http://localhost:3000/Attendance", { headers: { Authorization: 'Basic U2FtOjIwNTY=' } })
            .then(res => {
                ((res.data.map(e => (e.Attend)).filter((e) => leave.push(e.find(e => e.name == studentname)))))
                setGraph(leave)
                console.log(leave)
                let index = leave.findIndex(e => e.date == weekdayone)
                setAttend(leave.slice(index, index + 5))
            })
            .catch(err => console.log(err.message))
        let item = localStorage.getItem("name")
        if (item.substring(1, item.length - 1) != studentname) Navigate("/page/Student")
    }, [setData]);
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
        axios.put(`http://localhost:3000/Student/${id}`, data, { headers: { Authorization: 'Basic U2FtOjIwNTY=' } })
            .then(res => setData(data))
            .catch(err => console.log(err.message))
        setInput(false)
    }
    function weekpage(dir) {
        let diff, value, change = null;
        dir === "left" ? diff = date - 7 : diff = date + 7;
        if (diff < 0) {
            value = ((currmonth - 1) % 2 === 0 ? 31 + diff : value = 30 + diff);
            change = currmonth - 1
        }
        else { value = diff; change = currmonth }
        if (diff > 31) {
            if (currmonth % 2 == 0) { change = currmonth + 1; value = diff - 31 }
            else { change = currmonth + 1; value = diff - 30 }
        }
        let currdate = `${change}/${value + 1}/${year}`;
        setdate(value);
        setCurrmonth(change);
        let index = graph.findIndex(e => e.date == currdate)
        console.log(currdate, index)
        setAttend(graph.slice(index, index + 5));
        (currentdate == currdate) ? setpop(false) : setpop(true);
    }
    return <div className="outer">
        <div className="student">
            <div className="nav">
                <div className="mod_div">
                    <img src={bg} alt="404" />
                    <h1>Chettinad Rani Meyyammai Matric School</h1>
                </div>
                <div className="backdiv"> <Link className="back" to="/"><FaArrowLeft />Back</Link></div>
            </div>
            <h2>Hi,{studentname}</h2>
            <h2 className="h2">Person Details</h2>
            <div><p>Name : {data.name}</p></div>
            <div><p>Class : {data.class}</p></div>
            <div><p>Age : {data.age}</p></div>
            <div><p>Bloodgroup : {data.bloodgroup}</p></div>
            <div><p>Gender : {data.gender}</p></div>
            <div><p>D.O.B : {data.pass}</p></div>
            <h2 className="h2">Parent's Details</h2>
            <div className="pd"><p>Father's Name : {data.fname}</p></div>
            <div className="pd"><p>Mother's Name : {data.mname}</p></div>
            <div className="pd"><p>Father's Occupation : {data.foccup}</p></div>
            <div className="pd"><p>Mother's Occupation : {data.moccup}</p></div>
            {input ? <div className="editdiv">
                <div className="edit edit-E"><span>Email :</span><input value={data.email} onChange={insert} name="email" type="email" /></div>
                <div className="edit"><span>Father's Mobile.no :</span><input value={data.fphn} onChange={insert} name="fphn" type="number" /></div>
                <div className="edit"><span>Mother's Mobile.no :</span><input value={data.mphn} onChange={insert} name="mphn" type="number" /></div>
                <div className="p-edit"><span>Address:</span><input value={data.address} onChange={insert} name="address" /></div>
                <button onClick={() => update(data.id)}>Save</button></div> :
                <div className="editdiv">
                    <div className="tag"><p>Email : {data.email}</p></div>
                    <div className="tag"><p>Father's Mobile.no : {data.fphn}</p></div>
                    <div className="tag"><p>Mother's Mobile.no : {data.mphn}</p></div>
                    <div className="p-address"><p>Address : {data.address}</p></div>
                    <button onClick={() => setInput(true)}>Edit</button></div>}
            <span className="arr left" onClick={() => weekpage("left")}><FaChevronLeft /></span>
            <div className="attendancelist">
                <h1 className="attendh1">Attendance</h1>
                <div className="graph">{
                    attend.map(e => {
                        return <div key={e.id} className={e.present == "yes" ? "grow" : "none"}>{e.present == "no" ? <><p>A</p><p>B</p><p>S</p><p>E</p><p>N</p><p>T</p></> : <>
                            <div className="div1"></div>
                            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></>}
                        </div>
                    })
                }
                </div>
                <div className="graphbottom">
                    {Week.map(e => {
                        return <div key={e.id} className="graphlist">{e}</div>
                    })}
                </div>
            </div>
            {pop && <span className="arr right" onClick={() => weekpage("right")}><FaChevronRight /></span>}
            {/* <Graph name={studentname}/> */}
        </div>
    </div>
}
export default Student