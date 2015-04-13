var mocks = {
    translateService: {
        changeLang: function () {},
        currentLang: function () {},

    },
    dataservice: {
        getProfileInfo: function () {
            return {};
        },
        getStatistics: function () {
            return {};
        },
        getSentEmails: function () {
            return {};
        }
    },
    $mdSidenav: function () {
        return {
            toggle: function () {}
        };
    }
};

module.exports = mocks;