function xuanran(num, content, fatherChild) {
    for (let i = 1; i <= num; i++) {
        $(fatherChild).append(content);
    }
}
// 列表渲染
xuanran(29, `<div>
<img src="https://g-search1.alicdn.com/img/bao/uploaded/i4/i2/2208944658491/O1CN01BPNcBd2CavcUlaj0Z_!!0-item_pic.jpg_460x460Q90.jpg_.webp" alt="">
<p class="price">￥880.00<span></span><em>707人付款</em></p>
<p class="explain"><a href="javascript:;">实体娃娃全硅胶非充气娃娃男用真人美女仿真高级机器人充气i娃娃</a></p>
<p class="address"><span class="iconfont">&#xe699;</span><a href="javascript:;">福森悦旗舰店</a><em>广东 东莞</em></p>
<p class="icon"><span class="iconfont">&#xe705;</span><span class="iconfont">&#xe744;</span></p>
<section>
    <span>找同款</span><i>找相似</i>
</section>
</div>`, '.list-wupin')
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
<a href="javascript:;">浙网文（2019）1033-086号</a><span>|</span>`, '.footer-middle>div')