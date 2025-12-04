import { Permissao } from "./Permissao";
import { tipoUsuario } from "./tipoUsuario";

export const usuarioPermissao = {
    [tipoUsuario.palestrante]: [
        Permissao.PALESTRAR,
        Permissao.ASSISTIR
    ],
    [tipoUsuario.participante]: [
        Permissao.ASSISTIR
    ],
    [tipoUsuario.organizador]: [
        Permissao.CRIAR_EVENTO,
        Permissao.ASSISTIR,
        Permissao.PALESTRAR
    ]
}