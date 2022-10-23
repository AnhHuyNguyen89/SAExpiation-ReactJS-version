// JavaScript source code
import { Link } from "react-router-dom";
function Card(props) {
    return (
        <div className="col-4 justify-content-center">
            <div className="card mt-sm-4" style={{ width: 100 + '%', height : 'auto' }}>
                <div className="card-body">
                    <h5 className="card-title">{props.expiationOffenceCode}</h5>
                    <p className="card-text">{props.expiationOffenceDescription}</p>
                </div>
                <Link to={"/ExpiationList/" + props.expiationOffenceCode} className="btn btn-warning">View Detail</Link>
            </div>
        </div>
    )
}

export default Card
