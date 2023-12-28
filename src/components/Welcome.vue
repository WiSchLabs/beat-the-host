<script setup>
import WelcomeItem from './WelcomeItem.vue'
</script>

<template>
  <WelcomeItem>
    <template #heading>{{ $t('welcome') }}</template>
    <div><button @click="startGame()" :disabled="challenges.length < numberOfChallengesToPlay">{{ $t('newGame') }}</button></div>
    <div v-if="challenges.length < numberOfChallengesToPlay" class="warning">{{ $t('notEnoughChallenges') }}</div>
  </WelcomeItem>

  <WelcomeItem>
    <template #heading>{{$t('settings')}}</template>

    {{ $t('players') }}:<ol><li v-for="player in players">{{ player.name }}</li></ol><br/>
    {{ $t('numberOfChallengesToPlay') }}: {{ numberOfChallengesToPlay }}<br/>
    {{ $t('numberOfChallengesConfigured') }}: <span :class="challenges.length < numberOfChallengesToPlay?'warning':''">{{ challenges.length }}</span><br/>
    {{ $t('totalPoints') }}: {{ totalPoints }}<br/>
    {{ $t('pointsToWin') }}: {{ pointsToWin }}<br/>
  </WelcomeItem>
</template>

<script>
export default {
  components: {
  },
  computed: {
    challenges() {
      return this.$store.getters.getChallenges
    },
    players() {
      return this.$store.getters.getPlayers
    },
    numberOfChallengesToPlay() {
      return this.$store.getters.getNumberOfChallengesToPlay
    },
    totalPoints() {
      return this.$store.getters.getTotalPoints
    },
    pointsToWin() {
      return this.$store.getters.getPointsToWin
    }
  },
  methods: {
    startGame() {
      const nextChallenge = this.$store.getters.selectNextChallenge
      this.$store.commit("setNextChallenge", nextChallenge)
    },
  },
};
</script>

<style scoped>
button:disabled {
  color: darkgray;
  background-color: lightgray;
}
.warning {
  color: darkred;
  font-weight: bold;
}
</style>
