<template>
  <div class="challenge">
    <h1>Spiel {{ currentChallengeNumber }}</h1>
    <div class="details">
      <h2>{{ currentChallenge.title }}</h2>
      <p>{{ currentChallenge.description }}</p>
    </div>
    <div class="buttons">
      <button v-for="player in players" :key="player.id" @click="setPlayerWonThisChallenge(player)">{{ player.name }} {{ $t('won') }}</button>
    </div>
    <button v-if="playersCanSwapChallenges" @click="swapChallenge()" class="swapButton">{{ $t('swapCurrentChallenge') }}</button>
  </div>
</template>

<script>
export default {
  computed: {
    currentChallenge() {
      return this.$store.getters.getCurrentChallenge
    },
    players() {
      return this.$store.getters.getPlayers
    },
    currentChallengeNumber() {
      return this.$store.getters.getCurrentChallengeNumber
    },
    playersCanSwapChallenges() {
      return this.$store.getters.getPlayersCanSwapChallenges
    }
  },
  methods: {
    setPlayerWonThisChallenge(player) {
      this.$store.commit('updatePlayerScore', player.id)
      const nextChallenge = this.$store.getters.selectNextChallenge
      this.$store.commit("setNextChallenge", nextChallenge)
    },
    swapChallenge() {
      const nextChallenge = this.$store.getters.selectNextChallenge
      this.$store.commit('swapCurrentChallenge', nextChallenge)
    },
  },
};
</script>


<style scoped>
.challenge {
  margin-top: 2rem;
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: center;
  align-items: center;
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
}
.buttons button:not(:first-child) {
  margin-left: auto;
}
.swapButton {
  margin-top: 3rem;
  margin-left: auto;
  width: 100%;
  height: 2rem;
  padding: 0;
  background-color: lightgray;
}

.details {
  flex: 1;
  background-color: white;
  padding: 1rem;
  border-radius: 8px;
  min-width: 375px;
  max-width: 375px;
}
.details p {
  white-space: pre;
  text-wrap: unset;
}

@media (min-width: 1024px) {
  .challenge {
    margin-top: 0;
    padding: 0 0 0 calc(var(--section-gap) / 2);
  }
}
</style>
