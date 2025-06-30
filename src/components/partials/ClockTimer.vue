<template>
  <div class="countdown-timer">
    <p class="text-sm md:text-xl lg:text-2xl" v-if="timeLeft > 0">Time left: {{ formattedTime }}</p>
  </div>
</template>

<script>
export default {
  name: 'CountdownTimer',

  props: {
    duration: {
      type: Number,
      default: 180
    }
  },
  emits:['timeEnd'],
  data() {
    return {
      timeLeft: this.duration,
      interval: null
    }
  },

  computed: {
    formattedTime() {
      const hours = Math.floor(this.timeLeft / 3600);
      const minutes = Math.floor((this.timeLeft % 3600) / 60);
      const seconds = this.timeLeft % 60;

      if (hours > 0) {
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      } else {
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      }
    }
  },

  mounted() {
    this.startCountdown();
  },

  beforeDestroy() {
    clearInterval(this.interval);
  },

  methods: {
    startCountdown() {
      this.interval = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          clearInterval(this.interval);
          this.$emit('timeEnd',true);
        }
      }, 1000);
    }
  }
}
</script>
