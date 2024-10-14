<template>
  <section class="teacher">
    <div class="container">
      <h2 class="title teacher__title">Преподаватель : {{ title }}</h2>
      <BackLink
        :to="{
          name: 'home',
        }"
      >
        На главную страницу
      </BackLink>
      <template v-for="(schedule, idx) of formattedSchedule" :key="idx">
        <h2 class="title teacher__title">
          {{ teacherSchedule[idx].title }}
        </h2>
        <ScheduleList :schedule="schedule" />
      </template>
    </div>
  </section>
</template>

<script>
import { getTeacherSchedule } from "@/Api";
import BackLink from "@/components/BackLink.vue";
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
      title: this.$route.params.id || "Фамилия И.О",
      teacherSchedule: [],
    };
  },
  computed: {
    formattedSchedule() {
      return this.teacherSchedule.map((item) => {
        let formattedTime = item.time.reduce((acc, item) => {
          acc[item.id] = item.title;

          return acc;
        }, {});
        let schedule = item["list_par" + item.title];
        let formatted = {};

        // Сортирует по дням недели

        formatted = schedule.reduce((acc, item) => {
          const day = this.$options.DAYSWEEK[item.day];

          if (!acc[day] && day !== undefined) {
            acc[day] = [];
          }

          if (day) {
            acc[day].push(item);
          }

          return acc;
        }, {});

        // Сортирует последовательность уроков по index

        for (let key in formatted) {
          formatted[key] = formatted[key]
            .sort((a, b) => a.index - b.index)
            .map((item) => {
              const time = formattedTime[item.index];

              return {
                time,
                ...item,
              };
            });
        }

        return formatted;
      });
    },
  },
  mounted() {
    this.loadTeacherSchedule(this.$route.params.id);
  },
  methods: {
    loadTeacherSchedule(id) {
      getTeacherSchedule(id)
        .then((response) => {
          this.teacherSchedule.push(...response);
        })
        .catch((error) => {
          if (error == 404) {
            return;
          }

          this.error(error);
        });
    },
  },
};
</script>

<style lang="scss">
.teacher {
  padding: 4rem 0;

  &__title {
    margin: 0 0 3rem;
  }

  .subtitle {
    margin: 0 0 2rem;
  }
}
</style>
