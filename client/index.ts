import { registerPage } from '~/client'
import type {} from 'koishi-plugin-changelog/src'
import ChangeLog from './changelog.vue'

registerPage({
  path: '/changelog',
  name: '更新日志',
  icon: 'info-circle',
  position: 'bottom',
  fields: ['releases'],
  component: ChangeLog,
})
