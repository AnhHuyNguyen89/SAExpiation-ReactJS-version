import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';

function TableServiceDetail() {

    let params = useParams()

    const [serrviceDetail, setServiceDetail] = useState([]);

    const selectedYear = new URLSearchParams(useLocation().search).get("year");
    if(selectedYear == null) selectedYear = new Date().getFullYear();


    var yearCount = 0;
    serrviceDetail.forEach(data => {
        yearCount += data.count;
    });

    useEffect(() => {
        fetch(`http://localhost:5129/api/LocalServiceAreaExpiations?code=${params.localServiceAreaCode}&year=${selectedYear}&inclZero=false`)
            .then(response => response.json())
            .then(data => setServiceDetail(data))
            .catch(err => { console.log(err) });
        //eslint-disable-next-line
    }, []);
    
    return (
        <div>
            <div className="function__detail">
                <div className="back-to-list">
                    <Link to="/ExpiationList" className="btn btn-back">Back to List</Link>
                </div>
                <div className="row">
                    <dt className = "col">Selected year: </dt>
                    <dd className = "col">{selectedYear}</dd>
                </div>
            </div> 

            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Expiation Code</th>
                        <th scope="col">Description</th>
                        <th scope="col">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        serrviceDetail
                            .map((data) => ([
                                <tr className="row-header-month" key={data.expiationOffenceCode}>
                                    <th scope="row">{data.expiationOffenceCode}</th>
                                    <td>{data.expiationOffenceDescription}</td>
                                    <td className="row-header">{data.count}</td>
                                </tr>
                            ]))
                    }
                </tbody>
            </table>

            <div className="row g-3">
                <dd className="col"></dd>
                <dd className="col"></dd>
                <dt className="col"><h4>Total of codes: </h4></dt>
                <dd className="col">{yearCount}</dd>
            </div>
        </div>
    )


}
export default TableServiceDetail;