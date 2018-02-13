$(window).on('load',function(){
  $('.select_zone').on('change',function(){
    console.log($(this).val())
    $.ajax({
      type: "POST",
      url: BASE_URL + "booking/availableDates/",
      data: {
        zone: $(this).val()
      },
      beforeSend: function () {
      },
      success: function (response) {
        elemObj = {
          target: '.time-slots',
          key: response.data.list
        }
        genrateTimeSlots(elemObj)
      }
    });
  })
  $('.get-booking-details').on('click',function(){
    $.ajax({
      type: "GET",
      url: BASE_URL + "booking/detail/"+$(this).attr('data-booking-id'),
      beforeSend: function () {
      },
      success: function (response) {
        if ($('.opened').attr('id') == 'change_address'){
          var parent = $('#change_address');
          var r = response.data[0];
          parent.find('form').attr('action', '/users/details/updateAddress/' + r.user_id + '/' + r.id)
          parent.find('.address1').attr('value', r.address_1)
          parent.find('.address2').attr('value', r.address_2)
          parent.find('.landmark').attr('value', r.landmark)
          parent.find('.city').attr('value', r.city)
        }else{
          var parent = $('#change_timeslots');
          var r = response.data[0];
          parent.find('form').attr('action', '/users/details/updatetimeslots/' + r.user_id + '/' + r.id)
        }
      }
    });
  })
})

function genrateTimeSlots(elemObj) {
  var html = '';
  $.each(elemObj.key,function(i,v){
    html += '<div class="slot">'
      html += '<h5>'+v.date+'</h5>'
      html += '<div class="radios" id="time-slot">'
      $.each(v.slots,function(j,k){
        html += '<div class="radio">'
        html += '<input type="radio" id="slot_' + i +'_'+j+'" name="time_slot" value="'+k.slot+'_'+v.date+'" required="required">'
        html += '<label for="slot_' + i + '_' + j +'">'+k.slot+'</label>'
        html += '</div>'
      })
      html += '</div>'
    html += '</div>'
  })
  $(elemObj.loader).hide();
  $(elemObj.target).html(html);
}