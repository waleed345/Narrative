<template>
  <v-container>
    <v-row>
      <v-col cols="12">
          <v-stepper v-model="e6" vertical>
            <validation-observer
                ref="observer"
                v-slot="{ invalid }"
            > 
            <v-stepper-step :complete="e6 > 1" step="1">
              Name and Data Package Type
            </v-stepper-step>

            <v-stepper-content step="1">
                <small>Add a name and select a data type</small>
                <validation-provider
                    v-slot="{ errors }"
                    name="Name"
                    rules="required"
                >
                    <v-text-field
                        v-model="order['name']"
                        label="Name"
                        clearable
                        :error-messages="errors"
                        outlined
                        class="mt-2"
                    ></v-text-field>
                </validation-provider>

                <validation-provider
                    v-slot="{ errors }"
                    name="Data Type"
                    rules="required"
                >
                    <v-select
                        :items="dataType"
                        label="Data type"
                        :error-messages="errors"
                        outlined
                        class="mt-2"
                        v-model="order['data']"
                    ></v-select>
                </validation-provider>

              <v-btn color="primary mr-1" @click="check()"> Next </v-btn>
            </v-stepper-content>

            <v-stepper-step :complete="e6 > 2" step="2">
              Configure constraints
            </v-stepper-step>

            <v-stepper-content step="2">
                <small>Provide Company name</small>
                <validation-provider
                    v-slot="{ errors }"
                    name="Company Name"
                    rules="required"
                >
                <v-text-field
                    v-model="order['company']"
                    label="Company"
                    :error-messages="errors"
                    clearable
                    outlined
                    class="mt-2"
                ></v-text-field>
                </validation-provider>

             
                <v-btn color="primary" @click="check()"> Next </v-btn>
                <v-btn class="ml-2" outlined @click="e6 = 1"> Back </v-btn>
            </v-stepper-content>

            <v-stepper-step :complete="e6 > 3" step="3">
              Pricing
            </v-stepper-step>

            <v-stepper-content step="3">
                <small>Enter Max Bid Price</small>
                <validation-provider
                    v-slot="{ errors }"
                    name="Price"
                    :rules="{
                    required: true,
                    regex: '^[1-9]+[0-9]*$'
                    }"
                >
                    <v-text-field
                        v-model="order['price']"
                        :error-messages="errors"
                        label="Max bid price"
                        required
                        outlined
                        class="mt-2"
                    ></v-text-field>
                </validation-provider>
                <v-btn color="primary" :disabled="invalid" @click="check()"> {{ isEdit ? "Update" : "Complete Order" }} </v-btn>
                <v-btn class="ml-2" outlined @click="e6=2"> Back </v-btn>
            </v-stepper-content>
            </validation-observer>
          </v-stepper>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { required, regex } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
setInteractionMode('eager')


extend('required', {
    ...required,
    message: '{_field_} can not be empty',
})

extend('regex', {
    ...regex,
    message: '{_field_} {_value_} is not valid',
})


export default {
  name: "newOrder",
  components: {
      ValidationProvider,
      ValidationObserver,
    },
  props: {
    toggleIsBuy: {
      type: Function,
    },
  },
  created() {
    this.updateOrder();
  },
  data() {
    let order = {
      name: "",
      data: "",
      company: "",
      price: "",
    };
    let e6 =1;
    let dataType = [
        "Device Location",
        "Device Behavior",
        "ID Mapping",
    ]
    return {
      order,
      isEdit: false,
      e6,
      dataType,
    };
  },
  methods: {
    onAddClick() {
      if (!this.isEdit) {
        this.$refs.observer.validate()
        this.$store.dispatch("addOrder", this.order);
        this.toggleIsBuy();
      } else {
        this.$refs.observer.validate()
        this.$store.dispatch("editOrder", this.order);
        this.toggleIsBuy();
        this.isEdit = false;
      }
    },
    updateOrder() {
      if (this.$store.state.order.name != null) {
        this.order = this.$store.state.order;
        this.isEdit = true;
      }
    },
    async check(){
        if(this.e6 === 3){
            this.onAddClick()
            return
        }
        await this.$refs.observer.validate()
        this.e6++
    }
  },
};
</script>
