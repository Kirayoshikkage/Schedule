<template>
  <template v-for="(day, idx) in schedule" :key="day">
    <h3 class="subtitle">
      {{ idx }}
      <span v-if="!day.length">(уроки отсутствуют)</span>
    </h3>
    <table v-if="day.length" v-bind="$attrs" class="schedule">
      <thead>
        <tr class="schedule__line">
          <th class="schedule__cell schedule__cell_header">№</th>
          <th class="schedule__cell schedule__cell_header">Урок</th>
          <th class="schedule__cell schedule__cell_header">Преподаватель</th>
          <th class="schedule__cell schedule__cell_header">Кабинет</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="lesson of day"
          :key="lesson.index"
          :class="{ schedule__line_change: lesson.has_changes }"
          class="schedule__line"
        >
          <td class="schedule__cell schedule__cell_index">
            {{ lesson.index || "Поле не заполнено , уточните у диспетчера" }}
          </td>
          <td class="schedule__cell schedule__cell_subject">
            {{ lesson.subject || "Поле не заполнено , уточните у диспетчера" }}
            <template v-if="lesson.group">({{ lesson.group }})</template>
          </td>
          <td class="schedule__cell">
            {{ lesson.teacher || "Поле не заполнено , уточните у диспетчера" }}
          </td>
          <td class="schedule__cell schedule__cell_classroom">
            {{
              lesson.classroom || "Поле не заполнено , уточните у диспетчера"
            }}
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

  &__line_change {
    background-color: rgba(0, 0, 0, 0.1);
  }

  &__cell {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--black);
    text-align: center;

    &_header {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }

  &_adaptive {
    @include small {
      thead {
        display: none;
      }

      .schedule__line {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 1rem;
        border-bottom: 1px solid var(--black);
        padding: 1rem 0.5rem;
      }

      .schedule__cell {
        border: none !important;
        padding: 0;

        &_index {
          order: -2;
        }

        &_classroom {
          order: -1;
          margin-right: auto;
        }

        &_subject {
          flex: 1 1 100%;
          text-align: start;
        }
      }
    }
  }
}

@include dark {
  .schedule {
    &__line_change {
      background-color: rgba(255, 255, 255, 0.1);
    }

    &__cell {
      border-bottom: 1px solid var(--gray);

      &_header {
        background-color: rgba(255, 255, 255, 0.1);
      }
    }

    &_adaptive {
      @include medium {
        .schedule__line {
          border-bottom: 1px solid var(--gray);
        }
      }
    }
  }
}
</style>
