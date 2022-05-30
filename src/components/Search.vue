<template>
  <div class="container">
    <input 
      class="form-control"
      type="text"
      v-model='title'
      placeholder="Search for Movies, Series & more" 
      @keyup.enter="apply"/>
    <div class="selects">
      <select
        v-for='filter in filters'
        v-model='$data[filter.name]'
        :key='filter.name'
        class="form-select">
        <option 
          v-if="filter.name === 'year'"
          value="">
          All Years
        </option>
        <option
          v-for="item in filter.items"
          :key="item">
          {{ item }}
        </option>
      </select>
    </div>
    <button
      class="btn btn-primary"
      @click="apply">
      Apply
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      title: '',
      type: 'movie',
      number: 10,
      year: '',
      filters: [
        {
          name: 'type',
          items: ['movie', 'series', 'episode']
        },
        {
          name: 'number',
          items: [10, 20, 30]
        },
        {
          name: 'year',
          items: (() => {
            const years = []
            const nowYear = new Date().getFullYear();
            for (let i =  nowYear; i >= 1985; i--) {
              years.push(i);
            }
            return years
          })()
        },
      ]
    }
  },
  methods: {
    async apply() {
      // search movie
      this.$store.dispatch('movie/searchMovies', {
        title: this.title,
        type: this.type,
        number: this.number,
        year: this.year
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    display: flex;
    * {
      margin-right: 10px;
      font-size: 15px;
      &:last-child {
        margin-right: 0;
      }
    }
    .selects {
      display: flex;
      select {
        width: 120px;
      }
    }
    .btn {
      width: 120px;
      height: 50px;
      font-weight: 700;
      flex-shrink: 0;
    }
  }
  @include media-breakpoint-down(lg) {
    .container {
      display: block;
      input {
        margin-bottom: 10px;
        margin-right: 0;
      }
      .selects {
        margin-right: 0;
        margin-bottom: 10px;
        select {
          width: 100%;
        }
      }
      .btn {
        width: 100%;
      }
    }
  }
</style>
