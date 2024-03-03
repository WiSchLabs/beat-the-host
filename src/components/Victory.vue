<template>
  <div>
    <h1>{{ player.name }} {{ $t('won') }}!</h1>
    <div class="buttons">
      <button @click="confetti()">{{ $t('confetti') }}</button>
      <button @click="resetGame()" :disabled="challenges.length < numberOfChallengesToPlay">{{ $t('newGame') }}</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['player'],
  computed: {
    challenges() {
      return this.$store.getters.getChallenges
    },
    numberOfChallengesToPlay() {
      return this.$store.getters.getNumberOfChallengesToPlay
    },
  },
  methods: {
    confetti() {
      this.$confetti.start();
    },
    resetGame() {
      this.$confetti.stop();
      this.$store.commit("resetGame")
    },
  },
};
</script>

<style scoped>
div {
  margin-top: 2rem;
  position: relative;
}
.buttons {
  margin-top: 2rem;
  position: relative;
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  min-width: 375px;
  max-width: 375px;
  padding: 0;
}
.buttons button:not(:first-child) {
  margin-left: auto;
}
.buttons button {
  width: 40%
}
@media (min-width: 1024px) {
  div {
    margin-top: 0;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: stretch;
    flex-wrap: nowrap;
    padding: 0.4rem 0 1rem calc(var(--section-gap) / 2);
  }
}
</style>
