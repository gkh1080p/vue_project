import { ConfigEnv, defineConfig, UserConfigExport,loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

import { viteMockServe } from 'vite-plugin-mock'

//setup语法糖中写name
import vueSetupExtend from 'vite-plugin-vue-setup-extend';
export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  // 获取各种环境下的对应的变量
  let env=loadEnv(mode,process.cwd());

  return{
    plugins: [
      vue(),
      vueSetupExtend(),
      createSvgIconsPlugin({
        // 指定要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // 指定 symbolId 格式
        symbolId: 'icon-[dir]-[name]',
      }),
      viteMockServe({
        localEnabled: command === 'serve',
        mockPath: './mock'
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
   // 代理跨域
   server: {
    proxy: {
      [env.VITE_APP_BASE_API]: {
        target: env.VITE_SERVE,
        // 需要代理跨域
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  
  }
}



