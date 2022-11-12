import CardExpiationList from '../components/cardExpiationList';
import React, { useState, useEffect} from 'react';

//Task 1: Card, useDebounce, Home and expiationList
function ExpiationList() {
    //load expiationData to the empty list and setExpiationData will update the value when anything changes.
    const [expiationData, setExpiationData] = useState([]);
    //searchValue is the input when typing in and setSearchValue will set Search value again if anything changed.
    const [searchValue, setSearchValue] = useState('');

    //fetch data from API to display expiation code and description and handle all side effects with useEffect
    //encodeURIComponent used for encode all special characters into formal format
    useEffect(() => {
        fetch(`http://localhost:5129/api/ExpiationOffenceCodeList?searchText=${encodeURIComponent(searchValue)}`)
            .then((response) => response.json())
            .then((data) => {
                setExpiationData(data);
            })  
            .catch(error => {
                console.error(error);
            });
    }, [searchValue]);

    //function for button to show alert the chosen value for searching
    const searchQuery = () => {
        //Select the value of element.
        const search = document.querySelector('[name="searchText"]').value;
        //alert which code or description is searched
        if(!search){
            return setSearchValue(search);
        }else{
            alert('Search Value: ' + search);
            //update the value of search with setting a search value again when searching
            setSearchValue(search);
        }
    }
    //clear the input after being searched
    const clear = (event) => {
        event.target.value = "";
    };

    //render or return Card list, code search and description search
    return (
        <div className="expiationListSearch container">
            <h1 className="border border-dark">Expiation Code List</h1>
            <div className="row justify-content-start mb-3">
                <div className="col-5 mt-3">
                    <input
                        list="datalist"
                        type="text"
                        input={searchValue}
                        name="searchText"
                        className="form-control searchInput"
                        // not to check words grammar
                        spellCheck={false}
                        onFocus={clear}
                        placeholder="Search here..." />
                    {/* DataList with id should match with list in input to show the list */}
                    <datalist id="datalist">
                        {expiationData.map((item) => (
                            <option value={item.expiationOffenceCode}
                                key={item.expiationOffenceCode}
                            />
                        )
                        )
                        }
                    </datalist>
                </div>
                < div className="col-3 text-center mt-3" >
                    {/* e.target.value is used to get the input field's value and
                    use setSearchValue to set the value gain and update the value of input */}

                    {/* The "onChange" event in React detects when the value of an input element has changed
                    and it will update the value again*/}
                    <button type="button" className="btn btn-search" onClick={searchQuery} onChange={e => setSearchValue(e.target.value)}>Search</button>
                </div >
            </div>

            <div className="row justify-content-center">
                {/* Map the data from ExpiationOffenceCodeList to Card */}
                {expiationData.map((obj) => (
                    <CardExpiationList
                        key={obj.expiationOffenceCode}
                        expiationOffenceCode={obj.expiationOffenceCode}
                        expiationOffenceDescription={obj.expiationOffenceDescription}
                    />

                )
                )
                }
            </div>
        </div>
    )
}

export default ExpiationList;



