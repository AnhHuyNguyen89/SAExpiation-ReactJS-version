//Card for task 3
import { Link } from "react-router-dom";
function CardV1(props) {
    return (
        <div className="col-4 justify-content-center">
            <div className="card mt-sm-4" style={{ width: 100 + '%', height: 'auto' }}>
                <div className="card-body">
                    <h5 className="card-title">Local Service Area: <br></br> {props.localServiceArea}</h5>
                    <p className="card-text">Area Code: {props.localServiceAreaCode}</p>
                    <p className="card-text">Count: {props.count}</p>
                </div>

                {/*Route card to the detail page with the corresponding code*/}
                <Link to={"/LocalService/" + props.localServiceAreaCode} className="btn btn-view">VIEW DETAILS</Link>
            </div>
        </div>
    )
}

export default CardV1;