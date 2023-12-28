<template>
  <div class="challenge-list">
    <div v-for="challenge in challenges" :key="challenge.id">
      <h3>{{ challenge.title }}</h3>
      <p>{{ challenge.description }}</p>
      <button @click="updateCurrentChallenge(challenge)">{{ $t('select') }}</button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    challenges() {
      return this.$store.getters.getChallenges
    },
  },
  methods: {
    updateCurrentChallenge(challenge) {
      this.$store.commit('updateCurrentChallenge', challenge)
    },
  },
};
</script>

<style scoped>
.challenge-list {
  display: flex;
  align-items: stretch;
  flex-direction: column;
  flex-wrap: nowrap;
  align-content: flex-start;
  justify-content: flex-start;
  margin-left: 2rem;
}
</style>
