import { buildJsonSchemas } from "fastify-zod";
import {
	tagSchema,
	loginSchema,
	puzzleEntitySchema,
	reportSchema,
	userDtoSchema,
	puzzleMetricsSchema,
	validatorEntitySchema,
	registerSchema,
	difficultySchema,
	identifierSchema,
	userEntitySchema,
	visibilitySchema,
	submissionEntitySchema,
	loginResponseSchema,
	registerResponseSchema,
	tokenSchema,
	messageSchema,
	jwtPayloadSchema,
	paginatedQuerySchema,
	paginatedQueryResponseSchema,
	pistonFileSchema,
	pistonExecuteRequestSchema,
	pistonExecuteResponseSchema,
	submissionResultSchema
} from "types";

export const { schemas, $ref } = buildJsonSchemas({
	tagSchema,
	loginSchema,
	puzzleEntitySchema,
	reportSchema,
	userDtoSchema,
	puzzleMetricsSchema,
	validatorEntitySchema,
	registerSchema,
	difficultySchema,
	identifierSchema,
	userEntitySchema,
	visibilitySchema,
	submissionEntitySchema,
	loginResponseSchema,
	registerResponseSchema,
	tokenSchema,
	messageSchema,
	jwtPayloadSchema,
	paginatedQuerySchema,
	paginatedQueryResponseSchema,
	pistonFileSchema,
	pistonExecuteRequestSchema,
	pistonExecuteResponseSchema,
	submissionResultSchema
});
