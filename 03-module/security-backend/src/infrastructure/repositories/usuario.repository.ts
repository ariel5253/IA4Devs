import { PrismaClient } from '@prisma/client';
import { Usuario } from '../../domain/entities/usuario.entity';
import { CreateUsuarioDto, UpdateUsuarioDto } from '../../dtos/usuario.dto';
import bcrypt from 'bcrypt';

export class UsuarioRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(data: CreateUsuarioDto): Promise<Usuario> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const usuario = await this.prisma.usuario.create({
      data: {
        username: data.username,
        password: hashedPassword,
        personaId: data.personaId,
        rolId: data.rolId,
      },
    });
    return new Usuario(usuario);
  }

  async findAll(): Promise<Usuario[]> {
    const usuarios = await this.prisma.usuario.findMany();
    return usuarios.map(usuario => new Usuario(usuario));
  }

  async findById(id: number): Promise<Usuario | null> {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id },
    });
    return usuario ? new Usuario(usuario) : null;
  }

  async findByUsername(username: string): Promise<Usuario | null> {
    const usuario = await this.prisma.usuario.findUnique({
      where: { username },
    });
    return usuario ? new Usuario(usuario) : null;
  }

  async update(id: number, data: UpdateUsuarioDto): Promise<Usuario | null> {
    const updateData = { ...data };
    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    const usuario = await this.prisma.usuario.update({
      where: { id },
      data: updateData,
    });
    return new Usuario(usuario);
  }

  async delete(id: number): Promise<Usuario | null> {
    const usuario = await this.prisma.usuario.delete({
      where: { id },
    });
    return new Usuario(usuario);
  }

  async validatePassword(usuario: Usuario, password: string): Promise<boolean> {
    return bcrypt.compare(password, usuario.password);
  }
} 