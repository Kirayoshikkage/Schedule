<template>
  <section class="full-schedule">
    <BackLink
      :to="{
        name: 'home',
      }"
    >
      На главную страницу
    </BackLink>
    <ul class="full-schedule__list">
      <!-- group -->
      <li
        v-for="group of formattedSchedule"
        :key="group.title"
        class="full-schedule__item"
      >
        <h2 class="title">{{ group.title }}</h2>
        <!-- day -->
        <div
          v-for="(day, idx) in group.schedule"
          :key="group.title + day"
          class="full-schedule__card"
        >
          <h3 class="subtitle">{{ idx }}</h3>
          <ul class="full-schedule__lessons">
            <!-- lesson -->
            <li
              v-for="lesson of day"
              :key="group.title + day + lesson.index"
              class="full-schedule__lesson"
            >
              <p class="full-schedule__number">{{ lesson.index }}</p>
              <p class="full-schedule__classroom">{{ lesson.classroom }}</p>
              <p class="full-schedule__subject">
                <span>{{ lesson.subject }}</span>
              </p>
              <p class="full-schedule__teacher">
                <span>{{ lesson.teacher }}</span>
              </p>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import BackLink from "@/components/BackLink.vue";
import { getFullScheduleList } from "@/Api";

export default {
  components: {
    BackLink,
  },
  inject: ["error"],
  DAYSWEEK: {
    monday: "Понедельник",
    tuesday: "Вторник",
    wednesday: "Среда",
    thursday: "Четверг",
    friday: "Пятница",
    saturday: "Суббота",
  },
  data() {
    return {
      fullScheduleList: [],
      time: [],
    };
  },
  computed: {
    formattedTime() {
      return this.time.reduce((acc, item) => {
        acc[item.id] = item.title;

        return acc;
      }, {});
    },
    // TODO : рефакторинг
    formattedSchedule() {
      return this.fullScheduleList.map((group) => {
        let formatted = {};
        let sample = Object.keys(this.$options.DAYSWEEK).reduce((acc, item) => {
          // item - eng , day - ru
          const day = this.$options.DAYSWEEK[item];
          const values = [...Array(10).keys()].map((i) => {
            return {
              index: i + 1,
              day: item,
              subject: "-",
              teacher: "-",
              classroom: "-",
            };
          });

          acc[day] = values;

          return acc;
        }, {});

        // Сортирует по дням недели

        formatted = group["list_par" + group.title].reduce((acc, item) => {
          const day = this.$options.DAYSWEEK[item.day];

          if (day) {
            const index = item.index - 1;

            acc[day][index] = item;
          }

          return acc;
        }, sample);

        // Сортирует последовательность уроков по index

        for (let key in formatted) {
          formatted[key] = formatted[key]
            .sort((a, b) => a.index - b.index)
            .map((item) => {
              const time = this.formattedTime[item.index] || "-";

              return {
                time,
                ...item,
              };
            });
        }

        // Объединяет смежные уроки

        for (let key in formatted) {
          formatted[key] = Object.values(
            formatted[key].reduce((acc, lesson) => {
              if (!acc[lesson.index]) {
                acc[lesson.index] = { ...lesson };

                return acc;
              }

              acc[lesson.index].classroom += ` | ${lesson.classroom}`;
              acc[lesson.index].teacher += ` | ${lesson.teacher}`;

              if (acc[lesson.index].subject !== lesson.subject) {
                acc[lesson.index].subject += ` | ${lesson.subject}`;
              }

              return acc;
            }, {})
          );
        }

        return {
          id: group.id,
          title: group.title,
          schedule: formatted,
        };
      });
    },
  },
  mounted() {
    this.loadFullScheduleList();
  },
  methods: {
    loadFullScheduleList() {
      getFullScheduleList()
        .then((response) => {
          const sortedSchedule = response.sort((a, b) => {
            return Number(a.title) - Number(b.title);
          });

          this.fullScheduleList.push(...sortedSchedule);
          this.time = response[0].time;
        })
        .catch((error) => {
          this.error(`${error} | Получение полного расписания`);
        });
    },
  },
};
</script>

<style lang="scss">
.full-schedule {
  width: 1840px;
  padding: 64px 16px;

  .back {
    position: fixed;
    top: 16px;
    left: 16px;
  }

  .title {
    font-size: 10px;
  }

  .subtitle {
    font-size: 8px;
  }

  &__list {
    display: flex;
  }

  &__item {
    padding: 0 4px;

    &:not(:last-child) {
      border-right: 1px solid var(--black);
    }
  }

  &__lesson {
    display: flex;
    gap: 4px;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 4px 0;
    border-bottom: 1px solid var(--black);

    p {
      margin: 0;
      font-size: 6px;
    }
  }

  &__subject {
    flex: 1 1 100%;

    span {
      display: block;
      max-width: 50px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  &__teacher {
    flex: 1 1 100%;

    span {
      display: block;
      max-width: 50px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
