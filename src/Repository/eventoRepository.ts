import { dbPromise } from './db';

export async function cadastrarEvento(
    titulo: string,
    data_evento: string,
    local_id: number
  ) {
    const db = await dbPromise;
    await db.run(
      'INSERT INTO evento (titulo, data_evento, local_id) VALUES (?, ?, ?)',
      titulo,
      data_evento,
      local_id
    );
    console.log(`[Repository] Evento "${titulo}" cadastrado.`);
  }

  export async function atualizarEvento(titulo: string, data_evento: string, local_id: number, id: number) {
    const db = await dbPromise
    await db.run ("UPDATE evento SET titulo = ?, data_evento = ?, local_id = ? WHERE id = ?", [titulo, data_evento, local_id, id])
    console.log(`[REPOSITORY] Evento ${id} atualizado com sucesso!`);
  }

  export async function deletarEvento(id: number) {
    const db = await dbPromise
    await db.run ("DELETE FROM evento WHERE id = ?", [id])
    console.log(`[REPOSITORY] Evento ${id} deletado com sucesso!`);
  }

  export async function buscarEventoId (evento_id: number) {
    const db = await dbPromise
    return await db.get ('SELECT * FROM evento WHERE id = ?', [evento_id])
  }

  export async function verificarInscricoesEvento (evento_id: number) {
    const db = await dbPromise
    const resultado = await db.get ('SELECT COUNT(*) as total_participante FROM evento_participante where evento_id = ?', [evento_id])
    return resultado.total_participante
  }
  
  