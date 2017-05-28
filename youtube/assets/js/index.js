(function () {
    function init() {
        searchApi = new SearchApiHandler();
        paginator = new Paginator();
        uiUtil = new UIUtil();
        uiUtil.renderSearchDivision();
    }
    init();
})();