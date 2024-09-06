import { userService as remoteService } from "./user.service.server.js";
import { userService as localService } from "./user.service.js";

const isRemote = true

export const userService = isRemote ?  remoteService : localService