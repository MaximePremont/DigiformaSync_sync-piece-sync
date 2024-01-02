import {createPiece} from "@activepieces/pieces-framework";
import {syncAuth} from "./lib/common/auth";
import {getTask} from "./lib/actions/get-task";

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
