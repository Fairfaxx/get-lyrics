import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import axios from 'axios';
import Cancion from './Cancion';
import Info from './components/Info';



function App() {

    const [busquedaLetra, setBusquedaLetra] = useState({});
    const [letra, setLetra] = useState('');
    const [info, setInfo] = useState({});

    useEffect(() => {
        if (Object.keys(busquedaLetra).length === 0) return;

        const apiLetra = async () => {
            const { artista, cancion } = busquedaLetra;
            const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
            const url2 = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artista}`

            const [letra, informacion] = await Promise.all([
                axios.get(url),
                axios.get(url2),
            ]);

            setLetra(letra.data.lyrics);
            setInfo(informacion.data.artists[0]);

            // setLetra(response.data.lyrics)

        }

        apiLetra()


    }, [busquedaLetra])


    return (

        <Fragment>

            <Formulario
                setBusquedaLetra={setBusquedaLetra}
            />

            <div className='container mt-5'>
                <div className='row'>
                    <div className='col-md-6'>
                        <Info
                            info={info}
                        />
                    </div>
                    <div className='col-md-6'>
                        <Cancion
                            letra={letra}
                        />
                    </div>
                </div>
            </div>

        </Fragment>
    );
}

export default App;
