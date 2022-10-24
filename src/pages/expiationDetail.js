import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TableDetail from '../components/tableDetail';
function ExpiationDetail() {
  
    let params = useParams()

    //get the corresponding code from the previous page
    const [detail, setDetail] = useState([]);
    //eslint-disable-next-line
    const [expiationOffenceCode, setId] = useState(params.expiationOffenceCode);

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

    }, [expiationOffenceCode]);



    return (
        <div className="container">
            <h1 className="border border-dark">Expiation Code Details</h1>

            {/*Sector for displaying the code detail*/}
            <dl>
                <div className="row mt-4">
                    <dt className="col"><h4>Expiation Code: </h4></dt>
                    <dd className="col">{detail.expiationOffenceCode}</dd>
                </div>
                <div className="row">
                    <dt className="col"><h4>Expiation Description: </h4></dt>
                    <dd className="col">{detail.expiationOffenceDescription}</dd>
                </div>
                {/*category???*/}
                {/*<div className="row">*/}
                {/*    <dt className="col"><h4>Expiation Description: </h4></dt>*/}
                {/*    <dd className="col">{detail.expiationCategory.map((abs) => (*/}
                {/*        <h1 key={abs.expiationOffenceCode}> {abs.categoryDescription}</h1>*/}
                {/*        ))}</dd>*/}
                {/*</div>*/}
            </dl>
            
            {/*table detail of expiation code detail*/}
            <TableDetail></TableDetail>
        </div>
    );
}
export default ExpiationDetail;