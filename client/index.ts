import { Context, icons } from '@koishijs/client'
import type {} from 'koishi-plugin-changelog/src'
import ChangeLog from './changelog.vue'
import Info from './icons/info.vue'

icons.register('info', Info)

export default (ctx: Context) => {
  ctx.page({
    path: '/changelog',
    name: '更新日志',
    icon: 'info',
    position: 'bottom',
    fields: ['releases'],
    component: ChangeLog,
  })
}
