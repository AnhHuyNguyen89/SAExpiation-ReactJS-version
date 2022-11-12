import React, { useState, useEffect } from 'react';
import CardLocalServiceList from '../components/cardLocalServiceList';


function LocalService() {
    //declare useState to get the data from API and set it state again if changed
    const [serviceList, setServiceList] = useState([]);
    //declare selected year and set useSate to the current year
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    //declare the year list for the selection option
    const [yearList,setYearList] = useState([]);

    //fetch data from API to display Local service List by years and handle all side effects with useEffect
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

    //fetch data from API to display Years List and handle all side effects with useEffect
    useEffect(() => {
        fetch(`http://localhost:5129/api/LSAYearList`)
            .then((response) => response.json())
            .then((data) => {
                setYearList(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    //set selected Year when value is changed by setting useState
    function yearChange(event) {
        setSelectedYear(event.target.value);
    }

    return (
        <div className="localServiceSearch container">
            <h1 className="border border-dark">Local Service List</h1>
            
            {/* Year selection */}
            <div className="selectionYear">
                <h2>Year selection: </h2>
                <select className="form" onChange={yearChange}>
                    {
                         yearList.map((item) => (
                            <option key={item}>{item}</option>
                        ))
                    }
                </select>
            </div>

            {/* map the value to the cardV1 */}
            <div className="row justify-content-center">
                {serviceList.map((obj) => (
                    //Card to show all necessary information
                    <CardLocalServiceList
                        key={obj.localServiceArea}
                        localServiceArea={obj.localServiceArea}
                        localServiceAreaCode={obj.localServiceAreaCode}
                        count={obj.count}
                        selectedYear={selectedYear}
                    />
                )
                )
                }
            </div>
        </div>
    )
}
export default LocalService;