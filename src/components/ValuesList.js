import { useState, useEffect } from 'react';
import { url } from '../config/configuration.js'

export default function ValueList(props) {
    let [movies, setMovies] = useState([]);

    useEffect(() => {
        console.log(url);
        fetch(url, {
            method: 'GET',
        }).then(res => res.json())
        .then(res => {
            console.log(res);
            setMovies(res)})
        .catch(err => console.log(err));
}, []);


return (
    <div>

        <label> </label>
        <ul>
            {/* {(glucoseValues.length > 0) ? (
                glucoseValues.map(sgv =>
                    <SensorValue
                        key={sgv._id}
                        sgv={sgv}
                        onClick={() => tryToCreate()}
                    />
                )
            ) : <li>No values</li> */}
        </ul>
    </div>
);
}