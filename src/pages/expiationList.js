import Card from '../components/card';
import React, { useState, useEffect, useRef } from 'react';
import useDebounce from '../components/useDebounce';
//Task 1: Card, useDebounce, Home and expiationList
function ExpiationList() {
    //load data into the card
    const [expiationData, setState] = useState([]);
    //use for searching code
    const [searchValue, setSearchValue] = useState('');

    const inputRef = useRef();

    const debounced = useDebounce(searchValue, 500);

    //fetch data from API to displat expiation code and description
    useEffect(() => {
        fetch(`http://localhost:5129/api/ExpiationOffenceCodeList?searchText=${encodeURIComponent(debounced)}`)
            .then((response) => response.json())
            .then((data) => {
                setState(data);    
            })
            .catch(error => {
                console.error(error);
            });
    }, [debounced]);

    //function for button to show alert the chosen value for searching 
    function searchQuery(evt) {
        const value = document.querySelector('[name="searchText"]').value;
        //alert which code or description is searched
        alert('Search Value: ' + value);
        //update the value of search with setting a search value again when searching
        setSearchValue(value)
    }

    //render or return Card list, code search and description search
    return (
        <div className="expiationListSearch container">
            <h1 className="border border-dark">Expiation Code List</h1>
            <div className="row justify-content-start mb-3">
                <div className="col-5 mt-3">
                    <input
                        list="datalist"
                        ref={ inputRef }
                        type="text"
                        name="searchText"
                        className="form-control searchInput"
                        spellCheck={ false }
                        placeholder="Search here..." />
                
                    <datalist id="datalist">
                        {expiationData.map((item) => (
                            <option value={item.expiationOffenceCode}
                                key={item.expiationOffenceCode}
                                expiationOffenceCode={item.expiationOffenceCode}
                            />
                        )
                        )
                        }
                        
                    </datalist>
                </div>

                < div className="col-3 text-center mt-3" >
                    <button type="text" className="btn btn-search" onClick={searchQuery} onChange={e => setSearchValue(e.target.value)}>Search</button>
                </div >
            </div>

            <div className="row justify-content-center">
                {expiationData.map((obj) => (   
                    <Card
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



