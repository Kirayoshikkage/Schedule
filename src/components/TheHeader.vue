<template>
  <header class="header">
    <div class="container">
      <div class="header__item">
        <h1 class="lead">Электронное расписание</h1>
        <small class="org"
          >ГАПОУ НСО "Карасукский педагогический колледж"</small
        >
      </div>
      <div class="header__item header__item_btns">
        <ThemeButton />
      </div>
      <div v-if="newsList.length" class="header__item header__item_news">
        <swiper
          :modules="modules"
          :pagination="{ clickable: true }"
          :space-between="32"
          :breakpoints="{
            992: {
              slidesPerView: 3,
            },
            576: {
              slidesPerView: 2,
            },
            0: {
              slidesPerView: 1,
            },
          }"
          class="mySwiper"
        >
          <swiper-slide v-for="news of formattedNewList" :key="news.id">
            <article class="news-card">
              <small class="news-card__published-time">
                {{ news.published_at }}
              </small>
              <h3 class="subtitle news-card__subtitle">
                <button>{{ news.title }}</button>
              </h3>
              <p class="news-card__content">
                {{ news.content }}
              </p>
            </article>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </header>
</template>

<script>
import ThemeButton from "./ThemeButton.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper/modules";
import { getNewsList } from "@/Api";
import "swiper/css";
import "swiper/css/pagination";

export default {
  components: {
    ThemeButton,
    Swiper,
    SwiperSlide,
  },
  inject: ["error"],
  setup() {
    return {
      modules: [Pagination],
    };
  },
  data() {
    return {
      newsList: [],
    };
  },
  computed: {
    formattedNewList() {
      return this.newsList.map((news) => {
        let formattedPublishedAt = news.published_at.replace(
          /(\d{4})-(\d{2})-(\d{2})T.*/,
          "$3.$2.$1"
        );

        return {
          ...news,
          published_at: formattedPublishedAt,
        };
      });
    },
  },
  mounted() {
    this.loadNewsList();
  },
  methods: {
    loadNewsList() {
      getNewsList()
        .then((response) => {
          this.newsList = response;
        })
        .catch((error) => {
          this.error(`${error} | Список новостей`);
        });
    },
  },
};
</script>

<style lang="scss">
.header {
  padding: 2rem 0;

  .container {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 5rem 2rem;
  }

  .header__item_news {
    grid-column: 1 / 3;
  }

  .lead {
    margin: 0 0 1rem;
  }

  .org {
    font-size: rem(18);
    font-weight: 400;
  }

  .swiper-wrapper {
    padding: 0 0 3rem;
  }

  .swiper-slide {
    height: auto;
  }

  .swiper-pagination {
    bottom: 0;
  }

  .swiper-pagination-bullet {
    width: 0.8rem;
    height: 0.8rem;
    background-color: var(--black);
  }

  .news-card__published-time {
    display: block;
    margin: 0 0 0.5rem;
  }

  .news-card__subtitle {
    margin: 0 0 2rem;
  }

  .news-card__subtitle button {
    max-width: 100%;
    font-weight: bold;
    color: currentColor;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: transparent;
    padding: 0 0 0.5rem;
    transition: border var(--transition-duration);
  }

  .news-card__subtitle button:hover {
    border-bottom-color: currentColor;
  }

  .news-card__content {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }

  @include small {
    .container {
      display: flex;
      flex-direction: column;
      gap: 0;
    }

    .header__item_btns {
      order: -1;
      align-self: flex-end;
    }

    .header__item_news {
      padding: 4rem 0 0;
    }
  }
}

@include dark {
  .swiper-pagination-bullet {
    background-color: var(--white);
  }
}
</style>
