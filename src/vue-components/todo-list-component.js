define(['vue', '../api-service', './todo-item-component'], function (Vue, apiService) {
    Vue.component('todo-list', {
        data: function () {
            return {
                selectedItem: undefined,
                isLoading: false,
                todos: []
            };
        },

        /*
         * Lifecycle event which can be used to obtain ajax data
         * https://vuejs.org/v2/api/#Options-Lifecycle-Hooks
         */
        created: function () {
            this.isLoading = true;

            apiService.getTodos().done(function (response) {
                this.todos = response;
                this.isLoading = false;
            }.bind(this));
        },

        methods: {
            setSelectedItem: function (todo) {
                this.selectedItem = todo;
            }
        },

        /**
         * Template for Vue.component could be placed in a separate file 
         * and load it via "text" loader for RequireJS
         * E.g. define(['text!./vueComponentView.htm'])
         */
        template: `
            <div class="todo-list">
                <h3>Todo list</h3>
                <p v-if="isLoading">Data is loading...</p>
                <ol v-if="todos.length > 0">
                    <todo-item
                        v-for="todo in todos"
                        @click.native="setSelectedItem(todo)"
                        :todo="todo"
                        :key="todo.id">
                    </todo-item>
                </ol>
                <p v-if="selectedItem">Selected item is <b>{{ selectedItem.text }}</b></p>
            </div>
        `
    });
});
