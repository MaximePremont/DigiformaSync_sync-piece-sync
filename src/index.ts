import {createPiece} from "@activepieces/pieces-framework";
import {getTask} from "./lib/actions/get-task";
import {syncAuth} from "@digiforma-sync/piece-sync-common";

export const sync = createPiece({
  displayName: "Sync",
  auth: syncAuth,
  minimumSupportedRelease: '0.9.0',
  logoUrl: "https://i.ibb.co/TDXr47G/sync-bot.jpg",
  authors: [],
  actions: [
      getTask
  ],
  triggers: [],
});
