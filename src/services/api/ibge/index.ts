import axios, { AxiosResponse } from "axios";

const apiIBGE = axios.create({
  baseURL: "https://servicodados.ibge.gov.br/api/v1/localidades",
});

interface IUFIBGE {
  sigla: string;
}
export const retrieveUF = (): Promise<AxiosResponse<IUFIBGE[]>> =>
  apiIBGE.get("/estados");

interface ICitiesIBGE {
  nome: string;
}
export const retrieveCities = (
  uf: string
): Promise<AxiosResponse<ICitiesIBGE[]>> =>
  apiIBGE.get(`/estados/${uf}/municipios`);
