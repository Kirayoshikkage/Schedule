<template>
  <section :class="{ hide: !specialtiesList.length }" class="specialties">
    <div class="container">
      <h2 class="title specialties__title">Список специальностей</h2>
      <ul class="list-reset specialties__list">
        <li v-for="(item, idx) of specialtiesList" :key="item.id || idx">
          <article class="specialties__item">
            <h3 class="subtitle specialties__subtitle">
              {{ item.title || "Название специальности" }}
            </h3>
            <RouterLink :to="{}" class="specialties__link">
              Расписание занятий
            </RouterLink>
          </article>
        </li>
      </ul>
      <BasePreloader :active="!specialtiesList.length" />
    </div>
  </section>
</template>

<script>
import BasePreloader from "@/components/BasePreloader.vue";
import { getSpecialtiesList } from "@/Api";

export default {
  components: {
    BasePreloader,
  },
  inject: ["error"],
  data() {
    return {
      specialtiesList: [],
    };
  },
  mounted() {
    this.loadSpecialtiesList();
  },
  methods: {
    loadSpecialtiesList() {
      getSpecialtiesList()
        .then((response) => {
          this.specialtiesList.push(...response);
        })
        .catch((error) => {
          this.error(error);
        });
    },
  },
};
</script>

<style lang="scss">
.specialties {
  padding: 4rem 0;

  .container {
    position: relative;
  }

  &__title {
    margin: 0 0 3rem;
  }

  &__list {
    position: relative;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;

    &::before {
      content: "";
      position: absolute;
      top: -2.5%;
      right: 0;
      bottom: 0;
      left: -2.5%;
      width: 105%;
      height: 105%;
      z-index: 1;
      background-color: rgba(0, 0, 0, 0.6);
      opacity: 0;
      transition: opacity var(--transition-duration);
    }
  }

  &.hide &__list::before {
    opacity: 1;
  }

  &__item {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: rem(300);
    padding: 3rem 1.5rem;

    &::before,
    &::after {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    &::before {
      background-color: rgba(0, 0, 0, 0.6);
      z-index: -1;
    }

    &::after {
      background-image: url("@/assets/img/spec-bg.webp");
      background-size: cover;
      z-index: -2;
    }
  }

  &__subtitle {
    margin: 0 0 2rem;
    color: var(--color-white);
  }

  &__link {
    color: var(--color-white);
    padding: 0 0 rem(8);
    align-self: flex-end;
    border-bottom: rem(1) solid var(--color-white);
  }

  .preloader {
    --size: 1.5;

    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 2;
    transform: translateX(-50%) translateY(-50%);
  }
}
</style>
