import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

import SideNav from "components/Layout/SideNav";
import { deleteData, getData, updateData } from "helpers/fetchPost";

import { unstable_getServerSession } from "next-auth";
import { useEffect, useState } from "react";
import { authOptions } from "./api/auth/[...nextauth]";
import { useRouter } from "next/router";
import Link from "next/link";




export default function Partidos() {
  const { push } = useRouter();
  const [dataParties, setDataParties] = useState([]);

  const [infoPartie, setInfoPartie] = useState({
    codeparties: "",
    lema: "",
    logo: "",
    name: "",
  });

  const [idUpdate, setIdUpdate] = useState("");

  const captureValue = (e) => {
    setInfoPartie({
      ...infoPartie,
      [e.target.name]: e.target.value,
    });
  };

  const url = "http://127.0.0.1:5000/parties";
  const traeData = async () => {
    //Traer partidos
    const token = localStorage.getItem("token");
    if (token) {
      const dataBackend = await getData(token, url);

      setDataParties(dataBackend);
    }
  };

  useEffect(() => {
    traeData();
  }, []);

  const deletePartie = async (id) => {
    //Eliminar Partidos

    const token = localStorage.getItem("token");
    const resBackend = await deleteData(token, url, id);
    traeData();
  };

  const updatePartie = async () => {
    const token = localStorage.getItem("token");
    const res =await updateData(token, url, idUpdate, infoPartie);
    res && traeData();
  };

  return (
    <SideNav>
      {/* start Modal */}
      <div
        className="modal fade mt-5"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Actualizar Partido
              </h5>
              <button
                type="button"
                className="btn-close"
                data-mdb-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* start form */}
              <form className="">
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
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-mdb-dismiss="modal"
              >
                Cancelar
              </button>
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  updatePartie();
                }}
                className="btn btn-primary"
                data-mdb-dismiss="modal"
              >
               Actualizar
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* end Modal */}

      <div className="container-fluid h-100">
        <div className="row mx-4 d-flex justify-content-center align-items-center">
          {dataParties.length > 1 ? (
            <>
              <div className="form-outline mt-4">
                <Link href="/add/partido">
                  <button className="btn btn-success">Agregar Partido</button>
                </Link>
              </div>
              <table className="table mx-4 mt-4 table-sm text-center ">
                <thead className="bg-light">
                  <tr>
                    <th className="fw-bold">Emblema</th>
                    <th className="fw-bold">Nombre</th>
                    <th className="fw-bold">Lema</th>
                    <th className="fw-bold">Codigo de partido</th>
                    <th className="fw-bold">Identificador Unico</th>
                  </tr>
                </thead>
                <tbody>
                  {dataParties.map((ele, index) => (
                    <tr key={index}>
                      <td>
                        <div className="d-flex align-items-center ">
                          <img 
                            src={ele.logo}
                            alt=""
                            className="imgTableParties"
                          />
                        </div>
                      </td>
                      <td>
                        <div>
                          <p>{ele.name}</p>
                        </div>
                      </td>
                      <td>
                        <p>{ele.lema}</p>
                      </td>

                      <td>
                        <p className="fw-normal mb-1">{ele.codeparties}</p>
                      </td>

                      <td>{ele._id}</td>
                      <td>
                        <div className="d-flex gap-2 justify-content-center">
                          <button
                            className="btn btn-light btn-sm"
                            data-mdb-toggle="modal"
                            data-mdb-target="#exampleModal"
                            value={ele._id}
                            onClick={(e) => setIdUpdate(e.target.value)}
                          >
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </button>
                          <button
                            onClick={() => deletePartie(ele._id)}
                            className="btn btn-danger btn-sm"
                          >
                            <FontAwesomeIcon icon={faTrashCan} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <div className="spinner-border text-info" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
        </div>
      </div>
    </SideNav>
  );
}
export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
