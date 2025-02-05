import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { fail, redirect } from "@sveltejs/kit";
import { buildBackendUrl } from "@/config/backend";
import { backendUrls, frontendUrls, POST, registerSchema } from "types";
import { setCookie } from "@/features/authentication/utils/set-cookie";
import type { RequestEvent } from "./$types.js";

export async function load() {
	const form = await superValidate(zod(registerSchema));

	return { form };
}

export const actions = {
	default: async ({ cookies, request }: RequestEvent) => {
		const form = await superValidate(request, zod(registerSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const result = await fetch(buildBackendUrl(backendUrls.REGISTER), {
			body: JSON.stringify(form.data),
			headers: {
				"Content-Type": "application/json"
			},
			method: POST
		});

		const data = await result.json();

		if (!result.ok) {
			return fail(400, { form, message: data.message });
		}

		setCookie(result, cookies);

		throw redirect(302, frontendUrls.ROOT);
	}
};
