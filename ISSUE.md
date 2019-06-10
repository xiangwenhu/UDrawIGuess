  
* [ ] 断线重连，同步与绘制的问题
    canvas.toDataURL png 传递， 大小限制，分批传。   
    webp格式   
    绘画者断开，需要定时备份。

* [ ] 画笔大小和画布大小？ resize的问题 ？ 
   绘画者 / 观看者 比例 进行统一调制

* [ ] 橡皮檫问题    
  几何计算
* [ ] 线不清楚问题   
   1. beginPath closePath
   2. 绘制时计算px   
   3. 画线时将坐标取整后加上0.5。原因是canvas在绘制的时候，整数点坐标在屏幕像素的中间点，绘制的时候，线条会俩边都占一半，在视觉上看起来是俩个像素的效果。（写基础方法的时候做下处理）
   4. 设置canvas的宽高后，绘制完图形后再scale缩小。

// reset current transformation matrix to the identity matrix
ctx.setTransform(1, 0, 0, 1, 0, 0);  

canvas中的点用贝斯曲线连接成光滑曲线（解决移动端画布模糊问题）
https://blog.csdn.net/qq_39635302/article/details/79477553   
https://blog.csdn.net/weixin_40346046/article/details/78766141   
https://www.jb51.net/html5/641000.html   
https://www.lizhiqianduan.com/blog/index.php/2019/02/26/javascript-how-to-smooth-line/