define(['vue'], function (Vue) {
    Vue.component('todo-item', {
        /*
         * Passing Data with Props
         * https://vuejs.org/v2/guide/components.html#Props
         */
        props: ['todo'],

        /**
         * Template for Vue.component could be placed in a separate file 
         * and load it via "text" loader for RequireJS
         * E.g. define(['text!./vueComponentView.htm'])
         */
        template: `<li class="todo-item">{{ todo.text }}</li>`
    });
});
