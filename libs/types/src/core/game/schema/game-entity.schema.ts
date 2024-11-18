import { z } from "zod";
import { gameOptionsSchema } from "./options.schema.js";
import { userDtoSchema } from "../../user/index.js";
import { puzzleDtoSchema } from "../../puzzle/index.js";
import { acceptedDateSchema } from "../../common/index.js";
import { submissionDtoSchema } from "../../submission/index.js";

export const gameEntitySchema = z.object({
	players: z.array(z.string().or(userDtoSchema)),
	creator: z.string().optional().or(userDtoSchema.optional()),
	puzzle: z.string().or(puzzleDtoSchema),
	startTime: acceptedDateSchema,
	endTime: acceptedDateSchema,
	options: gameOptionsSchema,
	createdAt: acceptedDateSchema,
	playerSubmissions: z.array(z.string().or(submissionDtoSchema)).optional()
});
export type GameEntity = z.infer<typeof gameEntitySchema>;
