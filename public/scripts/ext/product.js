

$(window).on('load', function () {
    select2init();

})
var header = {
    'token': '3e2a22486a12164198e4149121720902',
    'duid': '1234567891',
    'os': 'android',
    'accept-version': '1',
    'platform': 'mepharmacy',
}

function select2init() {
    $('.select2-product').select2({
        width: '100%',
        ajax: {
            url: BASE_URL + 'inventory/get-sku',
            dataType: 'json',
            headers: header,
            delay: 250,
            data: function (params) {
                return {
                    q: params.term,
                    page: params.page,
                    type: 'public'
                }
            },
            results: function (data) {
                console.log(data)
                return {
                    results: $.map(data, function (item) {
                        return {
                            text: item.completeName,
                            slug: item.slug,
                            id: item.id
                        }
                    })
                };
            }
        }
    })
}