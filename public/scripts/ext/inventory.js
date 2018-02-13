

$(window).on('load', function () {
  select2init();
  $(document).on('click', '.btn-add-multiple-sku', function () {
    var row = `<div class="sub-form-row">
      <div class="form-field mandatory">
        <label>SKU</label>
        <div class="input-type-select">
          <select name="product_id" class="select2-sku">
            <option value="">Select SKU</option>
          </select>
        </div>
      </div>
      <div class="form-field mandatory ">
        <label>Batch</label>
        <input type="text" name="batch">
      </div>
      <div class="form-field mandatory grid-1">
        <label>Qty</label>
        <input type="text" name="quantity">
      </div>
      <div class="form-field mandatory grid-1">
        <label>
          Expire Month
        </label>
        <div class="input-type-select">
          <select name="exp_month" id="" class="">
            <option value="">Month</option>
                <option value="01"> Jan </option>
                <option value="02"> Feb </option>
                <option value="03"> Mar </option>
                <option value="04"> Apr </option>
                <option value="05"> May </option>
                <option value="06"> Jun </option>
                <option value="07"> Jul </option>
                <option value="08"> Aug </option>
                <option value="09"> Sept </option>
                <option value="10"> Oct </option>
                <option value="11"> Nov </option>
                <option value="12"> Dec </option>
          </select>
        </div>
      </div>
      <div class="form-field mandatory grid-1">
        <label>
          Expire Year
        </label>
        <div class="input-type-select ">
          <select name="exp_year" id="" class="">
            <option value="">Year</option>
              <option value="2018"> 2018 </option>
              <option value="2019"> 2019 </option>
              <option value="2020"> 2020 </option>
              <option value="2021"> 2021 </option>
              <option value="2022"> 2022 </option>
              <option value="2023"> 2023 </option>
              <option value="2024"> 2024 </option>
              <option value="2025"> 2025 </option>
              <option value="2026"> 2026 </option>
              <option value="2027"> 2027 </option>
              <option value="2028"> 2028 </option>
              <option value="2029"> 2029 </option>
              <option value="2030"> 2030 </option>
              <option value="2031"> 2031 </option>
              <option value="2032"> 2032 </option>
              <option value="2033"> 2033 </option>
              <option value="2034"> 2034 </option>
              <option value="2035"> 2035 </option>
              <option value="2036"> 2036 </option>
              <option value="2037"> 2037 </option>
              <option value="2038"> 2038 </option>
              <option value="2039"> 2039 </option>
          </select>
        </div>
      </div>
      <div class='form-field wo-label grid-1'>
        <button class="box-btn primary full btn-add-multiple-sku" type="button" >Add More</button>
      </div>
    </div>`;
    $(this).removeClass('btn-add-multiple-sku').addClass('btn-remove-multiple-sku danger').text('Remove')
    $('#multiple_sku').append(row)
    select2init();
  });
  $(document).on('click', '.btn-remove-multiple-sku', function () {
    $(this).parents('.sub-form-row').remove();
  })
  
  
})

function select2init() {
  $('.select2-sku').select2({
    width: '100%',
    ajax: {
      url: BASE_URL + 'inventory/get-sku',
      dataType: 'json',
      delay: 250,
      data: function (params) {
        return {
          q: params.term,
          page: params.page,
          type: 'public'
        }
      },
      results: function (data) {
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
  $('.select2-vendor').select2({
    width: '100%',
    ajax: {
      url: BASE_URL + 'inventory/get-vendor',
      dataType: 'json',
      delay: 250,
      data: function (params) {
        return {
          q: params.term,
          page: params.page,
          type: 'public'
        }
      },
      results: function (data) {
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