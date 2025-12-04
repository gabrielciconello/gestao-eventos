import { dbPromise } from './db';
import * as usuarioRepository from "../Repository/usuarioRepository";

export async function registrarLog(
    detalhes: string,
    acao: string
  ) {
    const db = await dbPromise
    const data_hora = new Date().toLocaleString('pt-br')
    await db.run(
      'INSERT INTO log (detalhes, acao, data_hora) VALUES (?, ?, ?)', [detalhes, acao, data_hora]
    )};

export async function verLog () {
    const db = await dbPromise
    const logs = await db.all ("SELECT * FROM log ORDER BY id DESC")
    return logs;
}

export async function pegarNomeAtor(id: number) {
    const u = await usuarioRepository.buscarUsuarioPorId(id);
    return u ? u.nome : `Desconhecido (ID ${id})`;
  }
