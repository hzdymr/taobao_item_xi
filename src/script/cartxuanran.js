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
              //1.渲染购物车列表
              //获取cookie，进行渲染。
              if ($.cookie('cookiesid') && $.cookie('cookienum')) { //cookie存在,获取cookie转成数组
                  let sid = $.cookie('cookiesid').split(','); //[1,2,3]
                  let num = $.cookie('cookienum').split(','); //[100,200,300]
                  for (let i = 0; i < sid.length; i++) {
                      rendercart(sid[i], num[i])
                  }
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
                              <div class="select"><input type="checkbox"></div>
                              <a href="detail.html?sid=${value.sid}" class="image"><img src="${value.url}" alt=""></a>
                              <p class="explain"><a href="detail.html?sid=${value.sid}">${value.title}</a></p>
                          </section>
                          <div style="width: 100px;"></div>
                          <div class="price">￥${value.price}</div>
                          <div class="quantity"><a class="quantity-down" href="javascript:void(0)">-</a>
                          <input type="text" value="${num}" />
                          <a class="quantity-add" href="javascript:void(0)">+</a></div>
                          <div class="allprice">￥<em>${(value.price*num).toFixed(2)}</em></div>
                          <div class="delete"><a href="javascript:;">删除</a></div>
                          </section>`;
                              $('.commodity-item').append(strhtml);
                              calc(); //总算总价
                          }
                      });
                  })
              }
              //2.购物车其他功能的控制.
              //计算总的商品件数和总价。
              // console.log($('.goods-item').length); //0  渲染出来的，异步的，无法获取
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