import React from 'react'

const Favorites = ({ favo, onRemove }) => {

    return (
        <>
            {favo.map((favorite, index) => favorite.isFav == true && (
                <tr key={index}>
                    {<td> <input type="radio" className='check' defaultChecked={true} onClick={() => onRemove(favorite.id)} /> </td>}
                    <td>{favorite.id}</td>
                    <td>{favorite.type}</td>
                    {favorite.setup ? <td>{favorite.setup}</td> : <td colSpan={2}>{favorite.joke}</td>}
                    {favorite.setup ? <td>{favorite.delivery}</td> : ""}
                </tr>
            ))}
        </>
    )
}

export default Favorites