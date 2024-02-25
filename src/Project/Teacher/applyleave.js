import { useState } from "react"
import "./applyleave.css"
import axios from "axios";
import { Link, useParams } from "react-router-dom";
function Applyleave() {
    const { name } = useParams();
    const date = new Date().toLocaleDateString();
    const [request, setRequest] = useState({ "name": name, "date": date, "approved": false, "subject": `I want leave on ${date} , ` });
    const [pop, setPop] = useState(false);
    const [alert, setAlert] = useState(false);
    function submit() {
        if (request.subject.trim().length === 28) {
            setAlert(true)
        }
        else {
            axios.post("http://localhost:3000/Leave", request, { headers: { Authorization: 'Basic U2FtOjIwNTY=' } })
                .then(res => console.log(res.data))
                .catch(err => console.log(err.message))
            setPop(true)
            let value = request.subject.substring(0, 28);
            setRequest({ ...request, subject: value })
        }
    }
    pop && setTimeout(() => {
        setPop(false)
    }, 1500)
    return <div className="cover">
        <div className="applyleave"><h1>Apply Leave</h1>
        <Link to={"/teacherpage/" + name} className="leaveback">Back</Link>
            <p className="float">Date : {date}</p>
            <p className="p">Name : </p>
            <input value={name} readOnly />
            <p>Subject :</p>
            <textarea value={request.subject} rows={10} cols={37} placeholder="I want leave on dd/mm/yyyy" onChange={e => setRequest({ ...request, "subject": e.target.value })} />
            <div className="button"><button onClick={submit}>Submit</button></div>
            {pop && <div className="app-popup">Your Request sent successfully</div>}
            {alert && <div className="app-alert"><div>Type the appropriate content<span onClick={() => setAlert(false)}>X</span></div></div>}
        </div>
    </div>
}
export default Applyleave