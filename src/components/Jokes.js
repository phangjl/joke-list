import Favorites from './Favorites';
import Joke from './Joke';
import { useEffect, useState, useReducer } from 'react'

const Jokes = ({ username }) => {
    const [jokeType, setJokeType] = useState('Any')
    const [jokes, setJokes] = useState([])
    const [favorites, setFavorites] = useState([])
    const [displayFavoriteList, setDisplayFavoriteList] = useState([])
    const [favOrNot, setFavOrNot] = useState(false)

    useEffect(() => {
        const fetchJokes = async () => {
            const res = await fetch(`https://v2.jokeapi.dev/joke/${jokeType}?amount=10`)
            const data = await res.json()
            setJokes(data.jokes)
        }
        fetchJokes()
    }, [jokeType])

    function selectOpt() {
        setJokeType(document.getElementById("selectOption").value)
    }

    const favList = () => {
        var temp = []
        temp = JSON.parse(localStorage.getItem("jokes")) || []
        setFavorites(temp)
        setDisplayFavoriteList(!displayFavoriteList)
        setFavOrNot(!favOrNot)
        if (displayFavoriteList === false) {
            refresh()
        }

    }

    const removeFav = (id) => {
        var temp = []
        var idx = []
        temp = JSON.parse(localStorage.getItem("jokes")) || []

        for (let i = 0; i < temp.length; i++) {
            if (id == temp[i].id) {
                idx = i;
            }
        }
        setFavorites(favorites.filter((favorite) => favorite.id !== temp[idx].id))
        temp.splice(idx, 1)
        localStorage.setItem("jokes", JSON.stringify(temp));
    }

    const toggleFav = (id, index, btn) => {
        console.log(btn.checked)
        var temp = []
        temp = JSON.parse(localStorage.getItem("jokes")) || []
        jokes[index]["isFav"] = true;
        temp.push(jokes[index])
        localStorage.setItem("jokes", JSON.stringify(temp))
        btn.disabled = true

    }

    async function refresh() {
        const res = await fetch(`https://v2.jokeapi.dev/joke/${jokeType}?amount=10`)
        const data = await res.json()
        setJokes(data.jokes)

        let checkboxes = document.getElementsByClassName('check');
        for (let i = 0, n = checkboxes.length; i < n; i++) {
            checkboxes[i].checked = false;
        }
    }

    return (
        <>
            <div className='bodyDiv'>
                <div className='greetings'>Hi,{username}</div>
                <div className='jokeList'>
                    <div className='title'>Jokes List</div>
                    <div className='favbtn'>
                        {favOrNot === false ? <button className='fav' onClick={favList}>Favorite List</button> : <button className='fav' onClick={favList}>CLOSE</button>}
                    </div>
                </div>
                <div className='selectRefresh'>
                    <div className='selectDiv'>
                        <select className='selectBtn' id="selectOption" onChange={selectOpt} disabled={favOrNot === false ? false : true}>
                            <option value="Any">All</option>
                            <option value="Pun">Pun</option>
                            <option value="Dark">Dark</option>
                            <option value="Programming">Programming</option>
                        </select>
                    </div>
                    <div className='refreshDiv'>
                        <button className='refreshBtn' onClick={refresh} disabled={favOrNot === false ? false : true}>Refresh</button>
                    </div>
                </div>
                <div className='tableDiv'>
                    <table border="1px" width='100%'>
                        <thead>
                            <tr>
                                {favOrNot === false ? <th width='7%'>FAVORITE</th> : <th width='7%'>REMOVE</th>}
                                <th width='3%'>ID</th>
                                <th width='10%'>TYPE OF JOKES</th>
                                <th width='40%'>SETUP</th>
                                <th width='40%'>PUNCHLINE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayFavoriteList ? <Joke joke={jokes} onToggle={toggleFav} /> : <Favorites favo={favorites} onRemove={removeFav} />}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Jokes