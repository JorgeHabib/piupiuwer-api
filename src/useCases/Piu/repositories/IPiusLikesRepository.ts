import CreatePiuLikeDTO from "../dtos/CreatePiuLikeDTO";
import PiuLike from "../models/PiuLike";

interface IPiusLikesRepository {
  create(data: CreatePiuLikeDTO): Promise<PiuLike>;
  save(data: PiuLike): Promise<PiuLike>;
  findByUserAndPiu(user_id: string, piu_id: string): Promise<PiuLike | undefined>;
}

export default IPiusLikesRepository;
