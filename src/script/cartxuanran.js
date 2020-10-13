  // 复制渲染包装
  function xuanran(num, content, fatherChild) {
      for (let i = 1; i <= num; i++) {
          $(fatherChild).append(content);
      }
  }
  define([], function() {
      return {
          index_copy: ! function() { //列表页复制渲染
              // 底部上部分渲染
              xuanran(8, ` <li>
<a href="javascript:;">阿里巴巴集团</a>
</li>
<li>|</li>
<li>
<a href="javascript:;">淘宝网</a>
</li>
<li>|</li>
<li>
<a href="javascript:;">天猫</a>
</li>
<li>|</li>`, '.footer-top')
                  //底部中间渲染
              xuanran(3, `<li><a href="javascript:;">关于淘宝</a></li>
<li><a href="javascript:;">合作伙伴</a></li>
<li><a href="javascript:;">营销中心</a></li>`, '.footer-middle>ul')
              xuanran(4, `<a href="javascript:;">增值电信业务经营许可证：浙B2-20080224</a><span>|</span>
<a href="javascript:;">增值电信业务经营许可证（跨地区）： B2-20150210</a><span>|</span>
<a href="javascript:;">浙网文（2019）1033-086号</a><span>|</span>`, '.footer-middle>div');
          }(),
          renderer: ! function() { //渲染
              function addcookie(name, value, days) {
                  let date = new Date();
                  date.setDate(date.getDate() + days);
                  document.cookie = `${name}=${encodeURIComponent(value)};expires=${date};path=/`;
              }

              function getcookie(name) {
                  let arr = decodeURIComponent(document.cookie).split('; ');
                  for (let value of arr) {
                      let newarr = value.split('=');
                      if (newarr[0] === name) {
                          return newarr[1];
                      }
                  }
              }

              function delcookie(name) {
                  addcookie(name, '', -1);
              }
              //1.渲染购物车列表
              //获取cookie，进行渲染。
              if ($.cookie('cookiesid') && $.cookie('cookienum')) { //cookie存在,获取cookie转成数组
                  let sid = $.cookie('cookiesid').split(','); //[1,2,3]
                  let num = $.cookie('cookienum').split(','); //[100,200,300]
                  for (let i = 0; i < sid.length; i++) {
                      rendercart(sid[i], num[i])
                  }
                  //   全选
                  $('.all').on('change', function() {
                      $('.commodity').find(':checkbox').prop('checked', $(this).prop('checked'));
                      $('.all').prop('checked', $(this).prop('checked'));
                      //   calcprice(); //计算总价
                  });
                  let $inputs = $('.commodity').find(':checkbox');
                  $('.commodity-item').on('change', $inputs, function() {
                      //$(this):被委托的元素，checkbox
                      if ($('.commodity').find(':checkbox').length === $('.commodity').find('input:checked').size()) {
                          $('.all').prop('checked', true);
                      } else {
                          $('.all').prop('checked', false);
                      }
                      //   calcprice(); //计算总价
                  });
                  let $quantity_down = $('.commodity').find('.quantity-down');
                  //   加减
                  $('.quantity-down').on('click', function() {
                          console.log(1);
                          console.log(sid);
                          var a = $(this).parent('.quantity').find('input').val();
                      })
                      //   // 结算
                      //   inputs.on('click', function() {
                      //       $('.selected em').html($('.shangpin_xuanze:checked').size());
                      //       //   let total = 0;
                      //       //   $('.total em').html($.each(allprice, function(index, value) {
                      //       //       total += value;
                      //       //   }));
                      //       $.each(allprice.html, )
                      //   });

              }

              function changenum() { //当商品数量改变时改变cookie
                  let arrsid = []; //商品的sid
                  let arrnum = []; //商品的数量
                  arrsid = $.cookie('cookiesid').split(','); //获取cookie的sid，存放到数组中。
                  arrnum = $.cookie('cookienum').split(','); //获取cookie的数量，存放到数组中。
                  let index = $.inArray(sid, arrsid); //sid在数组中的位置
                  let num = parseInt(arrnum[index]); //sid对应的数量
                  //原来的数量+新添加数量，一起存入cookie
                  arrnum[index] = num + parseInt($('.quantity input').val()); //原来的数量+新添加数量进行赋值
                  $.cookie('cookienum', arrnum, { expires: 10, path: '/' }); //一起存入cookie
              }
              //封装函数实现渲染。
              function rendercart(sid, num) { //sid:渲染的商品编号    num:渲染的商品的数量。
                  $.ajax({
                      url: 'http://192.168.11.18/jsTwo/taobao_xi/php/piclist.php',
                      dataType: 'json'
                  }).done(function(data) {
                      $.each(data, function(index, value) {
                          if (value.sid == sid) { //数据接口的sid和当前商品的sid进行比较，如果相等，直接赋值。
                              let strhtml = '';
                              strhtml += `
                              <section class="commodity">
                              <section>
                              <div class="select"><input type="checkbox" class="shangpin_xuanze"></div>
                              <a href="detail.html?sid=${value.sid}" class="image"><img src="${value.url}" alt=""></a>
                              <p class="explain"><a href="detail.html?sid=${value.sid}">${value.title}</a></p>
                          </section>
                          <div style="width: 100px;"></div>
                          <div class="price">￥<em>${value.price}</em></div>
                          <div class="quantity"><a class="quantity-down" href="javascript:void(0)">-</a>
                          <input type="text" value="${num}" />
                          <a class="quantity-add" href="javascript:void(0)">+</a></div>
                          <div class="allprice">￥<em>${(value.price*num).toFixed(2)}</em></div>
                          <div class="delete"><a href="javascript:;" class="item-delete">删除</a></div>
                          </section>`;
                              $('.commodity-item').append(strhtml);
                              calc(); //总算总价
                          }
                      });
                  })
              }

              //计算总的商品件数和总价。
              function calc() {
                  let allprice = 0; //总价
                  let allcount = 0; //总的数量
                  $('.commodity').each(function(index, element) {
                      if ($(this).find('.select input').prop('checked')) { //复选框选中。
                          allcount += parseInt($(this).find('.quantity input').val()); //总的件数
                          allprice += parseInt($(this).find('.allprice em').html()); //总价
                      }
                  });
                  $('.selected em').html(allcount);
                  $('.total em').html(allprice.toFixed(2));
              }
          }(),
          a_blank: ! function() { //a标签_blank添加
              $('a').attr("target", "_blank");
          }()
      }
  });