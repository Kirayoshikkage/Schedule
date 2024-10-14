<template>
  <section :class="{ hide: showPreloader }" class="specialties">
    <div class="container">
      <div class="specialties__teachers">
        <form @submit.prevent="searchTeachersHandler" class="specialties__form">
          <label class="specialties__label" for="teacher"
            >Поиск по преподавателям</label
          >
          <input
            v-model="teacher"
            class="specialties__input"
            type="text"
            id="teacher"
            placeholder="Баштанов В.И."
          />
          <button
            @pointerdown="teacher = ''"
            @keydown.space.enter="teacher = ''"
            type="button"
            class="specialties__reset"
          >
            x
          </button>
          <button
            :disabled="!teachersListMatches.length || !teacher"
            type="submit"
            class="specialties__submit"
          >
            <SearchIcon />
          </button>
        </form>
        <CustomDatalist
          :list-items="teachersList"
          :substring="teacher"
          v-model="teacher"
          @matches="updateMatches"
        />
      </div>
      <h2 class="title specialties__title">Список специальностей</h2>
      <ul class="list-reset specialties__list">
        <li v-for="(item, idx) of outputSpecialtiesList" :key="item.id || idx">
          <article class="specialties__item">
            <h3 class="subtitle specialties__subtitle">
              {{ item.title || "Название специальности" }}
            </h3>
            <RouterLink
              :to="{
                name: 'groups',
                params: {
                  id: item.id || idx,
                },
              }"
              class="specialties__link"
            >
              Список групп
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
import CustomDatalist from "@/components/CustomDatalist.vue";
import SearchIcon from "@/components/icons/SearchIcon.vue";
import { getSpecialtiesList, getTeachersList } from "@/Api";

export default {
  components: {
    BasePreloader,
    CustomDatalist,
    SearchIcon,
  },
  inject: ["error"],
  data() {
    return {
      specialtiesList: [],
      teachersList: [],
      teachersListMatches: [],
      teacher: "",
    };
  },
  computed: {
    outputSpecialtiesList() {
      return this.specialtiesList.length
        ? this.specialtiesList
        : Array(6).fill({});
    },
    showPreloader() {
      return !this.specialtiesList.length;
    },
  },
  mounted() {
    this.loadSpecialtiesList();

    this.loadTeachersList();
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
    loadTeachersList() {
      getTeachersList()
        .then((response) => {
          this.teachersList.push(...response);
        })
        .catch((error) => {
          this.error(error);
        });
    },
    updateMatches(matches) {
      this.teachersListMatches = matches;
    },
    searchTeachersHandler() {
      if (!this.teachersListMatches.length || !this.teacher) return;

      const teacher = this.teachersListMatches[0].title;

      this.$router.push({
        name: "teacher",
        params: {
          id: teacher,
        },
      });
    },
  },
};
</script>

<style lang="scss">
.specialties {
  padding: 4rem 0;

  @include small {
    padding: 2rem 0;
  }

  .container {
    position: relative;
  }

  &__teachers {
    position: relative;
    width: 60%;
    margin: 0 0 6rem;

    @include large {
      width: 100%;
    }

    @include small {
      margin: 0 0 7rem;
    }
  }

  &__form {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    gap: 2rem 1rem;
  }

  &__label {
    flex: 1 1 100%;
    display: block;
    font-size: rem(18);
  }

  &__input {
    border-bottom: rem(1) solid var(--color-black);
    padding: 0 0 1rem;
    flex-grow: 1;
  }

  &__submit {
    color: var(--color-white);
    transition: opacity var(--transition-duration);

    &:disabled {
      opacity: 0.5;
    }
  }

  &__reset {
    position: absolute;
    top: 40%;
    right: 80px;
    z-index: 1;
    font-size: 1.5rem;
    transform: translateY(50%);
  }

  .datalist {
    position: absolute;
    transform: translateY(100%);
    bottom: -1rem;
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
      visibility: hidden;
      user-select: none;
      transition: opacity var(--transition-duration);
    }

    @include medium {
      grid-template-columns: 1fr;
    }
  }

  &.hide &__list::before {
    opacity: 1;
    visibility: visible;
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

    @include small {
      min-height: rem(240);
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
