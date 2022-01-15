<template>
  <v-app>
    <v-app-bar
      app
      color="white"
      dark
    >
      <div class="d-flex align-center">
        <v-btn color="transparent" depressed :link="true" to="/">
        <v-img
         
          alt="Narrative Logo"
          class="mr-5"
          contain
          :src="require('./assets/images/narrative_logo.webp')"
          transition="scale-transition"
        />
        </v-btn>
      </div> 

      <v-spacer></v-spacer>
      
      <v-btn color="black" class="mr-2" dark small :link="true" to="/buy">
        Buy
        <v-icon>mdi-chevron-down</v-icon>
      </v-btn>

      <v-btn color="black" class="mr-2" dark small :link="true" to="/sell">
        Sell
        <v-icon>mdi-chevron-down</v-icon>
      </v-btn>

      <v-btn color="black" dark small :link="true" to="/discover">
        Discover
        <v-icon>mdi-chevron-down</v-icon>
      </v-btn>

    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
};
</script>
