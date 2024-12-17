<template>
  <button @click="handler" class="scroll-top"><ArrowIcon /></button>
</template>

<script>
import ArrowIcon from "./icons/ArrowIcon.vue";

export default {
  components: {
    ArrowIcon,
  },
  methods: {
    handler() {
      try {
        document.documentElement?.scrollIntoView({ behavior: "smooth" });
      } catch {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }
    },
  },
};
</script>

<style lang="scss">
.scroll-top {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  display: block;
  padding: rem(8) rem(6) rem(4);
  background-color: var(--black);

  .arrow-icon {
    width: rem(32);
    height: rem(32);
    fill: var(--white);
    transform: rotate(-90deg);

    @include x-small {
      width: rem(24);
      height: rem(24);
    }
  }
}

@include dark {
  .scroll-top {
    background-color: var(--gray);
  }
}
</style>
