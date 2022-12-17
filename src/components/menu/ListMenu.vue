<template>
  <div>
    <!--      {{ selectedPath }}-->
    <div style="background-color: #4bb1b1;" v-for="item in permissionMenuList" class="box" :class="item.openFlag ? 'open-menu-style' : ''">
      <div
        class="d-flex justify-space-between first-title align--center menuHover"
        @click="selectItem(item), openMenu(item.id)"
        :class="selectedPath == item.path ? 'selected' : ''"
      >
        <div class="d-flex align-center">
          <img
            v-if="item.meta.icon"
            :src="require('../../assets/icon/' + item.meta.icon + '-white' + '.svg')"
            style="margin-right: 8px"
          />
          <div v-if="showMenuTitle">{{ item.meta.title }}</div>
        </div>
        <a-icon
          style="margin-right: 10px"
          :class="openList.includes(item.id) ? 'rotate-icon' : ''"
          v-if="item.path != '/dashboard/analysis' &&  showMenuTitle"
          type="down"
        />
        <!-- <div class="vertical-line"></div> -->
      </div>

      <div v-show="openList.includes(item.id)">
        <div
          v-for="items in item.children"
          class="d-flex align-center justify-space-between second-title menuHover"
          @click="selectItem(items)"
          :class="selectedPath == items.path ? 'selected' : ''"
        >
          <div class="d-flex align-center">
            <img
              v-if="items.meta.icon"
              :src="require('../../assets/icon/' + items.meta.icon + (selectedPath == items.path ? '' : '-white') + '.svg')"
              style="margin-right: 8px"
            />
            <div style="opacity: 0.85">{{ items.meta.title }}</div>
          </div>
          <div v-if="selectedPath == items.path" class="vertical-line"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import AgentUser from '../../assets/icon/AgentUser.svg'

export default {
  name: 'ListMenu',
  props: {
    showMenuTitle: {
      type: Boolean,
      default: true,
      required: false
    }
  },

  data() {
    return {
      // AgentUser,
      selectedPath: '',
      openList: [],
    }
  },

  mounted() {
    console.log(this.permissionMenuList)
    this.selectedPath = this.$route.path
  },

  computed: {
    ...mapState({
      // 后台菜单
      permissionMenuList: (state) => state.user.permissionList,
    }),
  },

  watch: {
    $route: {
      handler: function (val, oldVal) {
        this.selectedPath = val.path
        this.$forceUpdate()
        console.log(val)
      },
      // 深度观察监听
      deep: true,
    },
  },

  methods: {
    selectItem(item) {
      // debugger
      // if (item.path == '/dashboard/analysis') return
      // this.selectedPath = item.path;

      // debugger
      // 修改导航显示逻辑 点击一级菜单默认显示第一个子级菜单
      if (item.meta.icon && item.children) {
        this.$router.push(item.children[0].path);
      } else {
        this.$router.push({
          path: item.path
        }, ()=>{})
        // debugger
      }
    },
    //点击显示子级菜单
    openMenu(id) {
      if (this.openList.includes(id)) {
        this.openList.splice(
          this.openList.findIndex((item) => item === id),
        )
      } else {
        this.openList.push(id)
      }
      //设置是否展开标记
      this.permissionMenuList.map(item =>{
        this.$set(item,'openFlag', false);
        if(item.id == id){
           if (item.path == '/dashboard/analysis') return
           this.$set(item,'openFlag', true);
        }
      });
    },
  },
}
</script>

<style scoped lang="less">

.box {
  // margin-top: 16px;
  letter-spacing: 1px;
}

.vertical-line {
  height: 24px;
  width: 4px;
  border-radius: 2px;
  background-color: @primary-color;
}

.white--text {
  color: white;
}

.bg-white {
  background-color: white;
}

.first-title {
  font-size: 16px;
  color: white;
  padding: 12px 0 12px 20px;
  font-weight: 500;
}

.second-title {
  font-size: 16px;
  color: white;
  padding: 12px 0 12px 20px;
  // margin: 8px 0px;
}

.d-flex {
  display: flex;
}

.justify-space-between {
  justify-content: space-between;
}

.align-center {
  align-items: center;
}

.selected {
  background-color: white;
  border-radius: 0 8px 8px 0;
  color: @primary-color;
}
.menuHover:hover {
  // background-color: white;
  // border-radius: 0 8px 8px 0;
  // color: @primary-color;
  cursor: pointer;
}
.justify-space-between {
  align-items: center;
}
// 展开菜单样式
.open-menu-style {
  background: rgba(255, 255, 255, 0.2) !important;
  transition: all 0.5s;
}

.rotate-icon {
  transform: rotate(180deg);
  transition: all 0.3s;
}
</style>