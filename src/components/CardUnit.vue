<template>

  <div :class="sold ? 'card-disabled' : ''" class="card">
    <img
        :src="`data/${item.image}`"
        class="card-image"
        alt="..."
    />
    <div class="card-description">
      <div class="loader" v-if="loaded">

      </div>
      <h3 class="card-title">{{ item.name }}</h3>
      <div v-if="!sold" class="card-price">
        <span>{{ item.discount }}</span>
        <p>{{ item.price }}</p>
      </div>
      <div v-if="!sold" class="card-button">
        <button v-if="!basket" @click="onAdd">
          Купить
        </button>
        <button v-else-if="basket" @click="onAdd">
          <svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.5315 1.80937L5.63341 11.237L1.34814 7.19237" stroke="#F4F6F9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          В корзине
        </button>
      </div>

      <p v-if="sold">Продана на аукционе</p>
    </div>
  </div>

</template>

<script>
export default {
  props: ["item"],
  methods: {

    onAdd() {
      fetch('https://jsonplaceholder.typicode.com/posts/1')
          .then((response) => {
            if (response.ok) {
              return this.$store.commit('UPDATE_FAVORITES', this.item.id)
            }
          }).catch((error) => {
        console.log(error);
      });
    },
  },
  computed: {
    sold(){
      let isSold = false;
       if(this.item.id === 4){
         isSold = true;
       }
       return isSold;
    },
    basket() {
      let isBasket = false;
      let selected = this.$store.state.favorites;
      if (selected) {
        selected.forEach(selectedId => {
          selectedId === this.item.id ? isBasket = true : '';
        })
      }
      return isBasket;
    }
  },
  mounted() {
  }

}

</script>
