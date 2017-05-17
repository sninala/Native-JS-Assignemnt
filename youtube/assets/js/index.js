(function () {
    searchApi = new SearchApiHandler();
    pagenator = new Paginator();
    uiUtil = new UIUtil(searchApi, pagenator);
    uiUtil.renderSearchDivision();
})();