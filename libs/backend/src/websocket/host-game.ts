import mongoose from "mongoose";
import { ValueOfGameEvent } from "types";
import { joinGame } from "./join-game.js";
import { WebSocketGamesMap } from "@/types/games.js";
import { WebSocket } from "@fastify/websocket";

export function hostGame({
	userId,
	socket,
	username,
	event,
	games
}: {
	socket: WebSocket;
	event: ValueOfGameEvent;
	username: string;
	userId: string;
	games: WebSocketGamesMap;
}) {
	console.log("hosting a game");

	const randomId = new mongoose.Types.ObjectId().toString();

	games.set(randomId, new Map());

	joinGame({ gameId: randomId, userId, socket, username, event, games });
}
