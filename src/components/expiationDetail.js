import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function ExpiationDetail() {
  
    let params = useParams()

    const [detail, setDetail] = useState({ });
    const [expiationOffenceCode, setId] = useState(params.expiationOffenceCode);

    useEffect(() => {
        fetch(`http://localhost:5129/api/ExpiationOffenceCode?code=${expiationOffenceCode}`)
            .then((response) => response.json())
            .then((data) => {
                setDetail(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [expiationOffenceCode]);

    return (
            <div className="container">
                {/*row for expiation code*/}
                <div className="row mt-4">
                    <div className="col-sm-3">
                    <h4>Expiation Code: </h4>
                    </div>
                    <div className="col-sm-3">
                        {detail.expiationOffenceCode}
                    </div>
                </div>
                {/*row for code description*/}
                <div className="row">
                    <div className="col-sm-3">
                    <h4>Expiation Detail: </h4>
                    </div>
                    <div className="col-sm-4">
                        {detail.expiationOffenceDescription}
                    </div>
                    <div className="col-sm-3">
                        <Link to="/ExpiationList" className="btn btn-dark">Back to List</Link>
                    </div>
                </div>
                {/*category???*/}
            </div>
    );
}
export default ExpiationDetail;