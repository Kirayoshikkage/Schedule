<template>
  <a class="menu-link" href="menu.pdf#page=1" target="_blank">
    <MenuIcon />
  </a>
</template>

<script>
import MenuIcon from "./icons/MenuIcon.vue";

export default {
  components: {
    MenuIcon,
  },
};
</script>

<style lang="scss">
.menu-link {
  display: block;
  padding: rem(8) rem(6) rem(4);
  background-color: var(--black);

  .menu-icon {
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
  .menu-link {
    background-color: var(--gray);
  }
}
</style>
