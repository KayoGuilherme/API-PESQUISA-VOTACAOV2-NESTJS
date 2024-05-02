-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "CPF" TEXT NOT NULL,
    "roleId" INTEGER NOT NULL DEFAULT 1,
    "senha" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "Estado" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Roles" (
    "id_role" SERIAL NOT NULL,
    "name_role" TEXT NOT NULL,
    "Permission" TEXT NOT NULL,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("id_role")
);

-- CreateTable
CREATE TABLE "Candidato" (
    "id_candidato" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "apelido" TEXT,
    "Partido" TEXT,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,

    CONSTRAINT "Candidato_pkey" PRIMARY KEY ("id_candidato")
);

-- CreateTable
CREATE TABLE "ImageCandidato" (
    "id_image" SERIAL NOT NULL,
    "Url" TEXT NOT NULL,
    "candidatoId" INTEGER NOT NULL,

    CONSTRAINT "ImageCandidato_pkey" PRIMARY KEY ("id_image")
);

-- CreateTable
CREATE TABLE "Votos" (
    "id_voto" SERIAL NOT NULL,
    "nome_eleitor" TEXT NOT NULL,
    "Idade_eleitor" INTEGER NOT NULL,
    "Localidade_eleitor" TEXT NOT NULL,
    "Votar" BOOLEAN NOT NULL,
    "candidatoId" INTEGER NOT NULL,

    CONSTRAINT "Votos_pkey" PRIMARY KEY ("id_voto")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_CPF_key" ON "Users"("CPF");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Roles"("id_role") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageCandidato" ADD CONSTRAINT "ImageCandidato_candidatoId_fkey" FOREIGN KEY ("candidatoId") REFERENCES "Candidato"("id_candidato") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Votos" ADD CONSTRAINT "Votos_candidatoId_fkey" FOREIGN KEY ("candidatoId") REFERENCES "Candidato"("id_candidato") ON DELETE CASCADE ON UPDATE CASCADE;
