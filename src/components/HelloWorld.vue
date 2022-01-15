<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4 mt-10">
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to Narrative
        </h1>

        <p class="subheading font-weight-regular">
            New to Narrative? Learn more about what we do and who we are.
          <br>please join our online
          <a
            href="https://kb.narrative.io/"
            target="_blank"
          >Knowledge Base</a>
        </p>
      </v-col>

      <v-col cols="12">
        <v-timeline
          align-top
          :dense="$vuetify.breakpoint.smAndDown"
        >
          <v-timeline-item
            v-for="(item, i) in items"
            :key="i"
            :color="item.color"
            :icon="item.icon"
            fill-dot
          >
            <v-card
              :color="item.color"
              dark
            >
              <v-card-title class="text-h6">
                {{item.head}}
              </v-card-title>
              <v-card-text class="white text--primary pt-3">
                <p>{{item.para}}</p>
              </v-card-text>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data: () => ({
      items: [
        {
          color: 'primary lighten-7',
          icon: 'mdi-star',
          head:"Sell data easily",
          para:"Create new streams of revenue using the data you already collect with your own branded data shop."

        },
        {
          color: 'primary darken-3',
          icon: 'mdi-book-variant',
          head:"Buy data easily",
          para:"Discover and access the precise data you need, when you need it."
        },
        {
          color: 'primary lighten-7',
          icon: 'mdi-airballoon',
          head:"Rest assured.",
          para:"Narrative is focused on the fundamental principles that make buying and selling data easier, safer, and more strategic."
        },
      ],
    }),
  }
</script>
