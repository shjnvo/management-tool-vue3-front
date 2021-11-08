import ProjectService from '../services/project.service';

const initState = {
  projects: {
    title: '',
    description: '',
    project_users: [
      {
        role: ''
      }
    ]
  },
  currentProject: {},
  projectBroad: {
    title: '',
    description: '',
    columns: [
      {
        title: '',
        description: '',
        tasks: [{
          title: '',
          description: '',
        }]
      }
    ],
  }
}

export const project = {
  namespaced: true,
  state: initState,
  actions: {
    listProject({ commit }) {
      return ProjectService.getProjects().then(
        response => {
          commit('getProjectSuccess', response.data)
          return Promise.resolve(response.data);
        },
        error => {
          commit('getProjectFailure')
          return Promise.reject(error);
        }
      )
    },
    getBroad({ commit }, id) {
      return ProjectService.projectBroad(id).then(
        response => {
          commit('getProjectBroadSuccess', response.data)
          return Promise.resolve(response.data);
        },
        error => {
          commit('getProjectBroadFailure')
          return Promise.reject(error);
        }
      )
    },
    // eslint-disable-next-line no-unused-vars
    invite({ commit }, params) {
      return ProjectService.inviteUser(params).then(
        data => {
          return Promise.resolve(data);
        },
        error => {
          return Promise.reject(error);
        }
      )
    },
    // eslint-disable-next-line no-unused-vars
    create({ commit }, params) {
      return ProjectService.createProject(params).then(
        data => {
          return Promise.resolve(data);
        },
        error => {
          return Promise.reject(error);
        }
      )
    },
    // eslint-disable-next-line no-unused-vars
    update({ commit }, params) {
      return ProjectService.updateProject(params).then(
        data => {
          return Promise.resolve(data);
        },
        error => {
          return Promise.reject(error);
        }
      )
    },
    // eslint-disable-next-line no-unused-vars
    delete({ commit }, id) {
      return ProjectService.deleteProject(id).then(
        data => {
          return Promise.resolve(data);
        },
        error => {
          return Promise.reject(error);
        }
      )
    },
  },
  mutations: {
    getProjectSuccess(state, projects) {
      state.projects = projects.data;
    },
    getProjectFailure(state) {
      state.projects = initState.projects;
    },
    getProjectBroadSuccess(state, project) {
      state.projectBroad = project.data;
    },
    getProjectBroadFailure(state) {
      state.projectBroad = initState.projectBroad;
    },
    setProject(state, project) {
      state.currentProject = project
    },
  }
};