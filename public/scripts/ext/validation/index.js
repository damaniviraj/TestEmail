/*code for jquery validation*/
function validateCheckForm(elem) {
    if (!elem) {
      return false;
    } else {
      var formParent = $(elem).parents('.form-layout');
      _return = formParent.find('input[type=text],input[type=radio],input[type=checkbox],select[data-validate="select"],textarea').valid();
      return _return;
    }
  }
  
  $(function() {
  
    //adding method for letters only
    //validating form start
    if($('.check-form').length> 0 ){
      $('.check-form').each(function () {
        $(this).validate({
          //console.log($(this).attr('id'));
          errorClass: 'has-error',
          errorElement: 'span',
          validClass: 'has-success',
          errorPlacement: function(error, element) {
            var elem = element.parents('.form-field')
            elem.find('span.has-error').remove();
            error.appendTo(elem);
          },
          submitHandler: function() {
            this.submit();
            //console.log('test');
          },
          //adding error class for elements
          highlight: function(element, errorClass, validClass) {
            $(element).parents('.form-field').addClass(errorClass).removeClass(validClass);
          },
          //adding sucesse class to element
          unhighlight: function(element, errorClass, validClass) {
            if ($(element).parents('.form-field').hasClass('has-error')) {
              $(element).parents('.form-field').addClass(validClass).removeClass(errorClass);
            }
          },
          messages: {
            required: "This field is required"
          }
        });
      })
    }
  
    //validating form end
  
    //define rule for validation
    //if you want to validate text only
    $('[data-validate="text"]').each(function() {
      jQuery.validator.addMethod("lettersonly", function(value, element) {
        return this.optional(element) || ((value.match(/\./gi) && value.match(/\./gi).length < 2) || !value.match(/\./gi)) && /^(?!\.)[A-Za-z\s']+$|^$/.test(value);
      }, "Only alphabetic characters allowed");
      $(this).rules('add', {
        lettersonly: true,
        //minlength:2,
        messages: {
          lettersonly: "Only alphabetic characters allowed"
        }
      });
    });
    $('[data-validate="alphanumaric"]').each(function() {
      jQuery.validator.addMethod("alphanumaric", function(value, element) {
         return this.optional(element) || /^[a-z0-9\-\s]+$/i.test(value);
     }, "only letters, numbers, or dashes.");
      $(this).rules('add', {
        alphanumaric: true,
        //minlength:2,
        messages: {
          alphanumaric: "should in alphanumaric "
        }
      });
    });
  
    //this will validate every field
    $('[required="required"]').each(function() {
      $(this).rules('add', {
        required: true,
        messages: {
          required: "This field is required"
        }
      });
    });
    $('[data-validate="confirmPassword"]').each(function() {
      $(this).rules('add', {
        equalTo: '#matchPassword',
        messages: {
          equalTo: "Should match"
        }
      });
    });
    $('[data-validate="textarea"]').each(function() {
      $(this).rules('add', {
        required: true,
        maxlength: 100,
        messages: {
          required: "can't be blank"
        }
      });
    });
    $('[data-validate="number"]').each(function() {
      $(this).rules('add', {
        number: true,
        messages: {
          required: "This field is mandatory" // can't have text
        }
      });
    });
    $('[data-validate="select"]').each(function() {
      $(this).rules('add', {
        required: true,
        messages: {
          required: "This field is mandatory"
        }
      });
    });
    $('[data-validate="date"]').each(function() {
      $(this).rules('add', {
        required: true,
        messages: {
          required: "This field is mandatory"
        }
  
      });
    });
  
    //this will validate mobile no minimum length 10
    $('[data-validate="mobNum"]').each(function() {
      $(this).rules('add', {
        number: true,
        minlength: 10,
        maxlength:11,
        messages: {
          minlength: "Should be min 10 characters",
          maxlength:"should not be more than 11 characters"
        }
  
      });
    });
    $('[data-validate="dependedPhone"]').each(function() {
      $(this).rules('add', {
        number: true,
        //this line is for either or condion for mobile
        require_from_group: [1, '.group-fields6'],
        //this line is for either or condion for mobile
  
        messages: {
          required: "Should not be text"
            //minlength: jQuery.format("should be at least {10} characters")
        }
  
      });
    });
  
    $('[data-validate="onlyMob"]').each(function() {
      $(this).rules('add', {
        number: true,
        //this line is for either or condion for mobile
        required: true,
        //this line is for either or condion for mobile
        minlength: 10,
        messages: {
          required: "This field is mandatory"
            //minlength: jQuery.format("should be at least {10} characters")
        }
  
      });
    });
    //thi will validate email id
    $('[data-validate="email"]').each(function() {
      jQuery.validator.addMethod("email", function(value, element) {
        return this.optional(element) || /^[A-Za-z.0-9_]+@[a-zA-Z0-9_.]+?\.[a-zA-Z.]{2,7}$/.test(value);
      }, "is not in proper format");
      $(this).rules('add', {
        //this line is for either or condion for mobile
        //required:true,
        messages: {
          required: "This field is mandatory"
        },
        //this line is for either or condion for mobile
        email: true
      });
    });
  });
  
  
  $(window).load(function(){
  });