export default {
  namespaced: true,
  state: {
    numbers: null,
    amount: 40,
    max: 300,
    min: 5,
    algorithm: "Selection",
    elems: null,
    sorted: false,
  },
  getters: {
    getNumbers(state) {
      return state.numbers;
    },
    getElems(state) {
      return state.elems;
    },
    getAlgoType(state) {
      return state.algorithm;
    },
    isSorted(state) {
      return state.sorted;
    },
  },
  mutations: {
    setNumbers(state) {
      let newData = [];
      for (let i = 0; i < state.amount; i++) {
        newData.push(
          Math.floor(Math.random() * (state.max - state.min + 1)) + state.min
        );
      }
      state.numbers = newData;
      state.sorted = false;
    },
    setNumbersImp(state, numbers) {
      state.numbers = numbers;
      state.sorted = false;
    },
    setAlgoType(state, algo) {
      state.algorithm = algo;
      let newData = [];
      for (let i = 0; i < state.amount; i++) {
        newData.push(
          Math.floor(Math.random() * (state.max - state.min + 1)) + state.min
        );
      }
      state.numbers = newData;
      state.sorted = false;
    },
    setElems(state, elems) {
      state.elems = elems;
    },
    setAmount(state, new_a) {
      state.amount = new_a;
    },
    toggleSorted(state) {
      state.sorted = !state.sorted;
    },
  },
};
