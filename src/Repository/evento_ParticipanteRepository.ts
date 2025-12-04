import { dbPromise } from './db';

export async function cadastrarEventoParticipante(
    evento_id: number,
    usuario_id: number,
    data_criacao: string
  ) {
    const db = await dbPromise;
    await db.run(
      'INSERT INTO evento_participante (evento_id, usuario_id, data_criacao) VALUES (?, ?, ?)',
      evento_id,
      usuario_id,
      data_criacao
    );
  }
  
export async function buscarEventoParticipante(id: number) {
    const db = await dbPromise
    return await db.all ('SELECT * FROM evento_participante WHERE evento_id = ?', [id])
  }

export async function criarInscricao (evento_id: number, usuario_id: number) {
    const db = await dbPromise
    return await db.run ('INSERT INTO evento_participante (evento_id, usuario_id, data_inscricao) values (?, ?, ?)', [evento_id, usuario_id, new Date ().toISOString()])
   }