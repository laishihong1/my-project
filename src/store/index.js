import Vue from "vue";
import Vuex from "vuex"
import tabs from "./tabs";
Vue.use(Vuex)

const vuex= new Vuex.Store({
     modules:{
         tabs
     }
  })

  export default vuex

