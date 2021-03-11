import React, { Fragment, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {

    // Crear State de citas
    const [cita, setCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    })

    // State de error
    const [error, setError] = useState(false)

    // Función que se ejecuta cada que el usuario escribe en un imput
    const handleChange = e => {
        setCita({
            ...cita,
            [e.target.name]: e.target.value
        })
    }

    // Extraer los valores
    const { mascota, propietario, fecha, hora, sintomas} = cita;

    // Cuando el usuario envia el formulario
    const submitCita = e => {
        e.preventDefault();

        // Validar
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === ''){
            setError(true);
            return;
        } 
        setError(false);

        // Asignar ID
        cita.id = uuidv4();

        // Crear la cita
        crearCita(cita);
        // Reiniciar el form
        setCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        });
    }
    return ( 
        <Fragment>
            <h2>Crear cita</h2>
            { error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null} 
            <form
                onSubmit={submitCita}
            >
                <label>Nombre mascota</label>
                <input  
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre mascota"
                    onChange={handleChange}
                    value={mascota}
                ></input>

                <label>Nombre Dueño</label>
                <input  
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre Dueño de la mascota"
                    onChange={handleChange}
                    value={propietario}
                ></input>    

                <label>Fecha</label>
                <input  
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={handleChange}
                    value={fecha}
                ></input>

                <label>Hora</label>
                <input  
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={handleChange}
                    value={hora}
                ></input>

                <label>Síntomas</label>
                <textarea
                    className="u-full-width"
                    name="sintomas"
                    onChange={handleChange}
                    value={sintomas}
                ></textarea>

                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar cita</button>

            </form>
        </Fragment>
        );
}

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}
export default Formulario;
