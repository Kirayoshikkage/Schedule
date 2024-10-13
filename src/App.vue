<template>
  <TheHeader />
  <main>
    <router-view />
  </main>
  <TheFooter />
  <VueFinalModal
    v-model="isError"
    :overlay-transition="'vfm-fade'"
    :content-transition="'vfm-fade'"
    class="error-modal"
  >
    <h2 class="error-modal__title">Произошла ошибка , обновите страницу!</h2>
  </VueFinalModal>
  <ModalsContainer />
</template>

<script>
import TheHeader from "./components/TheHeader.vue";
import TheFooter from "./components/TheFooter.vue";
import { ModalsContainer, VueFinalModal } from "vue-final-modal";

export default {
  components: {
    TheHeader,
    TheFooter,
    ModalsContainer,
    VueFinalModal,
  },
  data() {
    return {
      isError: false,
    };
  },
  methods: {
    setError() {
      this.isError = true;
    },
  },
  provide() {
    return {
      error: this.setError,
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/common/_common.scss";
@import "@/assets/styles/vendor/modal.scss";

.lead {
  font-size: rem(64);

  @include small {
    font-size: rem(46);
  }
}

.title {
  font-size: rem(48);

  @include small {
    font-size: rem(28);
  }
}

.subtitle {
  font-size: rem(32);

  @include small {
    font-size: rem(21);
  }
}

.error-modal {
  display: flex;
  align-items: center;
  justify-content: center;

  .vfm__content {
    background-color: var(--color-white);
    padding: 3rem 1.5rem;
  }

  &__title {
    font-size: rem(32);
  }
}
</style>
