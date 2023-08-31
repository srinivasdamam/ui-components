'use client'

import { useEffect, useState } from "react"


const COLUMNS = [{
    "title": "Id",
    "key": "id",
    "sort": null,
    "dataType": "number"
}, {
    "title": "First Name",
    "key": "firstName",
    "sort": null,
    "dataType": "text"
}, {
    "title": "Last Name",
    "key": "lastName",
    "sort": null,
    "dataType": "text"
}, {
    "title": "Gender",
    "key": "gender",
    "sort": null,
    "dataType": "text"
}, {
    "title": "Email",
    "key": "email",
    "sort": null,
    "dataType": "text"
}, {
    "title": "Phone no",
    "key": "phone",
    "sort": null,
    "dataType": "number"
}, {
    "title": "Height",
    "key": "height",
    "sort": null,
    "dataType": "number"
}]

function sortDataByKey(data, key, sortBy) {
    let sorted = [...data];
    const isDescending = sortBy === "desc";

    return sorted.sort((a, b) => {
        if (a[key] > b[key]) {
            return isDescending ? -1 : 1
        } else if (a[key] < b[key]) {
            return isDescending ? 1 : -1
        } else {
            return 0
        }
    }); 
}

export default function Table() {
    const [users, setUsers] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [columns, setColumns] = useState([...COLUMNS]);

    const sortColumn = (col) => {
        let sortBy = col.sort;
        if (sortBy === null) {
            sortBy = "asc";
        } else if (sortBy === "asc") {
            sortBy = "desc"
        } else if (sortBy === "desc") {
            sortBy = null
            return setTableData([...users]);
        }

        setColumns(columns.map(col => {
            if (col.key === col.key) {
                col.sort = sortBy;
            }
            return col;
        }));

        setTableData(sortDataByKey(tableData, col.key, sortBy));
    }


    useEffect(() => {
        fetch("https://dummyjson.com/users").then(res => res.json()).then(res => {
            setUsers(res.users);
            setTableData(res.users);
        })
    }, []);


    if (users.length === 0) return null;

    return (
        <table>
            <thead>
                <tr>
                    { COLUMNS.map(col => <th key={col.key} onClick={() => sortColumn(col)}>{col.title}</th>)}
                </tr>
            </thead>
            <tbody>
                { tableData.map(user => {
                    return (
                        <tr key={user.id}>
                            {
                                ["id", "firstName", "lastName", "gender", "email", "phone", "height"].map(col => {
                                    return (
                                        <td key={`${user.id}.${col}`}>
                                            { user[col]}
                                        </td>
                                    )
                                }) 
                            }
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}