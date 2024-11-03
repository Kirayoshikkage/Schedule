<template>
  <button
    @pointerdown="toggleTheme"
    @keydown.enter.space="toggleTheme"
    class="theme-button"
  >
    <ThemeIcon />
  </button>
</template>

<script>
import ThemeIcon from "./icons/ThemeIcon.vue";

export default {
  components: {
    ThemeIcon,
  },
  inject: ["toggleTheme"],
};
</script>

<style lang="scss">
.theme-button {
  display: block;
  padding: rem(8) rem(6) rem(4);
  background-color: var(--black);

  .theme-icon {
    width: rem(32);
    height: rem(32);
    fill: var(--white);

    @include x-small {
      width: rem(24);
      height: rem(24);
    }
  }
}

@include dark {
  .theme-button {
    background-color: var(--gray);
  }
}
</style>
