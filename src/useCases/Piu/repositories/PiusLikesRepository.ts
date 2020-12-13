import { Repository, getRepository } from 'typeorm';
import CreatePiuLikeDTO from '../dtos/CreatePiuLikeDTO';
import PiuLike from '../models/PiuLike';

import IPiusLikesRepository from './IPiusLikesRepository';

class PiusLikesRepository implements IPiusLikesRepository {
  private ormRepository: Repository<PiuLike>;

  constructor() {
    this.ormRepository = getRepository(PiuLike);
  }

  public async create(data: CreatePiuLikeDTO): Promise<PiuLike> {
    const piuLike = this.ormRepository.create(data);

    return piuLike;
  }

  public async save(data: PiuLike): Promise<PiuLike> {
    const piuLike = await this.ormRepository.save(data);

    return piuLike;
  }

  public async findByUserAndPiu(user_id: string, piu_id: string): Promise<PiuLike | undefined> {
    const piuLike = await this.ormRepository.findOne({
      where: { user_id, piu_id },
    });

    return piuLike;
  }
}

export default PiusLikesRepository;
