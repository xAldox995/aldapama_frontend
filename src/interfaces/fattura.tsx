import Cliente from "./Cliente";
import Stato from "./Stato";
import Utente from "./Utente";

interface Fattura {
  id: number;
  data: string;
  importo: number;
  numFatt: string;
  stato: Stato;
  utente: Utente;
  cliente: Cliente;
}
export default Fattura;
