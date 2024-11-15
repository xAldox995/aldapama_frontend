import { useEffect, useState } from "react";
import PageData from "../interfaces/PageData";
import { GETFetch } from "../modules/fetch";

const Invoices = () => {
  const [data, setData] = useState<PageData>({
    totalElements: 0,
    totalPages: 0,
    size: 0,
    content: [
      {
        id: 0,
        data: "2024-11-14",
        importo: 0,
        numFatt: "string",
        stato: {
          id: 0,
          descrizione: "string",
        },
        utente: {
          id: 0,
          username: "string",
          email: "string",
          nome: "string",
          cognome: "string",
          avatar: "string",
        },
        cliente: {
          id: 0,
          ragioneSociale: "string",
          partitaIva: "string",
          dataInserimento: "2024-11-14T14:30:54.665Z",
          dataUltimoContatto: "2024-11-14T14:30:54.665Z",
          pec: "string",
          telefono: "string",
          logoAziendale: "string",
        },
      },
    ],
    number: 0,
    sort: { empty: true, sorted: true, unsorted: true },
    numberOfElements: 0,
    first: true,
    last: true,
    pageable: {
      offset: 0,
      sort: { empty: true, sorted: true, unsorted: true },
      unpaged: true,
      pageSize: 0,
      pageNumber: 0,
      paged: true,
    },
    empty: true,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const checkResponse=(response:any)=>{
    setData(response);
    setError(null);
  }

  const errorResponse = (error: any) => {
    setError("Errore durante il caricamento delle fatture.");
  console.error("Errore durante il fetch delle fatture:", error);
  }

  const finallyCase =()=>{
    setLoading(false);
  }
  
  const fetchFatture = (page: number=0, size: number=10, sort: string= "id") => {
    setLoading(true);
    const queryParams = `?page=${page}&size=${size}&sort=${sort}`;
    GETFetch("/fatture"+queryParams,checkResponse, errorResponse,finallyCase);

  };

  useEffect(() => {
    fetchFatture();
  }, []);

  const handleNextPage = () => {
    if (!data.last) {
      fetchFatture(data.number + 1);
    }
  };

  const handlePreviousPage = () => {
    if (!data.first) {
      fetchFatture(data.number - 1);
    }
  };

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Elenco Fatture</h1>
      <table className="table table-bordered table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Data</th>
            <th>Importo</th>
            <th>Numero Fattura</th>
            <th>Stato</th>
            <th>Utente</th>
            <th>Cliente</th>
          </tr>
        </thead>
        <tbody>
          {data.content.map((fattura) => (
            <tr key={fattura.id}>
              <td>{fattura.data}</td>
              <td>{fattura.importo} €</td>
              <td>{fattura.numFatt}</td>
              <td>{fattura.stato.descrizione}</td>
              <td>
                <div className="d-flex align-items-center">
                  <img
                    src={fattura.utente.avatar}
                    alt={`${fattura.utente.nome} ${fattura.utente.cognome}`}
                    className="rounded-circle me-2"
                    style={{ width: "40px", height: "40px" }}
                  />
                  <div>
                    {fattura.utente.nome} {fattura.utente.cognome}
                  </div>
                </div>
              </td>
              <td>
                <div>
                  <strong>{fattura.cliente.ragioneSociale}</strong>
                  <br />
                  P.IVA: {fattura.cliente.partitaIva}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-between align-items-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={data.first}
          className="btn btn-primary"
        >
          Indietro
        </button>
        <span>
          Pagina {data.number + 1} di {data.totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={data.last}
          className="btn btn-primary"
        >
          Avanti
        </button>
      </div>
    </div>
  );
};

export default Invoices;
