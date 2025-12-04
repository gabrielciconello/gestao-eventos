import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export const dbPromise = open({
  filename: 'dataBase.sqlite',
  driver: sqlite3.Database,
});

export async function initDB() {
  const db = await dbPromise;
  
  await db.exec(`
    CREATE TABLE IF NOT EXISTS usuario (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        tipoUsuario TEXT NOT NULL CHECK(tipoUsuario IN ('palestrante', 'participante', 'organizador')),
        data_criacao TEXT NOT NULL,
        senha TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS local (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        capacidade INTEGER NOT NULL
      );

      CREATE TABLE IF NOT EXISTS evento (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT NOT NULL,
        data_evento TEXT NOT NULL,
        local_id INTEGER NOT NULL,
        FOREIGN KEY (local_id) REFERENCES local (id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS evento_participante (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        evento_id INTEGER NOT NULL,
        data_inscricao TEXT NOT NULL,
        usuario_id INTEGER NOT NULL,
        FOREIGN KEY (evento_id) REFERENCES evento (id) ON DELETE CASCADE,
        FOREIGN KEY (usuario_id) REFERENCES usuario (id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS log (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        detalhes TEXT NOT NULL,
        acao TEXT NOT NULL,
        data_hora TEXT NOT NULL
      );

  `);
  console.log('[Database] Tabelas inicializadas com sucesso.');
}

