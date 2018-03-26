define(['knockout', './vue-binding'], function (ko) {
    return function AppViewModel() {
        this.koFirstName = ko.observable('Viatcheslav');
        this.koLastName = ko.observable('Zadorozhniy');

        this.fullName = ko.pureComputed(function() {
            return `Hello, ${this.koFirstName()} ${this.koLastName()}!`;
        }, this);

        /*
         * vueData - Data object which will be applied to Vue instance
         * It should be a plain object or computed/pureComputed object
         * If it is computed/pureComputed - it allows dynamically bind data from knockout to Vue
         */
        this.vueData = ko.pureComputed(function() {
            return {
                firstName: this.koFirstName(),
                lastName: this.koLastName()
            };
        }, this);

        /*
         * vueWatch - Plain object which contains map between Vue data (key) and knockout observables (value) which should be updated when related Vue property will be changed
         * Alternatively you can pass callback function instead of knockout observables which will be called when related Vue property will be changed
         */
        this.vueWatch = {
            firstName: this.koFirstName,
            lastName: (newLastName) => {
                if (newLastName !== this.koLastName()) {
                    console.info('Last name was changed in Vue component!');
                    this.koLastName(newLastName);
                }
            }
        };
    };
});
