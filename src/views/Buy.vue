<template>
  <v-container>
    <v-row>
      <v-col class="my-5" cols="6">
        <v-btn class="mb-5" v-if="isBuy" icon :link="true" @click="toggleIsBuy(false)">
          <v-icon color="black" large>
            mdi-chevron-left-circle
          </v-icon>
        </v-btn>
        <h3 class="display-1 font-weight-bolder">
          {{isBuy === "edit" ? "Edit Order " : isBuy ? "New Order" : "Buy Orders"}}
        </h3>
      </v-col>
      <v-col v-if="!isBuy" class="my-5 text-right" cols="6">
        <v-btn color="primary" @click="toggleIsBuy(true)" >
          Buy Data
          <v-icon small class="ml-2">
            mdi-plus
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <DataTable v-if="!isBuy" :data="data" :headers="headers" :toggleIsBuy="toggleIsBuy" />
    <NewOder v-else :toggleIsBuy="toggleIsBuy" />
      
  </v-container>
</template>

<script>
import DataTable from '../components/DataTable.vue'
import NewOder from '../components/NewOder.vue';
export default {
  components: { DataTable, NewOder },
  name:'buy',
  data(){
    let data = [];
    let headers = [];
    let isBuy = false;
    return{ 
      data,
      isBuy,
      headers
    }
  },
  created(){
    this.data = this.$store.state.orders
    this.headers = this.$store.state.headers
  },
  methods:{
    toggleIsBuy(arg){
      if(arg != "edit"){
        this.$store.dispatch("clearOrder")
      }
      this.isBuy = arg
    }
  },
}
</script>
