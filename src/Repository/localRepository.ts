import { dbPromise } from './db';

export async function cadastrarLocal(
    nome: string,
    capacidade: number
  ) {
    const db = await dbPromise;
    await db.run(
      'INSERT INTO local (nome, capacidade) VALUES (?, ?)',
        nome,
        capacidade
    );
    console.log(`[Repository] Local "${nome}" cadastrado com sucesso.`);
  }

  export async function atualizarLocal(id: number, nome: string, capacidade: number) {
    const db = await dbPromise
    await db.run ("UPDATE local SET nome = ?, capacidade = ? WHERE id = ?", [nome, capacidade, id])
    console.log(`[REPOSITORY] Local ${id} atualizado com sucesso!`);
  } 

  export async function deletarLocal (id: number) {
    const db = await dbPromise
    await db.run ("DELETE FROM local WHERE id = ?", [id])
    console.log(`[REPOSITORY] Local ${id} deletado com sucesso!`);
  }

  export async function buscarLocalId (local_id: number) {
    const db = await dbPromise
    return await db.get ('SELECT * FROM local WHERE id = ?', [local_id])
  }

  export async function verificarCapacidadeLocal (id: number) {
    const db = await dbPromise
    const resultado = await db.get ('SELECT capacidade FROM local where id = ?', [id])
    return resultado.capacidade
  }

