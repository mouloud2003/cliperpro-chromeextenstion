// here we implement the business logic related to "clips"
// this logic is independent from the transport layer (http, grpc, etc.)
// and from the data layer (database, external api, etc.)
import type { IClipRepository } from "../../ports/repos";
import type {
  ClipDTO,
  ClipDetailDTO,
  CreateClipInput,
} from "../../domain/types";
import { normalizeText, validateClipText } from "../utils/normalisetext";
import { AppError } from "../errors";

export class ClipService {
  // inject dependencies via constructor
  // here we inject the clip repository
  constructor(private clipRepo: IClipRepository) {}

  async createManualClip(
    userId: string,
    input: CreateClipInput
  ): Promise<{ clipId: string }> {
    // 1) normalize text
    const textNorm = normalizeText(input.text);

    // 2) validate business rule (not empty, not too long)
    validateClipText(textNorm);

    // 3) send to repository (DB layer)
    const { id } = await this.clipRepo.create(userId, {
      ...input,
      text: textNorm,
    });

    return { clipId: id };
  }

  // list clips for a user with a limit (default 50) limite we means the maximum number of clips to return
  async listUserClips(
    userId: string,
    limit = 50
  ): Promise<{ items: ClipDTO[] }> {
    const items = await this.clipRepo.findManyByUserId(userId, limit);
    return { items };
  }

  // get clip details with ownership check
  async getClipDetails(userId: string, clipId: string): Promise<ClipDetailDTO> {
    const clip = await this.clipRepo.getById(clipId);

    if (!clip) {
      throw new AppError("NOT_FOUND", 404, "Clip not found");
    }

    // ownership check
    // only the owner can access the clip details
    // we compare the userId from the session with the userId of the clip
    if (clip.userId !== userId) {
      throw new AppError("FORBIDDEN", 403, "User does not own this clip");
    }

    return clip;
  }
}
