<template>
  <section :class="{ hide: showPreloader }" class="groups">
    <div class="container">
      <h2 class="title groups__title">{{ title }}</h2>
      <BackLink
        :to="{
          name: 'home',
        }"
      >
        На главную страницу
      </BackLink>
      <ul class="list-reset groups__list">
        <li v-for="(item, idx) of outputGroupsList" :key="item.idx || idx">
          <article class="groups__item">
            <h3 class="subtitle groups__subtitle">
              {{ item.title || "000" }} группа
            </h3>
            <RouterLink
              :to="{
                name: 'group',
                params: {
                  id: item.id || idx,
                },
              }"
              class="groups__link"
            >
              Расписание занятий
            </RouterLink>
          </article>
        </li>
      </ul>
      <BasePreloader :active="showPreloader" />
    </div>
  </section>
</template>

<script>
import BasePreloader from "@/components/BasePreloader.vue";
import BackLink from "@/components/BackLink.vue";
import { getGroupsList } from "@/Api";

export default {
  components: {
    BackLink,
    BasePreloader,
  },
  inject: ["error"],
  data() {
    return {
      groupsList: [],
      title: "Название специальности",
      id: 0,
    };
  },
  computed: {
    outputGroupsList() {
      return this.groupsList.length ? this.groupsList : Array(4).fill({});
    },
    showPreloader() {
      return !this.groupsList.length;
    },
  },
  mounted() {
    this.loadGroupsList(this.$route.params.id);
  },
  methods: {
    loadGroupsList(id) {
      getGroupsList(id)
        .then((response) => {
          this.title = response.title;
          this.id = response.id;
          this.groupsList.push(...response.groups);
        })
        .catch((error) => {
          if (error == 404) {
            return;
          }

          this.error(`${error} | Список групп специальности ${id}`);
        });
    },
  },
};
</script>

<style lang="scss">
.groups {
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

    @include medium {
      grid-template-columns: 1fr;
    }

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
      visibility: hidden;
      user-select: none;
      transition: opacity var(--transition-duration);
    }
  }

  &.hide &__list::before {
    opacity: 1;
    visibility: visible;
  }

  &__item {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    background-color: var(--black);
    padding: 3rem 1.5rem;

    @include x-small {
      flex-direction: column;
      align-items: center;
    }
  }

  &__subtitle {
    margin: 0;
    color: var(--white);
  }

  &__link {
    color: var(--white);
    padding: 0 0 rem(8);
    align-self: flex-end;
    border-bottom: rem(1) solid var(--white);

    @include x-small {
      align-self: center;
    }
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

@include dark {
  .groups__item {
    background-color: var(--gray);
  }
}
</style>
