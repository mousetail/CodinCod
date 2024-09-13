import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import type { PageServerLoad } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { frontendUrls, loginSchema } from "types";
import { login } from "@/features/login/api/login";

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(loginSchema));

	return { form };
};

export const actions = {
	default: async ({ cookies, request }) => {
		const form = await superValidate(request, zod(loginSchema));

		if (!form.valid) {
			fail(400, { form });
		}

		const result = await login(form.data.identifier, form.data.password);

		const data = await result.json();

		if (!result.ok) {
			fail(400, { form, message: data.message });
		}

		// TODO: fix the cookie not being saved after this point, problem with svelte-kit most likely
		// Get cookies from the result
		const setCookieHeader = result.headers.get("set-cookie");
		if (setCookieHeader) {
			// Parse the set-cookie header and set cookies
			const cookieParts = setCookieHeader.split("; ");
			const [cookieNameValue] = cookieParts;
			const [name, value] = cookieNameValue.split("=");

			// Set the cookie using SvelteKit's cookies API
			cookies.set(name, value, {
				httpOnly: true, // Adjust as necessary
				path: "/", // Set the appropriate path
				sameSite: "strict", // Adjust as necessary
				secure: true // Adjust as necessary
			});
		}

		throw redirect(302, frontendUrls.ROOT);
	}
};
