import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function ExpiationDetail() {
  
    let params = useParams()

    const [detail, setDetail] = useState({ });
    const [expiationOffenceCode, setId] = useState(params.expiationOffenceCode);

    const [table, setTable] = useState([]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    var monthCounts = new Array(12).fill(0);
    var yearCount = 0;
    table.forEach(data => {
        data.noticeDetailList.forEach(notice => {
            monthCounts[data.monthNo - 1] += notice.count;
            yearCount += notice.count;
        })
    });

    useEffect(() => {
        fetch(`http://localhost:5129/api/ExpiationOffenceCode?code=${expiationOffenceCode}`)
            .then((response) => response.json())
            .then((data) => {
                setDetail(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);


    useEffect(() => {
        fetch(`http://localhost:5129/api/ExpiationCodeSummary?code=${params.expiationOffenceCode}&year=${selectedYear}`)
            .then(response => response.json())
            .then(data => setTable(data))
            .catch(err => { console.log(err) });
    }, [selectedYear]);

    function yearChange(event) {
        setSelectedYear(event.target.value);
    }


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
                    <div className="col-sm-3">
                        <Link to="/ExpiationList" className="btn btn-dark">Back to List</Link>
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
                        <select className="form-control row" onChange={yearChange}>
                            <option>{new Date().getFullYear()}</option>
                            <option>{new Date().getFullYear() - 1}</option>
                            <option>{new Date().getFullYear() - 2}</option>
                        </select>
                    </div>
                </div>

            {/*category???*/}






            {/*table summary???*/}
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Month</th>
                        <th scope="col">Notice Status Description</th>
                        <th scope="col">Status Count</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        table
                            .filter(data => monthCounts[data.monthNo - 1] > 0)
                            .map((data) => ([
                                <tr>
                                    <th scope="row" className="bg-warning">{data.monthName}</th>
                                    <td className="bg-warning"></td>
                                    <td className="bg-warning">Total: {monthCounts[data.monthNo - 1]}</td>
                                </tr>,
                                data.noticeDetailList.map((notice) =>
                                    <tr>
                                        <th scope="row"></th>
                                        <td>{notice.noticeStatusDescription}</td>
                                        <td>{notice.count}</td>
                                    </tr>
                                )
                            ]))
                    }  
                </tbody>
            </table>

            <div className="row">
                <dt className="col">Number of expiation offences for selected year is: </dt>
                <dd className="col">{yearCount}</dd>
            </div>
        </div>
    );
}
export default ExpiationDetail;