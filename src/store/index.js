import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    id:3,
    headers: [
      { text: 'ID',value: 'id',},
      { text: 'Order name', value: 'name' },
      { text: 'Status', value: 'status' },
      { text: 'Company', value: 'company' },
      { text: 'Data type(s)', value: 'data' },
      { text: 'Max bid price', value: 'price' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    orders:[
      {
        id: 1,
        name: "High Value Customer CRM Enrichment",
        status: "active",
        company: "Narrative, Inc",
        data: "Device Behavior",
        price: 19028,
      },
      {
        id: 2,
        name: "High Enrichment Customer",
        status: "active",
        company: "Apple, Inc",
        data: "Device Location",
        price: 32600,
      }
    ],
    order:{}
  },
  mutations: {
    ADD_ORDER(state,order){
      state.orders.push({
        ...order,
        status:"active",
        id: state.id++
      })
    },
    GET_ORDER(state,order){
      let orders = [...state.orders]
      let index = orders.findIndex((e)=>e.id == order.id)
      state.order = orders[index];
    },
    EDIT_ORDER(state,order){
      let orders = [...state.orders]
      let index = orders.findIndex((e)=>e.id == state.order.id)
      state.orders.splice(index,1,order)
      state.order = {};
    },
    REMOVE_ORDER(state, order){
      let orders = [...state.orders]
      let index = orders.findIndex((e)=>e.id == order.id)
      state.orders.splice(index, 1)
    },
    CLEAR_ORDER(state){
      state.order = {}
    }
  },
  actions: {
    addOrder({commit},order){
      commit('ADD_ORDER',order)
    },
    getOrder({commit}, order){
      commit('GET_ORDER', order)
    },
    editOrder({commit},order){
      commit("EDIT_ORDER",order)
    },
    removeOrder({commit}, order){
      commit('REMOVE_ORDER', order)
    },
    clearOrder({commit}){
      commit('CLEAR_ORDER')
    }
  }
})
