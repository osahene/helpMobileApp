const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f || (m.f = ['./web-DIuRoAna.js', './index-Bs10UzzQ.js', './index-Co5KhmHr.css']),
) => i.map((i) => d[i])
import { Y as registerPlugin, _ as __vitePreload } from './index-Bs10UzzQ.js'
const BackgroundRunner = registerPlugin('BackgroundRunner', {
  web: () =>
    __vitePreload(
      () => import('./web-DIuRoAna.js'),
      true ? __vite__mapDeps([0, 1, 2]) : void 0,
      import.meta.url,
    ).then((m) => new m.BackgroundRunnerWeb()),
})
export { BackgroundRunner }
