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
      <ScheduleList :schedule="formattedSchedule" />
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
      time: [],
      id: 0,
    };
  },
  computed: {
    formattedTime() {
      return this.time.reduce((acc, item) => {
        acc[item.id] = item.title;

        return acc;
      }, {});
    },
    formattedSchedule() {
      let formatted = {};

      // Сортирует по дням недели

      formatted = this.schedule.reduce(
        (acc, item) => {
          const day = this.$options.DAYSWEEK[item.day];

          if (day) {
            acc[day].push(item);
          }

          return acc;
        },
        {
          Понедельник: [],
          Вторник: [],
          Среда: [],
          Четверг: [],
          Пятница: [],
          Суббота: [],
        }
      );

      // Сортирует последовательность уроков по index

      for (let key in formatted) {
        formatted[key] = formatted[key]
          .sort((a, b) => a.index - b.index)
          .map((item) => {
            const time = this.formattedTime[item.index];

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
          this.time = response.time;
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
