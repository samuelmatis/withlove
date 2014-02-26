withloveApp.service('categoriesService', function ($http) {
    this.getCategories = function () {
        $http.defaults.headers.common.Authorization = api_key;

        return $http({method: 'GET', url:  base_url + 'category'});
    };
});
