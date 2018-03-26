define(['vue'], function (Vue) {
    Vue.component('welcome-component', {
        /*
         * Vue.component "data" should be a function
         * https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function
         */
        data: function () {
            return { greeting: 'This is Vue.js welcome-component!' };
        },

        /*
         * Passing Data with Props
         * https://vuejs.org/v2/guide/components.html#Props
         */
        props: {
            firstName: {
                type: 'String',
                default: 'Vue.js is amazing!'
            },
            lastName: {
                type: 'String',
                default: 'Vue.js is amazing!'
            }
        },

        /**
         * Template for Vue.component could be placed in a separate file 
         * and load it via "text" loader for RequireJS
         * E.g. define(['text!./vueComponentView.htm'])
         */
        template: `
            <div>
                <h4>{{ greeting }}</h4>
                <p>Hello, {{ firstName }} {{ lastName }}!</p>
            </div>
        `
    });
});
