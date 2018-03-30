define([
    'knockout',
    'vue',

    /*
     * Vue components could be loaded from another module
     * E.g. you could load them via "define" dependencies list
     * for specific page
     */
    'vue-components/welcome-component',
    'vue-components/todo-list-component'
], function (ko, Vue) {
    /*
     * Examples:
     * <div data-bind="vue: { autoBind: true }"><!-- Here you can place any Vue template markup --></div>
     * <div data-bind="vue: { data: dataForVue, watch: observedVueProperties }"><!-- Here you can place any Vue template markup --></div>

     * Available parameters:
     * data             (Type: Object | Computed | PureComputed)
     * watch            (Type: { [key: string]: string | Function | Object | Array | Observable })
     * methods          (Type: { [key: string]: Function })
     * autoBind         (Type: boolean)
     * autoBindData     (Type: boolean)

     * Parameter "data":
     * Link: https://vuejs.org/v2/guide/instance.html#Data-and-Methods
     * Details:
     * Will be applied to Vue instance as data
     * If it is Computed | PureComputed - Vue data will be automatically updated when the computed value will be changed

     * Parameter "watch":
     * Link: https://vuejs.org/v2/api/#watch
     * Details:
     * An object where keys are expressions to watch and values are corresponding callbacks.
     * If it is { [key: string]: Observable } - when corresponding value from Vue instance will change, knockout Observable will be automatically updated

     * Parameter "methods":
     * Link: https://vuejs.org/v2/api/#methods
     * Details:
     * Methods to be mixed into Vue instance

     * Parameter "autoBindData":
     * Details:
     * If it is "true" - all viewModel Observable will be setted as Vue instance data
     * And Vue instance data will be updated automatically when corresponding Observable will change

     * Parameter "autoBind":
     * Details:
     * If it is "true" - the same behaviour as for "autoBindData" will be applied
     * Moreover all viewModel methods will be setted as "methods" for Vue instance

     */
    ko.bindingHandlers.vue = {
        init: function (element, valueAccessor, allBindings, viewModel) {
            var params = ko.unwrap(valueAccessor());
            var subscriptions = [];

            var methods = params.methods || {};
            var watch = params.watch || {};
            var data = params.data || {};

            if (params.autoBind || params.autoBindData) {
                Object.keys(viewModel).forEach(function (key) {
                    var value = viewModel[key];

                    if (ko.isSubscribable(value)) {
                        data[key] = ko.unwrap(value);

                        subscriptions.push(
                            value.subscribe(function (key, newValue) {
                                if (data[key] !== newValue) {
                                    data[key] = newValue;
                                }
                            }.bind(null, key))
                        );

                        if (params.autoBind && !ko.isComputed(value)) {
                            watch[key] = value;
                        }
                    } else if (params.autoBind && typeof value === 'function') {
                        methods[key] = value;
                    }
                });

                if (params.autoBind && viewModel.constructor && viewModel.constructor.prototype) {
                    Object.keys(viewModel.constructor.prototype).forEach(function (key) {
                        var value = viewModel[key];

                        if (typeof value === 'function' && !ko.isSubscribable(value)) {
                            methods[key] = value;
                        }
                    });
                }
            }

            // Bind "methods" to viewModel
            Object.keys(methods).forEach(function (key) {
                if (typeof methods[key] === 'function') {
                    methods[key] = methods[key].bind(viewModel);
                }
            });

            // Bind "watch" to viewModel
            Object.keys(watch).forEach(function (key) {
                if (typeof watch[key] === 'function') {
                    watch[key] = watch[key].bind(viewModel);
                }
            });

            if (ko.isSubscribable(data)) {
                subscriptions.push(
                    data.subscribe(function (newValue) {
                        if (vueInstance && newValue) {
                            Object.keys(newValue).forEach(function (key) {
                                if (vueInstance.hasOwnProperty(key) && vueInstance[key] !== newValue[key]) {
                                    vueInstance[key] = newValue[key];
                                }
                            });
                        }
                    })
                );
            }

            // Create Vue instance
            var vueInstance = new Vue({
                el: element,
                watch: watch,
                methods: methods,
                data: ko.unwrap(data)
            });

            /*
             * "addDisposeCallback" should be added for "vueInstance.$el" but not for "element"
             * Because Vue copy the element to which it is applied and remove original element from DOM
             */
            ko.utils.domNodeDisposal.addDisposeCallback(vueInstance.$el, function () {
                // Destroy vueInstance and link to it
                vueInstance.$destroy();
                vueInstance = undefined;

                // Clear all subscriptions
                subscriptions.forEach(function (x) { x.dispose(); });
                subscriptions = undefined;
            });

            return { controlsDescendantBindings: true };
        }
    };
});
