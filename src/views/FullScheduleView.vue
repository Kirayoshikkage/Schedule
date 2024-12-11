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
      <li
        v-for="(group, idx) of formattedSchedule"
        :key="idx"
        class="full-schedule__item"
      >
        <h3 class="subtitle">{{ group.title }}</h3>
        <ScheduleList :schedule="group.schedule" />
      </li>
    </ul>
  </section>
</template>

<script>
import BackLink from "@/components/BackLink.vue";
import { getFullScheduleList } from "@/Api";
import ScheduleList from "@/components/ScheduleList.vue";

export default {
  components: {
    BackLink,
    ScheduleList,
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
  padding: 4rem 1rem;

  .back {
    position: fixed;
    top: 2.5rem;
    left: 1rem;
  }

  &__list {
    display: flex;
    gap: 2rem;
  }

  .schedule {
    &__cell {
      padding: 0.5rem;
      font-size: 0.5rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 14rem;
    }
  }
}
</style>
