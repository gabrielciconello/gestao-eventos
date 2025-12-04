import { tipoUsuario } from '../Models/tipoUsuario';
import { dbPromise } from './db';

export async function cadastrarUsuario(
    nome: string,
    senha: string,
    tipoUsuario: tipoUsuario,
    data_criacao: string
  ) {
    const db = await dbPromise;
    await db.run(
      'INSERT INTO usuario (nome, senha, tipoUsuario, data_criacao) VALUES (?, ?, ?, ?)',
      nome,
      senha,
      tipoUsuario,
      data_criacao
    );
    console.log(`[Repository] Usuário "${nome}" cadastrado com sucesso!.`);
  }

 export async function deletarUsuario(id:number) {
  const db = await dbPromise
  await db.run ("DELETE FROM usuario WHERE id = ?", [id])
  console.log(`[REPOSITORY] Usuário ${id} deletado com sucesso!`);
 }

 export async function atualizarUsuario(id: number, nome: string, tipoUsuario: tipoUsuario) {
  const db = await dbPromise
  await db.run('UPDATE usuario SET nome = ?, tipoUsuario = ? where id = ?', [nome, tipoUsuario, id])
  console.log(`[REPOSITORY] Usuário ${id} atualizado com sucesso!`);
 }

 export async function buscarUsuarioPorId(id: number) {
  const db = await dbPromise
  return await db.get ('SELECT * FROM usuario WHERE id = ?', [id])
 }

 export async function verificarPermissaoUsuario (usuarioId: number) {
    const usuario = await buscarUsuarioPorId(usuarioId)
    if (!usuario) {
        throw new Error ('[REPOSITORY] Usuário não encontrado')
    }

    if (usuario.tipoUsuario !== tipoUsuario.organizador) {
        throw new Error ('[REPOSITORY] Permissão negada: Usuário não é organizador')
    }
}

 