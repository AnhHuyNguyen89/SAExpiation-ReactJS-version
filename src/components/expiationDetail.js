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
            {/*<h1 style=" width:100%;height:120px; text-align:center; line-height:120px" className="border border-dark">Expiation Code Details</h1>*/}
            <dl>
                <div class="row mt-4">
                    <dt class="col"><h4>Expiation Code: </h4></dt>
                    <dd class="col">{detail.expiationOffenceCode}</dd>
                </div>
                <div class="row">
                    <dt class="col"><h4>Expiation Detail: </h4></dt>
                    <dd class="col">{detail.expiationOffenceDescription}</dd>
                </div>
                <div class="row">
                    <dt class="col"><h4>Total codes:</h4></dt>
                    <dd class="col">{yearCount}</dd>
                </div>
            </dl>

                {/*category???*/}


                
            <div className="row">
                <div className="col">
                    <Link to="/ExpiationList" className="btn btn-dark">Back to List</Link>
                </div>
                <div className="col">
                    <select className="form-control row" onChange={yearChange}>
                        <option>{new Date().getFullYear()}</option>
                        <option>{new Date().getFullYear() - 1}</option>
                        <option>{new Date().getFullYear() - 2}</option>
                    </select>
                </div>
            </div>  

                {/*table summary*/}
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
        </div>
    );
}
export default ExpiationDetail;