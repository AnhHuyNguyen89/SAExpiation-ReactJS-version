import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TableServiceDetail from '../components/tableServiceDetail'
function LocalServiceDetail() {

    let params = useParams();

    //get the corresponding code from the previous page
    const [detail, setDetail] = useState({});
    // const [localServiceAreaCode, setId] = useState(params.localServiceAreaCode);

    //fetch data from API to display Local service Code by years and handle all side effects with useEffect
    //pass the code after the main domain and separate with "?code="
    //useParams for passing the params from route to the link and match with the params. 
    useEffect(() => {
        fetch(`http://localhost:5129/api/LocalServiceArea?code=${params.localServiceAreaCode}`)
            .then((response) => response.json())
            .then((data) => {
                setDetail(data);
            })
            .catch(error => {
                console.error(error);
            });

    }, [params.localServiceAreaCode]);

    return (
        //render data to display
        <div className="container">
            <h1 className="border border-dark">Local Service Details</h1>

            <dl>
                <div className="row mt-4">
                    <dt className="col"><h4>LOCAL SERVICE AREA: </h4></dt>
                    <dd className="col">{detail.localServiceAreaName}</dd>
                </div>
                <div className="row">
                    <dt className="col"><h4>Area Code: </h4></dt>
                    <dd className="col">{detail.localServiceAreaCode}</dd>
                </div>
            </dl>

            <TableServiceDetail></TableServiceDetail>

        </div>

    )
}
export default LocalServiceDetail;