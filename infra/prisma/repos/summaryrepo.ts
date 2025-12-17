import { prisma } from "../client";
import type { IUsageRepository } from "@/core/ports/repos";
import type {
  ClipDTO,
  ClipDetailDTO,
  CreateClipInput,
} from "@/core/domain/types";
