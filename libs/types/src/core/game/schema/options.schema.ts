import { z } from "zod";
import { gameVisibilitySchema } from "./visibility.schema.js";
import { DEFAULT_GAME_LENGTH_IN_SECONDS } from "../config/game.js";
import { gameModeSchema } from "./mode.schema.js";
import { LanguageLabelEnum } from "../../puzzle/config/languages.js";

export const gameOptionsSchema = z.object({
	allowedLanguages: z.array(
		z.object({
			language: LanguageLabelEnum,
			languageVersion: z.string()
		})
	),
	maxGameDurationInSeconds: z.number().default(DEFAULT_GAME_LENGTH_IN_SECONDS),
	visibility: gameVisibilitySchema,
	mode: gameModeSchema
});
export type GameOptions = z.infer<typeof gameOptionsSchema>;
