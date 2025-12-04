import { tipoUsuario } from "./tipoUsuario"

export interface Usuario {
    id: number
    nome: string
    senha: string
    tipoUsuario: tipoUsuario
    data_criacao: string
}