import React from 'react';
import './Table.scss';

function Table({ headers, rows }) {
    return (
        <table className="table">
            <thead>
            <tr>
                {headers.map((header, index) => (
                    <th key={index}>{header}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {rows.length > 0 ? (
                rows.map((row, index) => (
                    <tr key={index}>
                        {row.map((cell, i) => (
                            <td key={i}>{cell}</td>
                        ))}
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={headers.length}><span className="no-data">No data available.</span></td>
                </tr>
            )}
            </tbody>
        </table>
    );
}

export default Table;
