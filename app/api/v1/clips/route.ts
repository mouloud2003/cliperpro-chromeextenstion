// create a new clip and get user clips this file contains two route handlers: POST for creating a new clip and GET for retrieving user clips.
import { NextRequest, NextResponse } from "next/server";
// zod for schema validation zod is a TypeScript-first schema declaration and validation library.
import { z } from "zod";
// temporary dev auth to get a fixed userId
import { getDevUserId } from "@/infra/auth/devauth";
// prisma implementation of the clip repository interface with it we create objects containing methods to interact with the database. we pass this repo to the service layer.
import { ClipRepoPrisma } from "@/infra/prisma/repos/cliprepo";
// service layer that contains business logic related to clips. receives the repoprisma obect to perform database operations.
import { ClipService } from "@/core/applicationlogique/services/clipservice";
import { AppError } from "@/core/applicationlogique/errors";
// specify that this route should run in the nodejs runtime environment (not edge) setings for better compatibility with certain nodejs packages and features.like prisma.
export const runtime = "nodejs";
// Zod schema to validate the body of the create clip request
const CreateClipSchema = z.object({
  // required field
  text: z.string().min(1),
  // optional fields
  title: z.string().optional(),
  // optional fields
  url: z.string().optional(),
  // optional fields
  sourceId: z.string().optional(),
});
// here i use NextRequest instead of the standard Request object because NextRequest provides additional functionality and integration with Next.js features.
///// create a new clip
export async function POST(req: NextRequest) {
  try {
    // 1) Auth (dev only) just for testing and development purposes
    const userId = await getDevUserId();

    // 3) Parse + Validate body (using Zod) here we validate the incoming request body against the CreateClipSchema defined above we transform the body to json and parse it using zod.
    // if the body does not conform to the schema, a ZodError will be thrown.
    const body = CreateClipSchema.parse(await req.json());

    // 4) Compose service (Service depends on Repo interface)
    // new ClipRepoPrisma() creates an object containing methods to interact with the database related to clips. Methods include create, find many by user id, and get by id.
    const clipService = new ClipService(new ClipRepoPrisma());

    // 5) Call business logic (normalize + validate + create)
    const { clipId } = await clipService.createManualClip(userId, {
      text: body.text,
      title: body.title,
      url: body.url,
      sourceId: body.sourceId ?? null,
    });

    // 6) Return JSON success
    return NextResponse.json({ ok: true, clipId }, { status: 201 });
  } catch (e) {
    // error handling
    // known application error
    // instanceof means checking if the error object e is created from the AppError class defined in core/applicationlogique/errors.ts
    if (e instanceof AppError) {
      return NextResponse.json(
        { ok: false, code: e.code, message: e.message },
        { status: e.status }
      );
    }

    // validation error from zod
    if (e instanceof z.ZodError) {
      return NextResponse.json(
        { ok: false, code: "INVALID_BODY", issues: e.issues },
        { status: 400 }
      );
    }

    // unknown error
    return NextResponse.json(
      { ok: false, code: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}
///// get user clips
export async function GET() {
  try {
    const userId = await getDevUserId();

    const clipService = new ClipService(new ClipRepoPrisma());
    const data = await clipService.listUserClips(userId, 50);

    return NextResponse.json(data, { status: 200 });
  } catch (e: unknown) {
    if (e instanceof AppError) {
      return NextResponse.json(
        { ok: false, code: e.code, message: e.message },
        { status: e.status }
      );
    }
    return NextResponse.json(
      { ok: false, code: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}
