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
     * Example: <div data-bind="vue: { data: data, watch: watch }"></div>

     * Parameter - "data":
     * Data object which will be applied to Vue instance
     * It should be a plain object or computed/pureComputed object
     * If it is computed/pureComputed - it allows dynamically bind data from knockout to Vue

     * Parameter - "watch":
     * Plain object which contains map between Vue data (key) and knockout observables (value) which should be updated when related Vue property will be changed
     * Alternatively you can pass callback function instead of knockout observables which will be called when related Vue property will be changed

     */
    ko.bindingHandlers.vue = {
        init: function (element, valueAccessor, allBindings) {
            var params = ko.unwrap(valueAccessor());
            var data = params.data;
            var dataSubscription;

            var vueInstance = new Vue({
                el: element,
                data: ko.unwrap(data),
                watch: params.watch
            });

            if (ko.isSubscribable(data)) {
                dataSubscription = data.subscribe(function (newData) {
                    if (newData) {
                        Object.keys(newData).forEach(function (key) {
                            if (vueInstance.hasOwnProperty(key) && vueInstance[key] !== newData[key]) {
                                vueInstance[key] = newData[key];
                            }
                        });
                    }
                });
            }

            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                vueInstance.$destroy();

                if (dataSubscription) {
                    dataSubscription.dispose();
                }
            });

            return { controlsDescendantBindings: true };
        }
    };
});
