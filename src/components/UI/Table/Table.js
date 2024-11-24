import React from 'react';
import './Table.scss';
import Button from '../Button/Button';

function Table({ headers, rows, onOpenApplication }) {
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
            {/*{rows.length > 0 ? (*/}
            {/*    rows.map((row, index) => (*/}
            {/*        <tr key={index}>*/}
            {/*            {row.map((cell, i) => (*/}
            {/*                <td key={i}>{cell}</td>*/}
            {/*            ))}*/}
            {/*            {onOpenApplication && (*/}
            {/*                <td>*/}
            {/*                    <Button onClick={() => onOpenApplication(index)} className="primary">*/}
            {/*                        Open*/}
            {/*                    </Button>*/}
            {/*                </td>*/}
            {/*            )}*/}
            {/*        </tr>*/}
            {/*    ))*/}
            {/*) : (*/}
            {/*    <tr>*/}
            {/*        <td colSpan={headers.length + 1}>*/}
            {/*            <span className="no-data">No data available.</span>*/}
            {/*        </td>*/}
            {/*    </tr>*/}
            {/*)}*/}
            </tbody>
        </table>
    );
}

export default Table;
