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
                              <section class="commodity" sid="${value.sid}">
                              <section>
                              <div class="select"><input type="checkbox" class="shangpin_xuanze" checked></div>
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
                              calc(); //计算单个商品总价
                          }
                      });
                  })
              }
              let arrsid = $.cookie('cookiesid').split(','); //[1,2,3]
              let arrnum = $.cookie('cookienum').split(','); //[100,200,300]
              function ShoppingCarObserver(elInput, isAdd) {
                  this.elInput = elInput
                  this.parents = this.elInput.parents('.commodity'); //渲染的最外面的section
                  this.count = parseInt(this.elInput.val())
                  this.isAdd = isAdd
                  this.singlePrice = parseFloat(this.parents.find('.price em').text()) //找到单个商品单价
                  this.computeGoodsMoney = function() {
                      var moneyCount = this.count * this.singlePrice
                      var singleTotalEl = this.parents.find('.allprice em') //单个商品总价
                          //   console.log(moneyCount)
                      singleTotalEl.empty().append(moneyCount)
                  }
                  this.showCount = function() {
                      var isChecked = this.parents.find('.shangpin_xuanze')[0].checked //各个商品的选择按钮
                      var GoodsTotalMoney = parseFloat($('.total em').text()) //合计价格
                      var goodsTotalCount = parseInt($('.selected em').text()) //已选商品数量
                      if (this.elInput) {
                          if (this.isAdd) {
                              ++this.count
                              if (isChecked) {
                                  $('.total em').empty().append(GoodsTotalMoney + this.singlePrice)
                                  $('.selected em').empty().append(goodsTotalCount + 1)
                              }
                          } else {
                              if (parseInt(this.count) <= 1) {
                                  return
                              } else {
                                  --this.count
                                  if (isChecked) {
                                      $('.total em').empty().append(GoodsTotalMoney - this.singlePrice)
                                      $('.selected em').empty().append(goodsTotalCount - 1)
                                  }
                              }
                          }
                          this.elInput.val(this.count)
                      }
                  }
                  this.checkIsAll = function() {
                      var checkLen = $('.shangpin_xuanze:checked').length
                      if (checkLen > 0) {
                          $('.count').css({ "background": "#FF4400" }) //点击结算按钮
                      } else {
                          $('.count').css({ "background": "#B0B0B0" }) //点击结算按钮
                      }
                      if ($('.commodity').length === checkLen) {
                          $('#selectalls, #selectall').prop('checked', true) //下面全选按钮，上面全选按钮
                      } else {
                          $('#selectalls, #selectall').prop('checked', false)
                      }
                  }
                  this.checkedChange = function(isChecked) {
                      if (isChecked === undefined) {
                          var isChecked = this.parents.find('.shangpin_xuanze')[0].checked //各个商品选择按钮
                      }
                      var itemTotalMoney = parseFloat(this.parents.find('.allprice em').text()) //单个商品总价
                      var GoodsTotalMoney = parseFloat($('.total em').text()) //合计价格
                      var itemCount = parseInt(this.parents.find('.quantity input').val()) //单个商品数量
                      var goodsTotalCount = parseInt($('.selected em').text()) //已选商品数量
                      if (isChecked) {
                          $('.total em').empty().append(itemTotalMoney + GoodsTotalMoney) //合计价格
                          $('.selected em').empty().append(itemCount + goodsTotalCount) //已选商品数量
                      } else {
                          if (GoodsTotalMoney - itemTotalMoney === 0) {
                              $('.total em').empty().append('0.00') //合计价格
                                  //   if (!$('.submitData').hasClass('submitDis')) {//结算按钮
                                  //       $('.submitData').addClass('submitDis')
                                  //   }
                              $('.count').css({ "background": "#B0B0B0" });
                          } else {
                              $('.total em').empty().append(GoodsTotalMoney - itemTotalMoney) //合计价格
                          }
                          $('.selected em').empty().append(goodsTotalCount - itemCount) //已选商品数量
                      }
                  }
                  this.deleteGoods = function() {
                      var isChecked = this.parents.find('.shangpin_xuanze')[0].checked //各个商品的选择按钮
                      if (isChecked) {
                          this.checkedChange(false)
                      }
                      this.parents.remove()
                      this.checkOptions()
                  }
                  this.checkOptions = function() {
                      if ($('#selectall')[0].checked) { //上面的全选按钮
                          if ($('.shangpin_xuanze').length <= 0) {
                              $('#selectalls, #selectall').prop('checked', false)
                          }
                      }
                  }
              }

              function checkedAll(_this) {
                  if ($('.commodity').length <= 0) { //渲染的最外面的section
                      $('.count').css({ "background": "#B0B0B0" })
                  } else {
                      $('.count').css({ "background": "#FF4400" })
                  }
                  for (var i = 0; i < $('.commodity').length; i++) {
                      var elInput = $('.commodity').eq(i).find('.shangpin_xuanze') //各个商品的选择按钮
                      var isChecked = $('.commodity').eq(i).find('.shangpin_xuanze')[0].checked
                      var checkAllEvent = new ShoppingCarObserver(elInput, null)
                      if (_this.checked) {
                          if (!isChecked) {
                              elInput.prop('checked', true)
                              checkAllEvent.checkedChange(true)
                          }
                      } else {
                          //   if (!$('.submitData').hasClass('submitDis')) {
                          //       $('.submitData').addClass('submitDis')
                          //   }
                          $('.count').css({ "background": "#B0B0B0" }); //结算按钮
                          if (isChecked) {
                              elInput.prop('checked', false)
                              checkAllEvent.checkedChange(false)
                          }
                      }
                  }
              }
              $('#selectall').on('change', function() {
                  if (this.checked) {
                      $('#selectalls').prop('checked', true)
                  } else {
                      $('#selectalls').prop('checked', false)
                  }
                  checkedAll(this)
              })
              $('#selectalls').on('change', function() {
                  if (this.checked) {
                      $('#selectall').prop('checked', true)
                  } else {
                      $('#selectall').prop('checked', false)
                  }
                  checkedAll(this)
              })
              $('.commodity-item').on('change', '.shangpin_xuanze', function() { //复选框
                  var tmpCheckEl = $(this)
                  var checkEvent = new ShoppingCarObserver(tmpCheckEl, null)
                  checkEvent.checkedChange()
                  checkEvent.checkIsAll()
              })
              $('.commodity-item').on('click', '.quantity-down', function() { //商品的最大框--减号
                  var goodsInput = $(this).parents('.quantity').find('input') //找到该减号的input
                  var decreaseCount = new ShoppingCarObserver(goodsInput, false)
                  decreaseCount.showCount()
                  decreaseCount.computeGoodsMoney()
                  var sid = $(this).parents('.commodity').attr("sid");
                  var index = $.inArray(sid, arrsid); //sid在数组中的位置
                  arrnum[index] = parseInt(goodsInput.val()); //数量-1
                  console.log(arrnum);
                  $.cookie('cookienum', arrnum, { expires: 10, path: '/' }); //一起存入cookie
              })
              $('.commodity-item').on('click', '.quantity-add', function() {
                  var goodsInput = $(this).parents('.quantity').find('input') //找到该加号的input
                  var addCount = new ShoppingCarObserver(goodsInput, true)
                  addCount.showCount()
                  addCount.computeGoodsMoney()
                  var sid = $(this).parents('.commodity').attr("sid");
                  var index = $.inArray(sid, arrsid); //sid在数组中的位置
                  arrnum[index] = parseInt(goodsInput.val()); //数量+1
                  $.cookie('cookienum', arrnum, { expires: 10, path: '/' }); //一起存入cookie
              })
              $('.commodity-item').on('change', '.quantity input', function() {
                  var goodsInput = $(this).parents('.quantity').find('input') //找到input
                  var addCount = new ShoppingCarObserver(goodsInput, true)
                  addCount.showCount()
                  addCount.computeGoodsMoney()
                  var sid = $(this).parents('.commodity').attr("sid");
                  var index = $.inArray(sid, arrsid); //sid在数组中的位置
                  arrnum[index] = parseInt(goodsInput.val()); //数量改变
                  $.cookie('cookienum', arrnum, { expires: 10, path: '/' }); //一起存入cookie
              })
              $('.commodity-item').on('click', '.item-delete', function() {
                  if (confirm('你确定删除吗')) {
                      var sid = $(this).parents('.commodity').attr("sid");
                      $(this).parents('.commodity').hide();
                      var index = $.inArray(sid, arrsid); //sid在数组中的位置
                      var num = parseInt(arrnum[index]); //sid对应的数量
                      arrsid.splice(index, 1);
                      arrnum.splice(index, 1);
                      $.cookie('cookiesid', arrsid, { expires: 10, path: '/' });
                      $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
                  }
              })
              $('.deleteall').on('click', function() {
                      if (confirm('你确定删除吗')) {
                          var deletesid = [];
                          for (var i = 0; i < $('.shangpin_xuanze:checked').length; i++) {
                              deletesid[i] = $('.shangpin_xuanze:checked').parents('.commodity').eq(i).attr("sid");
                              var index = $.inArray(deletesid[i], arrsid); //sid在数组中的位置
                              var num = parseInt(arrnum[index]); //sid对应的数量
                              arrsid.splice(index, 1);
                              arrnum.splice(index, 1);
                          }
                          $('.shangpin_xuanze:checked').parents('.commodity').hide();
                          $.cookie('cookiesid', arrsid, { expires: 10, path: '/' });
                          $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
                      }
                  })
                  //   默认全选
              $('#selectall').prop('checked', true);
              $('#selectalls').prop('checked', true);
              //2.购物车其他功能的控制.
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