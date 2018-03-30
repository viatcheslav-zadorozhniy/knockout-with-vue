define(['knockout', './vue-binding'], function (ko) {
    function AppViewModel() {
        this.firstName = ko.observable('Viatcheslav');
        this.lastName = ko.observable('Zadorozhniy');

        this.fullName = ko.pureComputed(function() {
            return `Hello, ${this.firstName()} ${this.lastName()}!`;
        }, this);

        // /*
        //  * vueData - Data object which will be applied to Vue instance
        //  * It should be a plain object or computed/pureComputed object
        //  * If it is computed/pureComputed - it allows dynamically bind data from knockout to Vue
        //  */
        // this.vueData = ko.pureComputed(function() {
        //     return {
        //         firstName: this.firstName(),
        //         lastName: this.lastName()
        //     };
        // }, this);

        // /*
        //  * vueWatch - Plain object which contains map between Vue data (key) and knockout observables (value) which should be updated when related Vue property will be changed
        //  * Alternatively you can pass callback function instead of knockout observables which will be called when related Vue property will be changed
        //  */
        // this.vueWatch = {
        //     firstName: this.firstName,
        //     lastName: (newLastName) => {
        //         if (newLastName !== this.lastName()) {
        //             console.info('Last name was changed in Vue component!');
        //             this.lastName(newLastName);
        //         }
        //     }
        // };
    };

    return AppViewModel;
});
