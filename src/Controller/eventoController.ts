import * as usuarioRepository from "../Repository/usuarioRepository"
import * as logRepository from "../Repository/logRepository"
import * as eventoRepository from "../Repository/eventoRepository"
import * as eventoService from "../Service/eventoService"
import * as eventoParticipanteRepository from "../Repository/evento_ParticipanteRepository"


async function pegarNomeAutor(id: number) {
    const u = await usuarioRepository.buscarUsuarioPorId(id);
    return u ? u.nome : `ID ${id} Desconhecido`;
} 

export async function cadastrarEventoController (idResponsavel: number, titulo: string, data_evento: string, local_id: number) {
    try {
        const autor = await pegarNomeAutor(idResponsavel)
        const resultado = await eventoService.criarEventoService(idResponsavel, titulo, data_evento, local_id)

        await logRepository.registrarLog('CRIAR EVENTO', `[LOG] [Autor: ${autor}] Criou o evento ${titulo}`)
        console.log(`✅ ${resultado.mensagem}`)

            } catch (error: any) {
                const autor = await pegarNomeAutor(idResponsavel)
                await logRepository.registrarLog('ERRO AO CRIAR EVENTO', `[LOG] [Autor: ${autor}] Erro ao criar evento: ${error.message}`)
                console.error(`❌ [Controller] Erro ao cadastrar evento: ${error.message}`)
            }
}

export async function atualizarEventoController (idResponsavel: number, idEvento: number, titulo: string, data: string, localId: number) {
    try {
        const autor = await pegarNomeAutor(idResponsavel)
        const resultado = await eventoService.atualizarEventoService(idResponsavel, idEvento, titulo, data, localId)

        await logRepository.registrarLog('ATUALIZAR EVENTO', `[LOG] [Autor: ${autor}] Atualizou o evento ${titulo}`)
        console.log(`✅ ${resultado.mensagem}`)

            } catch (error: any) {
                const autor = await pegarNomeAutor(idResponsavel)
                await logRepository.registrarLog('ERRO AO ATUALIZAR EVENTO', `[LOG] [Autor: ${autor}] Erro ao atualizar evento: ${error.message}`)
                console.error(`❌ [Controller] Erro ao atualizar evento: ${error.message}`)
            }
}

export async function deletarEventoController (idResponsavel: number, idEvento: number) {
    try {
        const autor = await pegarNomeAutor(idResponsavel)
        const resultado = await eventoService.deletarEventoService(idResponsavel, idEvento)

        await logRepository.registrarLog('DELETAR EVENTO', `[LOG] [Autor: ${autor}] Deletou o evento ${idEvento}`)
        console.log(`✅ ${resultado.mensagem}`)
        
            } catch (error: any) {
                const autor = await pegarNomeAutor(idResponsavel)
                await logRepository.registrarLog('ERRO AO DELETAR EVENTO', `[LOG] [Autor: ${autor}] Erro ao deletar evento: ${error.message}`)
                console.error(`❌ [Controller] Erro ao deletar evento: ${error.message}`)
            }
}

export async function inscreverUsuarioController (idUsuario: number, idEvento: number) {
    try {
        const participante = await pegarNomeAutor(idUsuario)
        const resultado = await eventoService.increverUsuarioService(idEvento, idUsuario)

        await logRepository.registrarLog('INSCRICAO_EVENTO', `[LOG] [Usuario: ${participante}] Inscreveu-se no evento ${idEvento}`)
        console.log(`🎟️ [Inscrição] ${resultado.mensagem}`)
        
            } catch (error: any) {
                const participante = await pegarNomeAutor(idUsuario);
                await logRepository.registrarLog('INSCRICAO_BLOQUEADA', `[LOG] [Usuario: ${participante}] Erro ao inscrever: ${error.message}`);
                console.error(`⛔ [Inscrição] ${error.message}`);
            }
}

export async function listarParticipantesController(idEvento: number) {
    try {
        const lista = await eventoParticipanteRepository.buscarEventoParticipante(idEvento);
        
        if (!lista || lista.length === 0) {
            console.log("⚠️ Nenhum participante encontrado para este evento.")
        } else {
            console.log(`📋 Participantes do Evento ${idEvento}:`)
            console.table(lista)
        }

    } catch (error: any) {
        console.error(`❌ Erro ao buscar participantes: ${error.message}`)
    }
}

export async function buscarEventoController (id: number) {
    const evento = await eventoRepository.buscarEventoId(id)
    console.log(evento || "Evento não encontrado");
}