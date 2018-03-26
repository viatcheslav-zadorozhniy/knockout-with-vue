require.config({
    baseUrl: './src',
    paths: {
        'knockout': 'https://cdnjs.cloudflare.com/ajax/libs/knockout/3.4.2/knockout-min',
        'vue': 'https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.16/vue.min',
        'jquery': 'https://code.jquery.com/jquery-3.3.1.min'
    }
});

require(['knockout', 'app-view-model'], function (ko, AppViewModel) {
    ko.applyBindings(new AppViewModel());
});
