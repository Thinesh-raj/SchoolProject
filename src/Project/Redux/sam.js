import "./student.css"
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa6";
function StudentPage() {
    const { StudentName } = useParams();
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const [edit, setEdit] = useState({});
    const [input, setInput] = useState(false);
    const [attend, setAttend] = useState([]);
    const [graph, setGraph] = useState([]);
    const [pop, setpop] = useState(false);
    const today = new Date;
    const first = today.getDate() - today.getDay();
    let firstday = new Date(today.setDate(first)).getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const [date, setdate] = useState(firstday);
    const [currmonth, setCurrmonth] = useState(month);
    const current = ${month}/${firstday + 8}/${year};
    const weekdayone = ${currmonth}/${date + 1}/${year};
    console.log(current)
    let week = [];
    for (let i = date + 1; i < date + 6; i++) {
        week.push(${i}/${currmonth})
    }
    useEffect(() => {
        axios.get("http://localhost:3000/Student")

            .then(res => { (setData(res.data.filter(e => { if (e.Name === StudentName) return e })[0])) })
            .catch(err => console.log(err.message))
        let leave = []
        axios.get(" http://localhost:3000/Attendace")
            .then(res => {
                console.log(res.data.filter(e=>e.Date==weekdayone))
            })
            .catch(err => console.log(err.message))
    }, [setData]);
    function editrecord(id) {
        axios.get(http://localhost:3000/Student/${id})
            .then(res => setEdit(res.data))
            .catch(err => console.log(err.message))
        setInput(true)
    }
    function update(id) {
        axios.put(http://localhost:3000/Student/${id}, edit)
            .then(res => setData(res.data))
            .catch(err => console.log(err.message))
        setInput(false)
    }
    function weekpage(dir) {
        let diff = null;
        let value = null;
        let change = null;
        dir === "left" ? diff = date - 7 : diff = date + 7;
        diff < 0 ? value = ((currmonth - 1) % 2 === 0 ? 31 + diff : value = 30 + diff) : value = diff;
        diff < 0 ? change = currmonth - 1 : change = currmonth;
        if (diff > 31) {
            if (currmonth % 2 == 0) { change = currmonth + 1; value = diff - 31 }
            else { change = currmonth + 1; value = diff - 30 }
        }
        let currdate = ${change}/${value + 1}/${year};
        if (current == currdate) {
            setpop(false);
        }
        else {
            setpop(true);
            setdate(value);
            setCurrmonth(change);
            let index = graph.findIndex(e => e.date == currdate)
            setAttend(graph.slice(index, index + 5))
        }
    }
    return <div className="outer">
        <div className="student">
            <h2>Hi,{StudentName}</h2>
            {show ? <button className="out" onClick={() => setShow(false)}>Check Out</button> : <button onClick={() => setShow(true)}>Check In</button>}
            <Link className="back" to="/"><FaArrowLeft />Back</Link>
            <h2 className="h2">Person Details</h2>
            <div><p>Name : {data.Name}</p></div>
            <div><p>Class : {data.Class}</p></div>
            <div><p>Age : {data.Age}</p></div>
            <div><p>Bloodgroup : {data.Bloodgroup}</p></div>
            <div><p>Gender : {data.Gender}</p></div>
            <div><p>D.O.B : {data.Password}</p></div>
            <h2 className="h2">Parent's Details</h2>
            <div className="pd"><p>Father's Name : {data.Fname}</p></div>
            <div className="pd"><p>Mother's Name : {data.Mname}</p></div>
            <div className="pd"><p>Father's Occupation : {data.Foccup}</p></div>
            <div className="pd"><p>Mother's Occupation : {data.Moccup}</p></div>
            {input ? <div className="editdiv">
                <div className="edit edit-E"><span>Email :</span><input value={edit.Email} onChange={e => setEdit({ ...edit, "Email": e.target.value })} /></div>
                <div className="edit"><span>Father's Mobile.no :</span><input value={edit.Fphn} onChange={e => setEdit({ ...edit, "Fphn": e.target.value })} /></div>
                <div className="edit"><span>Mother's Mobile.no :</span><input value={edit.Mphn} onChange={e => setEdit({ ...edit, "Mphn": e.target.value })} /></div>
                <div className="p-edit"><span>Address:</span><input value={edit.Address} onChange={e => setEdit({ ...edit, "Address": e.target.value })} /></div>
                <button onClick={() => update(data.id)}>Add</button></div> :
                <div className="editdiv">
                    <div className="tag"><p>Email : {data.Email}</p></div>
                    <div className="tag"><p>Father's Mobile.no : {data.Fphn}</p></div>
                    <div className="tag"><p>Mother's Mobile.no : {data.Mphn}</p></div>
                    <div className="p-address"><p>Address : {data.Address}</p></div>
                    <button onClick={() => editrecord(data.id)}>Edit</button></div>}
            <span className="arr left" onClick={() => weekpage("left")}><FaChevronLeft /></span>
            <div className="attendancelist">
                <h1 className="attendh1">Attendance</h1>
                <div className="graph">{
                    attend.map(e => {
                        return <div className={e.present == "yes" ? "grow" : "none"}>{e.present == "no" && <span className="flip">Absent</span>}</div>
                    })
                }
                </div>
                {week.map(e => {
                    return <div className="graphlist">{e}</div>
                })}
            </div>
            {pop && <span className="arr right" onClick={() => weekpage("right")}><FaChevronRight /></span>}
            {/* <Graph name={studentname}/> */}
        </div>
    </div>
}
export default StudentPage