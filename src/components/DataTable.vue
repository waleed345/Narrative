<template>
      <v-row>
        <v-col cols="12">
            <v-row justify="center">
                <v-dialog
                v-model="showAlert"
                max-width="290"
                >
                <v-card>
                    <v-card-title class="text-h5">
                    Are you sure?
                    </v-card-title>

                    <v-card-text>
                        Do you realy want to delete that order?
                    </v-card-text>

                    <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                        color="green darken-1"
                        text
                        @click="showAlert = false"
                    >
                        Cancel
                    </v-btn>

                    <v-btn
                        color="red darken-1"
                        text
                        @click="deleteItem()"
                    >
                        Delete
                    </v-btn>
                    </v-card-actions>
                </v-card>
                </v-dialog>
            </v-row>
        </v-col>
        <v-col cols="12">
            <v-data-table
                :headers="headers"
                :items="data"
                :items-per-page="5"
                class="elevation-5"
            >
                <!-- eslint-disable -->
                <template v-slot:item.status="{ item }">
                    <v-chip
                        color="green"
                        dark
                        label
                    >
                        {{ item.status }}
                    </v-chip>
                </template>
                <template v-slot:item.actions="{ item }">
                    <v-icon
                        small
                        class="mr-2"
                        @click="editOrder(item)"
                    >
                        mdi-pencil
                    </v-icon>
                    <v-icon
                        color="red"
                        small
                        @click="deleteOrder(item)"
                    >
                        mdi-delete
                    </v-icon>
                </template>
               
            </v-data-table>
        </v-col>
      </v-row>
</template>

<script>
export default {
    name: "dataTable",
    props:{
        data:{
            type: Array,
            default:()=> []
        },
        toggleIsBuy:{
            type: Function
        },
        headers:{
            type: Array,
            default: ()=>[]
        }
    },
    data(){
        let showAlert = false;
        let orderItem = {}
        return{ showAlert, orderItem}
    },
    methods: {
      deleteOrder(item){
        this.showAlert = true
        this.orderItem = item 
      },
      editOrder(item){
        this.$store.dispatch("getOrder",item);
        this.toggleIsBuy("edit")
      },
      deleteItem(){
        this.$store.dispatch("removeOrder",this.orderItem)
        this.showAlert = false
      }
    },
}
</script>
