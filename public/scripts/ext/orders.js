$(document).ready(function () {
  // order search request
  $("input.order-search").keyup(function () {
    $.ajax({
      type: "GET",
      url: BASE_URL + "product/search?q=" + $(this).val(),
      beforeSend: function () {
        $(".search-results").show().find('.suggestion-ul').hide();
        $(".search-results").show().find(".ajax-loader").show();
      },
      success: function (response) {
        if (response.status == "1") {
          if (response.data.list.length > 0) {
            var html = ''; 
            $.each(response.data.list, function (i, v) { 
              html += '<li data-product-id="' + v.id+'">'; 
                html += '<div class="info">'; 
                  html += '<h5>'+ v.name +'</h5>' 
                    html += '<div class="category">' + v.category_name + '</div>' 
                html += '</div>' 
                html += '<div class="qty-cnt">'
                  html += '<input type="text" class="qty" value="1">' 
                  html += '<div class="buttons">' 
              html += '<button  type="button" class="add">+</button>' 
              html += '<button  type="button" class="subtract">-</button>' 
                  html += '</div>' 
                html += '</div>' 
                html += '<div class="cta">' 
                  html += '<button type="button" class="box-btn" >' 
                    html += '<i class="fa fa-shopping-cart"></i>' 
                  html += '</button>' 
                html += '</div>' 
              html += '</li>' 
            }); 
            $(".search-results .ajax-loader").hide(); 
            $('.suggestion-ul').show().html(html); 
          }
        } else {
          $(".search-results").hide();
          $(".search-results .ajax-loader").hide();
        }
      }
    });
  });

  $(document).on('click','#order_search .suggestion-ul li .box-btn',function(){
    var data = {
      product_id: $(this).parents('li').attr('data-product-id'),
      order_id: $('#order_id').val(),
      quantity: $(this).parents('li').find('.qty-cnt').find('input.qty').val()
    };
    if (data.quantity != null && data.order_id != null && data.product_id !== null) {
      updateProduct(data);  
    } else {

    }
  })
  // delete product from cart
  $(document).on('click', '.remove-product-from-cart', function () {
    var data = {
      product_id: $(this).attr('data-product-id'),
      order_id: $('#order_id').val(),
      quantity: 0
    };
    updateProduct(data);
  })
  // get subsitute 
  $(document).on('click', '.cart.user .products li', function (e) {
    var product_id = $(this).attr('data-product-id');
    var quantity = $(this).find('.product-quantity').html();
      $.ajax({
        type: "GET",
        url: BASE_URL + "product/substitute/" + product_id,
        beforeSend: function () {
          $(".substitute.list .ajax-loader").show();
        },
        success: function (response) {
          if (response.status == "1") {
            if (response.data.list.length > 0) {
              var elemObj = {
                loader: ".substitute.list .ajax-loader",
                target: ".substitute.list .products ul",
                totalTarget: null,
                qty: quantity,
                parent_product: {
                  id: product_id,
                  name: response.data.list[0].name
                }
              }
              generateSubsitue(response.data.list,elemObj)
            }
          } else {
            $(".search-results").hide();
            $(".search-results .ajax-loader").hide();
          }
        }
      });
  })
  // qty plus and minus
  $(document).on('click', '.qty-cnt .buttons button' ,function(e){
    e.preventDefault;
    var _input = $(this).parents('.qty-cnt').find('input');
    var value = _input.val();
    if($(this).attr('class') == 'add'){
      if (isNaN(value)|| value =='' || value == null ){
        value = 1
        _input.val(value)
      }else{
        value = parseInt(value) + parseInt(1)
        _input.val(value)
      }
    } else if ($(this).attr('class') == 'subtract'){
      value = parseInt(value - 1)
      _input.val((value) <=0 ? 1 : value )
    }
  })
  // update substitute 
  $(document).on('click','.substitute.list li .cta .box-btn',function(){
    var data = {
      product_id: $('.substitute.list > header h3').attr('data-parent-id'),
      order_id: $('#order_id').val(),
      substitute_id: $(this).parents('li').attr('data-product-id'),
      quantity: $(this).parents('li').find('.product-quantity').html()
    };
    $.ajax({
      type: "POST",
      url: BASE_URL + "orders/update/productsubstitute",
      data: data,
      beforeSend: function () {
        $(".aside > .ajax-loader").show();
      },
      success: function (response) {
        $.ajax({
          type: "GET",
          url: BASE_URL + "orders/detail/" + data.order_id,
          success: function (response) {
            var substituteOpt = {
              loader: ".aside > .ajax-loader",
              target: ".cart.recommended .products ul",
              totalTarget: '.cart.recommended .cta .amount',
              response_array_key: 'substitute',
              cta: false
            }
            if (response.data.length <= 0) {
              $(elemObj.target).find('.page-not-found').show();
            } else {
              generateProduct(response.data, substituteOpt)
            }

            var productOpt = {
              loader: ".aside > .ajax-loader",
              target: ".cart.user .products ul",
              totalTarget: '.cart.user .cta .amount',
              response_array_key: 'product',
              cta: false
            }
            if (response.data.length <= 0) {
              $(elemObj.target).find('.page-not-found').show();
            } else {
              generateProduct(response.data, productOpt)
            }
          }
        })
      }
    })
  })
});

function updateProduct(data) {
  $.ajax({
    type: "POST",
    url: BASE_URL + "orders/update/product",
    data: data,
    beforeSend: function () {
      $(".order-details .aside > .ajax-loader").show();
    },
    success: function (response) {
      $.ajax({
        type: "GET",
        url: BASE_URL + "orders/detail/" + data.order_id,
        success: function (response) {
          $('.final-cart .page-not-found').addClass('hide');
          $('.order-details .block.final-cart .form-layout,.order-details .block.final-cart .products').removeClass('hide');
          var elemObj = {
            loader: ".order-details .aside > .ajax-loader",
            target: ".order-details .final-cart .products",
            totalTarget: ".final-cart .cta .amount",
            extra: '.order-details .block.final-cart .form-layout',
            response_array_key: 'product',
            cta: true
          }
          console.log(response)
          if (response.data[elemObj.response_array_key].length <= 0) {
            $(elemObj.loader).hide();
            $('.final-cart .page-not-found').removeClass('hide');
            $('.order-details .block.final-cart .form-layout,.order-details .block.final-cart .products').addClass('hide');
          } else {
            generateProduct(response.data, elemObj)
          }
        }
      })
    }
  })
}

function generateProduct(response,elemObj) {
  var html = '';
  var total = '';
    $.each(response[elemObj.response_array_key], function (i, v) {
      html += '<li for="'+ v.product_id +'">'
        html += '<input type="hidden" name="product[]" id="' + v.product_id + '" value="' + v.product_id +'">'
          html += '<div class="info">'
            html += '<h5>'
              html += v.product_name + 'X' + v.product_quantity
            html += '</h5>'
            html += '<div class="price">'
              html += v.price
            html += '</div>'
            if(elemObj.cta){
              html += '<div class="cta">'
              html += '<ul>'
                html += '<li>'
                  html += '<a href="javascript:void(0)" data-product-id="' + v.product_id+'" class="remove-product-from-cart">Delete</a>'
                html+= '</li>'
              html+= '</ul>'
            html+= '</div>'
            }
          html+= '</div>'
          if(!elemObj.qty){
          html+= '<div class="qty-cnt">'
            html+= '<input type="text" name="product_quantity[]" value="' + v.product_quantity + '">'
            html+= '<div class="buttons">'
              html+= '<button type="button" class="add">+</button>'
              html+= '<button type="button" class="subtract">-</button>'
            html+= '</div>'
          html+= '</div>'
          }
        html+= '<div class="amount">'
          html += '<span>&#x20A6;</span >' + (v.product_quantity * v.price)
        html+= '</div>'
      html+= '</li>'
  });

  total+= '<div class="amount">'
    total += '<span>&#x20A6;</span >'
    total += response.amount
  total += '</div>'
  $(elemObj.loader).hide();
  $(elemObj.target).removeClass('hide').html(html);
  $(elemObj.extra).removeClass('hide');
  $(elemObj.totalTarget).removeClass('hide').html(total);
}

function generateSubsitue (response,elemObj) {
  var html = '';
  $('.substitute.list > header h3').html('Substitute List for ' + elemObj.parent_product.name).attr('data-parent-id', elemObj.parent_product.id);
  $.each(response,function(i,v){
    html += '<li data-product-id="'+ v.id+'">'
      html += '<input type="hidden" name="product[]" id="'+ v.id+'" value="'+ v.id+'">'
        html += '<div class="info">'
          html += '<h5>'
            html += v.name +'<span class="product-quantity">' + elemObj.qty+'</span>'
          html += '</h5>'
          html += '<div class="price">'
            html += '<span>&#x20A6;</span >' +v.price
            html += '</div>'
        html += '</div>'
        html += '<div class="amount">'
          html += '<span>&#x20A6;</span> ' + v.price * elemObj.qty
        html += '</div>'
        html += '<div class="cta">'
          html += '<button type="button" class="box-btn">'
          html += '<i class="fa fa-shopping-cart"></i>'
        html += '</button>'
      html += '</div>'
    html += '</li>'
  })
  $(elemObj.loader).hide();
  $(elemObj.target).removeClass('hide').html(html);
}