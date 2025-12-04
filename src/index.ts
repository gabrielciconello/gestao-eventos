import { initDB } from './Repository/db'; 
import * as UsuarioController from './Controller/usuarioController';
import * as LocalController from './Controller/localController';
import * as EventoController from './Controller/eventoController';
import * as LogRepository from './Repository/logRepository';
import { tipoUsuario } from './Models/tipoUsuario';

const titulo = (t: string) => console.log(`\n\n========================================\n📢 ${t}\n========================================`)

async function main() {
    console.clear()
    console.log("🚀 INICIANDO TESTES")
    
    await initDB()
    console.log("✅ Banco conectado.")


    titulo("1. CADASTRO DE USUÁRIOS")

    await UsuarioController.cadastrarUsarioController("Gabriel Organizador", "123", tipoUsuario.organizador)
    await UsuarioController.cadastrarUsarioController("Joao Palestrante", "123", tipoUsuario.palestrante)
    await UsuarioController.cadastrarUsarioController("Maria Participante", "123", tipoUsuario.participante)
    await UsuarioController.cadastrarUsarioController("Pedro Atrasado", "123", tipoUsuario.participante)

    titulo("2. CRIANDO LOCAIS")

    console.log(">> Criando 'Sala VIP' (Capacidade: 2)")
    await LocalController.cadastrarLocalController(1, "Sala VIP", 2)
    console.log("\n>> Criando 'Auditório' (Capacidade: 100)")
    await LocalController.cadastrarLocalController(2, "Auditório", 100)


    titulo("3. CRIANDO EVENTOS (Teste de Permissão e Data)")

    console.log(">> 3.1: João (Participante) tenta criar evento [DEVE FALHAR]")
    await EventoController.cadastrarEventoController(2, "Festa do João", "2026-01-01", 1)

    console.log("\n>> 3.2: Gabriel cria evento no PASSADO [DEVE FALHAR]")
    await EventoController.cadastrarEventoController(1, "Evento Velho", "1999-01-01", 1)

    console.log("\n>> 3.3: Gabriel cria evento VÁLIDO")
    await EventoController.cadastrarEventoController(1, "Workshop Node.js", "2026-05-20", 1)

    titulo("4. INSCRIÇÕES E LOTAÇÃO (Capacidade 2)")

    console.log(">> 4.1: João se inscreve [SUCESSO]")
    await EventoController.inscreverUsuarioController(2, 1)

    console.log("\n>> 4.2: Maria se inscreve [SUCESSO - LOTOU]")
    await EventoController.inscreverUsuarioController(3, 1)

    console.log("\n>> 4.3: Pedro tenta entrar [FALHA - LOTAÇÃO]")
    await EventoController.inscreverUsuarioController(4, 1)

    titulo("5. ATUALIZAR E DELETAR")

    console.log(">> 5.1: Gabriel atualiza o nome do evento")
    await EventoController.atualizarEventoController(1, 1, "Workshop Node Avançado", "2026-05-20", 1)

    console.log("\n>> 5.2: João tenta deletar o evento [DEVE FALHAR]")
    await EventoController.deletarEventoController(2, 1)

    titulo("6. LISTAR EVENTOS")
    await EventoController.buscarEventoController(1)

    titulo("7. BUSCAR EVENTO E PARTICIPANTES")
    await EventoController.listarParticipantesController(1)

    titulo("8. AUDITORIA (LOGS)")

    const logs = await LogRepository.verLog()
    console.table(logs.map(l => ({ Acao: l.acao, Detalhes: l.detalhes.substring(0, 80) })))
}

main()
