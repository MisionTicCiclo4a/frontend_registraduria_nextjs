import SideNav from "components/Layout/SideNav";
import { createData } from "helpers/fetchPost";

import { useRouter } from "next/router";
import {  useState } from "react";

export default function AddPartido() {
  const { push } = useRouter();
  const [infoParties, setinfoParties] = useState({
    codeparties: "",
    lema: "",
    logo: "",
    name: "",
  });

  const captureValue = (e) => {
    setinfoParties({
      ...infoParties,
      [e.target.name]: e.target.value,
    });
  };

  const url = "https://web-production-03f6.up.railway.app/parties";
  const sendData = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (token && infoParties) {
      console.log(token, url, infoParties);
      const dataBackend = createData(token, url, infoParties);
      dataBackend.ok === "200" && alert("creado con exito");
      push("/partidos");
    }
  };

  return (
    <SideNav>



      <div className="container-fluid h-100 gap-2">
        <div className="row gap-5 mx-5 d-flex justify-content-center align-items-center">
          {/* start form */}
          <form className="col-5 ">
            <h5 className=" my-2">Agregar Partido</h5>

            <div className="mb-4">
              <div className="">
                <input
                  onChange={captureValue}
                  name="codeparties"
                  type="text"
                  id="form3Example1"
                  className="form-control"
                  placeholder="Codigo del Partido"
                />
              </div>
            </div>
            <div className=" mb-4">
              <input
                onChange={captureValue}
                name="name"
                type="text"
                id="form3Example3"
                className="form-control"
                placeholder="Nombre"
              />
            </div>
            <div className="mb-4">
              <div className="">
                <input
                  onChange={captureValue}
                  name="lema"
                  type="text"
                  id="form3Example2"
                  className="form-control"
                  placeholder="Lema"
                />
              </div>
            </div>
            <div className=" mb-4">
              <input
                onChange={captureValue}
                name="logo"
                type="text"
                id="form3Example3"
                className="form-control"
                placeholder="Url Logo"
              />
            </div>

            <button
             
              type="submit"
              onClick={sendData}
              className="col-12 btn btn-success"
            >
              Agregar Partido
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
