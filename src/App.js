import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';

function App() {

  // Citas en localstorage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));   // json parse pasa el arreglo a un string para que lo lea el localstorage
  if(!citasIniciales){
    citasIniciales = [];
  }
  // Arreglo de citas
  const [citas, setCitas] = useState(citasIniciales);

  // useEffect para realizar operaciones cuando el state cambia
  useEffect( () => {
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));   // json parse pasa el arreglo a un string para que lo lea el localstorage
    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas))
    } else{
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas] );


  // Función que tome las citas actuales y agregue la nueva
  const crearCita = cita => {
    setCitas([ ...citas, cita ]);
  }

  // Función que elimina una cita por su id
  const eliminarCita = id => {
     const nuevasCitas = citas.filter(cita => cita.id !== id) // itera en todas las citas igual que un for each
     setCitas(nuevasCitas);
  }

  // Mensaje condicional 
  
  const titulo = citas.length === 0  ? 'No hay citas' : 'Administra tus citas';

  
  return (
    <Fragment>
    <h1>Administrador de pacientes</h1>
    <div className="container">
        <div className="row">
          
          <div className="one-half column">
             <Formulario
              crearCita={crearCita}
             ></Formulario>
          </div>
          <div className="one-half column">
              <h2>{titulo}</h2>
              {citas.map(cita => (
                <Cita
                  key={cita.id}
                  cita={cita}    
                  eliminarCita={eliminarCita}           
                ></Cita>
              ))}
          </div>

        </div>
    </div>
    </Fragment>
  );
}

export default App;
