import "./page1.css";
import bg1 from "../Images/logo.png";
import bg2 from "../Images/classroom.jpg";
import bg3 from "../Images/resize-17004024281104037773study.png";
import bg4 from "../Images/resize-17004023761722684961lab (1).jpg";
import bg5 from "../Images/resize-1700402459139189976teacher.jpg";
import bg6 from "../Images/student1.jpg";
import bg7 from "../Images/student2.webp";
import bg8 from "../Images/student3.jpg";
import bg9 from "../Images/sports.jpg";
import bg10 from "../Images/draw.jpg";
import bg11 from "../Images/eco.jpeg";
import bg12 from "../Images/chess.png";
import bg13 from "../Images/Football.avif";
import bg14 from "../Images/parade.jpg";
import bg15 from "../Images/admit1.jpg"
import { FaAngleUp, FaArrowLeft, FaChalkboardUser, FaClone, FaEnvelope, FaFacebookF, FaFeatherPointed, FaFlask, FaGraduationCap, FaInstagram, FaLinkedinIn, FaLocationDot, FaPersonChalkboard, FaPhone, FaTwitter } from "react-icons/fa6";
import Alumni from "../Alumni/alumni";
import { useState } from "react";
import { Link } from "react-router-dom";
function Page1() {
    const [img, setImage] = useState({});
    return <>
        <div className="navbar">
            <div className="part1">
                <img src={bg1} alt="404" />
                <h1>CRMMS</h1>
            </div>
            <div className="part2">
                <Link to="/page/Admin">Admin Login</Link>
                <Link to="/page/Teacher">Teacher Login</Link>
                <Link to="/page/Student">Student Login</Link>
            </div>
        </div>
        <div className="scl-img">
            <div className="overlay">
                <img src={bg1} alt="404" />
                <h2>School Of Excellance</h2>
            </div>
        </div>
        <div className="overview">
            <h2>About Our School</h2>
            <div className="content">
                <p><FaFeatherPointed />  It is located in Rural area .</p>
                <p><FaFeatherPointed />  It is located in KARUR block of KARUR district of Tamil Nadu .</p>
                <p><FaFeatherPointed />  The school consists of Grades from 1 to 12 .</p>
                <p><FaFeatherPointed />  CRMMS was established in 2001 and it is managed by the Pvt. Unaided .</p>
                <p><FaFeatherPointed />  The school is Co-educatnal and it have an attached pre-primary section .</p>
                <p><FaFeatherPointed />  English is the medium of instructions in this school .</p>
                <p><FaFeatherPointed />  This school is approachable by all weather road .</p>
                <p><FaFeatherPointed />  In this school academic session starts in April .</p>
            </div>
            <div className="slider">
                <img src={bg2} alt="404" />
                <img src={bg3} alt="404" />
                <img src={bg4} alt="404" />
                <img src={bg5} alt="404" />
                <img src={bg2} alt="404" />
                <div className="pin1 pin"><FaChalkboardUser className="icon" /><span>Well displined Classroom</span></div>
                <div className="pin2 pin"><FaGraduationCap className="icon" /><span>Always On Study without Stress</span></div>
                <div className="pin3 pin"><FaFlask className="icon" /><span>Top Class Labaratory</span></div>
                <div className="pin4 pin"><FaPersonChalkboard className="icon" /> <span>Friendly Teacher</span></div>
                <div className="pin5 pin"><FaChalkboardUser className="icon" /><span>Well displined Classroom</span></div>
            </div>
        </div>
        <div className="alumni">
            <h1>BOARD OF HONOUR</h1>
            <div className="alumniwrap">
                <Alumni img={bg6} name="Sathya P" title="Placed in IIT" />
                <Alumni img={bg7} name="Aaron v" title="Selected in NASA" />
                <Alumni img={bg8} name="Sam k" title="Cleared  UPSC" />
            </div>
        </div>
        <div className="achieve">
            <div className="anime">
                <img src={bg9} onClick={() => { setImage({ img1: true }) }} className={img.img1 ? "bright" : "fade1"} alt="404" />
                {img.img1 && <div className="banner">Our School Sports Days</div>}
                <img src={bg10} onClick={() => { setImage({ img2: true }) }} className={img.img2 ? "bright" : "fade2"} alt="404" />
                {img.img2 && <div className="banner">Our School Little Sketchers</div>}
                <img src={bg11} onClick={() => { setImage({ img3: true }) }} className={img.img3 ? "bright" : "fade3"} alt="404" />
                {img.img3 && <div className="banner">Our School Eco Club Volunteers</div>}
                <img src={bg12} onClick={() => { setImage({ img4: true }) }} className={img.img4 ? "bright" : "fade4"} alt="404" />
                {img.img4 && <div className="banner">Our School have Chess Academy</div>}
                <img src={bg13} onClick={() => { setImage({ img5: true }) }} className={img.img5 ? "bright" : "fade5"} alt="404" />
                {img.img5 && <div className="banner">Our School FootBall Champs</div>}
                <img src={bg14} onClick={() => { setImage({ img6: true }) }} className={img.img6 ? "bright" : "fade6"} alt="404" />
                {img.img6 && <div className="banner">Our School Pride Parade</div>}
                <span onClick={() => setImage({})}><FaClone /></span>
            </div>
            <div className="show">
                <h1>Our</h1><h1>Students</h1><h1>Talents</h1>
                <h3>Touch the cards to see our talents</h3>
            </div>
        </div>
        <div className="contact">
            <div className="address">
                <div className="location"><FaLocationDot /><span>Bharani Gardens, Salem Bypass Road, Vennamalai, Karur - 639006</span></div>
                <div className="phone"><FaPhone /><span>+91 9944999259</span></div>
                <div className="mail"><FaEnvelope /><span>crmmsschool@gmail.com</span></div>
                <div className="icon"><FaFacebookF className="i" /><FaLinkedinIn className="i" /><FaInstagram className="i" /><FaTwitter className="i" /></div>
            </div>
            <div className="admit">
                <h3>For Admission Contact</h3>
                <div className="adimg"><img src={bg15} alt="404" /></div>
                <div className="name-ad">
                    <h3>Mrs.Priya</h3>
                    <p>(Admission Co-ordinator)</p>
                    <p>Contact: +91 9443587659</p>
                    <p>Mail: crenquiry@gmail.com</p>
                </div>
            </div>
        </div>
        <button className="scroll" onClick={()=>{window.scrollTo({ top: 0, behavior: "smooth" })}}><FaAngleUp/></button>
    </>
}
export default Page1