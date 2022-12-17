import Vue from 'vue'
import { login, logout, phoneLogin, thirdLogin } from "@/api/login"
import { ACCESS_TOKEN, USER_NAME,USER_INFO,USER_AUTH,SYS_BUTTON_AUTH,UI_CACHE_DB_DICT_DATA,TENANT_ID,CACHE_INCLUDED_ROUTES } from "@/store/mutation-types"
import { welcome } from "@/utils/util"
import { queryPermissionsByUser } from '@/api/api'
import { getAction } from '@/api/manage'

const user = {
  state: {
    token: '',
    username: '',
    realname: '',
    tenantid:'',
    welcome: '',
    avatar: '',
    permissionList: [],
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { username, realname, welcome }) => {
      state.username = username
      state.realname = realname
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_PERMISSIONLIST: (state, permissionList) => {
      state.permissionList = permissionList
    },
    SET_INFO: (state, info) => {
      state.info = info
    },
    SET_TENANT: (state, id) => {
      state.tenantid = id
    },
  },

  actions: {
    // CAS验证登录
    ValidateLogin({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        getAction("/sys/cas/client/validateLogin",userInfo).then(response => {
          console.log("----cas 登录--------",response);
          if(response.success){
            const result = response.result
            const userInfo = result.userInfo
            Vue.ls.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
            Vue.ls.set(USER_NAME, userInfo.username, 7 * 24 * 60 * 60 * 1000)
            Vue.ls.set(USER_INFO, userInfo, 7 * 24 * 60 * 60 * 1000)
            commit('SET_TOKEN', result.token)
            commit('SET_INFO', userInfo)
            commit('SET_NAME', { username: userInfo.username,realname: userInfo.realname, welcome: welcome() })
            commit('SET_AVATAR', userInfo.avatar)
            resolve(response)
          }else{
            resolve(response)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          if(response.code =='200'){
            const result = response.result
            const userInfo = result.userInfo
            console.log("userInfo",userInfo.userName)
            console.log("token",result.token)
            Vue.ls.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
            Vue.ls.set(USER_NAME, userInfo.userName, 7 * 24 * 60 * 60 * 1000)
            Vue.ls.set(USER_INFO, userInfo, 7 * 24 * 60 * 60 * 1000)
            Vue.ls.set(UI_CACHE_DB_DICT_DATA, result.sysAllDictItems, 7 * 24 * 60 * 60 * 1000)
            commit('SET_TOKEN', result.token)
            commit('SET_INFO', userInfo)
            commit('SET_NAME', { username: userInfo.userName,realname: userInfo.userName, welcome: welcome() })
            commit('SET_AVATAR', userInfo.avatar)
            resolve(response)
          }else{
            reject(response)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    //手机号登录
    PhoneLogin({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
          phoneLogin(userInfo).then(response => {
          if(response.code =='200'){
        const result = response.result
        const userInfo = result.userInfo
        Vue.ls.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
        Vue.ls.set(USER_NAME, userInfo.username, 7 * 24 * 60 * 60 * 1000)
        Vue.ls.set(USER_INFO, userInfo, 7 * 24 * 60 * 60 * 1000)
        Vue.ls.set(UI_CACHE_DB_DICT_DATA, result.sysAllDictItems, 7 * 24 * 60 * 60 * 1000)
        commit('SET_TOKEN', result.token)
        commit('SET_INFO', userInfo)
        commit('SET_NAME', { username: userInfo.username,realname: userInfo.realname, welcome: welcome() })
        commit('SET_AVATAR', userInfo.avatar)
        resolve(response)
      }else{
        reject(response)
      }
    }).catch(error => {
        reject(error)
      })
    })
    },
    // 获取用户信息
    GetPermissionList({ commit }) {
      return new Promise((resolve, reject) => {
        queryPermissionsByUser().then(response => {
          console.log(" response.result", response.result)
          const authData = response.result.auth;
          const allAuthData = response.result.allAuth;

          const menuData = [{
            "redirect": '/dashboard/analysis',
            "path": "/dashboard/analysis",
            "component": "dashboard/Analysis",
            "route": "1",
            "meta": {
              "keepAlive": true,
              "internalOrExternal": false,
              "icon": "Home",
              "componentName": "Analysis",
              "title": "首页"
            },
            "name": "dashboard-analysis",
            "id": "9502685863ab87f0ad1134142788a387"
          }, {
            "redirect": null,
            "path": "/sellusermanage",
            "component": "layouts/RouteView",
            "route": "1",
            "children": [{
              "path": "/sellusermanage/AgentUser",
              "component": "sellusermanage/agentuser/AgentUserList",
              "route": "1",
              "meta": {
                "keepAlive": false,
                "internalOrExternal": false,
                "componentName": "AgentUserList",
                // "icon": "AgentUser",
                "title": "用户管理"
              },
              "name": "sellusermanage-AgentUser",
              "id": "1587443910577819650"
            },
            // {
            //   "path": "/sellusermanage/AgentPositionRecord",
            //   "component": "sellusermanage/AgentPosition/AgentPositionRecord",
            //   "route": "1",
            //   "meta": {
            //     "keepAlive": false,
            //     "internalOrExternal": false,
            //     "componentName": "AgentUserList",
            //     "icon": "AgentPositionRecord",
            //     "title": "持仓记录"
            //   },
            //   "name": "sellusermanage-AgentPositionRecord",
            //   "id": "1587443910577819650"
            // },
            {
              "path": "/agentmanagesystem/AgentLowerLevelIncomeConfig",
              "component": "agentmanage/agentlowerlevelincomeconfig/AgentLowerLevelIncomeConfigList",
              "route": "1",
              "meta": {
                "keepAlive": false,
                "internalOrExternal": false,
                "componentName": "AgentLowerLevelIncomeConfigList",
                "title": "下级代理商收益配置",
                // "icon": "AgentLowerLevelIncomeConfig",
              },
              "name": "agentmanagesystem-AgentLowerLevelIncomeConfig",
              "id": "1587387579258961922"
            }, {
              "path": "/agentmanage/childagent/ChildAgentList",
              "component": "agentmanage/childagent/ChildAgentList",
              "route": "1",
              "meta": {
                "keepAlive": false,
                "internalOrExternal": false,
                "componentName": "ChildAgentList",
                "title": "下级代理管理",
                // "icon": "ChildAgentWithdrawalList"
              },
              "name": "agentmanage-childagent-ChildAgentList",
              "id": "1587466644913389570"
            }, {
              "path": "/agentmanage/ChildAgentWithdrawal",
              "component": "agentmanage/childagentwithdrawal/ChildAgentWithdrawalList",
              "route": "1",
              "meta": {
                "keepAlive": false,
                "internalOrExternal": false,
                "componentName": "ChildAgentWithdrawalList",
                "title": "下级代理提币申请",
                // "icon": "ChildAgentList"
              },
              "name": "agentmanage-ChildAgentWithdrawal",
              "id": "1587749546863689730"
            }],
            "meta": {
              "keepAlive": false,
              "internalOrExternal": false,
              "componentName": "RouteView",
              "isRouter": false,
              "title": "下级信息",
              "icon": "AgentUser"
              // "title": "推荐用户管理"
            },
            "name": "sellusermanage",
            "id": "1587390171775045634"
          },{
            "redirect": null,
            "path": "/my",
            "component": "my/agentincomerecord/AgentIncomeRecordList",
            "route": "1",
            "children": [
              // Utilisation Request
              {
                "path": "/my/utilisation/request",
                "component": "my/utilisation/Request",
                "route": "1",
                "meta": {
                  "keepAlive": false,
                  "internalOrExternal": false,
                  // "icon": "UtilisationRequest",
                  "componentName": "UtilisationRequest",
                  "title": "提款申请"
                },
                "name": "my-utilisation-Request",
                "id": "1585188102590775297"
              },
              {
                "path": "/my/financial/statements",
                "component": "my/financial/statements",
                "route": "1",
                "meta": {
                  "keepAlive": false,
                  "internalOrExternal": false,
                  // "icon": "FinancialStatements",
                  "componentName": "FinancialStatements",
                  "title": "财务报表"
                },
                "name": "my-utilisation-Request",
                "id": "1585188102590775297"
              },
              {
                "path": "/my/commission/report",
                "component": "my/commission/report",
                "route": "1",
                "meta": {
                  "keepAlive": false,
                  "internalOrExternal": false,
                  // "icon": "AgentIncomeRecord",
                  "componentName": "CommissionReport",
                  "title": "佣金报表"
                },
                "name": "my-commission-Report",
                "id": "1585188102590775297"
              },
              {
                "path": "/my/account/details",
                "component": "my/account/details",
                "route": "1",
                "meta": {
                  "keepAlive": false,
                  "internalOrExternal": false,
                  // "icon": "AccountDetails",
                  "componentName": "AccountDetails",
                  "title": "账变明细"
                },
                "name": "my-account-Details",
                "id": "1585188102590775297"
              },
            //   {
            //     "path": "/my/agentincomerecord",
            //     "component": "my/agentincomerecord/AgentIncomeRecordList",
            //     "route": "1",
            //     "meta": {
            //       "keepAlive": false,
            //       "internalOrExternal": false,
            //       "icon": "AgentIncomeRecord",
            //       "componentName": "AgentIncomeRecordList",
            //       "title": "收益记录"
            //     },
            //     "name": "my-agentincomerecord-AgentIncomeRecordList",
            //     "id": "1585188102590775297"
            // }, {
            //   "path": "/my/AgentWithdrawalRecord",
            //   "component": "my/agentwithdrawalrecord/AgentWithdrawalRecordList",
            //   "route": "1",
            //   "meta": {
            //     "keepAlive": false,
            //     "internalOrExternal": false,
            //     "componentName": "AgentWithdrawalRecordList",
            //     "icon": "AgentWithdrawal",
            //     "title": "提币记录"
            //   },
            //   "name": "my-AgentWithdrawalRecord",
            //   "id": "1587369724585000961"
            // }
          ],
            "meta": {
              "keepAlive": false,
              "internalOrExternal": false,
              // "icon": "ant-design:amazon-circle-filled",
              "componentName": "AgentIncomeRecordList",
              "title": "财务中心",
              "icon": "AgentIncomeRecord",
            },
            "name": "my",
            "id": "1585184440095162370"
          },
          {
            "redirect": null,
            "path": "/dealmanage",
            "component": "/dealmanage/DealManageList",
            "route": "1",
            "children": [
              {
                "path": "/dealmanage/AgentPositionRecord",
                "component": "/dealmanage/DealManageList",
                "route": "1",
                "meta": {
                  "keepAlive": false,
                  "internalOrExternal": false,
                  "componentName": "DealManageList",
                  "title": "持仓记录"
                },
                "name": "AgentPositionRecord",
                "id": "1585188102590775297"
              },
              {
                "path": "/dealmanage/AgentOpenPositionRecord",
                "component": "/dealmanage/DealManageList",
                "route": "1",
                "meta": {
                  "keepAlive": false,
                  "internalOrExternal": false,
                  "componentName": "DealManageList",
                  "title": "开仓记录"
                },
                "name": "AgentOpenPositionRecord",
                "id": "1585188102590775297"
              },
              {
                "path": "/dealmanage/AgentClosePositionRecord",
                "component": "/dealmanage/DealManageList",
                "route": "1",
                "meta": {
                  "keepAlive": false,
                  "internalOrExternal": false,
                  "componentName": "DealManageList",
                  "title": "平仓记录"
                },
                "name": "AgentClosePositionRecord",
                "id": "1585188102590775297"
              },
          ],
            "meta": {
              "keepAlive": false,
              "internalOrExternal": false,
              "icon": "FinancialStatements",
              "componentName": "DealManageList",
              "title": "交易管理统计"
            },
            "name": "my",
            "id": "1585184440095162355"
          },
          //   {
          //   "redirect": null,
          //   "path": "/agentmanagesystem",
          //   "component": "layouts/RouteView",
          //   "route": "1",
          //   "children": [{
          //     "path": "/agentmanagesystem/AgentLowerLevelIncomeConfig",
          //     "component": "agentmanage/agentlowerlevelincomeconfig/AgentLowerLevelIncomeConfigList",
          //     "route": "1",
          //     "meta": {
          //       "keepAlive": false,
          //       "internalOrExternal": false,
          //       "componentName": "AgentLowerLevelIncomeConfigList",
          //       "title": "代理商收益配置"
          //     },
          //     "name": "agentmanagesystem-AgentLowerLevelIncomeConfig",
          //     "id": "1587387579258961922"
          //   }, {
          //     "path": "/agentmanage/childagent/ChildAgentList",
          //     "component": "agentmanage/childagent/ChildAgentList",
          //     "route": "1",
          //     "meta": {
          //       "keepAlive": false,
          //       "internalOrExternal": false,
          //       "componentName": "ChildAgentList",
          //       "title": "代理管理"
          //     },
          //     "name": "agentmanage-childagent-ChildAgentList",
          //     "id": "1587466644913389570"
          //   }, {
          //     "path": "/agentmanage/ChildAgentWithdrawal",
          //     "component": "agentmanage/childagentwithdrawal/ChildAgentWithdrawalList",
          //     "route": "1",
          //     "meta": {
          //       "keepAlive": false,
          //       "internalOrExternal": false,
          //       "componentName": "ChildAgentWithdrawalList",
          //       "title": "下级代理提币申请列表"
          //     },
          //     "name": "agentmanage-ChildAgentWithdrawal",
          //     "id": "1587749546863689730"
          //   }],
          //   "meta": {
          //     "keepAlive": false,
          //     "internalOrExternal": false,
          //     "componentName": "RouteView",
          //     "title": "代理商管理"
          //   },
          //   "name": "agentmanagesystem",
          //   "id": "1587386057259286529"
          // },
          //   {
          //   "redirect": null,
          //   "path": "/userinvitationcode/UserInvitationCodeList",
          //   "component": "userinvitationcode/UserInvitationCodeList",
          //   "route": "1",
          //   "meta": {
          //     "keepAlive": false,
          //     "internalOrExternal": false,
          //     "componentName": "UserInvitationCodeList",
          //     "title": "用户推广邀请码"
          //   },
          //   "name": "userinvitationcode",
          //   "id": "1592705354961645570"
          // }
            {
              "redirect": null,
              "path": "/userinvitationcode",
              "component": "userinvitationcode/UserInvitationCodeList",
              "route": "1",
              "children": [{
                "path": "/userinvitationcode/UserInvitationCodeList",
                "component": "userinvitationcode/UserInvitationCodeList",
                "route": "1",
                "meta": {
                  "keepAlive": false,
                  "internalOrExternal": false,
                  "componentName": "UserInvitationCodeList",
                  // "icon": "UserInvitationCode",
                  "title": "推广链接"
                },
                "name": "userinvitationcode-UserInvitationCodeList",
                "id": "15873875792589619261"
              },{
                "path": "/userinvitation/material",
                "component": "/userinvitationcode/source/material",
                "route": "1",
                "meta": {
                  "keepAlive": false,
                  "internalOrExternal": false,
                  "componentName": "SourceMaterial",
                  // "icon": "SourceMaterial",
                  "title": "推广素材"
                },
                "name": "userinvitationcode-SourceMaterial",
                "id": "15873875792589619261"
              }],
              "meta": {
                "keepAlive": false,
                "internalOrExternal": false,
                "componentName": "UserInvitationCodeList",
                "title": "推广中心",
                "icon": "UserInvitationCode",
              },
              "name": "userinvitationcode",
              "id": "1592705354961645570"
            },
            {
              "redirect": null,
              "path": "/usercenter",
              "component": "usercenter/usercenterList",
              "route": "1",
              "children": [{
                "path": "/usercenter/CommissionDescription",
                "component": "/usercenter/CommissionDescription/CommissionDescription",
                "route": "1",
                "meta": {
                  "keepAlive": false,
                  "internalOrExternal": false,
                  "componentName": "CommissionDescription",
                  // "icon": "CommissionDescription",
                  "title": "佣金说明"
                },
                "name": "usercenter-usercenterList",
                "id": "15873875792589619262"
              },
              //   {
              //   "path": "/usercenter/Contactus",
              //   "component": "/usercenter/usercenterList/Contactus",
              //   "route": "1",
              //   "meta": {
              //     "keepAlive": false,
              //     "internalOrExternal": false,
              //     "componentName": "usercenterList",
              //     // "icon": "Contactus",
              //     "title": "联系我们"
              //   },
              //   "name": "usercenter-Contactus",
              //   "id": "15873875792589619262"
              // },
                {
                "path": "/usercenter/PartnerexClusive",
                "component": "/usercenter/usercenterList/PartnerexClusive",
                "route": "1",
                "meta": {
                  "keepAlive": false,
                  "internalOrExternal": false,
                  // "icon": "PartnerExclusive",
                  "title": "合伙人专享"
                },
                "name": "usercenter-PartnerExclusive",
                "id": "15873875792589619262"
              }],
              "meta": {
                "keepAlive": false,
                "internalOrExternal": false,
                "componentName": "UserCenterList",
                "icon": "PartnerExclusive",
                "title": "个人中心"
              },
              "name": "usercenter",
              "id": "15927053549616455701"
            }
          ]

          sessionStorage.setItem(USER_AUTH,JSON.stringify(authData));
          sessionStorage.setItem(SYS_BUTTON_AUTH,JSON.stringify(allAuthData));
          if (menuData && menuData.length > 0) {
            //update--begin--autor:qinfeng-----date:20200109------for：JEECG-63 一级菜单的子菜单全部是隐藏路由，则一级菜单不显示------
            menuData.forEach((item, index) => {
              if (item["children"]) {
                let hasChildrenMenu = item["children"].filter((i) => {
                  return !i.hidden || i.hidden == false
                })
                if (hasChildrenMenu == null || hasChildrenMenu.length == 0) {
                  item["hidden"] = true
                }
              }
            })


            console.log(" menu show json ：", menuData)
            //update--end--autor:qinfeng-----date:20200109------for：JEECG-63 一级菜单的子菜单全部是隐藏路由，则一级菜单不显示------
            commit('SET_PERMISSIONLIST', menuData)
          } else {
            reject('getPermissionList: permissions must be a non-null array !')
          }
          resolve(response)
        }).catch(error => {

          console.log(" 获取用户信息，报错 " )

          reject(error)
        })
      })
    },

    // 登出测试
    Logout({ commit, state }) {
      return new Promise((resolve) => {
        let logoutToken = state.token;
        commit('SET_TOKEN', '')
        commit('SET_PERMISSIONLIST', [])
        Vue.ls.remove(ACCESS_TOKEN)
        Vue.ls.remove(USER_INFO)
        Vue.ls.remove(USER_NAME)
        Vue.ls.remove(UI_CACHE_DB_DICT_DATA)
        Vue.ls.remove(CACHE_INCLUDED_ROUTES)
        console.log("登出测试，退出了！！！！")
        console.log('logoutToken: '+ logoutToken)
        logout(logoutToken).then(() => {
          if (process.env.VUE_APP_SSO == 'true') {
            let sevice = 'http://' + window.location.host + '/'
            let serviceUrl = encodeURIComponent(sevice)
            window.location.href = process.env.VUE_APP_CAS_BASE_URL + '/logout?service=' + serviceUrl
          }
          resolve()
        }).catch(() => {
          resolve()
        })
      })
    },
    // 第三方登录
    ThirdLogin({ commit }, param) {
      return new Promise((resolve, reject) => {
        thirdLogin(param.token,param.thirdType).then(response => {
          if(response.code =='200'){
            const result = response.result
            const userInfo = result.userInfo
            Vue.ls.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
            Vue.ls.set(USER_NAME, userInfo.username, 7 * 24 * 60 * 60 * 1000)
            Vue.ls.set(USER_INFO, userInfo, 7 * 24 * 60 * 60 * 1000)
            commit('SET_TOKEN', result.token)
            commit('SET_INFO', userInfo)
            commit('SET_NAME', { username: userInfo.username,realname: userInfo.realname, welcome: welcome() })
            commit('SET_AVATAR', userInfo.avatar)
            resolve(response)
          }else{
            reject(response)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    saveTenant({ commit }, id){
      Vue.ls.set(TENANT_ID, id, 7 * 24 * 60 * 60 * 1000)
      commit('SET_TENANT', id)
    }


  }
}

export default user