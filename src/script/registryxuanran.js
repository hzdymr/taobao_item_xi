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
          a_blank: ! function() { //a标签_blank添加
              $('a').attr("target", "_blank");
          }()
      }
  });