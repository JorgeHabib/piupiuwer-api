import CreatePiuDTO from "../dtos/CreatePiuDTO";
import Piu from "../models/Piu";

interface IPiusRepository {
  create(data: CreatePiuDTO): Promise<Piu>;
  save(piu: Piu): Promise<Piu>;
  findById(piu_id: string): Promise<Piu | undefined>;
  findAll(): Promise<Piu[]>;
}

export default IPiusRepository;
