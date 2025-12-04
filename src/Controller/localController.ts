import * as usuarioRepository from "../Repository/usuarioRepository"
import * as logRepository from "../Repository/logRepository"
import * as localRepository from "../Repository/localRepository"
import * as localService from "../Service/localService"

async function pegarNomeAutor(id: number) {
    const u = await usuarioRepository.buscarUsuarioPorId(id);
    return u ? u.nome : `ID ${id} Desconhecido`;
} 

export async function cadastrarLocalController (idResponsavel: number, nome: string, capacidade: number) {
    try {
        const autor = await pegarNomeAutor(idResponsavel)
        const resultado = await localService.criarLocalService(idResponsavel, nome, capacidade)

        await logRepository.registrarLog('CRIAR LOCAL', `[LOG] [Autor: ${autor}] Criou o local ${nome}`)
        console.log(`✅ ${resultado.mensagem}`)

            } catch (error: any) {
                const autor = await pegarNomeAutor(idResponsavel)
                await logRepository.registrarLog('ERRO AO CRIAR LOCAL', `[LOG] [Autor: ${autor}] Erro ao criar local: ${error.message}`)
                console.error(`❌ [Controller] Erro ao cadastrar local: ${error.message}`)
            }
}

export async function atualizarLocalController (idResponsavel: number, id: number, nome: string, capacidade: number) {
    try {
        const autor = await pegarNomeAutor(idResponsavel)
        const resultado = await localService.atualizarLocalService(idResponsavel, id, nome, capacidade)

        await logRepository.registrarLog('ATUALIZAR LOCAL', `[LOG] [Autor: ${autor}] Atualizou o local ${nome}`)
        console.log(`✅ ${resultado.mensagem}`)

            } catch (error: any) {
                const autor = await pegarNomeAutor(idResponsavel)
                await logRepository.registrarLog('ERRO AO ATUALIZAR LOCAL', `[LOG] [Autor: ${autor}] Erro ao atualizar local: ${error.message}`)
                console.error(`❌ [Controller] Erro ao atualizar local: ${error.message}`)
            }
}

export async function deletarLocalController (idResponsavel: number, id: number) {
    try {
        const autor = await pegarNomeAutor(idResponsavel)
        const resultado = await localService.deletarLocalService(idResponsavel, id)

        await logRepository.registrarLog('DELETAR LOCAL', `[LOG] [Autor: ${autor}] Deletou o local ${id}`)
        console.log(`✅ ${resultado.mensagem}`)

            } catch (error: any) {
                const autor = await pegarNomeAutor(idResponsavel)
                await logRepository.registrarLog('ERRO AO DELETAR LOCAL', `[LOG] [Autor: ${autor}] Erro ao deletar local: ${error.message}`)
                console.error(`❌ [Controller] Erro ao deletar local: ${error.message}`)
            }
}

export async function buscarLocalController (id: number) {
    const local = await localRepository.buscarLocalId(id)
    console.log(local || "Local não encontrado");
}