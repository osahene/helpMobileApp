import { W as WebPlugin } from "./index-Bs10UzzQ.js";
class BackgroundRunnerWeb extends WebPlugin {
  checkPermissions() {
    throw new Error("not available on web");
  }
  requestPermissions() {
    throw new Error("not available on web");
  }
  registerBackgroundTask() {
    throw new Error("not available on web");
  }
  dispatchEvent(_options) {
    throw new Error("not available on web");
  }
}
export {
  BackgroundRunnerWeb
};
