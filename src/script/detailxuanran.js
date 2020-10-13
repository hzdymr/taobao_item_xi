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
          render: ! function() { //渲染
              let sid = location.search.substring(1).split('=')[1];
              //判断sid是否存在
              if (!sid) {
                  sid = 1;
              }
              $.ajax({
                  url: 'http://192.168.11.18/jsTwo/taobao_xi/php/getsid.php',
                  data: {
                      datasid: sid
                  },
                  dataType: 'json'
              }).done(function(data) {
                  //进行渲染结构代码。
                  $('.left-top img').attr('src', data.url);
                  $('.big-img').attr('src', data.url);
                  $('.right h2').html(data.title);
                  $('.price strong').html(data.price);
                  let picarr = data.piclisturl.split(','); //数据转换成数组
                  $('.left-bottom li:nth-child(1) img').attr('src', data.url);
                  $('.left-bottom li:nth-child(2) img').attr('src', picarr[1]);
                  $('.left-bottom li:nth-child(3) img').attr('src', picarr[2]);
                  $('.left-bottom li:nth-child(4) img').attr('src', picarr[3]);
                  $('.left-bottom li:nth-child(5) img').attr('src', picarr[4]);
              });
          }(),
          zoom: ! function() { //放大镜效果
              class Scales {
                  constructor() { //构造函数
                      //1.获取元素
                      this.scale = document.querySelector('.scale');
                      this.spic = document.querySelector('.left-top'); //小图
                      this.sf = document.querySelector('.left-top-sf'); //小放
                      this.bf = document.querySelector('.df'); //大放
                      this.bpic = document.querySelector('.big-img'); //大图
                  }
                  init() {
                      //1.鼠标移入小图，小放和大放显示，否则隐藏
                      this.spic.onmouseover = () => {
                          this.sf.style.visibility = 'visible';
                          this.bf.style.visibility = 'visible';
                          this.spic.onmousemove = (ev) => {
                              var ev = ev || window.event;
                              let left = ev.clientX - this.spic.offsetLeft - this.sf.offsetWidth / 2;
                              let top = ev.clientY - this.spic.offsetTop - this.sf.offsetHeight / 2;
                              if (left <= 0) {
                                  left = 0;
                              } else if (left >= this.spic.offsetWidth - this.sf.offsetWidth) {
                                  left = this.spic.offsetWidth - this.sf.offsetWidth;
                              }

                              if (top <= 0) {
                                  top = 0;
                              } else if (top >= this.spic.offsetHeight - this.sf.offsetHeight) {
                                  top = this.spic.offsetHeight - this.sf.offsetHeight;
                              }

                              //求比例
                              this.bili = this.bpic.offsetWidth / this.spic.offsetWidth;


                              this.sf.style.left = left + 'px'; //减去scale盒子的位置。
                              this.sf.style.top = top + 'px';

                              this.bpic.style.left = -this.bili * left + 'px';
                              this.bpic.style.top = -this.bili * top + 'px';
                          }

                          this.spic.onmouseout = () => {
                              this.sf.style.visibility = 'hidden';
                              this.bf.style.visibility = 'hidden';
                          };
                          //2.求小放的尺寸。
                          this.sf.style.width = this.spic.offsetWidth * this.bf.offsetWidth / this.bpic.offsetWidth + 'px';
                          this.sf.style.height = this.spic.offsetHeight * this.bf.offsetHeight / this.bpic.offsetHeight + 'px';

                      }
                  }
              }

              new Scales().init();
          }(),
          swap: ! function() { //换图效果
              $('.left-bottom img').on('mouseover', function() {
                  $('.left-top img').attr("src", $(this).attr("src"));
                  $('.big-img').attr("src", $(this).attr("src"));
              })
          }(),
          shopping_cart: ! function() { //购物车(cookie或者本地存储)。
              let sid = location.search.substring(1).split('=')[1];
              //判断sid是否存在
              if (!sid) {
                  sid = 1;
              }
              let arrsid = []; //商品的sid
              let arrnum = []; //商品的数量
              //提前设定cookie的键值
              //目的就是判断商品是第一次添加进购物车，还是多次。
              function getcookie() {
                  if ($.cookie('cookiesid') && $.cookie('cookienum')) { //cookie存在
                      arrsid = $.cookie('cookiesid').split(','); //获取cookie的sid，存放到数组中。
                      arrnum = $.cookie('cookienum').split(','); //获取cookie的数量，存放到数组中。
                  } else { //cookie不存在
                      arrsid = [];
                      arrnum = [];
                  }
              }
              $('.cart').on('click', function() {
                  getcookie(); //如果cookie存在，取到cookie的值，并且变成了数组。
                  //如果arrsid里面存在当前商品的sid，说明商品已经存在，否则商品是第一次购买。
                  //$.inArray(value,array)确定第一个参数在数组中的位置，从0开始计数(如果没有找到则返回 -1 )。
                  //value:查找的值
                  //array:数组
                  if ($.inArray(sid, arrsid) === -1) { //不存在，将商品的sid和数量存入cookie
                      arrsid.push(sid); //添加当前商品的sid
                      $.cookie('cookiesid', arrsid, { expires: 10, path: '/' }); //插件完成的cookie的添加。
                      arrnum.push($('.quantity input').val()); //添加商品的数量
                      $.cookie('cookienum', arrnum, { expires: 10, path: '/' }); //插件完成的cookie的添加。
                  } else { //存在,商品的数量累加
                      //获取原来的sid对应的数量(sid和数量是对应的 ，sid的在数组的位置就是数量在数组的位置)
                      let index = $.inArray(sid, arrsid); //sid在数组中的位置
                      let num = parseInt(arrnum[index]); //sid对应的数量
                      //原来的数量+新添加数量，一起存入cookie
                      arrnum[index] = num + parseInt($('.quantity input').val()); //原来的数量+新添加数量进行赋值
                      $.cookie('cookienum', arrnum, { expires: 10, path: '/' }); //一起存入cookie
                  }
                  alert('已加入购物车');
              });
          }(),
          a_blank: ! function() { //a标签_blank添加
              $('a').attr("target", "_blank");
          }()
      }
  });