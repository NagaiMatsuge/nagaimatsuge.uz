<template>
  <div class="py-3 border-b border-gray-300 flex justify-between relative">
    <div
      v-if="!opened"
      class="flex justify-between px-3 items-center md:justify-around w-full"
    >
      <div v-if="!opened" class="text-3xl font-bold">
        <router-link to="/">Visualization</router-link>
      </div>
      <div class="hidden md:block text-gray-600">
        <ul class="flex justify-around text-xl cursor-pointer">
          <li @click="switch_sorting" class="mx-3 flex items-center">
            <span class="pr-2 hover:text-gray-900">Sorting</span>
            <svg
              x-state:on="Item active"
              x-state:off="Item inactive"
              class="h-5 w-5 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150 text-gray-400"
              x-bind:class="{ 'text-gray-600': flyoutMenuOpen, 'text-gray-400': !flyoutMenuOpen }"
              x-description="Heroicon name: chevron-down"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <div
              v-if="sorting"
              class="sorting absolute w-64 bg-white shadow-lg border rounded-md"
            >
              <ul class="text-gray-900">
                <li
                  @click="$store.commit('sorting/setAlgoType', 'Selection')"
                  class="p-3 m-2 hover:bg-gray-200"
                >
                  <h4 class="text-xl">Selection</h4>
                  <p class="text-sm text-gray-700">
                    Get a better understanding of where your traffic is coming
                  </p>
                </li>
                <li
                  @click="$store.commit('sorting/setAlgoType', 'Bubble')"
                  class="p-3 m-2 hover:bg-gray-200"
                >
                  <h4 class="text-xl">Bubble</h4>
                  <p class="text-sm text-gray-700">
                    Get a better understanding of where your traffic is coming
                  </p>
                </li>
                <li class="p-3 m-2 text-center">
                  <h4 class="text-xl">Coming more...</h4>
                </li>
              </ul>
              <div
                class="bg-gray-100 flex items-center justify-between text-center"
              >
                <div class="w-2/4 p-4 hover:bg-gray-200">Contact Me</div>
                <div class="w-2/4 p-4 hover:bg-gray-200">Follow Me</div>
              </div>
            </div>
          </li>
          <li class="mx-3 hover:text-gray-900 flex flex-col text-center">
            <label for="quantity_range" class="text-xl"
              >Amount {{ quantity }}</label
            >
            <input
              @input="change_quantity"
              type="range"
              v-model="quantity"
              min="10"
              max="165"
              id="quantity_range"
              style="width: 200px"
            />
          </li>
        </ul>
      </div>
      <div class="hidden md:block">
        <ul class="flex justify-center items-center text-xl">
          <li
            @click="$store.commit('sorting/setNumbers')"
            class="mr-2 cursor-pointer"
          >
            Shuffle
          </li>
          <li>
            <button
              @click="emit_sort"
              class="p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 text-lg font-semibold"
            >
              Start Sorting
            </button>
          </li>
        </ul>
      </div>
      <div v-if="!opened" @click="opened = !opened" class="block md:hidden">
        <svg
          class="h-6 w-6"
          x-description="Heroicon name: menu"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </div>
    </div>
    <div v-if="opened" class="block md:hidden bg-white w-full">
      <div class="flex justify-between items-center w-full p-2">
        <div class="text-3xl font-bold">Visualization</div>
        <div @click="opened = !opened">
          <svg
            class="h-6 w-6"
            x-description="Heroicon name: x"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </div>
      </div>
      <ul class="border-b font-semibold p-1 cursor-pointer">
        <li
          @click="$store.commit('sorting/setAlgoType', 'Selection')"
          class="py-2 px-1 hover:bg-gray-100 rounded-sm"
        >
          Selection
        </li>
        <li
          @click="$store.commit('sorting/setAlgoType', 'Bubble')"
          class="py-2 px-1 hover:bg-gray-100 rounded-sm"
        >
          Bubble
        </li>
        <li class="py-2 px-1 hover:bg-gray-100 rounded-sm">More Coming Soon</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      opened: false,
      more: false,
      sorting: false,
      quantity: 50,
    };
  },
  methods: {
    switch_sorting() {
      this.sorting = !this.sorting;
      if (this.more) this.more = false;
    },
    switch_more() {
      this.more = !this.more;
      if (this.sorting) this.sorting = false;
    },
    change_quantity() {
      this.$store.commit("sorting/setAmount", this.quantity);
      this.$store.commit("sorting/setNumbers");
    },
    emit_sort() {
      if (!this.$store.getters["sorting/isSorted"]) {
        this.$emit("sort");
        this.$store.commit("sorting/toggleSorted");
      }
    },
  },
};
</script>

<style scoped>
.sorting {
  width: 400px;
  top: 80%;
  left: 23%;
}
.more {
  width: 400px;
  top: 80%;
  left: 50%;
}
</style>
