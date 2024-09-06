import { storyService as remoteService } from "./story.service.server.js";
import { storyService as localService } from "./story.service.js";

const isRemote = true

export const storyService = isRemote ?  remoteService : localService