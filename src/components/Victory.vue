<template>
  <div>
    <h1>{{ player.name }} {{ $t('won') }}!</h1>
    <button @click="confetti()">{{ $t('confetti') }}</button>
  </div>
</template>

<script>
export default {
  props: ['player'],
  methods: {
    confetti() {
      this.$confetti.start();
    },
  },
};
</script>

<style scoped>
div {
  margin-top: 2rem;
  position: relative;
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
