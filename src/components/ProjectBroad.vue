<template>
  <div class="container">
    <header class="jumbotron text-center">
      <h3>
        Project Broad
      </h3>
    </header>
    <div v-if="!!message" class="alert alert-success">
      {{message}}
    </div>
    <div>
      <button type="button" @click="errorMsg = ''; currentColumn = {}" class="btn btn-primary mb-1" data-toggle="modal" data-target="#createColumnModal">
        Create Column
      </button>
    </div>

    <div v-if="projectBroad.columns.length > 0" class="row col-md-12" style="overflow: auto;flex-wrap: nowrap; width: 100%;">
      <draggable
        v-for="(column, idx) in projectBroad.columns" :key="column"
        class="list-group col-5 mb-2"
        :data-id="column.id"
        :list="column.tasks"
        group="column"
        @move="moveTask"
        itemKey="id"
      >
        <template #header>
          <div class="mb-2 border border-dark rounded p-1 ">
            <div class="d-flex justify-content-between align-items-center">
              <b>{{column.title}}</b>
              
              <button 
                class="btn btn-primary float-right"
                @click="errorMsg = ''; currentColumn = column; currentTask = {}" 
                data-toggle="modal" 
                data-target="#createTaskModal"
              >
                <font-awesome-icon icon="plus-square" /> Task
              </button>
            </div>
            <div class="">
              <button 
                class="btn btn-warning"
                @click="errorMsg = ''; currentColumn = column" 
                data-toggle="modal" 
                data-target="#createColumnModal"
              >
                <font-awesome-icon icon="edit" />
              </button>

              <button 
                class="btn btn-danger ml-2"
                @click="errorMsg = ''; currentColumn = column; columnIndex = idx" 
                data-toggle="modal" 
                data-target="#deleteColumnModal"
              >
                <font-awesome-icon icon="trash" />
              </button>
            </div>
          </div>
        </template>
        <template #item="{element, tIndex}">
          <div class="list-group-item item text-truncate d-flex justify-content-between align-items-center"> 
            <p>
              <span>Title: {{element.title}}</span>
              <br>
              <span v-if="element.assigner">Assigner: {{element.assigner.email}}</span>
            </p>
            <div class="float-right">
              <button 
                class="btn btn-warning"
                @click="errorMsg = ''; currentTask = element" 
                data-toggle="modal" 
                data-target="#createTaskModal"
              >
                <font-awesome-icon icon="edit" />
              </button>

              <button 
                class="btn btn-danger ml-2"
                @click="errorMsg = ''; currentTask = element; columnIndex = idx; taskIndex = tIndex" 
                data-toggle="modal" 
                data-target="#deleteTaskModal"
              >
                <font-awesome-icon icon="trash" />
              </button>
            </div>
          </div>
        </template>
      </draggable>
    </div>
    <div v-else>
      Please Create Columns !!!
    </div>

    <div class="modal fade" id="createColumnModal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{currentColumn.id ? 'Update' : 'Create'}} Column</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <label for="title-column">Title</label>
            <input v-model="currentColumn.title" type="text" class="form-control col-md-12 mb-2" id="title-column">
            <label for="sort-column">Sort Order</label>
            <input v-model="currentColumn.sort_order" type="text" class="form-control col-md-12 mb-2" id="sort-column">
            <label for="desc-column">Description</label>
            <textarea v-model="currentColumn.description" type="text" class="form-control col-md-12 mb-2" id="desc-column"></textarea>
            <div v-if="!!errorMsg" class="alert alert-danger mt-2">
              {{errorMsg}}
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button v-if="currentColumn.id" type="button" @click="updateColumn" class="btn btn-primary">Update</button>
            <button v-else type="button" @click="createColumn" class="btn btn-primary">Create</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="createTaskModal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{currentTask.id ? 'Update' : 'Create'}} Task</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <label for="title-task">Title</label>
            <input v-model="currentTask.title" type="text" class="form-control col-md-12 mb-2" id="title-task">
            <label for="desc-task">Description</label>
            <textarea v-model="currentTask.description" type="text" class="form-control col-md-12 mb-2" id="desc-task"></textarea>

            <label for="user-email">Assign to user</label>
            <select v-model="currentTask.assigner_id" class="custom-select">
              <option v-for="user in projectBroad.users" :key="user" :value="user.id">{{user.email}}</option>
            </select>
            <div v-if="!!errorMsg" class="alert alert-danger mt-2">
              {{errorMsg}}
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button v-if="currentTask.id" type="button" @click="updateTask" class="btn btn-primary">Update</button>
            <button v-else type="button" @click="createTask" class="btn btn-primary">Create</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="deleteColumnModal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Delete Column</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            Are you sure delete this Column ?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button type="button" @click="deleteColumn" class="btn btn-primary">Confirm</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="deleteTaskModal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Delete Task</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            Are you sure delete this Task ?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button type="button" @click="deleteTask" class="btn btn-primary">Confirm</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import TaskService from '../services/task.service'
import ColumnService from '../services/column.service'

import $ from 'jquery'

export default {
  name: 'ProjectBroad',
  components: {
    draggable
  },
  data(){
    return {
      projectBroad: {
        columns: [],
        users: []
      },
      currentColumn: {},
      columnIndex: null,
      currentTask: {},
      taskIndex: null,
      errorMsg: '',
      drag: false,
      list: [
        { name: "John 1", id: 0 },
        { name: "Joao 2", id: 1 },
        { name: "Jean 3", id: 2 }
      ],
      list2: [{ name: "Jonny 4", id: 3 }, { name: "Guisepe 5", id: 4 }]
    }
  },
  mounted() {
    let currentProject = JSON.parse(localStorage.getItem('project'))
    this.$store.dispatch("project/getBroad", currentProject.id).then(
      response => {
        this.projectBroad = response.data
      },
      error => {
        this.message = error.response.message
      }
    )
  },
  methods: {
    createColumn() {
      let params = this.currentColumn
      params['project_id'] = this.projectBroad.id

      ColumnService.createColumn(params).then(
        response => {
          this.message = response.data.message
          this.currentColumn = {}
          $('#createColumnModal').modal('hide')
          this.$router.go("/broad")
        },
        error => {
          this.errorMsg = error.response.data.message[0]
        }
      )
    },
    updateColumn() {
      ColumnService.updateColumn(this.currentColumn.id, this.currentColumn).then(
        response => {
          this.message = response.data.message
          this.currentColumn = {}
          $('#createColumnModal').modal('hide')
        },
        error => {
          this.errorMsg = error.response.data.message[0]
        }
      )
    },
    deleteColumn() {
      ColumnService.deleteColumn(this.currentColumn.id).then(
        response => {
          this.message = response.data.message
          this.currentColumn = {}
          this.projectBroad.columns.splice(this.columnIndex, 1)
          this.columnIndex = null
          $('#deleteColumnModal').modal('hide')
        },
        error => {
          this.errorMsg = error.response.data.message[0]
        }
      )
    },
    createTask() {
      let params = this.currentTask
      params['column_id'] = this.currentColumn.id

      TaskService.createTask(params).then(
        response => {
          this.message = response.data.message
          this.currentTask = {}
          $('#updateModal').modal('hide')
          this.$router.go("/broad")
        },
        error => {
          this.errorMsg = error.response.data.message[0]
        }
      )
    },
    updateTask() {
      TaskService.updateTask(this.currentTask.id, this.currentTask).then(
        response => {
          this.message = response.data.message
          this.currentTask = {}
          this.$router.go("/broad")
          $('#createTaskModal').modal('hide')
        },
        error => {
          this.errorMsg = error.response.data.message[0]
        }
      )
    },
    deleteTask() {
      TaskService.deleteTask(this.currentTask.id).then(
        response => {
          this.message = response.data.message
          this.currentTask = {}
          this.projectBroad.columns[this.columnIndex].tasks.splice(this.taskIndex, 1)
          this.columnIndex = null
          this.taskIndex = null
          $('#deleteTaskModal').modal('hide')
        },
        error => {
          this.errorMsg = error.response.data.message[0]
        }
      )
    },
    moveTask(evt) {
      console.log(evt.to.dataset.id)
      console.log(evt.dragged.__draggable_context.element)
      let column_id = evt.to.dataset.id
      let task = evt.dragged.__draggable_context.element
      TaskService.updateTask(task.id, {column_id: column_id}).then(
        response => {
          console.log(response)
        },
        error => {
          this.errorMsg = error.response.data.message[0]
        }
      )
    },
  }
};
</script>