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
      <ScheduleList :schedule="formattedSchedule" class="schedule_adaptive" />
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
      let schedule = this.teacherSchedule.reduce((acc, item) => {
        const key = "list_par" + item.title;
        const items = item[key].map((lesson) => {
          return {
            ...lesson,
            group: item.title,
          };
        });

        acc.push(...items);

        return acc;
      }, []);
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

      formatted = schedule.reduce((acc, item) => {
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

      return formatted;
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
          this.time = response[0].time;
        })
        .catch((error) => {
          if (error == 404) {
            return;
          }

          this.error(`${error} | Расписание учителя ${id}`);
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
