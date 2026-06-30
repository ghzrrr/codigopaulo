import Fastify from "fastify";
import pg from "pg";
import cors from "@fastify/cors";

const { Pool } = pg;

const app = Fastify();

await app.register(cors, {
  origin: true
});

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "lancheflow",
  password: "senai",
  port: 5432
  
});

app.get("/mesas", async () => {
  const resultado = await pool.query('SELECT * FROM "MesaComanda"');
  return resultado.rows;
});

app.get("/mesas/:id", async (request) => {
  const { id } = request.params;

  const resultado = await pool.query(
    'SELECT * FROM "MesaComanda" WHERE id = $1',
    [id]
  );

  return resultado.rows[0];
});

app.post("/mesas", async (request) => {
  const { numero, tipo } = request.body;

  const resultado = await pool.query(
    'INSERT INTO "MesaComanda"(numero,tipo) VALUES($1,$2) RETURNING *',
    [numero, tipo]
  );

  return resultado.rows[0];
});

app.put("/mesas/:id", async (request) => {
  const { id } = request.params;
  const { numero, tipo } = request.body;

  const resultado = await pool.query(
    'UPDATE "MesaComanda" SET numero=$1, tipo=$2 WHERE id=$3 RETURNING *',
    [numero, tipo, id]
  );

  return resultado.rows[0];
});

app.delete("/mesas/:id", async (request) => {
  const { id } = request.params;

  await pool.query(
    'DELETE FROM "MesaComanda" WHERE id=$1',
    [id]
  );

  return { mensagem: "Mesa removida" };
});

app.get("/produtos", async () => {
  const resultado = await pool.query('SELECT * FROM "Produto"');
  return resultado.rows;
});

app.get("/produtos/:id", async (request) => {
  const { id } = request.params;

  const resultado = await pool.query(
    'SELECT * FROM "Produto" WHERE id=$1',
    [id]
  );

  return resultado.rows[0];
});

app.post("/produtos", async (request) => {
  const { nome, preco } = request.body;

  const resultado = await pool.query(
    'INSERT INTO "Produto"(nome,preco) VALUES($1,$2) RETURNING *',
    [nome, preco]
  );

  return resultado.rows[0];
});

app.put("/produtos/:id", async (request) => {
  const { id } = request.params;
  const { nome, preco } = request.body;

  const resultado = await pool.query(
    'UPDATE "Produto" SET nome=$1, preco=$2 WHERE id=$3 RETURNING *',
    [nome, preco, id]
  );

  return resultado.rows[0];
});

app.delete("/produtos/:id", async (request) => {
  const { id } = request.params;

  await pool.query(
    'DELETE FROM "Produto" WHERE id=$1',
    [id]
  );

  return { mensagem: "Produto removido" };
});

app.get("/pedidos", async () => {
  const resultado = await pool.query('SELECT * FROM "Pedido"');
  return resultado.rows;
});

app.get("/pedidos/:id", async (request) => {
  const { id } = request.params;

  const resultado = await pool.query(
    'SELECT * FROM "Pedido" WHERE id=$1',
    [id]
  );

  return resultado.rows[0];
});

app.post("/pedidos", async (request) => {
  const { mesaComandaId, status } = request.body;

  const resultado = await pool.query(
    'INSERT INTO "Pedido"("mesaComandaId",status) VALUES($1,$2) RETURNING *',
    [mesaComandaId, status]
  );

  return resultado.rows[0];
});

app.put("/pedidos/:id", async (request) => {
  const { id } = request.params;
  const { status } = request.body;

  const resultado = await pool.query(
    'UPDATE "Pedido" SET status=$1 WHERE id=$2 RETURNING *',
    [status, id]
  );

  return resultado.rows[0];
});

app.delete("/pedidos/:id", async (request) => {
  const { id } = request.params;

  await pool.query(
    'DELETE FROM "Pedido" WHERE id=$1',
    [id]
  );

  return { mensagem: "Pedido removido" };
});

app.get("/itens", async () => {
  const resultado = await pool.query('SELECT * FROM "ItemPedido"');
  return resultado.rows;
});

app.get("/itens/:id", async (request) => {
  const { id } = request.params;

  const resultado = await pool.query(
    'SELECT * FROM "ItemPedido" WHERE id=$1',
    [id]
  );

  return resultado.rows[0];
});

app.post("/itens", async (request) => {
  const { pedidoId, produtoId, quantidade, observacoes } = request.body;

  const resultado = await pool.query(
    'INSERT INTO "ItemPedido"("pedidoId","produtoId",quantidade,observacoes) VALUES($1,$2,$3,$4) RETURNING *',
    [pedidoId, produtoId, quantidade, observacoes]
  );

  return resultado.rows[0];
});

app.put("/itens/:id", async (request) => {
  const { id } = request.params;
  const { quantidade, observacoes } = request.body;

  const resultado = await pool.query(
    'UPDATE "ItemPedido" SET quantidade=$1, observacoes=$2 WHERE id=$3 RETURNING *',
    [quantidade, observacoes, id]
  );

  return resultado.rows[0];
});

app.delete("/itens/:id", async (request) => {
  const { id } = request.params;

  await pool.query(
    'DELETE FROM "ItemPedido" WHERE id=$1',
    [id]
  );

  return { mensagem: "Item removido" };
});

app.get("/usuarios", async () => {
  const resultado = await pool.query('SELECT id, usuario FROM "Usuario"');
  return resultado.rows;
});

app.get("/usuarios/:id", async (request) => {
  const { id } = request.params;

  const resultado = await pool.query(
    'SELECT id, usuario FROM "Usuario" WHERE id=$1',
    [id]
  );

  return resultado.rows[0];
});

app.post("/usuarios", async (request) => {
  const { usuario, senha } = request.body;

  const resultado = await pool.query(
    'INSERT INTO "Usuario"(usuario,senha) VALUES($1,$2) RETURNING id,usuario',
    [usuario, senha]
  );

  return resultado.rows[0];
});

app.put("/usuarios/:id", async (request) => {
  const { id } = request.params;
  const { usuario, senha } = request.body;

  const resultado = await pool.query(
    'UPDATE "Usuario" SET usuario=$1, senha=$2 WHERE id=$3 RETURNING id,usuario',
    [usuario, senha, id]
  );

  return resultado.rows[0];
});

app.delete("/usuarios/:id", async (request) => {
  const { id } = request.params;

  await pool.query(
    'DELETE FROM "Usuario" WHERE id=$1',
    [id]
  );

  return { mensagem: "Usuário removido" };
});

app.listen({
  port: 3333
}).then(() => {
  console.log("Servidor rodando na porta 3333");
});