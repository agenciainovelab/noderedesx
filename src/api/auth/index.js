import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/login", async (req, res) => {
  const { email, senha } = req.body;
  try {
    const user = await prisma.usuario.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ erro: "Usuário não encontrado" });

    const isValid = await bcrypt.compare(senha, user.senha);
    if (!isValid) return res.status(401).json({ erro: "Senha incorreta" });

    res.json({ usuario: { id: user.id, email: user.email, apelido: user.apelido } });
  } catch (e) {
    console.error(e);
    res.status(500).json({ erro: "Erro interno" });
  }
});

export default router;