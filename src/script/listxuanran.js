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
          render: ! function() { //list-wupin渲染
              const list = $('.list-wupin');
              $.ajax({
                  url: 'http://192.168.11.18/jsTwo/taobao_xi/php/taobaodata.php',
                  dataType: 'json'
              }).done(function(data) {
                  //进行渲染结构代码。
                  let strhtml = '';
                  let num = 0;
                  $.each(data, function(index, value) { //遍历数组和对象
                      num++;
                      if (num > 48) {
                          strhtml += '';
                      } else {
                          strhtml += `
                    <div>
                    <img class="lazy" data-original="${value.url}" alt="">
                    <p class="price">￥${value.price}<span></span><em>${value.sailnumber}人付款</em></p>
                    <p class="explain"><a href="javascript:;">${value.title}</a></p>
                    <p class="address"><span class="iconfont">&#xe699;</span><a href="javascript:;">福森悦旗舰店</a><em>广东 东莞</em></p>
                    <p class="icon"><span class="iconfont">&#xe705;</span><span class="iconfont">&#xe744;</span></p>
                    <section>
                        <span>找同款</span><i>找相似</i>
                    </section>
                </div> `;
                      }
                  });
                  list.html(strhtml); //追加数据
                  //实现懒加载效果
                  $("img.lazy").lazyload({
                      effect: "fadeIn" //图片显示方式
                  });
              });
          }(),
          render_right: ! function() { //list-wupin渲染
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
                      if (num >= 30 && num <= 40) {
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