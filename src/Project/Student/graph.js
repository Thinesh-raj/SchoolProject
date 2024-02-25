import axios from "axios";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6"

function Graph(p) {
    const [attend, setAttend] = useState([]);
    const [graph, setGraph] = useState([]);
    const [pop, setpop] = useState(false);
    const today = new Date;
    const first = today.getDate() - today.getDay();
    const firstday = new Date(today.setDate(first)).getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const [date, setdate] = useState(firstday);
    const [currmonth, setCurrmonth] = useState(month);
    const current = `${month}/${firstday + 1}/${year}`;
    const weekdayone = `${currmonth}/${date + 1}/${year}`;
  useEffect(()=>{
    let leave = []
    axios.get("http://localhost:3000/Attendance")
        .then(res => {
            ((res.data.map(e => (e.Attend)).filter((e) => leave.push((e.filter(e => e.name == p.name))[0]))))
            setGraph(leave)
            let index = leave.findIndex(e => e.date == weekdayone)
            setAttend(leave.slice(index, index + 5))
        })
        .catch(err => console.log(err.message))
  })
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
        let currdate = `${change}/${value + 1}/${year}`;
        if (current == currdate) {
            setdate(value);
            setCurrmonth(change);
            let index = graph.findIndex(e => e.date == currdate)
            setAttend(graph.slice(index, index + 5))
            setpop(false)
        }
        else {
            setpop(true);
            setdate(value);
            setCurrmonth(change);
            let index = graph.findIndex(e => e.date == currdate)
            setAttend(graph.slice(index, index + 5))
        }
    }
    return <div className="attendancelist">
        <span className="arr left" onClick={() => weekpage("left")}><FaChevronLeft /></span>
        {pop && <span className="arr right" onClick={() => weekpage("right")}><FaChevronRight /></span>}
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
}
export default Graph