<template>
  <div class="container">
    <header class="jumbotron text-center">
      <h3>
        List Projects
      </h3>
    </header>
    <div v-if="!!message" class="alert alert-success">
      {{message}}
    </div>
    <div>
      <button type="button" @click="errorMsg = ''; selectProject = {}" class="btn btn-primary mb-1" data-toggle="modal" data-target="#updateModal">
        Create Project
      </button>
    </div>
    <table v-if="listProjects.length > 0" class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Slug</th>
          <th scope="col">Description</th>
          <th scope="col">My Role</th>
          <th scope="col">Status</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(project, index) in listProjects" :key="project">
          <td>{{project.title}}</td>
          <td>{{project.slug}}</td>
          <td>{{project.description}}</td>
          <td>{{project.my_role}}</td>
          <td>{{project.status}}</td>
          <td>
            <button v-if="project.my_role == 'owner'" type="button" @click="selectProject = project; indexProject = index; errorMsg = ''" 
              class="btn btn-primary" data-toggle="modal" data-target="#updateModal">
              Edit
            </button>
            <button v-if="project.my_role != 'member'" type="button" @click="selectProject = project; errorMsg = ''" 
              class="btn btn-warning ml-1" data-toggle="modal" data-target="#inviteModal">
              Invite
            </button>
            <button v-if="project.my_role == 'owner'" type="button" @click="selectProject = project; indexProject = index; errorMsg = ''"
              class="btn btn-danger ml-1" data-toggle="modal" data-target="#deleteModal">
              Delete
            </button>
            <button type="button" @click="goProjectBroad(project)"
              class="btn btn-success ml-1">
              Broad
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="alert alert-warning">
      Please create Project!!!!
    </div>
    <div>
      <div class="modal fade" id="updateModal" ref="updateModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">{{selectProject.id ? 'Update' : 'Create'}} Project</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <label for="title-project">Title</label>
              <input v-model="selectProject.title" type="text" class="form-control col-md-12 mb-2" id="title-project">
              <label for="slug-project">Slug</label>
              <input v-model="selectProject.slug" type="text" class="form-control col-md-12 mb-2" id="slug-project">
              <label for="desc-project">Description</label>
              <textarea v-model="selectProject.description" type="text" class="form-control col-md-12 mb-2" id="desc-project"></textarea>
              <label for="status-project">Status</label>
              <input v-model="selectProject.status" type="text" class="form-control col-md-12 mb-2" id="status-project">
              <div v-if="!!errorMsg" class="alert alert-danger mt-2">
                {{errorMsg}}
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
              <button v-if="selectProject.id" type="button" @click="updateProject" class="btn btn-primary">Update</button>
              <button v-else type="button" @click="createProject" class="btn btn-primary">Create</button>
            </div>
          </div>
        </div>
      </div>

      <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Delete Project</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              Are you sure delete this Project ?
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
              <button type="button" @click="deleteProject" class="btn btn-primary">Confirm</button>
            </div>
          </div>
        </div>
      </div>

      <div class="modal fade" id="inviteModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Invite User</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <label for="user-email">User Email</label>
              <input v-model="user.email" type="mail" class="form-control col-md-12 mb-2" id="user-email">

              <label for="user-email">User Role</label>
              <select v-model="user.role" class="custom-select">
                <option value="owner">Owner</option>
                <option value="admin">Admin</option>
                <option value="member">Member</option>
              </select>
              <div v-if="!!errorMsg" class="alert alert-danger mt-2">
                {{errorMsg}}
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
              <button type="button" @click="inviteProject" class="btn btn-primary">Invite</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'MyLinks',
  data() {
    return {
      newProject: {
        title: '',
        slug: '',
        description: '',
        status: ''
      },
      user: {},
      selectProject:{},
      listProjects: [],
      indexProject: null,
      message: '',
      errorMsg: ''
    }
  },
  mounted() {
    this.$store.dispatch("project/listProject").then(
      response => {
        this.listProjects = response.data
        this.totalPages = response.total_pages
      },
      error => {
        this.message = error.response.message
      }
    )
  },
  methods: {
    createProject() {
      this.$store.dispatch("project/create", this.selectProject).then(
        response => {
          this.message = response.data.message
          this.selectProject = this.newProject
          $('#updateModal').modal('hide')
          this.$router.go("/projects")
        },
        error => {
          this.errorMsg = error.response.data.message[0]
        }
      )
    },
    updateProject() {
      this.$store.dispatch("project/update", this.selectProject.id).then(
        response => {
          this.message = response.data.message
          $('#updateModal').modal('hide')
        },
        error => {
          this.errorMsg = error.response.data.message[0]
        }
      )
    },
    deleteProject() {
      this.$store.dispatch("project/delete", this.selectProject.id).then(
        () => {
          this.listProjects.splice(this.indexProject, 1)
          $('#deleteModal').modal('hide')
        },
        error => {
          this.message = error.response.data.message
        }
      )
    },
    inviteProject() {
      let params = {id: this.selectProject.id, email: this.user.email, role: this.user.role}
      this.$store.dispatch("project/invite", params).then(
        () => {
          $('#deleteModal').modal('hide')
        },
        error => {
          console.log(error.response)
          this.errorMsg = error.response.data.message
        }
      )
    },
    goProjectBroad(project) {
      localStorage.setItem('project', JSON.stringify(project))
      this.$router.push("/broad")
    },
  },
};
</script>