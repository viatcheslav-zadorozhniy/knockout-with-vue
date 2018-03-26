define(['jquery'], function ($) {
    return {
        getTodos: function () {
            var fakeRequest = $.Deferred();

            setTimeout(function () {
                fakeRequest.resolve([
                    { text: "Learn Knockout.js" },
                    { text: "Learn Require.js" },
                    { text: "Learn Vue.js" }
                ]);
            }, 1000);

            return fakeRequest.promise();
        }
    };
});
