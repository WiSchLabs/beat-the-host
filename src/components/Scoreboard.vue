<template>
  <div class="scoreboard">
    <div class="challengeSquaresOverview">
      <div class="challengeSquare" v-for="index in numberOfChallengesToPlay" :key="index" :class="index > maxPlayedChallengeNumber?'show':''">{{ index }}</div>
    </div>
    <div class="playersScores">
      <div v-for="player in players" :key="player.id" class="player">
        <h3>{{ player.name }}</h3>
        <p class="score"><span>{{ player.score }}</span></p>
        <div class="progressbar">
          <div class="progress" :style="{width: Math.floor((player.score/pointsToWin)*100) + '%'}"></div>
        </div>
        <div class="challengeSquaresByPlayer">
          <div class="challengeSquare" v-for="index in numberOfChallengesToPlay" :key="index" :class="player.challengesWon.includes(index)?'show':''">{{ index }}</div>
        </div>
      </div>
    </div>
    <div class="pieChart">
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    players() {
      return this.$store.getters.getPlayers
    },
    maxPlayedChallengeNumber() {
      return this.$store.getters.getMaxPlayerChallengeNumber
    },
    numberOfChallengesToPlay() {
      return this.$store.getters.getNumberOfChallengesToPlay
    },
    pointsToWin() {
      return this.$store.getters.getPointsToWin
    }
  },
};
</script>

<style scoped>
.scoreboard {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-top: 3rem;
}
.playersScores {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
}
.player {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-top: 3rem;
}
.player:not(:first-child) {
  margin-left: 5rem;
}
.score {
  display: inline-block;
  width: 120px;
  max-height: 2em;
  vertical-align: center;
  background-color: black;
  color: white;
  font-size: 3rem;
  text-align: center;
  margin-bottom: 1rem;
  font-weight: 700;
}
.score span {
  vertical-align: center;
}
.progressbar {
  height: 15px;
  width: 120px;
  background-color: black;
}
.progress {
  height: 15px;
  background-color: red;
  max-width: 100%;
}
.challengeSquaresByPlayer {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 3rem;
  margin-left: 5px;
  width: 125px;
}
.challengeSquare {
  height: 20px;
  width: 20px;
  font-size: 15px;
  background-color: black;
  content-visibility: hidden;
  display: inline-block;
  font-weight: bold;
  margin-bottom: 5px;
  margin-right: 5px;
  text-align: center;
}
.challengeSquare.show {
  background-color: white;
  content-visibility: visible;
  overflow: hidden;
}
h3 {
  text-align: center;
}
</style>
