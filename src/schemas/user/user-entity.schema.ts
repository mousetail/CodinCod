import z from "zod";
import { USERNAME_CONFIG } from "../../config/username-config.js";
import { PASSWORD_CONFIG } from "../../config/password-config.js";

export const userEntitySchema = z.object({
	username: z
		.string()
		.min(
			USERNAME_CONFIG.minUsernameLength,
			`Username must be at least ${USERNAME_CONFIG.minUsernameLength} characters long`
		)
		.max(
			USERNAME_CONFIG.maxUsernameLength,
			`Username must be at most ${USERNAME_CONFIG.maxUsernameLength} characters long`
		)
		.regex(
			USERNAME_CONFIG.allowedCharacters,
			"Username can only contain letters, numbers, hyphens, and underscores"
		),
	password: z
		.string()
		.min(
			PASSWORD_CONFIG.minPasswordLength,
			`Password must be at least ${PASSWORD_CONFIG.minPasswordLength} characters long`
		),
	email: z.string().email("Invalid email address"),
	profile: z.object({
			picture: z.ostring(),
			bio: z.ostring(),
			location: z.ostring(),
			socials: z.array(z.string()).nonempty().optional()
	}).optional(),
	createdAt: z.date().optional(),
	updatedAt: z.date().optional()
});
export type UserEntity = z.infer<typeof userEntitySchema>;
