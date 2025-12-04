import * as localRepository from "../Repository/localRepository";
import { verificarPermissaoUsuario } from "../Repository/usuarioRepository";


export async function criarLocalService (usuarioId: number, nome: string, capacidade: number) {
    await verificarPermissaoUsuario(usuarioId)

    if (capacidade <= 0) {
        throw new Error(`[SERVICE] A capacidade do local é inválida`);
    }

    await localRepository.cadastrarLocal(nome, capacidade)
    return {mensagem: "[SERVICE] Local criado com sucesso"}
}

export async function atualizarLocalService (usuarioId: number, id: number, nome: string, capacidade: number) {
    await verificarPermissaoUsuario(usuarioId)

    const local = await localRepository.buscarLocalId(id)
    if (!local) {
        throw new Error ("[SERVICE] Local não encontrado")
    }
    
    if (capacidade <= 0) {
        throw new Error(`[SERVICE] A capacidade do local é inválida`);
    }
    await localRepository.atualizarLocal(id, nome, capacidade)
    return {mensagem: "[SERVICE] Local atualizado com sucesso"}
}

export async function deletarLocalService (usuarioId: number, id: number) {
    await verificarPermissaoUsuario(usuarioId)

    const local = await localRepository.buscarLocalId(id)
     if (!local) {
        throw new Error ("[SERVICE] Local não encontrado")
    }
    await localRepository.deletarLocal(id)
    return {mensagem: "[SERVICE] Local deletado com sucesso"}
}

export async function buscarLocalService (id: number) {
    return await localRepository.buscarLocalId(id)
}