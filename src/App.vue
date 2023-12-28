<template>
  <header>
    <img alt="logo" class="logo" src="./assets/BeatTheHost.png" width="300" height="145" />
    <scoreboard/>
  </header>

  <main>
    <welcome v-if="currentChallenge === null && currentChallengeNumber === 0"></welcome>
    <victory v-if="getWinningPlayer !== null" :player="getWinningPlayer"></victory>
    <challenge-item v-if="currentChallenge !== null && getWinningPlayer === null"></challenge-item>
  </main>
</template>

<script>
import ChallengeItem from './components/ChallengeItem.vue';
import Scoreboard from './components/Scoreboard.vue'
import Welcome from './components/Welcome.vue'
import Victory from './components/Victory.vue'

export default {
  components: {
    ChallengeItem,
    Scoreboard,
    Welcome,
    Victory,
  },
  computed: {
    currentChallenge() {
      return this.$store.getters.getCurrentChallenge
    },
    currentChallengeNumber() {
      return this.$store.getters.getCurrentChallengeNumber
    },
    pointsToWin() {
      return this.$store.getters.getPointsToWin
    },
    getWinningPlayer() {
      const players = this.$store.getters.getPlayers
      for(let player of players){
        if (player.score >= this.pointsToWin){
          return player
        }
      }
      return null
    }
  },
};
</script>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;
    padding-right: calc(var(--section-gap) / 2);
    border-right: 3px solid var(--color-main);
  }

  .logo {
    margin: 0 0 0 0;
  }
}
</style>
