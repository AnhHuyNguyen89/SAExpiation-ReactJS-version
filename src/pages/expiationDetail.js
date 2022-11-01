import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TableDetail from '../components/tableDetail';
function ExpiationDetail() {
    //returns a parameter object with properties that represent each named URL parameter
    let params = useParams()

    //get the corresponding code from the previous page
    const [detail, setDetail] = useState([]);

    //fetch data from API to get the code with description to display and pass params to the expiationOffenceCode
    useEffect(() => {
        fetch(`http://localhost:5129/api/ExpiationOffenceCode?code=${params.expiationOffenceCode}`)
            .then((response) => response.json())
            .then((data) => {
                setDetail(data);
            })
            .catch(error => {
                console.error(error);
            });
    //to stop the cyclic request.
    }, [params.expiationOffenceCode]);

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
                <div className="row">
                    <dt className="col"><h4>Category Detail: </h4></dt>
                    {/* "?" to check nullable in JS which display the data and return null if no value */}
                    {/* References: JS documentation */}
                    <dd className="col">{detail.expiationCategory?.categoryDescription}</dd>
                </div>
            </dl>
            
            {/*Table detail component in expiation code detail*/}
            <TableDetail></TableDetail>
        </div>
    );
}
export default ExpiationDetail;