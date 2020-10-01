import { createStore } from "vuex";
import sorting from "./sorting";
export default createStore({
  modules: {
    sorting: sorting,
  },
});
