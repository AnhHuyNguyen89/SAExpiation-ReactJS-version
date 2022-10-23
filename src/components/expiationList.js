import Card from './card';
import React, { useState, useEffect, useRef } from 'react';
import useDebounce from './useDebounce';
//Task 1: Card, useDebounce, Home and expiationList
function ExpiationList() {
    //load data into the card
    const [expiationData, setState] = useState([]);
    //use for searching code
    const [searchValue, setSearchValue] = useState('');
    const inputRef = useRef();

    const debounced = useDebounce(searchValue, 500);
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
    function searchQuery(evt) {
        const value = document.querySelector('[name="searchText"]').value;
        alert('Search Value: ' + value);
        setSearchValue(value)
    }

    //render or return Card list, code search and description search
    return (
        <div className="expiationListSearch container">
            <div className="row justify-content-start mb-3">
                <div className="col-5 mt-3">
                    <input
                        list="datalist"
                        ref={ inputRef }
                        type="text"
                        name="searchText"
                        onChange={e => setSearchValue(e.target.value)}
                        className="form-control"
                        spellCheck={ false }
                        placeholder="Type your query"></input>
                    <datalist id="datalist">
                        {expiationData.map((item) => (
                            <option value={item.expiationOffenceCode }
                                key={item.expiationOffenceCode}
                                expiationOffenceCode={item.expiationOffenceCode}

                            />
                        )
                        )
                        }
                        
                    </datalist>
                </div>
                < div className="col-3 text-left mt-3" >
                    <button type="button" className="btn btn-dark" onClick={searchQuery}>Search</button>
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

export default ExpiationList



