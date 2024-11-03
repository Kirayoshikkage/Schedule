<template>
  <RouterLink :to="to" class="back">
    <ArrowIcon />
    <span>
      <slot></slot>
    </span>
  </RouterLink>
</template>

<script>
import ArrowIcon from "@/components/icons/ArrowIcon.vue";

export default {
  components: {
    ArrowIcon,
  },
  props: {
    to: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.back {
  display: inline-flex;
  gap: 0.5rem;
  align-items: center;
  color: var(--black);
  font-size: rem(18);
  margin: 0 0 3rem;

  .arrow-icon {
    transform: rotate(180deg);
  }

  span {
    padding: 0 0 rem(8);
    border-bottom: 1px solid var(--black);
  }

  @include small {
    font-size: rem(14);
  }
}

@include dark {
  .back {
    color: var(--white);

    .arrow-icon {
      fill: var(--white);
    }

    span {
      border-bottom: 1px solid var(--white);
    }
  }
}
</style>
