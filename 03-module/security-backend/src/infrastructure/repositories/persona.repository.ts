import { PrismaClient } from '@prisma/client';
import { Persona } from '../../domain/entities/persona.entity';
import { CreatePersonaDto, UpdatePersonaDto } from '../../dtos/persona.dto';

export class PersonaRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(data: CreatePersonaDto): Promise<Persona> {
    const persona = await this.prisma.persona.create({
      data: {
        nombre: data.nombre,
        email: data.email,
      },
    });
    return new Persona(persona);
  }

  async findAll(): Promise<Persona[]> {
    const personas = await this.prisma.persona.findMany();
    return personas.map(persona => new Persona(persona));
  }

  async findById(id: number): Promise<Persona | null> {
    const persona = await this.prisma.persona.findUnique({
      where: { id },
    });
    return persona ? new Persona(persona) : null;
  }

  async findByEmail(email: string): Promise<Persona | null> {
    const persona = await this.prisma.persona.findUnique({
      where: { email },
    });
    return persona ? new Persona(persona) : null;
  }

  async update(id: number, data: UpdatePersonaDto): Promise<Persona | null> {
    const persona = await this.prisma.persona.update({
      where: { id },
      data,
    });
    return new Persona(persona);
  }

  async delete(id: number): Promise<Persona | null> {
    const persona = await this.prisma.persona.delete({
      where: { id },
    });
    return new Persona(persona);
  }
} 