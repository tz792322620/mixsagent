import { axios } from '@/utils/request'
import data from 'area-data'

// 获取成员信息
export function getAgentUserInfo(params) {
  return axios({
    url: '/agentuser/agentUser/findInfo',
    method: 'get',
    params: params
  })
}

// 用户列表编辑
export function updateAgentUserInfo(data) {
  return axios({
    url: '/agentuser/agentUser/edit',
    method: 'post',
    data: data
  })
}

// 用户列表
// export function updateAgentUserlist(data) {
//   return axios({
//     url: '/agentuser/agentUser/edit',
//     method: 'post',
//     data: data
//   })
// }

// 持仓记录列表
export function getPositionRecord(params) {
  return axios({
    url: '/business/userOrder/closeHoldingList',
    method: 'get',
    params: params
  })
}

// 个人佣金
export function getAgentFinance() {
  return axios({
    url: '/agentuser/agentUser/agentFinance',
    method: 'get',
  })
}

//提款申请
export function addApply(data) {
  return axios({
    url: '/agentuser/agentUser/apply',
    method: 'post',
    data: data
  })
}

//提款信息
export function getApplyInfo(id) {
  return axios({
    url: '/agentuser/agentUser/applyInfo',
    method: 'get',
    params: {
      id
    }
  })
}

// 财务报表
export function getAgentUserFinance(id) {
  return axios({
    url: '/agentuser/agentUser/finance',
    method: 'post',
    params: {
      id
    }
  })
}

