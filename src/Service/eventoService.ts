import * as localRepository from "../Repository/localRepository";
import * as eventoRepository from "../Repository/eventoRepository";
import * as eventoParticipanteRepository from "../Repository/evento_ParticipanteRepository";
import { verificarPermissaoUsuario } from "../Repository/usuarioRepository";

export async function criarEventoService (usuarioId: number, titulo: string, data_evento: string, local_id: number) {
    await verificarPermissaoUsuario(usuarioId)

        const local = await localRepository.buscarLocalId(local_id)
        if (!local) {
            throw new Error("[SERVICE] Local não encontrado")
        }

        if (new Date(data_evento) < new Date()) {
            throw new Error("[SERVICE] Data do evento é inválida")
        }

        await eventoRepository.cadastrarEvento(titulo, data_evento, local_id)
        return { mensagem: "[SERVICE] Evento criado com sucesso"}
}

export async function atualizarEventoService (usuarioId: number, eventoId: number, titulo: string, data_evento: string, local_id: number) {
    await verificarPermissaoUsuario(usuarioId)

    const evento = await eventoRepository.buscarEventoId(eventoId)
    if (!evento) { 
        throw new Error("[SERVICE] Evento não encontrado.");
    }
    const local = await localRepository.buscarLocalId(local_id);
    if (!local) throw new Error("[SERVICE] Local informado não existe.");

    await eventoRepository.atualizarEvento(titulo, data_evento, local_id, eventoId)
    return { mensagem: "[SERVICE] Evento atualizado com sucesso"}
}

export async function deletarEventoService (usuarioId: number, eventoId: number) {
    await verificarPermissaoUsuario(usuarioId)

    const evento = await eventoRepository.buscarEventoId(eventoId)
    if (!evento) { 
        throw new Error("[SERVICE] Evento não encontrado.");
    }

    await eventoRepository.deletarEvento(eventoId)
    return { mensagem: "[SERVICE] Evento deletado com sucesso"}
}

export async function increverUsuarioService (evento_id: number, usuario_id: number, ) {
    const evento = await eventoRepository.buscarEventoId(evento_id)
    if (!evento) {
        throw new Error("[SERVICE] Evento não encontrado")
    }

    const local = await localRepository.buscarLocalId(evento.local_id)
    if (!local) 
        throw new Error("[SERVICE] Local do evento não encontrado.");

    const totalInscritos = await eventoRepository.verificarInscricoesEvento(evento_id)

    if (totalInscritos >= local.capacidade) {
        throw new Error ("[SERVICE] O evento não tem mais capacidade!")
    }

    await eventoParticipanteRepository.criarInscricao(evento_id, usuario_id);

    return { mensagem: "Inscrição realizada com sucesso."}
}
