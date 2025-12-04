import * as usuarioRepository from "../Repository/usuarioRepository"
import * as logRepository from "../Repository/logRepository"
import { tipoUsuario } from "../Models/tipoUsuario";

    async function pegarNomeAutor(id: number) {
    const u = await usuarioRepository.buscarUsuarioPorId(id);
    return u ? u.nome : `ID ${id} Desconhecido`;
} 

    export async function cadastrarUsarioController (nome: string, senha: string, tipoUsuario: tipoUsuario) {
        try {
        const dataHoje = new Date().toISOString();
        
        await usuarioRepository.cadastrarUsuario(nome, senha, tipoUsuario, dataHoje);
        
        await logRepository.registrarLog('NOVO_CADASTRO', `[LOG] O usuário "${nome}" se registrou como ${tipoUsuario}.`);
        console.log(`✅ [Cadastro] Bem-vindo, ${nome}!`);

    } catch (erro: any) {
        await logRepository.registrarLog('ERRO_CADASTRO', erro.message);
        console.error(`❌ Falha: ${erro.message}`);
    }
}

    export async function atualizarUsuarioController (idResponsavel: number, idUser: number, nome: string, tipoUsuario: tipoUsuario) {
try {
        const nomeAutor = await pegarNomeAutor(idResponsavel)
        const nomeAlvo = await pegarNomeAutor(idUser)

        await usuarioRepository.atualizarUsuario(idUser, nome, tipoUsuario)
        
        await logRepository.registrarLog('ATUALIZAR_USUARIO', `[LOG] [Autor: ${nomeAutor}] Alterou o perfil de "${nomeAlvo}" (ID ${idUser})`)
        console.log(`🔄 [Update] ${nomeAutor} atualizou o usuário ${idUser}.`)

    } catch (erro: any) {
        const nomeAutor = await pegarNomeAutor(idResponsavel)
        const nomeAlvo = await pegarNomeAutor(idUser)
        await logRepository.registrarLog('ERRO_ATUALIZAR_USUARIO', `[LOG] [Autor: ${nomeAutor}] Tentou alterar o perfil de "${nomeAlvo}" (ID ${idUser})]`)
        console.error(`❌ Erro: ${erro.message}`)
    }
}

    export async function deletarUsuarioController (idResponsavel: number, idUser: number) {
        try {
            const autor = await pegarNomeAutor(idResponsavel)
            await usuarioRepository.deletarUsuario(idUser)
            await logRepository.registrarLog('DELETAR USUARIO', `[LOG] Autor: ${autor} Deletou o usuário ${idUser}`)
            console.log(`✅ [Usuario] ${idUser} deletado com sucesso.`);
        } catch (error: any) {
            console.error(`❌ [Controller] Falha em deletar o usuário: ${error.message}`);
            const autor = await pegarNomeAutor(idResponsavel);
            await logRepository.registrarLog('ERRO AO DELETAR USUARIO', `[LOG] Autor: ${autor} tentou deletar o usuário ${idUser}. Erro: ${error.message}`);
        }
    }
    
    export async function buscarUsuarioController(id: number) {
        const usuario = await usuarioRepository.buscarUsuarioPorId(id);
        console.log(usuario || "Usuário não encontrado");
    }
        