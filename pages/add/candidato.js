import SideNav from "components/Layout/SideNav";
import { createData } from "helpers/fetchPost";
import { useRouter } from "next/router";
import { useState } from "react";

export default function AddCandidatos() {
  const { push } = useRouter();
  const [infoCandidatos, setinfoCandidatos] = useState({
    apellido: "",
    cedula: "",
    nombre: "",
    numeroderesolucion: "",
  });

  const captureValue = (e) => {
    setinfoCandidatos({
      ...infoCandidatos,
      [e.target.name]: e.target.value,
    });
  };

  const url = "https://web-production-03f6.up.railway.app/candidates";
  const sendData = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (token && infoCandidatos) {
      const dataBackend = createData(token, url, infoCandidatos);
      dataBackend.ok === "200" && alert("creado con exito");
      push("/candidatos");
    }
  };

  return (
    <SideNav>
      <div className="container-fluid h-100 gap-2">
        <div className="row gap-5 mx-5 d-flex justify-content-center align-items-center">
          <form className="col-5 ">
            <h5 className=" my-2">Agregar Candidato</h5>
            <div className="mb-4">
              <div className="">
                <input
                  onChange={captureValue}
                  name="nombre"
                  type="text"
                  id="form3Example1"
                  className="form-control"
                  placeholder="Nombre"
                />
              </div>
            </div>
            <div className="mb-4">
              <div className="">
                <input
                  onChange={captureValue}
                  name="apellido"
                  type="text"
                  id="form3Example2"
                  className="form-control"
                  placeholder="Apellido"
                />
              </div>
            </div>

            <div className=" mb-4">
              <input
                onChange={captureValue}
                name="cedula"
                type="text"
                id="form3Example3"
                className="form-control"
                placeholder="Cedula"
              />
            </div>
            <div className=" mb-4">
              <input
                onChange={captureValue}
                name="numeroderesolucion"
                type="text"
                id="form3Example3"
                className="form-control"
                placeholder="Numero de resolucion"
              />
            </div>
            {/* 
            <div className=" mb-4">
              <div className="col-12 ">
                <span className="visually-hidden" for="inlineFormSelectPref">
                  Preference
                </span>
                <select name="partido" className="select border-0">
                  <option value="1">Partido Conservador</option>
                  <option value="2">Centro Democrático</option>
                  <option value="3">Partido de la U</option>
                  <option value="4">Partido Cambio Radical</option>
                  <option value="5">Alianza Verde</option>
                  <option value="6">Pacto Histórico</option>
                </select>
              </div>
            </div> */}

            <button
          
              type="submit"
              onClick={sendData}
              className="col-12 btn btn-success"
            >
              Agregar Candidato
            </button>
          </form>
          <div className="col-6 rounded-5 shadow p-4">
            <h5>¡Que es el numero de resolucion?</h5>
            <p>
              

              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit cumque corporis molestias officiis, consequuntur in blanditiis magni pariatur repudiandae accusantium deserunt temporibus error aspernatur commodi, cupiditate libero dolor quis? Natus.consequuntur in blanditiis magni pariatur repudiandae accusantium deserunt temporibus error aspernatur commodi, cupiditate libero dolor quis? Natus.
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit cumque corporis molestias officiis, consequuntur in blanditiis magni pariatur 
            </p>
          </div>
        </div>
      </div>
    </SideNav>
  );
}
