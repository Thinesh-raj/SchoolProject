
import { FaStar } from "react-icons/fa6"
import "./alumni.css"
function Alumni(p){
    return<div className="mainpart">
        <div className="partone">
            <img src={p.img} alt="404"/>
            <FaStar className="star1"/>
            <FaStar className="star2"/>
            <FaStar className="star3"/>
            <FaStar className="star4"/>
            <FaStar className="star5"/>
            <FaStar className="star6"/>
            <FaStar className="star7"/>
            <FaStar className="star8"/>
        </div>
        <div className="parttwo">
            <h3>
                {p.name}
            </h3>
            <p>{p.title}</p>
        </div>
    </div>
}
export default Alumni