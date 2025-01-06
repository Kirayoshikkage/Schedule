<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__item">
        <a class="footer__link" href="tel:83835521544"
          >Телефон : 8 (383 55) 21 544</a
        >
        <a class="footer__link" href="mailto:ped_kar@edu54.ru"
          >Почта : ped_kar@edu54.ru</a
        >
      </div>
      <div class="footer__item">
        <ul class="footer__socials">
          <li>
            <a
              class="footer__link"
              href="https://www.karasukpedcollege.ru/"
              target="_blank"
            >
              <WebIcon />
            </a>
          </li>
          <li>
            <a
              class="footer__link"
              href="https://vk.com/club216662623"
              target="_blank"
            >
              <VkIcon />
            </a>
          </li>
          <li>
            <a
              class="footer__link telegram"
              href="https://t.me/gapounsokpk"
              target="_blank"
            >
              <TelegramIcon />
            </a>
          </li>
        </ul>
        <address class="footer__address">
          обл. Новосибирская , г. Карасук , ул. Фрунзе , д.89
        </address>
      </div>
    </div>
  </footer>
</template>

<script>
import WebIcon from "./icons/WebIcon.vue";
import VkIcon from "./icons/VkIcon.vue";
import TelegramIcon from "./icons/TelegramIcon.vue";

export default {
  components: {
    WebIcon,
    VkIcon,
    TelegramIcon,
  },
};
</script>

<style lang="scss">
.footer {
  padding: 2rem 0;

  .container {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 1rem 2rem;

    @include small {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
  }

  &__item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  &__link {
    display: block;
    color: var(--black);
  }

  &__socials {
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 0.5rem;

    @include small {
      justify-content: center;
    }
  }

  .telegram svg {
    transform: rotate(-30deg) skew(20deg, 0deg) translateX(4px);
  }
}

@include dark {
  .footer__link {
    color: var(--white);
  }
}
</style>
