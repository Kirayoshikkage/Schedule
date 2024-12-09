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
        <MenuLink />
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
              <h3
                class="subtitle news-card__subtitle news-card__subtitle_short"
              >
                <button @click="newsInfoItemId = news.id">
                  {{ news.title }}
                </button>
              </h3>
              <p class="news-card__content news-card__content_short">
                {{ news.content }}
              </p>
            </article>
          </swiper-slide>
        </swiper>
      </div>
      <teleport to="body">
        <VueFinalModal
          :model-value="Boolean(newsInfoItemId)"
          @update:model-value="newsInfoModalHandler"
          :overlay-transition="'vfm-fade'"
          :content-transition="'vfm-fade'"
          class="news-info-modal"
        >
          <article class="news-card">
            <small class="news-card__published-time">
              {{ newsInfoItem.published_at }}
            </small>
            <h3 class="subtitle news-card__subtitle">
              {{ newsInfoItem.title }}
            </h3>
            <p class="news-card__content">
              {{ newsInfoItem.content }}
            </p>
          </article>
          <button @click="newsInfoItemId = undefined" class="vfm__close">
            <CloseIcon />
          </button>
        </VueFinalModal>
        <ModalsContainer />
      </teleport>
    </div>
  </header>
</template>

<script>
import ThemeButton from "./ThemeButton.vue";
import MenuLink from "./MenuLink.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper/modules";
import { getNewsList } from "@/Api";
import { ModalsContainer, VueFinalModal } from "vue-final-modal";
import CloseIcon from "./icons/CloseIcon.vue";
import "swiper/css";
import "swiper/css/pagination";

export default {
  components: {
    ThemeButton,
    Swiper,
    SwiperSlide,
    ModalsContainer,
    VueFinalModal,
    CloseIcon,
    MenuLink,
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
      newsInfoItemId: undefined,
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
    newsInfoItem() {
      return this.formattedNewList.filter((item) => {
        return item.id == this.newsInfoItemId;
      })[0];
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
    newsInfoModalHandler(flag) {
      if (!flag && this.newsInfoItemId) {
        this.newsInfoItemId = undefined;
      }
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

  .header__item_btns {
    display: flex;
    flex-direction: column;
    gap: 1rem;
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

  @include small {
    .container {
      display: flex;
      flex-direction: column;
      gap: 0;
    }

    .header__item_btns {
      order: -1;
      align-self: flex-end;
      flex-direction: row;
    }

    .header__item_news {
      padding: 4rem 0 0;
    }
  }
}

.news-card__published-time {
  display: block;
  margin: 0 0 0.5rem;
}

.news-card__subtitle {
  margin: 0 0 2rem;
}

.news-card__subtitle_short button {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  font-weight: bold;
  color: currentColor;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: transparent;
  padding: 0 0 0.5rem;
  transition: border var(--transition-duration);
}

.news-card__subtitle_short button:hover {
  border-bottom-color: currentColor;
}

.news-card__content {
  word-break: break-all;
}

.news-card__content_short {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}

.news-info-modal .vfm__content {
  max-width: 50%;
  max-height: 100%;
  overflow: auto;
}

@include medium {
  .news-info-modal .vfm__content {
    max-width: 100%;
  }
}

@include x-small {
  .news-card__subtitle {
    margin: 0 0 1rem;
  }

  .news-card__content {
    font-size: 0.8rem;
  }
}

@include dark {
  .swiper-pagination-bullet {
    background-color: var(--white);
  }
}
</style>
