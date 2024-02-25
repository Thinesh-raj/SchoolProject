import { BrowserRouter, Route, Routes } from "react-router-dom"
import Page1 from "../Page1/Page1"
import "./link.css"
import Login from "../Login/login"
import Admin from "../Admin/admin"
import { Provider } from "react-redux"
import store from "../Redux/store"
import Addteacher from "../Admin/addteacher"
import Addstudent from "../Admin/addstudent"
import Teacher from "../Teacher/teacher"
import Applyleave from "../Teacher/applyleave"
import UpdateTeacher from "../Admin/update"
import Attendance from "../Teacher/attendance"
import Student from "../Student/student"
function LinkProject() {
    return <div className="parent">
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Page1 />} />
                    <Route path="/page/:login" element={<Login />} />
                    <Route path="/Adminpage/:adminname" element={<Admin />} />
                    <Route path="/addteacher/:name" element={<Addteacher />} />
                    <Route path="/addstudent/:name" element={<Addstudent />} />
                    <Route path="/Teacherpage/:teachername" element={<Teacher />} />
                    <Route path="/applyleave/:name" element={<Applyleave />} />
                    <Route path="/updateTeacher/:name/:id" element={<UpdateTeacher />} />
                    <Route path="/attendance/:name/:std" element={<Attendance />} />
                    <Route path="/Studentpage/:studentname" element={<Student />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    </div>
}
export default LinkProject