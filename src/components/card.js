//Card for Task 1
// Import Link from React router
import { Link } from "react-router-dom";


const Card=({expiationOffenceCode,expiationOffenceDescription})=>(
        // Use card Bootstrap to display information from database.
        <div className="col-4 justify-content-center">
            <div className="card mt-sm-4" style={{ width: 100 + '%', height : 'auto' }}>
                <div className="card-body">
                    <h5 className="card-title">{expiationOffenceCode}</h5>
                    <p className="card-text">{expiationOffenceDescription}</p>
                </div>
                {/* Use the splash / to separate the main domain */}
                {/*Route card to the detail page with the corresponding code*/}
                <Link to={"/ExpiationList/" + expiationOffenceCode} className="btn btn-view">VIEW DETAILS</Link>
            </div>
        </div>
)


export default Card
