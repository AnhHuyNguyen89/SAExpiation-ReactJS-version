import React, { useState, useEffect } from 'react';
import CardV1 from '../components/cardV1';


function LocalService() {

    const [serviceList, setServiceList] = useState([]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    useEffect(() => {
        fetch(`http://localhost:5129/api/LocalServiceAreaList?year=${selectedYear}`)
            .then((response) => response.json())
            .then((data) => {
                setServiceList(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [selectedYear]);

    function yearChange(event) {
        setSelectedYear(event.target.value);
    }


    return (
        <div className="localServiceSearch container">
            <h1 className="border border-dark">Local Service List</h1>

            <div className="selectionYear">
                <h2>Year selection: </h2>
                <select className="form" onChange={yearChange}>
                    <option>{new Date().getFullYear()}</option>
                    <option>{new Date().getFullYear() - 1}</option>
                    <option>{new Date().getFullYear() - 2}</option>
                </select>
            </div>

            <div className="row justify-content-center">
                {serviceList.map((obj) => (
                    <CardV1
                        key={obj.localServiceArea}
                        localServiceArea={obj.localServiceArea}
                        localServiceAreaCode={obj.localServiceAreaCode}
                        count={obj.count}
                        selectedYear = {selectedYear}
                    />
                )
                )
                }
            </div>
        </div>
    )
}
export default LocalService;