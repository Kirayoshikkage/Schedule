<template>
  <ul class="datalist">
    <li v-for="item of outputListItems" :key="item.id">
      <button
        @pointerdown="updateModeValue(item.title)"
        @keydown.space.enter="updateModeValue(item.title)"
        class="datalist__btn"
      >
        {{ item.title }}
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    listItems: {
      type: Array,
      required: true,
    },
    substring: {
      type: String,
      required: true,
    },
    modelValue: {
      type: String,
      required: true,
    },
  },
  emits: {
    "update:modelValue": null,
    matches: null,
  },
  data() {
    return {
      output: 3,
    };
  },
  computed: {
    outputListItems() {
      return this.listItems
        .filter((item) => {
          const title = item.title.toLowerCase();
          const substring = this.substring.toLowerCase();

          return title.includes(substring);
        })
        .splice(0, this.output);
    },
  },
  methods: {
    updateModeValue(string) {
      this.$emit("update:modelValue", string);
    },
  },
  watch: {
    outputListItems() {
      this.$emit("matches", this.outputListItems);
    },
  },
};
</script>

<style lang="scss">
.datalist {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  &__btn {
    padding: 0.5rem 1rem;
    background-color: var(--black);
    color: var(--white);

    @include x-small {
      font-size: rem(12);
    }
  }
}

@include dark {
  .datalist__btn {
    background-color: var(--gray);
  }
}
</style>
