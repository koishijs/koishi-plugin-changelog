<template>
  <k-layout main="darker" class="page-changelog">
    <el-scrollbar>
      <template v-for="({ name, body, tag_name }) in store.releases" :key="tag_name">
        <k-card class="xxx">
          <h2>{{ name }}</h2>
          <k-markdown :source="transform(body)"></k-markdown>
        </k-card>
      </template>
    </el-scrollbar>
  </k-layout>
</template>

<script lang="ts" setup>

import { store } from '@koishijs/client'

function transform(source: string) {
  return source
    // remove all above the first '#', which is useless content in release notes of v3
    .replace(/^[^#]+/, '')
    .replace(/^#+ Other Changes[\s\S]+/gm, '')
    .replace(/^## /gm, '### ')
    .replace(/#(\d+)\b/g, (_, id) => {
      return `[#${id}](https://github.com/koishijs/koishi/issues/${id})`
    })
    .replace(/\(([\w-]+\/[\w-]+@)?[0-9a-f]{40}(, ([\w-]+\/[\w-]+@)?[0-9a-f]{40})*\)/g, (match) => {
      return `(${match.slice(1, -1).split(', ').map((hash)=>{
        if (hash.includes('@')) {
          const s = hash.split('@')
          return `[${s[0]}@\`${s[1].slice(0, 7)}\`](https://github.com/${s[0]}/commit/${s[1]})`
        }
        return `[\`${hash.slice(0, 7)}\`](https://github.com/koishijs/koishi/commit/${hash})`
      }).join(', ')})`
    })
}

</script>

<style lang="scss">

.page-changelog .layout-main .el-scrollbar__view {
  padding: var(--card-margin);
  display: grid;
  gap: var(--card-margin);

  .k-markdown a {
    color: var(--active);
    code {
      color: var(--active);
    }
  }
}

</style>
