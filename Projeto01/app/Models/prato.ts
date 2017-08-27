import { IRestaurante } from './restaurante'

export interface IPrato {
    id: number,
    nome: string,
    preco: number,
    restaurantefk: IRestaurante
}