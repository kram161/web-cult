<template>
  <header>
    <div class="container">
      <nav class="header">
        <router-link to="/" class="header__logo"><img :src="'data/img/logo.png'"/></router-link>
        <ul class="header__list">
          <li>
            <router-link to="/">Каталог</router-link>
          </li>
          <li>
            <router-link to="/">Доставка</router-link>
          </li>
          <li>
            <router-link to="/">Оплата</router-link>
          </li>
          <li>
            <router-link to="/">Контакты</router-link>
          </li>
          <li>
            <router-link to="/">О галерее</router-link>
          </li>
        </ul>
        <div class="header__search">
          <input ref="inputText" placeholder="Поиск по названию картины">
          <button @click="takeInput">Найти</button>
        </div>
        <router-link to="/" class="header__cart">
          <svg width="21" height="23" viewBox="0 0 21 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M5.75 7.33333V5.75C5.75 4.49022 6.25045 3.28204 7.14124 2.39124C8.03204 1.50045 9.24022 1 10.5 1C11.7598 1 12.968 1.50045 13.8588 2.39124C14.7496 3.28204 15.25 4.49022 15.25 5.75V7.33333M2.79167 7.33333C2.5817 7.33333 2.38034 7.41674 2.23187 7.56521C2.08341 7.71368 2 7.91504 2 8.125L1 18.8125C1 20.3088 2.27458 21.5833 3.77083 21.5833H17.2292C18.7254 21.5833 20 20.3706 20 18.8744L19 8.125C19 7.91504 18.9166 7.71368 18.7681 7.56521C18.6197 7.41674 18.4183 7.33333 18.2083 7.33333H2.79167Z"
                stroke="#1F1F1F" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <p class="header__cart-count">
            <span>
              {{ selectedCount }}
            </span>
          </p>
        </router-link>
      </nav>
    </div>
    <hr>
  </header>
  <section>
    <div class="container">
      <div class="card">
        <h2>Картины эпохи Возрождения</h2>
        <div class="card__list">
          <cardUnit
              v-for="product in searchClick"
              :key="product.id"
              :item="product"
          />
        </div>
      </div>
    </div>
  </section>

</template>

<script>
import cardUnit from '../components/CardUnit.vue'

export default {
  data(){
    return{
      search: '',
    }
  },
  components: {
    cardUnit,
  },
  async mounted() {
    await this.$store.dispatch("fetchProducts");
  },
  methods: {
    takeInput() {
      const inputText = this.$refs.inputText.value;
      this.search = inputText;
    }
  },
  computed: {
    selectedCount() {
      return this.$store.state.favorites.length;
    },
    products() {
      return this.$store.state.products;
    },
    searchClick(){
      return this.products.filter(item => item.name.indexOf(this.search) !== -1);
    }
  }
}
</script>

<style lang="scss">


</style>