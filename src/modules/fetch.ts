import { baseURL } from "./backend";

export const POSTFetch = (
  endpoint: string,
  bodyObj: object,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callback: (data: any) => void
) => {
  fetch(baseURL + endpoint, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(bodyObj),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Errore nella richiesta");
      }
      return response.json();
    })
    .then((data) => {
      callback(data);
    })
    .catch((error) => {
      console.error("Errore:", error);
    });
};

export const GETFetch = (
  endPoint: string,
  callbackThen: (data: any) => void,
  callbackError: (error: any) => void,
  callbackFinally: () => void
) => {
  const token = localStorage.getItem("JWT");
  fetch(baseURL + endPoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Errore HTTP! Stato: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      callbackThen(data);
    })
    .catch((error) => {
      callbackError(error);
      console.error("Errore durante il fetch:", error);
    })
    .finally(() => {
      callbackFinally();
    });
};
