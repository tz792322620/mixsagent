<template>
  <div>
    <router-link :to="{name:'dashboard'}">

      <!-- update-begin- author:sunjianlei --- date:20190814 --- for: logo颜色根据主题颜色变化 -->
<!--      <img v-if="navTheme === 'dark'" src="~@/assets/logo-white.png" alt="logo">-->
<!--      <img v-else src="~@/assets/logo.svg" alt="logo">-->
      <!-- update-begin- author:sunjianlei --- date:20190814 --- for: logo颜色根据主题颜色变化 -->
     
      <div class="d-flex align-center" style="padding: 20px 0 15px 12px;pointer-events: none;">
        <div style="margin-right: 10px;">
          <img src="~@/assets/logo.webp" width="34" alt="logo">
        </div>
        <h1 v-if="showTitle" style="color: white; font-size: 20px; margin: 0; padding: 0">{{ title }}</h1>
      </div>

    </router-link>
  </div>
</template>

<script>
  import { mixin } from '@/utils/mixin.js'

  export default {
    name: 'Logo',
    mixins: [mixin],
    props: {
      title: {
        type: String,
        default: 'MIXS Global',
        required: false
      },
      showTitle: {
        type: Boolean,
        default: true,
        required: false
      }
    }
  }
</script>
<style lang="less" scoped>
  /*缩小首页布 局顶部的高度*/
  @height: 59px;

  .d-flex {
    display: flex;
  }
  .justify-center {
    justify-content: center;
  }
  .align-center {
    align-items: center;
  }

  .sider {
    box-shadow: none !important;
    .logo {
      height: @height !important;
      line-height: @height !important;
      box-shadow: none !important;
      transition: background 300ms;

      a {
        color: white;
        &:hover {
          color: rgba(255, 255, 255, 0.8);
        }
      }
    }

    &.light .logo {
      background: @primary-color !important;
    }
  }
</style>