<template>
  <NavBar @sort="sort" />
  <ul class="flex md:hidden mt-3 justify-center items-center text-xl">
    <li
      @click="$store.commit('sorting/setNumbers')"
      class="mr-2 cursor-pointer"
    >
      Shuffle
    </li>
    <li>
      <button
        @click="sort"
        class="p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 text-lg font-semibold"
      >
        Start Sorting
      </button>
    </li>
  </ul>
  <div class="flex flex-col justify-center items-center box-border mt-5">
    <div class="text-3xl mb-3 border rounded-md p-2 md:p-3" style="width: 80%">
      <h3 class="text-center">
        You are sorting with
        <span class="text-indigo-600">{{
          $store.getters["sorting/getAlgoType"]
        }}</span>
        sort
      </h3>
    </div>
    <div class="flex md:hidden mb-3 flex-col items-center w-full">
      <label for="quantity_r" class="text-xl"
        >You can alter the amount {{ quantity }}</label
      >
      <input
        @input="change_quantity"
        type="range"
        v-model="quantity"
        min="10"
        max="70"
        id="quantity_r"
        style="width: 80%"
      />
    </div>
    <div class="flex" ref="num_container" id="num_container" style="width: 95%">
      <span
        v-for="(number, index) in numbers"
        :key="index"
        :style="{ height: number + 'px' }"
        class="bg-green-700 flex-1 mr-1"
      ></span>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBarTailwind";
export default {
  name: "Home",
  computed: {
    numbers() {
      return this.$store.getters["sorting/getNumbers"];
    },
    algoType() {
      return this.$store.getters["sorting/getAlgoType"];
    },
  },
  components: {
    NavBar,
  },
  data() {
    return {
      loopC: 0,
      cTar: null,
      aTar: null,
      target: null,
      len: this.$store.getters["sorting/getNumbers"],
      quantity: 50,
    };
  },
  methods: {
    sort() {
      if (!this.$store.getters["sorting/isSorted"]) {
        this.len = this.$store.getters["sorting/getNumbers"].length;
        if (this.algoType == "Selection") {
          this.selectionSort();
        } else if (this.algoType == "Bubble") {
          this.loopC = this.len - 1;
          this.bubbleSort();
        }
        this.$store.commit("sorting/toggleSorted");
      }
    },
    rewind() {
      this.target[this.cTar].style.background = "#2f855a";
      this.target[this.aTar].style.background = "#2f855a";
      this.cTar = null;
      this.aTar = null;
      this.loopC = 0;
    },
    selectionSort() {
      let minIdx, temp, lengths;
      let self = this;
      setTimeout(function() {
        minIdx = self.loopC;
        for (let j = self.loopC + 1; j < self.len; j++) {
          if (self.numbers[j] < self.numbers[minIdx]) {
            minIdx = j;
          }
        }
        lengths = self.target[self.loopC].style.height;
        self.target[self.loopC].style.height = self.target[minIdx].style.height;
        self.target[minIdx].style.height = lengths;
        if (self.cTar) {
          self.target[self.cTar].style.background = "#2f855a";
          self.target[self.aTar].style.background = "#2f855a";
          self.target[minIdx].style.background = "#c53030";
          self.target[self.loopC].style.background = "#c53030";
        }
        self.cTar = self.loopC;
        self.aTar = minIdx;
        temp = self.numbers[self.loopC];
        self.numbers[self.loopC] = self.numbers[minIdx];
        self.numbers[minIdx] = temp;
        self.loopC++;
        if (self.loopC < self.len) {
          self.selectionSort();
        } else {
          self.rewind();
        }
      }, 50);
    },
    bubbleSort() {
      let self = this;
      setTimeout(function() {
        for (let j = 1; j <= self.loopC; j++) {
          if (self.numbers[j - 1] > self.numbers[j]) {
            let temp = self.numbers[j - 1];
            self.numbers[j - 1] = self.numbers[j];
            self.numbers[j] = temp;
            let lengths = self.target[j - 1].style.height;
            self.target[j - 1].style.height = self.target[j].style.height;
            self.target[j].style.height = lengths;
            if (self.cTar) {
              self.target[self.cTar].style.background = "#2f855a";
              self.target[self.aTar].style.background = "#2f855a";
              self.target[j - 1].style.background = "#c53030";
              self.target[j].style.background = "#c53030";
            }
            self.cTar = j;
            self.aTar = j - 1;
          }
        }
        self.loopC--;
        if (self.loopC >= 0) {
          self.bubbleSort();
        } else {
          self.rewind();
        }
      }, 50);
    },
    change_quantity() {
      this.$store.commit("sorting/setAmount", this.quantity);
      this.$store.commit("sorting/setNumbers");
    },
  },
  created() {
    this.$store.commit("sorting/setNumbers");
    let self = this;
    this.$nextTick(function() {
      self.target = self.$refs.num_container.children;
      self.$store.commit("sorting/setElems", self.$refs.num_container);
    });
  },
};
</script>
