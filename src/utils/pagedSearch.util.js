export default class PagedSearchUtil {

    getPagedObject(pageSize, pageNumber, totalSize, items) {
        return {
            pageSize,
            pageNumber,
            items,
            totalSize,
            currentPageSize: items.length || 0
        }
    }

}