import { ConfigEnv, defineConfig, UserConfigExport } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

import { viteMockServe } from 'vite-plugin-mock'


export default (({command}:ConfigEnv):UserConfigExport=>{
  return{
    plugins: [vue(),
      createSvgIconsPlugin({
        // 指定要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // 指定 symbolId 格式
        symbolId: 'icon-[dir]-[name]',
      }),
      viteMockServe({
        localEnabled: command === 'serve',
      }),

    ],
    resolve: {
      alias: {
          "@": path.resolve("./src") // 相对路径别名配置，使用 @ 代替 src
      }
  },css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
        additionalData: '@import "./src/styles/variable.scss";',
      },
    },
  },
  }
})
