"use client";

import { useEffect, useReducer } from 'react';
import movies from '../../datasets/movies';

const styles = {
    container: {
        position: "relative",
        margin: "0 auto",
        width: "25%"
    },
    input: {
        display: "block",
        height: 50,
        width: "100%",
        fontSize: 24,
    },
    dropdown: {
        padding: 0,
        listStyle: "none",
        maxHeight: "500px",
        overflowY: "scroll"
    },
    dropdownItem: {
        margin: "5px 0",
        cursor: "pointer"
    }
}


const INITIAL_STATE = {
    data: [...movies],
    filteredData: [...movies],
    showSuggestions: false,
    searchTerm: "",
    selected: []
}



function reducer(state, action) {
    switch(action.type) {
        case "SET_DATA": 
            return {...state, data: action.data}
        case "SET_FILTERED_DATA":
            return {...state, filteredData: action.data}
        case "TOGGLE":
            return {...state, showSuggestions: !state.showSuggestions}
        case "ON_SEARCH_TERM_CHANGE":
            return {...state, searchTerm: action.searchTerm}
        case "ON_SELECT": 
            return {...state, selected: [...action.selected]}
        default:
            return state;
    }
}

export default function AutoComplete() {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
    const { data, showSuggestions, searchTerm, filteredData } = state;
    
    useEffect(() => {
        const filteredData = searchTerm.length ? data.filter(item => {
            if (item.title.contains(s)) {
                return true;
            }
            return false
        }) : data;
        dispatch({type: "SET_FILTERED_DATA", filteredData })
    }, [searchTerm])

    return (
        <div style={styles.container}>
            <input style={styles.input} onFocus={() => dispatch({type: "TOGGLE"})} onBlur={() =>  dispatch({type: "TOGGLE"})}/>
            { showSuggestions ? (
                <ul style={styles.dropdown}>
                    { filteredData.map(movie => <li key={`${movie.title}.${movie.year}`} style={styles.dropdownItem}>{movie.title}</li>)}
                </ul>
            ) : null}
        </div>
    )
}