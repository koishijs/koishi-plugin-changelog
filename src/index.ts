import { Context, Schema } from 'koishi'
import { DataService } from '@koishijs/plugin-console'
import { components } from '@octokit/openapi-types'
import { resolve } from 'path'

declare module '@koishijs/plugin-console' {
  namespace Console {
    interface Services {
      releases: ReleaseProvider
    }
  }
}

type Release = components['schemas']['release']

export interface Config {}

export default class ReleaseProvider extends DataService<Release[]> {
  static using = ['console'] as const
  static schema: Schema<Config> = Schema.object({})

  cache: Promise<Release[]>

  constructor(ctx: Context) {
    super(ctx, 'releases')

    ctx.console.addEntry({
      dev: resolve(__dirname, '../client/index.ts'),
      prod: resolve(__dirname, '../dist'),
    })
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
