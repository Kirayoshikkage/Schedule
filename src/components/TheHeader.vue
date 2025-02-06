<template>
  <header :class="{ hide: showPreloader }" class="header">
    <div class="container">
      <div class="header__item">
        <h1 class="lead">Электронное расписание</h1>
        <small class="org"
          >ГАПОУ НСО "Карасукский педагогический колледж"</small
        >
      </div>
      <div class="header__item header__item_btns">
        <button @click="toggleTheme" class="header__btn">
          <ThemeIcon />
        </button>
        <!-- <a href="menu.pdf#page=1" target="_blank" class="header__btn">
          <MenuIcon />
        </a> -->
        <button @click="modalCallSchedule = true" class="header__btn">
          <TimeTableIcon />
        </button>
      </div>
      <div class="header__item header__item_news">
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
        <BasePreloader :active="showPreloader" />
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
        <VueFinalModal
          v-model="modalCallSchedule"
          :overlay-transition="'vfm-fade'"
          :content-transition="'vfm-fade'"
          class="modal-call-schedule"
        >
          <div>
            <h3 class="subtitle">Основное расписание</h3>
            <ul>
              <li v-for="item of mainCallSchedule" :key="item.time">
                {{ item.id }} | {{ item.time }}
              </li>
            </ul>
          </div>
          <div>
            <h3 class="subtitle">Расписание в субботу</h3>
            <ul>
              <li v-for="item of saturdayCallSchedule" :key="item.time">
                {{ item.id - 10 }} | {{ item.time }}
              </li>
            </ul>
          </div>
          <button @click="modalCallSchedule = false" class="vfm__close">
            <CloseIcon />
          </button>
        </VueFinalModal>
        <ModalsContainer />
      </teleport>
    </div>
  </header>
</template>

<script>
import ThemeIcon from "./icons/ThemeIcon.vue";
// import MenuIcon from "./icons/MenuIcon.vue";
import TimeTableIcon from "./icons/TimeTableIcon.vue";
import BasePreloader from "./BasePreloader.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper/modules";
import { getNewsList, getCallSchedule } from "@/Api";
import { ModalsContainer, VueFinalModal } from "vue-final-modal";
import CloseIcon from "./icons/CloseIcon.vue";
import "swiper/css";
import "swiper/css/pagination";

export default {
  components: {
    BasePreloader,
    Swiper,
    SwiperSlide,
    ModalsContainer,
    VueFinalModal,
    CloseIcon,
    ThemeIcon,
    TimeTableIcon,
    // MenuIcon
  },
  inject: ["error", "toggleTheme"],
  setup() {
    return {
      modules: [Pagination],
    };
  },
  data() {
    return {
      newsList: [],
      callScheduleList: [],
      modalCallSchedule: false,
      newsInfoItemId: undefined,
    };
  },
  computed: {
    saturdayCallSchedule() {
      return this.callScheduleList.filter(({ id }) => id > 10);
    },
    mainCallSchedule() {
      return this.callScheduleList.filter(({ id }) => id <= 10);
    },
    formattedNewList() {
      const stubListItems = [
        {
          id: 1,
          title: "Заголовок новости",
          content:
            "Описание новости которого здесь быть не должно , подождите немного и оно скоро исчезнет , если не исчезло , сообщите в техническую поддержку :)",
          published_at: "17.12.2024",
        },
        {
          id: 2,
          title: "Заголовок новости",
          content:
            "Описание новости которого здесь быть не должно , подождите немного и оно скоро исчезнет , если не исчезло , сообщите в техническую поддержку :)",
          published_at: "17.12.2024",
        },
        {
          id: 3,
          title: "Заголовок новости",
          content:
            "Описание новости которого здесь быть не должно , подождите немного и оно скоро исчезнет , если не исчезло , сообщите в техническую поддержку :)",
          published_at: "17.12.2024",
        },
        {
          id: 4,
          title: "Заголовок новости",
          content:
            "Описание новости которого здесь быть не должно , подождите немного и оно скоро исчезнет , если не исчезло , сообщите в техническую поддержку :)",
          published_at: "17.12.2024",
        },
      ];
      const formattedListItems = this.newsList.map((news) => {
        let formattedPublishedAt = news.published_at.replace(
          /(\d{4})-(\d{2})-(\d{2})T.*/,
          "$3.$2.$1"
        );

        return {
          ...news,
          published_at: formattedPublishedAt,
        };
      });

      return this.newsList.length ? formattedListItems : stubListItems;
    },
    newsInfoItem() {
      return this.formattedNewList.filter((item) => {
        return item.id == this.newsInfoItemId;
      })[0];
    },
    showPreloader() {
      return !this.newsList.length;
    },
  },
  mounted() {
    this.loadNewsList();

    this.loadCallSchedule();
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
    loadCallSchedule() {
      getCallSchedule()
        .then((response) => {
          this.callScheduleList = response;
        })
        .catch((error) => {
          this.error(`${error} | Расписание звонков`);
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
    position: relative;
    grid-column: 1 / 3;

    &::before {
      content: "";
      position: absolute;
      top: -7.5%;
      right: 0;
      bottom: 0;
      left: -2.5%;
      width: 105%;
      height: 115%;
      z-index: 10;
      background-color: rgba(0, 0, 0, 0.6);
      opacity: 0;
      visibility: hidden;
      user-select: none;
      transition: opacity var(--transition-duration);
    }
  }

  &.hide .header__item_news::before {
    opacity: 1;
    visibility: visible;
  }

  .header__item_btns {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .header__btn {
    display: block;
    padding: rem(8) rem(6) rem(4);
    background-color: var(--black);

    .icon {
      width: rem(32);
      height: rem(32);
      fill: var(--white);

      @include x-small {
        width: rem(24);
        height: rem(24);
      }
    }
  }

  .lead {
    margin: 0 0 1rem;
  }

  .org {
    font-size: rem(18);
    font-weight: 400;
  }

  .preloader {
    --size: 1.5;

    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 2;
    transform: translateX(-50%) translateY(-50%);
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

.modal-call-schedule .vfm__content {
  display: flex;
  gap: 0 2rem;
  max-height: 100%;
  overflow: auto;
}

.modal-call-schedule .subtitle {
  font-size: rem(21);
}

.modal-call-schedule li {
  padding: 1rem 0;
  border-bottom: rem(1) solid currentColor;
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

  .modal-call-schedule .vfm__content {
    flex-direction: column;
  }

  .modal-call-schedule li {
    padding: 0.5rem 0;
    font-size: rem(12);
  }
}

@include dark {
  .swiper-pagination-bullet {
    background-color: var(--white);
  }

  .header__btn {
    background-color: var(--gray);
  }
}
</style>
