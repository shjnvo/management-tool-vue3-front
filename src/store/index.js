import { createStore } from "vuex";
import { auth } from "./auth.module";
import { project } from "./project.module";

const store = createStore({
  modules: {
    auth,
    project
  },
});

export default store;
