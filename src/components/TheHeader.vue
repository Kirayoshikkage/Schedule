<template>
  <header class="header">
    <div class="container">
      <div class="header__item">
        <h1 class="lead">Электронное расписание</h1>
        <small class="org"
          >ГАПОУ НСО "Карасукский педагогический колледж"</small
        >
      </div>
      <div class="header__item">
        <ThemeButton />
      </div>
    </div>
  </header>
</template>

<script>
import ThemeButton from "./ThemeButton.vue";

export default {
  components: {
    ThemeButton,
  },
};
</script>

<style lang="scss">
.header {
  padding: 2rem 0;

  .container {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
  }

  .lead {
    margin: 0 0 1rem;
  }

  .org {
    font-size: rem(18);
    font-weight: 400;
  }

  @include x-small {
    .container {
      flex-direction: column-reverse;
    }

    .header__item:last-child {
      align-self: flex-end;
    }
  }
}
</style>
