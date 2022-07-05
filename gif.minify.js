(function() {
     var e, t, n, r, i, s;
     window.imageSmoothingz = function(e, t) {
          var n;
          if (e == null) {
               e = false
          }
          if (t == null) {
               t = ctx
          }
          n = t;
          n.imageSmoothingEnabled = e;
          n.imageSmoothingQuality = 'off'
     };
     e = function() {
          var e, t, n, r;
          r = window;
          e = document;
          t = e.documentElement;
          n = e.getElementsByTagName("body")[0];
          window.cw = r.innerWidth || t.clientWidth || n.clientWidth;
          window.ch = r.innerHeight || t.clientHeight || n.clientHeight;
          window.cMin = Math.min(cw, ch);
          return window.cMax = Math.max(cw, ch)
     };
     n = function(e, t) {
          window.canvas = document.getElementById("canvas");
          canvas.setAttribute("height", t);
          return canvas.setAttribute("width", e)
     };
     r = function(e, t) {
          return window.ctx = document.getElementById("canvas").getContext("2d")
     };
     s = function() {
          var t, s, o, u;
          t = document.createElement("canvas");
          u = cw;
          o = ch;
          s = t.getContext("2d");
          t.setAttribute("width", u);
          t.setAttribute("height", o);
          s.drawImage(canvas, 0, 0);
          e();
          n(cw, ch);
          ctx.drawImage(t, 0, 0, u, o, 0, 0, cw, ch);
          r(cw, ch);
          return i()
     };
     t = function() {
          return window.location = window.location
     };
     e();
     n(cw, ch);
     r(cw, ch);
     window.pre_canvas = document.createElement("canvas");


     window.pre_ctx = pre_canvas.getContext("2d");
     Math.hyp = function(e, t) {
          return Math.sqrt(e * e + t * t)
     };
     (i = function() {
          var e, t;
          e = Math.hyp(cw, ch);
          t = e;
          pre_canvas.width = e;
          pre_canvas.height = e;
          return pre_canvas.s = e
     })();
     imageSmoothingz(false, ctx);
     imageSmoothingz(false, pre_ctx);
     ctx.imageSmoothingEnabled = false;
     pre_ctx.imageSmoothingEnabled = false;
     window.addEventListener("resize", imageSmoothingz);
     window.addEventListener("orientationchange", imageSmoothingz);
     window.addEventListener("resize", s);
     window.addEventListener("orientationchange", s);
}).call(this);
(function() {
     var e, t;
     window.requestSmoothMouse = function() {
          return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(e, t) {
               return window.setTimeout(e, 1e3 / 60)
          }
     }();
     e = [];
     window.Mouse = {
          x: -1,
          y: -1,
          xA: [cw / 2],
          yA: [ch / 2],
          xDown: -1,
          xUp: -1,
          yDown: -1,
          yUp: -1,
          up: true,
          clicks: 0
     };
     Mouse.events = {};
     Mouse.events.move = function(e) {
          if ("touches" in e) {
               e = e.touches[0]
          }
          if (e.pageX === Mouse.x && e.pageY === Mouse.y) {
               return
          }
          Mouse.x = e.pageX;
          return Mouse.y = e.pageY
     };
     Mouse.path = [];
     Mouse.path.x = [];
     Mouse.path.y = [];
     Mouse.path.capture = function(e, t) {
          var n;
          Mouse.path.x.unshift([e]);
          Mouse.path.y.unshift([t]);
          n = [];
          while (Mouse.path.x.length > 32) {
               Mouse.path.x.pop();
               n.push(Mouse.path.y.pop())
          }
          return n
     };
     Mouse.avg = function(t, n, r, i) {
          if (!Array.isArray(e[t])) {
               e[t] = [r, i]
          }
          if (r > e[t][0]) {
               e[t][0] += (r - e[t][0]) / n
          } else if (r < e[t][0]) {
               e[t][0] -= (e[t][0] - r) / n
          } else {
               e[t][0] += 0
          }
          if (i > e[t][1]) {
               e[t][1] += (i - e[t][1]) / n
          } else if (i < e[t][1]) {
               e[t][1] -= (e[t][1] - i) / n
          } else {
               e[t][1] += 0
          }
          Mouse.xA[t] = Math.round(e[t][0]);
          return Mouse.yA[t] = Math.round(e[t][1])
     };
     Mouse.events.up = function(e) {
          Mouse.down = false;
          Mouse.up = true;
          Mouse.xUp = Mouse.x;
          return Mouse.yUp = Mouse.y
     };
     Mouse.events.down = function(e) {
          if ("touches" in e) {
               e.preventDefault();
               e = e.touches[0]
          }
          Mouse.down = true;
          Mouse.up = false;
          Mouse.clicks = Mouse.clicks + 1;
          Mouse.xDown = Mouse.x;
          Mouse.yDown = Mouse.y;
          Mouse.xUp = Mouse.x;
          return Mouse.yUp = Mouse.y
     };
     t = function() {
          var e;
          if (Mouse.x !== -1 && Mouse.y !== -1) {
               Mouse.avg(0, 3, Mouse.x, Mouse.y);
               e = 1;
               while (e <= 64) {
                    Mouse.avg(e, 3, Mouse.xA[e - 1], Mouse.yA[e - 1]);
                    e++
               }
               Mouse.path.capture(Mouse.xA[0], Mouse.yA[0])
          }
          return window.requestSmoothMouse(t)
     };
     t();
     document.addEventListener("mousemove", Mouse.events.move);
     document.addEventListener("touchmove", Mouse.events.move);
     document.addEventListener("mousedown", Mouse.events.down);
     document.addEventListener("touchstart", Mouse.events.down);
     document.addEventListener("touchend", Mouse.events.up);
     document.addEventListener("mouseup", Mouse.events.up)
}).call(this);
(function() {
     var e, t, n, r;
     window.ctx = document.getElementById("canvas").getContext("2d");
     window.time = 0;
     window.aRandomHue = Math.random() * 360 + 1;
     window.requestAnimFrame = function() {
          return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(e, t) {
               return window.setTimeout(e, 1e3 / 60)
          }
     }();
     window.timer = function() {
          return time += 1
     };
     window.hsla = function(e, t, n, r) {
          if (e == null) {
               e = 0
          }
          if (t == null) {
               t = 100
          }
          if (n == null) {
               n = 50
          }
          if (r == null) {
               r = 1
          }
          return "hsla(" + e + ", " + t + "%, " + n + "%, " + r + ")"
     };
     window.sin = function(e, t, n) {
          if (e == null) {
               e = 300
          }
          if (t == null) {
               t = 1
          }
          if (n == null) {
               n = 0
          }
          return (Math.sin(Date.now() / e) + n) * t
     };
     t = function(e, t) {
          if (e === 0) {
               e = .1
          }
          if (t === 0) {
               t = .1
          }
          return Math.sqrt(e * e + (t * t || e * e)) / 2
     };
     n = function(e) {
          var t;
          t = [];
          return function(n) {
               var r, i, s;
               t.push(n);
               if (t.length > e) {
                    t.splice(0, 1)
               }
               s = 0;
               for (r in t) {
                    s += t[r]
               }
               i = e;
               if (t.length < e) {
                    i = t.length
               }
               return s / i
          }
     };
     window.clear = function() {
          return ctx.clearRect(0, 0, cw, ch)
     };
     window.clearCanvas = function(e) {
          if (e == null) {
               e = .1
          }
          ctx.fillStyle = hsla(0, 0, 0, e);
          return ctx.fillRect(0, 0, cw, ch)
     };
     window.fadeCanvas = function(e) {
          if (e == null) {
               e = 1
          }
          ctx.fillStyle = hsla(0, 0, 0, e);
          return ctx.fillRect(0, 0, cw, ch)
     };
     window.cornerClear = function() {
          if (Mouse.x <= 20 && Mouse.y <= 20 || Mouse.x >= cw - 20 && Mouse.y <= 20 || Mouse.x >= cw - 20 && Mouse.y >= ch - 20 || Mouse.x <= 20 && Mouse.y >= ch - 20) {
               return clearCanvas(.1)
          }
     };
     window.drawText = function(e, t, n) {
          ctx.lineWidth = 2;
          ctx.fillStyle = "white";
          ctx.strokeStyle = "black";
          ctx.strokeText(e, t, n);
          return ctx.fillText(e, t, n)
     };
     window.line = function(e) {
          var n, r, i, s, o;
          if (e == null) {
               e = 8
          }
          ctx.lineCap = "round";
          ctx.lineJoin = "miter";
          ctx.lineWidth = e || 2;
          ctx.beginPath();
          s = 64;
          o = [];
          while (s > 0) {
               ctx.moveTo(Mouse.xA[s - 1], Mouse.yA[s - 1]);
               ctx.lineTo(Mouse.xA[s], Mouse.yA[s]);
               n = Mouse.xA[s] - Mouse.xA[s - 1];
               r = Mouse.yA[s] - Mouse.yA[s - 1];
               i = -time / 6 - s * 2 + t(n, r) * 6 - aRandomHue;
               ctx.strokeStyle = hsla(i, 100, 50, 1);
               ctx.lineWidth = Math.max(e - t(n, r), 2);
               ctx.stroke();
               ctx.beginPath();
               o.push(s--)
          }
          return o
     };
     window.decay = function(e, t, n, r) {
          if (e == null) {
               e = 0
          }
          if (t == null) {
               t = 0
          }
          if (n == null) {
               n = 2
          }
          if (r == null) {
               r = 0
          }
          ctx.save();
          ctx.translate(cw / 2 + e, ch / 2 + t);
          ctx.rotate(r);

          ctx.drawImage(canvas, -n / 2 - cw / 2, -n / 2 - ch / 2, cw + n, ch + n);
          return ctx.restore()
     };
     window.pre_decay = function(e, t, n, r) {



          if (e == null) {
               e = 0
          }
          if (t == null) {
               t = 0
          }
          if (n == null) {
               n = 0
          }
          if (r == null) {
               r = 0
          }
          pre_ctx.drawImage(canvas, (pre_canvas.width - cw) / 2, (pre_canvas.height - ch) / 2);
          pre_ctx.save();
          pre_ctx.translate(pre_canvas.s / 2 + e, pre_canvas.s / 2 + t);
          pre_ctx.rotate(r);
          pre_ctx.drawImage(pre_canvas, -(pre_canvas.s + n) / 2, -(pre_canvas.s + n) / 2, pre_canvas.s + n, pre_canvas.s + n);
          pre_ctx.restore();
          return ctx.drawImage(pre_canvas, (pre_canvas.s - cw) / 2, (pre_canvas.s - ch) / 2, cw, ch, 0, 0, cw, ch)
     };
     window.ray = function(e, n) {
          var r, i, s, o, u, a, f;
          if (e == null) {
               e = false
          }
          if (n == null) {
               n = .25
          }
          r = {
               x: Mouse.xA[0],
               y: Mouse.yA[0]
          };
          i = {
               x: Mouse.x,
               y: Mouse.y
          };
          s = {
               x: 2 * Mouse.x - Mouse.xA[0],
               y: 2 * Mouse.y - Mouse.yA[0]
          };
          r.h = t(r.x - i.x, r.y - i.y);
          i.h = t(r.x - s.x, r.y - s.y);
          s.h = t(s.x - i.x || 1, s.y - i.y || 1);
          u = r.h / 1.5 + 5;
          a = r.x + r.h / 2 - s.h;
          f = r.y + r.h / 2 - s.h;
          r = Mouse.x - Mouse.xA[0];
          i = Mouse.y - Mouse.yA[0];
          o = s.h * 1.5 + 240 + time / 2;
          ctx.strokeStyle = hsla(0, 0, 0, 1);
          ctx.fillStyle = hsla(o + aRandomHue, 100, 50, 1);
          ctx.beginPath();
          if (e === true) {
               a = cw / 2;
               f = ch / 2;
               u = u * n
          }
          if (e === "drip") {
               a = Mouse.xUp;
               f = Mouse.yUp;
               u = u * n + 1
          }
          ctx.arc(a, f, u * n, 0, Math.PI * 2, false);
          ctx.closePath();
          return ctx.fill()
     };
     window.fps = {
          past: [0],
          capture: function() {
               var e;
               e = 0;
               while (this.past.length < cw) {
                    e++;
                    this.past.unshift(Date.now());
                    this.past[e] = 1e3 / (this.past[e - 1] - this.past[e])
               }
               return this.past.pop()
          },
          sma30: n(30),
          sma60: n(60),
          sma120: n(120),
          show: function() {
               var e, t, n;
               this.capture();
               t = 0;
               e = 60;
               ctx.fillStyle = hsla(0, 0, 0, .5);
               ctx.fillRect(cw - e, 0, e, 41);
               ctx.fillStyle = hsla(90, 100, 50, 1);
               ctx.fillRect(cw - e, 40 - Math.round(this.sma60(fps.past[e / 2])) / 3, e, 1);
               while (t < e) {
                    n = fps.past[t];
                    ctx.fillStyle = hsla(n * 6 + 180, 100, 40, .5);
                    ctx.fillRect(-t + fps.past.length, 40, 1, -n / 3);
                    ctx.fillStyle = hsla(this.sma30(n) * 6 + 180, 100, 50, .4);
                    ctx.fillRect(-t + fps.past.length + 6, 40 - this.sma30(n) / 3, 1, 2);
                    t++
               }
               return drawText(Math.round(this.sma60(fps.past[10])), cw - 15, 10)
          }
     };
     window.edgePaint = function(e) {
          var t, n, r, i;
          if (e == null) {
               e = 90
          }
          n = time / 180 + Math.sin(Date.now() / 9999) * 90 + Math.sin(Date.now() / 512) * 90;
          i = 100;
          r = 50;
          t = 1;
          ctx.fillStyle = hsla(n, i, r, t);
          ctx.fillRect(1, 0, cw, 1);
          ctx.fillStyle = hsla(n + e, i, r, t);
          ctx.fillRect(cw - 1, 0, 1, ch);
          ctx.fillStyle = hsla(n + e * 2, i, r, t);
          ctx.fillRect(0, ch - 1, cw, 1);
          ctx.fillStyle = hsla(n + e * 3, i, r, t);
          return ctx.fillRect(0, 0, 1, ch)
     };
     edgePaint.grey = function() {
          var e, t, n, r, i, s, o;
          t = time / 8 % 360;
          o = 100;
          e = 1;
          r = Math.sin(Date.now() / 365);
          i = Math.sin(Date.now() / 7);
          s = r + i;
          if (s > 0) {
               n = 100
          } else {
               n = 0
          }
          ctx.fillStyle = hsla(t, o, n, e);
          ctx.fillRect(1, 0, cw - 1, 1);
          ctx.fillStyle = hsla(t + 90, o, n, e);
          ctx.fillRect(cw - 1, 0, 1, ch - 1);
          ctx.fillStyle = hsla(t + 180, o, n, e);
          ctx.fillRect(0, ch - 1, cw, 1);
          ctx.fillStyle = hsla(t + 270, o, n, e);
          return ctx.fillRect(0, 0, 1, ch - 1)
     };
     edgePaint.gradA = function(e, t, n) {
          var r, i, s, o, u, a, f, l, c, h;
          i = Mouse.x + Mouse.y;
          f = 100;
          s = 0;
          o = 100;
          r = 1;
          u = ctx.createLinearGradient(0, 0, 0, ch);
          a = ctx.createLinearGradient(0, 0, cw, 0);
          l = hsla(i, f, s, r);
          c = hsla(i, f, o, r);
          h = hsla(i, f, s, r);
          u.addColorStop(0, l);
          a.addColorStop(0, l);
          if (Mouse.x !== -1 && Mouse.y !== -1) {
               a.addColorStop(e / cw, c);
               u.addColorStop(t / ch, c)
          } else {
               u.addColorStop(.5, c);
               a.addColorStop(.5, c)
          }
          u.addColorStop(1, h);
          a.addColorStop(1, h);
          ctx.fillStyle = a;
          ctx.fillRect(1, 0, cw - n, n);
          ctx.fillStyle = u;
          ctx.fillRect(cw - n, 0, n, ch - 1);
          ctx.fillStyle = a;
          ctx.fillRect(0, ch - n, cw, n);
          ctx.fillStyle = u;
          return ctx.fillRect(0, 0, n, ch - 1)
     };
     edgePaint.gradB = function(e, t, n) {
          var r, i, s, o, u, a, f, l, c, h;
          i = Mouse.x + Mouse.y;
          f = 100;
          s = 0;
          o = 100;
          r = 1;
          u = ctx.createLinearGradient(0, 0, 0, ch);
          a = ctx.createLinearGradient(0, 0, cw, 0);
          l = hsla(i, f, s, r);
          c = hsla(i, f, o, r);
          h = hsla(i, f, s, r);
          u.addColorStop(0, l);
          a.addColorStop(0, l);
          if (Mouse.x !== -1 && Mouse.y !== -1) {
               a.addColorStop(e / cw, c);
               u.addColorStop(t / ch, c)
          } else {
               u.addColorStop(.5, c);
               a.addColorStop(.5, c)
          }
          u.addColorStop(1, h);
          a.addColorStop(1, h);
          ctx.fillStyle = a;
          ctx.fillRect(1, 0, cw - n, n);
          ctx.fillStyle = u;
          ctx.fillRect(cw - n, 0, n, ch - 1);
          ctx.fillStyle = a;
          ctx.fillRect(0, ch - n, cw, n);
          ctx.fillStyle = u;
          ctx.fillRect(0, 0, n, ch - 1);
          ctx.fillStyle = hsla(0, 0, (Math.sin(Date.now() / 10) + 1) * 50, 1);
          ctx.save();
          ctx.translate(cw / 2, ch / 2);
          ctx.rotate(-time / 100);
          ctx.fillRect(-1, -cw / 2, 2, cw);
          return ctx.restore()
     };
     r = function(e, t, n, r, i, s) {
          ctx.save();
          ctx.translate(e, t);
          ctx.rotate(s);
          ctx.fillStyle = i;
          ctx.fillRect(-n / 2 * (Math.sin(Date.now() / 8444) + 1), -r / 2, n, r);
          return ctx.restore()
     };
     e = 0;
     window.ribbon = function() {
          var t, n, i, s, o, u, a, f, l, c, h;
          e = (e + .125) % 360;
          o = e;
          f = 100;
          u = 50;
          t = .5;
          s = 200;
          l = 1.5;
          a = time / 77;
          i = 50;
          c = Mouse.xA[2];
          h = Mouse.yA[2];
          if (cMax <= 480) {
               s = 80
          }
          if (Mouse.down) {
               e -= .5
          }
          n = hsla(o + aRandomHue, 100, 50, 1);
          return r(c, h, s, l, n, a)
     }
}).call(this);
(function() {
     var e, t, n, r, i, s, o, u, a, f;
     var l, c;
     l = function(e) {
          var t;
          t = document.createElement("a");
          t.download = Date.now() + ".png";
          t.href = e.canvas.toDataURL();
          return window.open(t)
     };
     c = function(e) {
          switch (e.charCode) {
               case 112:
                    return l(ctx)
          }
     };
     window.addEventListener("keypress", c, false);
     ctx.fillStyle = hsla(0, 100, 0, 1);
     ctx.fillRect(0, 0, cw, ch);
     drawText("Loading...", 10, 10);
     r = function() {
          return (Mouse.x / cw - .5) * 12 + Math.sin(Date.now() / 64e3)
     };
     f = function() {
          return (Mouse.y / ch - .5) * 12 + Math.sin(Date.now() / 64e3)
     };
     t = 0;
     n = function() {
          if (t < Mouse.clicks) {
               return t += .003
          }
     };
     window.giveImage = function() {
          if (imageURL.substr(-3) === "gif") {
               return gif.frames[gif.currentFrame()].ctx.canvas
          } else {
               return img
          }
     };
     e = function() {
          var i, s, o, u, a, l;
          window.requestAnimFrame(e);
          timer();
          n();
          imageSmoothingz(false, ctx);
          imageSmoothingz(false, pre_ctx);
          i = Math.sin(Date.now() / 12800) + 1.1;
          l = 16;
          s = 1;
          a = (Mouse.x / cw - .5) / (ch / (Mouse.y - ch / 2) * 40);
          o = Mouse.x / cw - .5;
          u = Mouse.y / ch - .5;
          decay(r() / 2, f() / 2, -l / 2, .008 * i + a / 2 - Math.PI + t);
          decay(0, 0, l, -.007 * i + a / 2 + Math.PI - t);
          if (Mouse.x !== -1 && Mouse.y !== -1) {
               return ctx.drawImage(giveImage(), Mouse.x - giveImage().width / 2, Mouse.y - giveImage().height / 2)
          } else {
               return ctx.drawImage(giveImage(), 110, 110)
          }
     };
     s = function() {
          var e, t;
          if (typeof window._gaq === "undefined") {
               return
          }
          if (!/^http:\/\/198\.199\.72\.134\/cors\//.test(gif.src)) {
               return
          }
          e = Math.round(gif.buf.u8.byteLength / 1024);
          t = Math.round(e / (gif.benchmark["fetch-from-network"] / 1e3));
          _gaq.push(["_trackEvent", "gifmelt", "img_kb", "", e]);
          return _gaq.push(["_trackEvent", "gifmelt", "img_kbsec_2", "", t])
     };
     i = function(e) {
          return "http://198.199.72.134/cors/" + e.replace(/^https?:\/\//, "")
     };
     o = function() {
          if (a.length === 0) {
               window.imageURL = "dance.gif"
          } else {
               window.imageURL = a.shift()
          }
          console.log("loading " + imageURL);
          if (imageURL.substr(-3) === "gif") {
               window.gif = GIF(imageURL);
               gif.on("error", o);
               gif.on("rendered", s);
               gif.on("rendered", e);
               return gif.render()
          } else {
               window.img = new Image;
               img.addEventListener("error", o);
               img.addEventListener("load", e);
               img.crossOrigin = "anonymous";
               return img.src = imageURL
          }
     };
     a = [];
     u = decodeURIComponent(window.location.search.trim().substr(1));
     if (u.length === 0) {
          a.push("dance.gif")
     } else if (u === "http://dump.fm/avatars/20110808/1312853536416-dumpfm-melipone-1277243920032-dumpfm-melipone-avat1ar.gif") {
          a.push("./img/1312853536416-dumpfm-melipone-1277243920032-dumpfm-melipone-avat1ar.gif")
     } else if (u === "http://dump.fm/images/20111207/1323287821245-dumpfm-frankhats-noisia_photoblaster_cropped.gif") {
          a.push("./img/1323287821245-dumpfm-frankhats-noisia_photoblaster_cropped.gif")
     } else if (u === "http://www.paulflannery.co.uk/blog/wp-content/uploads/wave.gif") {
          a.push("./img/wave.gif")
     } else if (u === "http://dump.fm/images/20100701/1277998133605-dumpfm-frankhats-oie_firepush.gif") {
          a.push("./img/1277998133605-dumpfm-frankhats-oie_firepush.gif")
     } else if (u === "http://payload2.cargocollective.com/1/5/171941/2344953/1279757188133-dumpfm-timb-candle.pillar.gif") {
          a.push("./img/1279757188133-dumpfm-timb-candle.pillar.gif")
     } else if (u === "http://dump.fm/images/20120106/1325907496595-dumpfm-FAUXreal-1310849410494-dumpfm-frankhats-bigdrunk.gif") {
          a.push("./img/1325907496595-dumpfm-FAUXreal-1310849410494-dumpfm-frankhats-bigdrunk.gif")
     } else if (u === "http://24.media.tumblr.com/tumblr_mcztzuboif1ryt2jqo1_500.gif") {
          a.push("./img/tumblr_mcztzuboif1ryt2jqo1_500.gif")
     } else if (u === "http://i.imgur.com/EEBBY.gif") {
          a.push("./img/EEBBY.gif")
     } else if (u.match(/^http:\/\/dump.fm\/images\//)) {
          a.push(i(u.replace(/^http:\/\/dump.fm\/images\//, "http://dumpfm.s3.amazonaws.com/images/")));
          a.push(i(u))
     } else {
          a.push(u);
          a.push(i(u))
     }
     o()
}).call(this);
(function() {
     var e;
     window.giveExample = function() {
          return e[Math.round(Math.random() * e.length)]
     };
     e = ["http://csh.bz/gifmelter/melt.html?http://dumpfm.s3.amazonaws.com/images/20111207/1323287821245-dumpfm-frankhats-noisia_photoblaster_cropped.gif", "http://csh.bz/gifmelter/melt.html?http://i.asdf.us/im/93/1323287172083dumpfmnoisiagbb1323286711419dumpfmfrankhatsblackorbbig_1323287580_1323287690.gif", "http://csh.bz/gifmelter/melt.html?http://dump.fm/images/20121230/1356915832539-dumpfm-frankhats-bigtop.gif", "http://csh.bz/gifmelter/melt.html?http://dumpfm.s3.amazonaws.com/images/20110827/1314425757490-dumpfm-frankhats-2775736iCWrKeG5-2.gif", "http://csh.bz/gifmelter/melt.html?http://jaxweather.net/lightning.gif", "http://csh.bz/gifmelter/melt.html?http://25.media.tumblr.com/tumblr_m484w0Oldp1qzw1qyo1_500.gif", "http://csh.bz/gifmelter/melt.html?http://dumpfm.s3.amazonaws.com/images/20110503/1304434913082-dumpfm-frankhats-hyperlick.gif", "http://csh.bz/gifmelter/melt.html?http://i.asdf.us/im/97/1951136dd0CXwKX_1358569099_frankhats.gif", "http://csh.bz/gifmelter/melt.html?http://dumpfm.s3.amazonaws.com/images/20110928/1317187088369-dumpfm-kiptok-3rdsphere1.gif", "http://csh.bz/gifmelter/melt.html?http://i.imgur.com/FE3v2.gif", "http://csh.bz/gifmelter/melt.html?http://i.imgur.com/0smmC.gif", "http://csh.bz/gifmelter/melt.html?http://i.asdf.us/im/6d/_1347913738_frankhats.gif", "http://csh.bz/gifmelter/melt.html?http://24.media.tumblr.com/tumblr_m45539rUKY1qhdg3no1_500.gif", "http://csh.bz/gifmelter/melt.html?http://i.imgur.com/XhOWP.gif", "http://csh.bz/gifmelter/melt.html?http://25.media.tumblr.com/5fe85359dab6be7165a265ccf1fd9f3a/tumblr_midw09L9fo1qhl6uko1_1280.gif", "http://csh.bz/gifmelter/melt.html?http://dumpfm.s3.amazonaws.com/images/20120130/1327945109066-dumpfm-kiptok-beautiful.gif", "http://csh.bz/gifmelter/melt.html?http://www.anthonyantonellis.com/images/paint_bucket.gif", "http://csh.bz/gifmelter/melt.html?http://dumpfm.s3.amazonaws.com/images/20100726/1280187644055-dumpfm-noisia-girlafraid-green-skeleton-walk-boring-broken.gif", "http://csh.bz/gifmelter/melt.html?http://csh.bz/tim/gif-test/img/test6.gif", "http://csh.bz/gifmelter/melt.html?http://25.media.tumblr.com/tumblr_m8g4rxpbBD1qb88ouo1_400.gif", "http://csh.bz/gifmelter/melt.html?http://i.asdf.us/im/79/1316658406055dumpfmkiptokhalfcone1_1316658609.gif", "http://csh.bz/gifmelter/melt.html?http://dump.fm/images/20130220/1361348849817-dumpfm-kiptok-vomit14.gif", "http://csh.bz/gifmelter/melt.html?http://www.shamozzle.com/Pulsar-01-june.gif", "http://csh.bz/gifmelter/melt.html?http://dumpfm.s3.amazonaws.com/images/20110119/1295415490232-dumpfm-noisia-boxwobble01.gif", "http://csh.bz/gifmelter/melt.html?http://dumpfm.s3.amazonaws.com/images/20101207/1291766203265-dumpfm-noisia-cymaptrnknk.gif", "http://csh.bz/gifmelter/melt.html?http://payload2.cargocollective.com/1/5/171941/2344953/1279757188133-dumpfm-timb-candle.pillar.gif", "http://csh.bz/gifmelter/melt.html?http://i.imgur.com/CivWZC2.gif", "http://csh.bz/gifmelter/melt.html?http://dumpfm.s3.amazonaws.com/images/20100623/1277346269091-dumpfm-frankhats-stonednightwolf.gif", "http://csh.bz/gifmelter/melt.html?http://dumpfm.s3.amazonaws.com/images/20100621/1277161424696-dumpfm-noisia-boring-sped-up-low_batt_vol3_dd_morph.gif", "http://csh.bz/gifmelter/melt.html?http://dumpfm.s3.amazonaws.com/images/20101218/1292722089123-dumpfm-noisia-6fsslowclockwisewipe1292364990326-dumpfm-frankhats-colorexploder.gif", "http://csh.bz/gifmelter/melt.html?http://dumpfm.s3.amazonaws.com/images/20121106/1352240436419-dumpfm-frankhats-again.gif", "http://csh.bz/gifmelter/melt.html?http://i.imgur.com/z0EhzDz.gif", "http://csh.bz/gifmelter/melt.html?http://24.media.tumblr.com/2798effa593c6b9d321fd10458bbb9e5/tumblr_mil79qhCIK1qhl6uko1_500.gif", "http://csh.bz/gifmelter/melt.html?http://dumpfm.s3.amazonaws.com/images/20120801/1343870887119-dumpfm-kiptok-techno2.gif", "http://csh.bz/gifmelter/melt.html?http://25.media.tumblr.com/67fcf023aa1efe3e2b0ca810c1deed55/tumblr_mgblj9qRaH1rnwo2vo1_400.gif", "http://csh.bz/gifmelter/melt.html?http://dumpfm.s3.amazonaws.com/images/20111120/1321840668844-dumpfm-kiptok-2.gif", "http://csh.bz/gifmelter/melt.html?http://24.media.tumblr.com/tumblr_l8juvcpeHr1qzu5wyo1_400.gif", "http://csh.bz/gifmelter/melt.html?http://dumpfm.s3.amazonaws.com/images/20101118/1290112628022-dumpfm-tommoody-noisia_grey_stretch.gif", "http://csh.bz/gifmelter/melt.html?http://24.media.tumblr.com/tumblr_mazbm1XB781rafseuo1_400.gif", "http://csh.bz/gifmelter/melt.html?http://24.media.tumblr.com/tumblr_l2jezaBLdH1qz7a0co1_500.gif", "http://csh.bz/gifmelter/melt.html?http://25.media.tumblr.com/tumblr_mcb0uym7O01qhdg3no1_500.gif", "http://csh.bz/gifmelter/melt.html?http://videogramo.8bitpeoples.com/imgx/ultrafall.gif", "http://csh.bz/gifmelter/melt.html?http://dumpfm.s3.amazonaws.com/images/20111217/1324102812748-dumpfm-FAUXreal-1282336474781-dumpfm-noisia-white-page-turn-top-left.gif", "http://csh.bz/gifmelter/melt.html?https://images.4chan.org/wsg/src/1361431676667.gif", "http://csh.bz/gifmelter/melt.html?http://dumpfm.s3.amazonaws.com/images/20120413/1334337431701-dumpfm-frankhats-mikrosopht_mug.gif", "http://csh.bz/gifmelter/melt.html?http://24.media.tumblr.com/2733afa5f1065998eddc5a4583253cdd/tumblr_mgusk30bjH1raffxgo1_500.gif", "http://csh.bz/gifmelter/melt.html?http://dumpfm.s3.amazonaws.com/images/20111210/1323559591833-dumpfm-kiptok-imdancing.gif", "http://csh.bz/gifmelter/melt.html?http://csh.bz/nsa/p/pin5c_10.gif", "http://csh.bz/gifmelter/melt.html?http://ret.netau.net/chat/icons/1305608184000-dumpfm-frankhats-cut-kevinexplosionlarge-1.gif", "http://csh.bz/gifmelter/melt.html?http://dump.fm/images/20130221/1361459313395-dumpfm-kiptok-att2.gif", "http://csh.bz/gifmelter/melt.html?http://dumpfm.s3.amazonaws.com/images/20100515/1273909397271-dumpfm-frankhats-BWCUBELOOPvproduc.gif", "http://csh.bz/gifmelter/melt.html?http://dumpfm.s3.amazonaws.com/images/20101007/1286475775568-dumpfm-noisia-hotdogs-150px-fixed.gif", "http://csh.bz/gifmelter/melt.html?http://24.media.tumblr.com/tumblr_m257knsFz91r39x51o1_500.gif", "http://csh.bz/gifmelter/melt.html?http://i.imgur.com/RRvGtg9.gif", "http://csh.bz/gifmelter/melt.html?http://dumpfm.s3.amazonaws.com/images/20100705/1278369809883-dumpfm-noisia-digipog-boring.gif"]
}).call(this)
