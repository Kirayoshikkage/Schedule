<template>
  <template v-for="(day, idx) in schedule" :key="day">
    <h3 class="subtitle">
      {{ idx }}
    </h3>
    <table class="schedule">
      <thead>
        <tr class="schedule__line">
          <th class="schedule__cell schedule__cell_header">№</th>
          <th class="schedule__cell schedule__cell_header">Время</th>
          <th class="schedule__cell schedule__cell_header">Урок</th>
          <th class="schedule__cell schedule__cell_header">Преподаватель</th>
          <th class="schedule__cell schedule__cell_header">Кабинет</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="lesson of day" :key="lesson.index" class="schedule__line">
          <td class="schedule__cell">
            {{ lesson.index }}
          </td>
          <td class="schedule__cell">
            {{ lesson.time }}
          </td>
          <td class="schedule__cell schedule__cell_subject">
            {{ lesson.subject }}
          </td>
          <td class="schedule__cell">
            {{ lesson.teacher }}
          </td>
          <td class="schedule__cell">
            {{ lesson.classroom }}
          </td>
        </tr>
      </tbody>
    </table>
  </template>
</template>

<script>
export default {
  props: {
    schedule: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.schedule {
  width: 100%;
  border-collapse: collapse;
  margin: 0 0 2rem;

  &__cell {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--color-black);
    text-align: center;

    &_header {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }

  @include small {
    thead {
      display: none;
    }

    &__line {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 1rem;
      border-bottom: 1px solid var(--color-black);
      padding: 1rem 0;
    }

    &__cell {
      border: none;
      padding: 0;

      &_subject {
        flex: 1 1 100%;
        text-align: start;
      }
    }
  }
}
</style>
