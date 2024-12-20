<template>
  <section class="group">
    <div class="container">
      <h2 class="title group__title">Расписание {{ title }} группы</h2>
      <BackLink
        :to="{
          name: 'home',
        }"
      >
        На главную страницу
      </BackLink>
      <ScheduleList :schedule="formattedSchedule" class="schedule_adaptive" />
    </div>
  </section>
</template>

<script>
import { getGroupSchedule } from "@/Api";
import ScheduleList from "@/components/ScheduleList.vue";
import BackLink from "@/components/BackLink.vue";

export default {
  components: {
    ScheduleList,
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
      title: "000",
      schedule: [],
      id: 0,
    };
  },
  computed: {
    formattedSchedule() {
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

      formatted = this.schedule.reduce((acc, item) => {
        const day = this.$options.DAYSWEEK[item.day];

        if (day) {
          const index = item.index - 1;

          acc[day][index] = item;
        }

        return acc;
      }, sample);

      // Сортирует последовательность уроков по index

      for (let key in formatted) {
        formatted[key] = formatted[key].sort((a, b) => a.index - b.index);
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

      return formatted;
    },
  },
  mounted() {
    this.loadGroupSchedule(this.$route.params.id);
  },
  methods: {
    loadGroupSchedule(id) {
      getGroupSchedule(id)
        .then((response) => {
          const schedule = response["list_par" + response.title];

          this.title = response.title;
          this.id = response.id;
          this.schedule.push(...schedule);
        })
        .catch((error) => {
          if (error == 404) {
            return;
          }

          this.error(`${error} | Расписание группы ${id}`);
        });
    },
  },
};
</script>

<style lang="scss">
.group {
  padding: 4rem 0;

  &__title {
    margin: 0 0 3rem;
  }

  .subtitle {
    margin: 0 0 2rem;
  }
}
</style>
