import { b as boot } from "./index-nJYxZ8LO.js";
import { m as me } from "./index.es-B4ABB4FF.js";
import "./index-Bs10UzzQ.js";
const googleCred = boot(({ app }) => {
  app.use(me, {
    clientId: void 0,
    scope: "profile email",
    response_type: "id_token",
    prompt: "consent",
    redirect_uri: "https://helpmobile.vercel.app",
    onSuccess: (response) => {
      console.log("Google Login Success:", response);
    },
    onFailure: (error) => {
      console.error("Google Login Error:", error);
    }
  });
});
export {
  googleCred as default
};
