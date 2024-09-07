<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__contacts">
        <a class="footer__link" href="tel:83835521544"
          >Телефон : 8 (383 55) 21 544</a
        >
        <a class="footer__link" href="mailto:ped_kar@edu54.ru"
          >Почта : ped_kar@edu54.ru</a
        >
      </div>
      <address class="footer__address">
        обл. Новосибирская , г. Карасук , ул. Фрунзе , д.89
      </address>
    </div>
  </footer>
</template>

<style lang="scss">
.footer {
  padding: 2rem 0;

  .container {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 2rem;
  }

  &__contacts {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  &__link {
    color: var(--color-black);
  }
}
</style>
