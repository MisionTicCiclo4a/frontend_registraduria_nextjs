import SideNav from "components/Layout/SideNav";
import { authOptions } from "./api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";
import { deleteData, getData, updateData } from "helpers/fetchPost";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

import Link from "next/link";

export default function Mesas() {
  const [dataTables, setdataTables] = useState([]);
  const [idUpdate, setIdUpdate] = useState("");
  const [infoMesas, setinfoMesas] = useState({
    cedulasInscritas: "",
    numeroMesa: "",
  });

  const captureValue = (e) => {
    setinfoMesas({
      ...infoMesas,
      [e.target.name]: e.target.value,
    });
  };

  const url = "http://127.0.0.1:5000/tables";
  const traeData = async () => {
    console.log("me llamo");
    //Traer partidos
    const token = localStorage.getItem("token");
    if (token) {
      const dataBackend = await getData(token, url);

      setdataTables(dataBackend);
    }
  };

  useEffect(() => {
    traeData();
  }, []);

  const deleteTable = async (id) => {
    //Eliminar Partidos
    console.log(id);
    const token = localStorage.getItem("token");
    const resBackend = await deleteData(token, url, id);
    traeData();
  };

  const updataTable = async () => {
    const token = localStorage.getItem("token");
    console.log(token, url, idUpdate, infoMesas);
    
    const res =await updateData(token, url, idUpdate, infoMesas);
    res && traeData()
  };

  return (
    <SideNav>
      {/* start Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Actualizar Mesa
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
                      name="cedulasInscritas"
                      type="text"
                      id="form3Example1"
                      className="form-control"
                      placeholder="Cedulas Inscritas"
                    />
                  </div>
                </div>
                <div className=" mb-4">
                  <input
                    onChange={captureValue}
                    name="numeroMesa"
                    type="text"
                    id="form3Example3"
                    className="form-control"
                    placeholder="Numero de Mesa"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-light"
                data-mdb-dismiss="modal"
              >
                Close
              </button>
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  updataTable();
                }}
                className="btn btn-primary"
                data-mdb-dismiss="modal"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* end Modal */}

      <div className="container-fluid h-100">
        <div className="row mx-5 d-flex justify-content-center align-items-center">
          {dataTables.length > 1 ? (
            <>
              <div className="form-outline mt-4">
                <Link href="/add/mesas">
                  <button className="btn btn-success">Agregar Mesa</button>
                </Link>
              </div>
              <table className="table mx-4 table-sm text-center p-4">
                <thead>
                  <tr>
                    <th>Codigo unico de le mesa</th>
                    <th>Cedulas Inscritas</th>
                    <th>Numero de Mesa</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {dataTables.map((ele, index) => (
                    <tr key={index}>
                      <td>{ele._id}</td>
                      <td>{ele.cedulasInscritas}</td>
                      <td>{ele.numeroMesa}</td>
                      <td>
                        <div className="d-flex gap-2 justify-content-center">
                          <button
                            className="btn btn-light btn-sm"
                            data-mdb-toggle="modal"
                            data-mdb-target="#exampleModal"
                            value={ele._id}
                            onClick={() => setIdUpdate(ele._id)}
                          >
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </button>
                          <button
                            onClick={() => deleteTable(ele._id)}
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
