import { Context } from '~/client'
import type {} from 'koishi-plugin-changelog/src'
import ChangeLog from './changelog.vue'

export default (ctx: Context) => {
  ctx.addPage({
    path: '/changelog',
    name: '更新日志',
    icon: 'info-full',
    position: 'bottom',
    fields: ['releases'],
    component: ChangeLog,
  })
}
