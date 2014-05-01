'use strict';

angular.module('withloveApp', [])
    .constant('api_key', 'eyJpdiI6IlpRYm14OUllSUU2ZDVZdVwvZUZWQ2szcHFzRm85RWpOQ0F1M2JQVGZsdjhZPSIsInZhbHVlIjoiV2VqY0crSTRqZVltVlVLUTB6aTNMZWlDQlh3S2ZwVWxEXC8xOFdYZjFpbUtXUVwvb09DZnl1MFJraHpQZVoxc0lTNGZpdkFXeHdKYWFOSXBoYXBcL09IbVE9PSIsIm1hYyI6IjY5NzY3NWZiMWY5MjUxMGYxYzBjN2QyYzA0MWIwYjRhOTgyMzQwNjNlMThlNTc4ZDM3OTc0NmZhNDZhNzBkZjcifQ==')
    .constant('base_url', 'http://api.withlove.sk/api/')
    .constant('mapTypes', {
        'default_map': 'chiwo.geid1fd8',
        'morning_map': 'chiwo.h78l0k1o',
        'day_map': 'chiwo.geid1fd8',
        'evening_map': 'chiwo.h78k8i58',
        'night_map': 'chiwo.geg7cd6d'
    })

    .run(function($http, api_key) {
          $http.defaults.headers.common.Authorization = api_key;
    });
