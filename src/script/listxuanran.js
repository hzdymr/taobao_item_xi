  // 复制渲染包装
  function xuanran(num, content, fatherChild) {
      for (let i = 1; i <= num; i++) {
          $(fatherChild).append(content);
      }
  }
  define([], function() {
      let array_default = []; //排序前的li数组
      let array = []; //排序中的数组
      //冒泡排序，比较相邻的两个数字。
      let prev = null; //前一个商品价格
      let next = null; //后一个商品价格
      const list = $('.list-wupin');
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
          render: ! function() { //list-wupin渲染
              $.ajax({
                  url: 'http://192.168.11.18/jsTwo/taobao_xi/php/listdata.php',
                  dataType: 'json'
              }).done(function(data) {
                  //进行渲染结构代码。
                  let $strhtml = '<div class="list-wupin-item">';
                  $.each(data, function(index, value) { //遍历数组和对象
                      $strhtml += `
                      <div class="item">
                      <a href="detail.html?sid=${value.sid}"><img class="lazy" data-original="${value.url}" alt=""></a>
                      <p class="price">￥<i>${value.price}</i><span></span><em>${value.sailnumber}人付款</em></p>
                      <p class="explain"><a href="detail.html?sid=${value.sid}">${value.title}</a></p>
                      <p class="address"><span class="iconfont">&#xe699;</span><a href="detail.html?sid=${value.sid}">福森悦旗舰店</a><em>广东 东莞</em></p>
                      <p class="icon"><span class="iconfont">&#xe705;</span><span class="iconfont">&#xe744;</span></p>
                      <section>
                          <span>找同款</span><i>找相似</i>
                      </section>
                  </div>`;
                  });
                  $strhtml += '</div>';
                  list.html($strhtml); //追加数据
                  //实现懒加载效果
                  $("img.lazy").lazyload({
                      effect: "fadeIn" //图片显示方式
                  });
                  array_default = []; //排序前的item数组
                  array = []; //排序中的数组
                  prev = null;
                  next = null;
                  //将页面的div元素加载到两个数组中
                  $('.list-wupin-item .item').each(function(index, element) {
                      array[index] = $(this);
                      array_default[index] = $(this);
                  });
              });
          }(),
          page: ! function() { //分页
              $('.pages').pagination({
                  pageCount: 3, //总的页数
                  jump: true, //是否开启跳转到指定的页数，布尔值。
                  prevContent: '上一页', //将图标改成上一页下一页。
                  nextContent: '下一页',
                  callback: function(api) {
                      //   console.log(api.getCurrent()); //获取当前的点击的页码。
                      $.ajax({
                          url: 'http://192.168.11.18/jsTwo/taobao_xi/php/listdata.php',
                          data: {
                              page: api.getCurrent() //传输数据
                          },
                          dataType: 'json'
                      }).done(function(data) {
                          let $strhtml = '<div class="list-wupin-item">';
                          let num = 0;
                          $.each(data, function(index, value) { //遍历数组和对象
                              num++;
                              $strhtml += `
                        <div class="item">
                        <a href="detail.html?sid=${value.sid}"><img class="lazy" data-original="${value.url}" alt=""></a>
                        <p class="price">￥<i>${value.price}</i><span></span><em>${value.sailnumber}人付款</em></p>
                        <p class="explain"><a href="detail.html?sid=${value.sid}">${value.title}</a></p>
                        <p class="address"><span class="iconfont">&#xe699;</span><a href="detail.html?sid=${value.sid}">福森悦旗舰店</a><em>广东 东莞</em></p>
                        <p class="icon"><span class="iconfont">&#xe705;</span><span class="iconfont">&#xe744;</span></p>
                        <section>
                            <span>找同款</span><i>找相似</i>
                        </section>
                    </div>`;
                          });
                          $strhtml += '</div>';
                          list.html($strhtml); //追加数据
                          //   保持结构
                          if (num % 4 !== 0) {
                              num = 4 - num % 4;
                              xuanran(num, `<div class="item" style="border:0"></div>`, '.list-wupin-item');
                          }
                          //实现懒加载效果
                          $("img.lazy").lazyload({
                              effect: "fadeIn" //图片显示方式
                          });
                          array_default = []; //排序前的item数组
                          array = []; //排序中的数组
                          prev = null;
                          next = null;
                          //将页面的div元素加载到两个数组中
                          $('.list-wupin-item .item').each(function(index, element) {
                              array[index] = $(this);
                              array_default[index] = $(this);
                          });
                      });
                  }

              });
          }(),
          div_sort: ! function() { //排序
              // 默认
              $('.sort li').eq(0).on('click', function() {
                  $.each(array_default, function(index, value) {
                      $('.list-wupin .list-wupin-item').append(value);
                  });
                  return;
              });
              // 升序
              $('.price dl dd').eq(0).on('click', function() {
                  for (let i = 0; i < array.length - 1; i++) {
                      for (let j = 0; j < array.length - i - 1; j++) {
                          prev = parseFloat(array[j].find('.price i').html()); //取上个价格
                          next = parseFloat(array[j + 1].find('.price i').html()); //下一个的价格
                          //通过价格的判断，改变的是数组.item的位置。
                          if (prev > next) {
                              let temp = array[j];
                              array[j] = array[j + 1];
                              array[j + 1] = temp;
                          }
                          console.log(prev, next);
                      }
                  }
                  $('.list-wupin .list-wupin-item').empty(); //清空原来的列表
                  $.each(array, function(index, value) {
                      $('.list-wupin .list-wupin-item').append(value);
                  });
              });
              //   降序
              $('.price dl dd').eq(1).on('click', function() {
                  console.log('c');
                  for (let i = 0; i < array.length - 1; i++) {
                      for (let j = 0; j < array.length - i - 1; j++) {
                          prev = parseFloat(array[j].find('.price i').html()); //取上个价格
                          next = parseFloat(array[j + 1].find('.price i').html()); //下一个的价格
                          //通过价格的判断，改变的是数组.item的位置。
                          if (prev < next) {
                              let temp = array[j];
                              array[j] = array[j + 1];
                              array[j + 1] = temp;
                          }
                      }
                  }
                  $('.list-wupin .list-wupin-item').empty(); //清空原来的列表
                  $.each(array, function(index, value) {
                      $('.list-wupin .list-wupin-item').append(value);
                  });
              });
          }(),
          render_right: ! function() { //list-wupin-right渲染
              const list = $('.list-wu-right');
              $.ajax({
                  url: 'http://192.168.11.18/jsTwo/taobao_xi/php/taobaodata.php',
                  dataType: 'json'
              }).done(function(data) {
                  //进行渲染结构代码。
                  let strhtml = '';
                  let num = 0;
                  $.each(data, function(index, value) { //遍历数组和对象
                      num++;
                      if (num >= 30 && num <= 33) {
                          strhtml += `
                  <div>
                  <img class="lazy" src="${value.url}" alt="">
                  <p class="price">￥${value.price}<span></span><em>${value.sailnumber}人付款</em></p>
                  <p class="explain"><a href="javascript:;">${value.title}</a></p>
                  <p class="address"><span class="iconfont">&#xe699;</span><a href="javascript:;">福森悦旗舰店</a><em>广东 东莞</em></p>
                  <p class="icon"><span class="iconfont">&#xe705;</span><span class="iconfont">&#xe744;</span></p>
                  <section>
                      <span>找同款</span><i>找相似</i>
                  </section>
              </div> `;
                      } else {
                          strhtml += '';
                      }
                  });
                  list.html(strhtml); //追加数据
                  //实现懒加载效果
                  $("img.lazy").lazyload({
                      effect: "fadeIn" //图片显示方式
                  });
              });
          }(),
          right_nav: ! function() { //右侧边栏效果
              function scroll() {
                  let top = $(window).scrollTop();
                  top <= 700 ? $('.to-top').hide() : $('.to-top').show();
              }
              scroll();
              $(window).on('scroll', function() {
                  scroll();
              });
              $('.to-top').on('click', function() {
                  $('html').stop(true).animate({
                      scrollTop: 0
                  })
              });
              $('.lounav').eq(0).hover(function() {
                  $('.lounav').eq(0).css({ "font-size": "15px" }).html('亲测');
              }, function() {
                  $('.lounav').eq(0).html('<span class="iconfont">&#x3432;</span>');
              });
              $('.lounav').eq(1).hover(function() {
                  $('.lounav').eq(1).css({ "font-size": "12px" }).html('用户反馈');
              }, function() {
                  $('.lounav').eq(1).html('<span class="iconfont">&#xe64a;</span>');
              })
              $('.lounav').eq(2).hover(function() {
                  $('.lounav').eq(2).css({ "font-size": "12px" }).html('帮助搜索');
              }, function() {
                  $('.lounav').eq(2).html('<span class="iconfont">&#xe705;</span>');
              })
              $('.lounav').eq(3).hover(function() {
                  $('.lounav').eq(3).css({ "font-size": "12px" }).html('浏览历史');
              }, function() {
                  $('.lounav').eq(3).html('<span class="iconfont">&#xe667;</span>');
              })
          }(),
          suspend: ! function() { //悬浮
              $(window).on('scroll', function() {
                  let $top = $(window).scrollTop(); //滚动条顶部的偏移
                  if ($top >= 300) {
                      $('.xuanfu-search').stop(true).animate({
                          top: 0
                      });
                  } else {
                      $('.xuanfu-search').stop(true).animate({
                          top: -60
                      });
                  }
              });
              $('.close').on('click', function() {
                  $('.xuanfu-search').hide()
              });
          }(),
          a_blank: ! function() { //a标签_blank添加
              $('a').attr("target", "_blank");
          }()
      }
  });