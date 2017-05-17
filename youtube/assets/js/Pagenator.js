var Paginator = (function () {
    "use strict";

    function Paginator() {};

    Paginator.prototype.getTotalNumberOfPagesFor = function (items) {
        var numberOfVideosToDisplay = this.getNumberOfVideosForCurrentPage()
        var totalVideos = items.length;
        var numberOfpages = Math.floor(totalVideos / numberOfVideosToDisplay);
        var additionalPagesToAdd = totalVideos % numberOfVideosToDisplay === 0 ? 0 : 1;
        numberOfpages += additionalPagesToAdd;
        return numberOfpages;
    }

    Paginator.prototype.getNumberOfVideosForCurrentPage = function () {
        var availablePageWidth = window.innerWidth;
        var minimumNumberOfVideosPerPage = AppConstants.MIN_VIDEOS_PER_PAGE;
        var videoWidth = AppConstants.VIDEO_WIDTH;
        while ((minimumNumberOfVideosPerPage * videoWidth) < availablePageWidth) {
            minimumNumberOfVideosPerPage += 1;
        }
        return (minimumNumberOfVideosPerPage > 1) ? minimumNumberOfVideosPerPage - 1 : 1;

    }
    Paginator.prototype.getCurrentPage = function () {
        return this.currentPage || 1;
    }

    Paginator.prototype.setCurrentPage = function (pageNumber) {
        this.currentPage = pageNumber;
    }

    Paginator.prototype.getStartIndexForPage = function (numberOfCards) {
        var currentPage = this.getCurrentPage();
        return (currentPage * numberOfCards) - numberOfCards
    }
    return Paginator;
})();