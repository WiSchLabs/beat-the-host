import './assets/main.css'

import { createApp } from 'vue'
import { createStore } from 'vuex'
import { createI18n } from "vue-i18n";
import App from './App.vue'
import challenges from './data/challenges.json';
import players from './data/players.json';
import settings from './data/settings.json';
import VueConfetti from 'vue-confetti'

const initialState = {
    settings: settings,
    challenges: challenges,
    players: players,
    currentChallenge: null,
    currentChallengeNumber: 0,
    unplayedChallenges: challenges,
};
const store = createStore({
    state: JSON.parse(localStorage.getItem('store')) || initialState,
    getters: {
        getPlayers: (state) => state.players,
        getChallenges: (state) => state.challenges,
        getCurrentChallenge: (state) => state.currentChallenge,
        getCurrentChallengeNumber: (state) => state.currentChallengeNumber,
        getMaxPlayerChallengeNumber: (state) => {
            let lastChallengeWon = 0
            for (const player of state.players) {
                let lastChallengeWonByPlayer = Math.max(...player.challengesWon)
                lastChallengeWon = Math.max(lastChallengeWonByPlayer, lastChallengeWon)
            }
            return lastChallengeWon
        },
        getNumberOfChallengesToPlay: (state) => state.settings.numberOfChallengesToPlay,
        getUnplayedChallenges: (state) => state.unplayedChallenges,
        getTotalPoints(state) {
            return (state.settings.numberOfChallengesToPlay + 1) * state.settings.numberOfChallengesToPlay / 2
        },
        getPointsToWin(state, getters) {
            const halfOfPoints = getters.getTotalPoints / 2
            if (getters.getTotalPoints % 2 === 0) {
                // If even number of totalPoints, then half is a round number, so add 1 to get the absolute majority
                return Math.floor(halfOfPoints + 1);
            } else {
                // If odd number of totalPoints, get the absolute majority by rounding up
                return Math.ceil(halfOfPoints);
            }
        },
        selectNextChallenge(state) {
            let challenge = state.unplayedChallenges[0]
            if (state.settings.randomizeChallenges) {
                challenge = state.unplayedChallenges[Math.floor(Math.random()*state.challenges.length)];
            }
            return challenge
        },
        getPlayersCanSwapChallenges(state) {
            return state.settings.playersCanSwapChallenges
        }
    },
    mutations:{
        setNextChallenge(state, challenge) {
            this.commit("swapCurrentChallenge", challenge)
            state.currentChallengeNumber += 1;
        },
        swapCurrentChallenge(state, challenge) {
            state.currentChallenge = challenge;
            const index = state.unplayedChallenges.findIndex((i) => {
                return i.id === challenge.id;
            })
            state.unplayedChallenges.splice(index, 1)
        },
        updatePlayerScore(state, playerId) {
            for (const player of state.players) {
                if (player.id === playerId) {
                    player.challengesWon.push(state.currentChallengeNumber)
                    player.score += state.currentChallengeNumber
                }
            }
        },
        resetGame(state) {
            state.currentChallengeNumber = 0;
            state.currentChallenge = null;
            for (const player of state.players) {
                player.challengesWon = []
                player.score = 0
            }
        },
    }
})

store.subscribe((mutation, state) => {
    // Store the state object as a JSON string when it's changed
    localStorage.setItem('store', JSON.stringify(state));
});

import messagesEN from './i18n/messages.en.json';
import messagesDE from './i18n/messages.de.json';

const i18n = createI18n({
    locale: settings.language,
    fallbackLocale: 'en',
    messages: {
        'en': messagesEN,
        'de': messagesDE,
    },
});

const app = createApp(App);
app.use(store)
app.use(i18n)
app.use(VueConfetti)
app.mount('#app');
