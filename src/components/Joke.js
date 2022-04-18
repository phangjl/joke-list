import React from 'react'
const Joke = ({ joke, onToggle }) => {

    return (
        <>
            {joke.map((jk, index) => (
                <tr key={index}>
                    {<td> <input type="radio" id={`btn${jk.id}`} className='check' onClick={(e) => onToggle(jk.id, index, e.target)} /> </td>}
                    <td>{jk.id}</td>
                    <td>{jk.type}</td>
                    {jk.setup ? <td>{jk.setup}</td> : <td colSpan={2}>{jk.joke}</td>}
                    {jk.setup ? <td>{jk.delivery}</td> : ""}
                </tr>
            ))}
        </>
    )
}

export default Joke