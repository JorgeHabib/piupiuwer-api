import { Repository, getRepository } from 'typeorm';
import CreatePiuDTO from '../dtos/CreatePiuDTO';
import Piu from '../models/Piu';

import IPiusRepository from './IPiusRepository';

class PiuRepository implements IPiusRepository {
  private ormRepository: Repository<Piu>;

  constructor() {
    this.ormRepository = getRepository(Piu);
  }

  public async create(data: CreatePiuDTO): Promise<Piu> {
    const piu = this.ormRepository.create({
      ...data,
      likes: 0,
    });

    return piu;
  }

  public async save(data: Piu): Promise<Piu> {
    const piu = await this.ormRepository.save(data);

    return piu;
  }

  public async findById(piu_id: string): Promise<Piu | undefined> {
    const piu = await this.ormRepository.findOne(piu_id);

    return piu;
  }

  public async findAll(): Promise<Piu[]> {
    const pius = await this.ormRepository.find({
      order: {
        created_at: 'DESC',
      }
    });

    return pius;
  }
}

export default PiuRepository;
