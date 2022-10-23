import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function ExpiationDetail() {
  
    let params = useParams()

    //get the corresponding code from the previous page
    const [detail, setDetail] = useState({ });
    const [expiationOffenceCode, setId] = useState(params.expiationOffenceCode);

    //get the data to display into the table.
    const [table, setTable] = useState([]);
    //get the current year with the chosen years
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    var monthCounts = new Array(12).fill(0);
    var yearCount = 0;

    table.forEach(data => {
        data.noticeDetailList.forEach(notice => {
            monthCounts[data.monthNo - 1] += notice.count;
            yearCount += notice.count;
        })
    });

    //fetch data from API to get the code with description to display
    useEffect(() => {
        fetch(`http://localhost:5129/api/ExpiationOffenceCode?code=${expiationOffenceCode}`)
            .then((response) => response.json())
            .then((data) => {
                setDetail(data);
            })
            .catch(error => {
                console.error(error);
            });
        //eslint-disable-next-line
    }, [expiationOffenceCode]);


    useEffect(() => {
        fetch(`http://localhost:5129/api/ExpiationCodeSummary?code=${params.expiationOffenceCode}&year=${selectedYear}`)
            .then(response => response.json())
            .then(data => setTable(data))
            .catch(err => { console.log(err) });
        //eslint-disable-next-line
    }, [selectedYear]);

    function yearChange(event) {
        setSelectedYear(event.target.value);
    }


    return (
        <div className="container">
            <h1 className="border border-dark">Expiation Code Details</h1>

            {/*Sector for displaying the code detail*/}
            <dl>
                <div class="row mt-4">
                    <dt class="col"><h4>Expiation Code: </h4></dt>
                    <dd class="col">{detail.expiationOffenceCode}</dd>
                </div>
                <div class="row">
                    <dt class="col"><h4>Expiation Description: </h4></dt>
                    <dd class="col">{detail.expiationOffenceDescription}</dd>
                </div>
            </dl>

            {/*category???*/}


                
            <div className="function__detail">
                <div className="back-to-list">
                    <Link to="/ExpiationList" className="btn btn-back">Back to List</Link>
                </div>
                <div className="selection">
                    <select className="form" onChange={yearChange}>
                        <option>{new Date().getFullYear()}</option>
                        <option>{new Date().getFullYear() - 1}</option>
                        <option>{new Date().getFullYear() - 2}</option>
                    </select>
                </div>
            </div>  

            {/*Display table details*/}
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
                                <tr className="row-header-month">
                                    <th scope="row">{data.monthName}</th>
                                    <td></td>
                                    <td className="row-header">Total: {monthCounts[data.monthNo - 1]}</td>
                                </tr>,
                                data.noticeDetailList.map((notice) =>
                                    <tr className="row-parent">
                                        <th scope="row" value={notice.noticeStatusDescription}></th>
                                        <td className="row-child-key" value={notice.noticeStatusDescription}>{notice.noticeStatusDescription}</td>
                                        <td className="row-child-value" value={notice.noticeStatusDescription}>{notice.count}</td>
                                    </tr>
                                )
                            ]))
                    }
                </tbody>
            </table>
            <div class="row g-3">
                <dd className="col"></dd>
                <dd className="col"></dd>
                <dt className="col"><h4>Year to date:</h4></dt>
                <dd className="col">{yearCount}</dd>
            </div>
        </div>
    );
}
export default ExpiationDetail;