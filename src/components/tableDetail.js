//Table for task 2

import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function TableDetail() {
    let params = useParams()
    //declare state to get data into the table.
    const [table, setTable] = useState([]);
    //declare the year and set it with the current year and the chosen years
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    var monthCounts = new Array(12).fill(0);
    var yearCount = 0;

    table.forEach(data => {
        data.noticeDetailList.forEach(summary => {
            monthCounts[data.monthNo - 1] += summary.count;
            yearCount += summary.count;
        })
    });
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

        <div>
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

                                <tr className="row-header-month" key={data.monthName}>
                                    <th scope="row">{data.monthName}</th>
                                    <td></td>
                                    <td className="row-header">Total: {monthCounts[data.monthNo - 1]}</td>
                                </tr>,
                                data.noticeDetailList.map((summary) =>
                                    //1 description sẽ xuất hiện 1 lần trong 1 month nên kết hợp lại tạo thành key uniquie 
                                    <tr className="row-parent" key={`${data.monthNo}${summary.noticeStatusDescription}`}>
                                        <th scope="row" value={summary.noticeStatusDescription}></th>
                                        <td className="row-child-key" value={summary.noticeStatusDescription}>{summary.noticeStatusDescription}</td>
                                        <td className="row-child-value" value={summary.noticeStatusDescription}>{summary.count}</td>
                                    </tr>
                                )
                            ]))
                    }
                </tbody>
            </table>
            <div className="row g-3">
                <dd className="col"></dd>
                <dd className="col"></dd>
                <dt className="col"><h4>Year to date:</h4></dt>
                <dd className="col">{yearCount}</dd>
            </div>
        </div>
    )
}
export default TableDetail;