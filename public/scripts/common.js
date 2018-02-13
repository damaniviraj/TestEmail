
$(window).on('load',function () {
  // hide loader on page load
  hidePageLoader();
  $(document).on('click', '.has-sub-menu .trigger',function(){
    if ($(this).find('.fa').hasClass('fa-plus')){
      $(this).parents('li').find('.sub-menu').slideDown();
      $(this).find('.fa').removeClass('fa-plus').addClass('fa-minus')
    }else{
      $(this).parents('li').find('.sub-menu').slideUp();
      $(this).find('.fa').removeClass('fa-minus').addClass('fa-plus')
    }
    
  })

  if ($('.copy-btn').length) {
    new Clipboard('.copy-btn', {
      target: function (trigger) {
        return trigger.parentNode.parentNode.nextElementSibling
      }
    });
  }
  $('.message .btn.close').on('click', function () {
    closeMessage($(this).parents('.message'))
  })
  $('.toggle-btn').click(function () {
    var target = $('.wrapper')
    if (target.hasClass('nav-opened')) {
      target.removeClass('nav-opened');
    }
    else {
      target.addClass('nav-opened');
    }
  })
  checkElement($('a[rel^="prettyPhoto"]'),function(){
    $("a[rel^='prettyPhoto']").prettyPhoto({
      social_tools:false,
    });
  })
  checkElement($('.timepicker'), function(){
    $('.timepicker').each(function(){
      var trigger = $(this).next('.timepicker-trigger')
      $(this).timepicker();
      var _this = $(this)
      trigger.on('click',function(){
        _this.timepicker('setTime', new Date());
      });
    })
  });
  checkElement($('.select2'),function(){
    $('select.select2').select2(
      {
      width: '100%', 
      }
    );
  })
  $('.toast-message-select').on('change', function () {
    showPopMessage($(this).val())
  })
  $('.pop-message-select').on('change', function () {
    var value = $(this).val();
    $('.pop-messages').removeClass('show')
    $('.' + value).addClass('show')
    setTimeout(function () {
      showToastMessage($('.' + value))
    }, 500)
  })
  $('.accordion-title').on('click', function () {
    if ($(this).next('.accordion-content').css('display') == 'none') {
      $('.accordion-content').slideUp().parents('.accordion').removeClass('active');
      $(this).parents('.accordion').addClass('active');
      $(this).next('.accordion-content').slideDown(function () {
        var pos = $(this).parents('.accordion').offset().top - $('.header').outerHeight()
        $('.content-area .main-cnt').animate({ scrollTop: pos })
      });
    } else {
      $('.accordion-content').slideUp().parents('.accordion').removeClass('active');
    }
  })
  $('.pop-messages .close').on('click', function () {
    closePopMessage();
  })

  checkElement($('[data-toggle="datepicker"]'),function(){
    $('[data-toggle="datepicker"]').each(function(){
      var trigger = $(this).next('.datepicker-trigger');
      if(!trigger){
        trigger =  null
      }
      $(this).datepicker(
        {
          autoHide: true,
          trigger: trigger,
          format: 'yyyy-mm-dd'
        }
      );
    })
  });
  checkElement($('input.datepicker'),function(){
    $('input.datepicker').each(function(){
      $(this).datepicker(
        {
          autoHide: true,
          format: 'yyyy-mm-dd',
          startDate: new Date()
        }
      );
    })
  })
  checkElement($('.data-table'),function(){
    $('.data-table').DataTable({
      "pageLength": 50
    });
  })
  checkElement($('.xzoom'),function(){
    $(".xzoom, .xzoom-gallery").xzoom({ tint: '#333', Xoffset: 15, position: 'lens', lensShape: 'circle' });
  })
})


function showPageLoader() {
  $('.loader').show();
}
function hidePageLoader() {
  $('.loader').hide();
}

// custom input files script
'use strict';
(function ($, window, document, undefined) {
  $('.inputfile').each(function () {
    var $input = $(this),
      $label = $input.next('label'),
      labelVal = $label.html();

    $input.on('change', function (e) {
      var fileName = '';

      if (this.files && this.files.length > 1)
        fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
      else if (e.target.value)
        fileName = e.target.value.split('\\').pop();

      if (fileName)
        $label.find('span').html(fileName);
      else
        $label.html(labelVal);
    });

    // Firefox bug fix
    $input
      .on('focus', function () { $input.addClass('has-focus'); })
      .on('blur', function () { $input.removeClass('has-focus'); });
  });
})(jQuery, window, document);



function overlayBox(overlayId) {
  if (overlayId) {
    $('.form-layout').removeClass('opened')
    $('#' + overlayId).addClass('opened');
  } else {
    console.error(overlayId + ' Div is not present in DOM')
  }
}
function closeOverlay(overlayId) {
  if (overlayId) {
    $('#' + overlayId).removeClass('opened');
  }
  else {
    $('.overlay-box').removeClass('opened')
  }
}


function closeMessage(msg) {
  msg.fadeOut();
}

var toastMsgTimeout;
function showToastMessage(msg) {
  clearTimeout(toastMsgTimeout);
  msg.addClass('active');
  var toastMsgTimeout = setTimeout(function () {
    $('.toast-message').removeClass('active')
  }, 2000)
}

function showPopMessage(msg) {
  if (msg) {
    $('.pop-messages').removeClass('show');
    $('.' + msg).addClass('show');
  }
  else {
    console.warn('function expect one parameter')
  }
}

function closePopMessage(msg) {
  if (!msg) {
    $('.pop-messages').removeClass('show');
  }
  else {
    $('.' + msg).removeClass('show')
  }
}



$(window).on('load', function () {
  $('.custom-dropdown-trigger').on('click', function () {
    if ($(this).parents('.custom-dropdown').hasClass('show')) {
      $(this).parents('.custom-dropdown').removeClass('show')
    } else {
      $(this).parents('.custom-dropdown').addClass('show')
    }
  });

  $(document).mouseup(function (e) {
    var container = $(".custom-dropdown");
    if (!container.is(e.target) // if the target of the click isn't the container...
      &&
      container.has(e.target).length === 0) // ... nor a descendant of the container
    {
      container.removeClass('show');
    }
  });
  checkElement($('#nicedit'),function(){
    new nicEditor().panelInstance('nicedit');
  })
  checkElement($('.tab-holder'),function(){
    $('.tab-links li').on('click',function(e){
      let parent = $(this).parents('.tab-holder');
      parent.find('.tab-links li').removeClass('active');
      $(this).addClass('active');
      let relation  = $(this).attr('data-target');
      parent.find('.tab-results .tab').hide();
      parent.find('.tab-results .tab#'+relation).show();
    });
  })
});


function checkElement(element,cb){
  if(element.length > 0){
    cb();
  }
}
