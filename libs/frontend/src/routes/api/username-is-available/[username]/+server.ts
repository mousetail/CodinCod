import { buildBackendUrl } from "@/config/backend";
import { backendUrls } from "types";
import type { RequestEvent } from "./$types";

export async function GET({ fetch, params }: RequestEvent) {
	const username = params.username;

	return fetch(buildBackendUrl(backendUrls.USER_BY_USERNAME_IS_AVAILABLE, { username }));
}
