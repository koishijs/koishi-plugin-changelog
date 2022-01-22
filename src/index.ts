import { Context } from 'koishi'
import { DataSource } from '@koishijs/plugin-console'
import { components } from '@octokit/openapi-types'
import { resolve } from 'path'

declare module '@koishijs/plugin-console' {
  interface Sources {
    releases: ReleaseProvider
  }
}

type Release = components['schemas']['release']

export default class ReleaseProvider extends DataSource<Release[]> {
  static using = ['console'] as const

  cache: Promise<Release[]>

  constructor(ctx: Context) {
    super(ctx, 'releases')

    const filename = ctx.console.config.devMode ? '../client/index.ts' : '../dist/index.js'
    ctx.console.addEntry(resolve(__dirname, filename))
  }

  async get(forced = false) {
    if (!forced && this.cache) return this.cache
    return this.cache = this.ctx.http.get('https://api.github.com/repos/koishijs/koishi/releases', {
      params: { per_page: 100 },
    }).catch(() => {
      delete this.cache
    })
  }
}
