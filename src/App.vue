<template>
  <TheHeader />
  <main>
    <router-view />
    <ScrollTop />
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
import TheHeader from "@/components/TheHeader.vue";
import ScrollTop from "./components/ScrollTop.vue";
import TheFooter from "@/components/TheFooter.vue";
import { ModalsContainer, VueFinalModal } from "vue-final-modal";
import { pushError } from "./Api";

export default {
  components: {
    TheHeader,
    ScrollTop,
    TheFooter,
    ModalsContainer,
    VueFinalModal,
  },
  data() {
    return {
      isError: false,
      theme: {
        value: "",
        DARK: "dark",
        LIGHT: "light",
        LS: "theme",
      },
    };
  },
  created() {
    let theme = this.storageAvailable()
      ? localStorage.getItem(this.theme.LS) || this.theme.LIGHT
      : this.theme.LIGHT;

    this.setTheme(theme);
  },
  methods: {
    setError(e) {
      this.isError = true;

      pushError(e);
    },
    setTheme(theme) {
      if (!this.storageAvailable()) {
        this.theme.value = theme;

        return;
      }

      if (
        this.theme.value == theme &&
        localStorage.getItem(this.theme.LS) == theme
      ) {
        return;
      }

      this.theme.value = theme;

      localStorage.setItem(this.theme.LS, theme);
    },
    toggleTheme() {
      if (this.theme.value == this.theme.LIGHT) {
        this.setTheme(this.theme.DARK);

        return;
      }

      this.setTheme(this.theme.LIGHT);
    },
    storageAvailable() {
      try {
        let storage = window["localStorage"];
        let x = "__storage_test__";
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
      } catch (e) {
        return false;
      }
    },
  },
  watch: {
    theme: {
      handler() {
        document.body.dataset.theme = this.theme.value;
      },
      deep: true,
    },
  },
  provide() {
    return {
      error: this.setError,
      toggleTheme: this.toggleTheme,
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/common/_common.scss";
@import "@/assets/styles/vendor/modal.scss";

html,
body,
#app {
  height: 100%;
}

body {
  overflow-y: scroll;
}

#app {
  display: flex;
  flex-direction: column;
}

main {
  flex-grow: 1;
}

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

.vfm {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
}

.vfm__content {
  position: relative;
  background-color: var(--white);
  padding: 3rem 1.5rem;
}

.vfm__close {
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.vfm__close path {
  fill: var(--black);
}

@include dark {
  .vfm__content {
    background-color: var(--gray);
  }

  .vfm__close path {
    fill: var(--white);
  }
}

.error-modal {
  &__title {
    font-size: rem(32);
  }
}
</style>
