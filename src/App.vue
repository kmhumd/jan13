<template>
  <v-app>
    <v-main>
      <Jan13 />
    </v-main>
    <v-footer dark>
      <div>KOKI(2023)</div>
    </v-footer>
  </v-app>
</template>

<script>
import Jan13 from './components/Jan13';

export default {
  name: 'App',

  components: {
    Jan13,
  },

  data: () => ({
    //
  }),
};
</script>
