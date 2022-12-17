import { UserLayout, TabLayout, RouteView, BlankLayout, PageView } from '@/components/layouts'

/**
 * 走菜单，走权限控制
 * @type {[null,null]}
 */
export const asyncRouterMap = [

  {
    path: '/',
    name: 'dashboard',
    component: TabLayout,
    meta: { title: '首页',"icon": "Home", },

    redirect: '/dashboard/analysis',
    children: [

      // // dashboard
      // {
      //   path: '/dashboard',
      //   name: 'dashboard',
      //   redirect: '/dashboard/workplace',
      //   component: RouteView,
      //   meta: { title: '仪表盘', icon: 'dashboard', permission: [ 'dashboard' ] },
      //   children: [
      //     {
      //       path: '/dashboard/analysis',
      //       name: 'Analysis',
      //       component: () => import('@/views/dashboard/Analysis'),
      //       meta: { title: '分析页', permission: [ 'dashboard' ] }
      //     },
      //     {
      //       path: '/dashboard/monitor',
      //       name: 'Monitor',
      //       hidden: true,
      //       component: () => import('@/views/dashboard/Monitor'),
      //       meta: { title: '监控页', permission: [ 'dashboard' ] }
      //     },
      //     {
      //       path: '/dashboard/workplace',
      //       name: 'Workplace',
      //       component: () => import('@/views/dashboard/Workplace'),
      //       meta: { title: '工作台', permission: [ 'dashboard' ] }
      //     }
      //   ]
      // },
      //
      // // forms
      // {
      //   path: '/form',
      //   redirect: '/form/basic-form',
      //   component: PageView,
      //   meta: { title: '表单页', icon: 'form', permission: [ 'form' ] },
      //   children: [
      //     {
      //       path: '/form/base-form',
      //       name: 'BaseForm',
      //       component: () => import('@/views/form/BasicForm'),
      //       meta: { title: '基础表单', permission: [ 'form' ] }
      //     },
      //     {
      //       path: '/form/step-form',
      //       name: 'StepForm',
      //       component: () => import('@/views/form/stepForm/StepForm'),
      //       meta: { title: '分步表单', permission: [ 'form' ] }
      //     },
      //     {
      //       path: '/form/advanced-form',
      //       name: 'AdvanceForm',
      //       component: () => import('@/views/form/advancedForm/AdvancedForm'),
      //       meta: { title: '高级表单', permission: [ 'form' ] }
      //     }
      //   ]
      // },
      //
      // // list
      // {
      //   path: '/list',
      //   name: 'list',
      //   component: PageView,
      //   redirect: '/list/query-list',
      //   meta: { title: '列表页', icon: 'table', permission: [ 'table' ] },
      //   children: [
      //     {
      //       path: '/list/query-list',
      //       name: 'QueryList',
      //       component: () => import('@/views/list/TableList'),
      //       meta: { title: '查询表格', permission: [ 'table' ] }
      //     },
      //     {
      //       path: '/list/edit-table',
      //       name: 'EditList',
      //       component: () => import('@/views/list/TableInnerEditList'),
      //       meta: { title: '内联编辑表格', permission: [ 'table' ] }
      //     },
      //     {
      //       path: '/list/user-list',
      //       name: 'UserList',
      //       component: () => import('@/views/list/UserList'),
      //       meta: { title: '用户列表', permission: [ 'table' ] }
      //     },
      //     {
      //       path: '/list/role-list',
      //       name: 'RoleList',
      //       component: () => import('@/views/list/RoleList'),
      //       meta: { title: '角色列表', permission: [ 'table' ] }
      //     },
      //     {
      //       path: '/list/permission-list',
      //       name: 'PermissionList',
      //       component: () => import('@/views/list/PermissionList'),
      //       meta: { title: '权限列表', permission: [ 'table' ] }
      //     },
      //     {
      //       path: '/list/basic-list',
      //       name: 'BasicList',
      //       component: () => import('@/views/list/StandardList'),
      //       meta: { title: '标准列表', permission: [ 'table' ] }
      //     },
      //     {
      //       path: '/list/card',
      //       name: 'CardList',
      //       component: () => import('@/views/list/CardList'),
      //       meta: { title: '卡片列表', permission: [ 'table' ] }
      //     },
      //     {
      //       path: '/list/search',
      //       name: 'SearchList',
      //       component: () => import('@/views/list/search/SearchLayout'),
      //       redirect: '/list/search/article',
      //       meta: { title: '搜索列表', permission: [ 'table' ] },
      //       children: [
      //         {
      //           path: '/list/search/article',
      //           name: 'SearchArticles',
      //           component: () => import('../views/list/TableList'),
      //           meta: { title: '搜索列表（文章）', permission: [ 'table' ] }
      //         },
      //         {
      //           path: '/list/search/project',
      //           name: 'SearchProjects',
      //           component: () => import('../views/list/TableList'),
      //           meta: { title: '搜索列表（项目）', permission: [ 'table' ] }
      //         },
      //         {
      //           path: '/list/search/application',
      //           name: 'SearchApplications',
      //           component: () => import('../views/list/TableList'),
      //           meta: { title: '搜索列表（应用）', permission: [ 'table' ] }
      //         },
      //       ]
      //     },
      //   ]
      // },
      //
      // // profile
      // {
      //   path: '/profile',
      //   name: 'profile',
      //   component: RouteView,
      //   redirect: '/profile/basic',
      //   meta: { title: '详情页', icon: 'profile', permission: [ 'profile' ] },
      //   children: [
      //     {
      //       path: '/profile/basic',
      //       name: 'ProfileBasic',
      //       component: () => import('@/views/profile/basic/Index'),
      //       meta: { title: '基础详情页', permission: [ 'profile' ] }
      //     },
      //     {
      //       path: '/profile/advanced',
      //       name: 'ProfileAdvanced',
      //       component: () => import('@/views/profile/advanced/Advanced'),
      //       meta: { title: '高级详情页', permission: [ 'profile' ] }
      //     }
      //   ]
      // },
      //
      // // result
      // {
      //   path: '/result',
      //   name: 'result',
      //   component: PageView,
      //   redirect: '/result/success',
      //   meta: { title: '结果页', icon: 'check-circle-o', permission: [ 'result' ] },
      //   children: [
      //     {
      //       path: '/result/success',
      //       name: 'ResultSuccess',
      //       component: () => import(/* webpackChunkName: "result" */ '@/views/result/Success'),
      //       meta: { title: '成功', hiddenHeaderContent: true, permission: [ 'result' ] }
      //     },
      //     {
      //       path: '/result/fail',
      //       name: 'ResultFail',
      //       component: () => import(/* webpackChunkName: "result" */ '@/views/result/Error'),
      //       meta: { title: '失败', hiddenHeaderContent: true, permission: [ 'result' ] }
      //     }
      //   ]
      // },
      //
      // // Exception
      // {
      //   path: '/exception',
      //   name: 'exception',
      //   component: RouteView,
      //   redirect: '/exception/403',
      //   meta: { title: '异常页', icon: 'warning', permission: [ 'exception' ] },
      //   children: [
      //     {
      //       path: '/exception/403',
      //       name: 'Exception403',
      //       component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
      //       meta: { title: '403', permission: [ 'exception' ] }
      //     },
      //     {
      //       path: '/exception/404',
      //       name: 'Exception404',
      //       component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
      //       meta: { title: '404', permission: [ 'exception' ] }
      //     },
      //     {
      //       path: '/exception/500',
      //       name: 'Exception500',
      //       component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
      //       meta: { title: '500', permission: [ 'exception' ] }
      //     }
      //   ]
      // },
      //
      // // account
      // {
      //   path: '/account',
      //   component: RouteView,
      //   name: 'account',
      //   meta: { title: '个人页', icon: 'user', keepAlive: true, permission: [ 'user' ] },
      //   children: [
      //     {
      //       path: '/account/center',
      //       name: 'center',
      //       component: () => import('@/views/account/center/Index'),
      //       meta: { title: '个人中心', keepAlive: true, permission: [ 'user' ] }
      //     },
      //     {
      //       path: '/account/settings',
      //       name: 'settings',
      //       component: () => import('@/views/account/settings/Index'),
      //       meta: { title: '个人设置', hideHeader: true, keepAlive: true, permission: [ 'user' ]  },
      //       redirect: '/account/settings/base',
      //       alwaysShow: true,
      //       children: [
      //         {
      //           path: '/account/settings/base',
      //           name: 'BaseSettings',
      //           component: () => import('@/views/account/settings/BaseSetting'),
      //           meta: { title: '基本设置', hidden: true, keepAlive: true, permission: [ 'user' ]  }
      //         },
      //         {
      //           path: '/account/settings/security',
      //           name: 'SecuritySettings',
      //           component: () => import('@/views/account/settings/Security'),
      //           meta: { title: '安全设置', hidden: true, keepAlive: true, permission: [ 'user' ]  }
      //         },
      //         {
      //           path: '/account/settings/custom',
      //           name: 'CustomSettings',
      //           component: () => import('@/views/account/settings/Custom'),
      //           meta: { title: '个性化设置', hidden: true, keepAlive: true, permission: [ 'user' ]  }
      //         },
      //         {
      //           path: '/account/settings/binding',
      //           name: 'BindingSettings',
      //           component: () => import('@/views/account/settings/Binding'),
      //           meta: { title: '账户绑定', hidden: true, keepAlive: true, permission: [ 'user' ]  }
      //         },
      //         {
      //           path: '/account/settings/notification',
      //           name: 'NotificationSettings',
      //           component: () => import('@/views/account/settings/Notification'),
      //           meta: { title: '新消息通知', hidden: true, keepAlive: true, permission: [ 'user' ]  }
      //         },
      //       ]
      //     },
      //   ]
      // }
    ]
  },
  // {
  //   path: '*', redirect: '/404', hidden: true
  // }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/register/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/register/RegisterResult')
      },
      {
        path: 'alteration',
        name: 'alteration',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/alteration/Alteration')
      },
    ]
  },


  // {
  //   "path": "/my/utilisation/request",
  //   "component": "my/utilisation/Request",
  //   "route": "1",
  //   "meta": {
  //     "keepAlive": false,
  //     "internalOrExternal": false,
  //     "icon": "UtilisationRequest",
  //     "componentName": "UtilisationRequest",
  //     "title": "提款申请"
  //   },
  //   "name": "my-utilisation-Request",
  //   "id": "1585188102590775297"
  // },

  {
    meta: { title: '我的' },
    path: '/my',
    component: TabLayout,
    redirect: '/my/agentincomerecord/AgentIncomeRecordList',
    children: [
      {
        meta: { title: '提款申请' },
        path: '/my/utilisation/Request',
        name: 'my-utilisation-Request',
        component: () => import('@/views/my/utilisation/request')
      },
      {
        meta: { title: '财务报表' },
        path: '/my/financial/statements',
        name: 'my-financial-statements',
        component: () => import('@/views/my/financial/statements')
      },
      {
        meta: { title: '佣金报表' },
        path: '/my/commission/report',
        name: 'my-commission-Report',
        component: () => import('@/views/my/commission/report')
      },
      {
        meta: { title: '账变明细' },
        path: '/my/account/details',
        name: 'my-account-Details',
        component: () => import('@/views/my/account/details')
      },
      // {
      //   meta: { title: '收益记录' },
      //   path: '/my/AgentIncomeRecord',
      //   name: 'my-agentincomerecord-AgentIncomeRecordList',
      //   component: () => import('@/views/my/agentincomerecord/AgentIncomeRecordList')
      // },
      // {
      //   meta: { title: '提币记录' },
      //   path: '/my/AgentWithdrawalRecord',
      //   name: 'my-AgentWithdrawalRecord',
      //   component: () => import('@/views/my/agentwithdrawalrecord/AgentWithdrawalRecordList')
      // },
      {
        meta: { title: '推广链接' },
        path: '/userinvitationcode/UserInvitationCodeList',
        name: 'userinvitationcode',
        component: () => import('@/views/userinvitationcode/UserInvitationCodeList')
      },
      {
        meta: { title: '推广素材' },
        path: '/userinvitation/material',
        name: 'userinvitationMaterial',
        component: () => import('@/views/userinvitation/material')
      },
      {
        meta: { title: '佣金说明' },
        path: '/usercenter/CommissionDescription',
        name: 'CommissionDescription',
        component: () => import('@/views/usercenter/CommissionDescription')
      },
      {
        meta: { title: '联系我们' },
        path: '/usercenter/ContactUs',
        name: 'ContactUs',
        component: () => import('@/views/usercenter/ContactUs')
      },
      {
        meta: { title: '合伙人专享' },
        path: '/usercenter/PartnerexClusive',
        name: 'PartnerexClusive',
        component: () => import('@/views/usercenter/PartnerexClusive')
      },
      {
        meta: { title: '用户信息' },
        path: '/usercenter/Userxx',
        name: 'Userxx',
        component: () => import('@/views/usercenter/Userxx')
      }
    ]
  },


  // {
  //   meta: { title: '用户推广邀请码' },
  //   path: '/userinvitationcode/UserInvitationCodeList',
  //   // component: TabLayout,
  //   name: 'userinvitationcode',
  //   component: () => import('@/views/userinvitationcode/UserInvitationCodeList'),
  //   redirect: '/userinvitationcode/UserInvitationCodeList',
  // },


  {
    meta: { title: '代理商管理' },
    path: '/agentmanagesystem',
    component: TabLayout,
    redirect: '/agentmanage/agentlowerlevelincomeconfig/AgentLowerLevelIncomeConfigList',
    children: [
      {
        meta: { title: '下级代理商收益配置' },
        path: '/agentmanagesystem/AgentLowerLevelIncomeConfig',
        name: 'agentmanagesystem-AgentLowerLevelIncomeConfig',
        component: () => import('@/views/agentmanage/agentlowerlevelincomeconfig/AgentLowerLevelIncomeConfigList')
      },
      {
        meta: { title: '代理商列表' },
        path: '/agentmanage/childagent/ChildAgentList',
        name: 'agentmanage-childagent-ChildAgentList',
        component: () => import('@/views/agentmanage/childagent/ChildAgentList')
      },
      {
        meta: { title: '下级代理提币申请' },
        path: '/agentmanage/ChildAgentWithdrawal',
        name: 'agentmanage-ChildAgentWithdrawal',
        component: () => import('@/views/agentmanage/childagentwithdrawal/ChildAgentWithdrawalList')
      },
    ]
  },

  {
    meta: { title: '下级信息' },
    path: '/sellusermanage',
    component: TabLayout,
    redirect: '/sellusermanage/agentuser/AgentUserList',
    children: [
      {
        meta: { title: '用户管理' },
        path: '/sellusermanage/AgentUser',
        icon: "AgentUser",
        name: 'sellusermanage-AgentUser',
        component: () => import('@/views/sellusermanage/agentuser/AgentUserList')
      },
      {
        meta: { title: '持仓管理' },
        path: '/sellusermanage/AgentPositionRecord',
        icon: "AgentPositionRecord",
        name: 'sellusermanage-AgentUser',
        component: () => import('@/views/sellusermanage/AgentPosition/AgentPositionRecord')
      },
    ]
  },
  {
    meta: { title: '交易管理统计' },
    path: '/dealmanage',
    component: TabLayout,
    redirect: '/dealmanage',
    children: [
      {
        meta: { title: '持仓记录' },
        path: '/dealmanage/AgentPositionRecord',
        // icon: "AgentUser",
        name: 'AgentPositionRecord',
        component: () => import('@/views/dealmanage/AgentPositionRecord/Index')
      },
      {
        meta: { title: '开仓记录' },
        path: '/dealmanage/AgentOpenPositionRecord',
        // icon: "AgentUser",
        name: 'AgentOpenPositionRecord',
        component: () => import('@/views/dealmanage/AgentOpenPositionRecord/Index')
      },
      {
        meta: { title: '平仓记录' },
        path: '/dealmanage/AgentClosePositionRecord',
        // icon: "AgentUser",
        name: 'AgentClosePositionRecord',
        component: () => import('@/views/dealmanage/AgentClosePositionRecord/Index')
      },
    ]
  },

  {
    path: '/test',
    hidden: true,
    component: BlankLayout,
    redirect: '/test/home',
    children: [
      {
        path: 'home',
        name: 'TestHome',
        component: () => import('@/views/Home')
      }
    ]
  },
  {
    path: '/404',
    hidden: true,
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  },

]
