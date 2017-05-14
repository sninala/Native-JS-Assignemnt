(function () {
    searchApi = new SearchApiHandler();
    pagenator = new Pagenator();
    uiUtil = new UIUtil(searchApi, pagenator);
    uiUtil.renderSearchDivision();
})();