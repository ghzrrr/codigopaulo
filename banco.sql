CREATE TABLE "MesaComanda" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "numero" TEXT UNIQUE NOT NULL,
    "tipo" TEXT NOT NULL
);

CREATE TABLE "Produto" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "nome" TEXT NOT NULL,
    "preco" NUMERIC(10,2) NOT NULL
);

CREATE TABLE "Pedido" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "mesaComandaId" UUID NOT NULL REFERENCES "MesaComanda"("id"),
    "status" TEXT NOT NULL,
    "criadoEm" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "ItemPedido" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "pedidoId" UUID NOT NULL REFERENCES "Pedido"("id") ON DELETE CASCADE,
    "produtoId" UUID NOT NULL REFERENCES "Produto"("id"),
    "quantidade" INTEGER NOT NULL,
    "observacoes" TEXT
);

CREATE TABLE "Usuario" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "usuario" TEXT UNIQUE NOT NULL,
    "senha" TEXT NOT NULL
);

