(function(b, d, q, l) {
     function g(c) {
          if (!q[c]) {
               if (!d[c]) {
                    if (b) return b(c);
                    throw Error("Cannot find module '" + c + "'");
               }
               var a = q[c] = {
                    exports: {}
               };
               d[c][0](function(a) {
                    var s = d[c][1][a];
                    return g(s ? s : a)
               }, a, a.exports)
          }
          return q[c].exports
     }
     for (var c = 0; c < l.length; c++) g(l[c]);
     return g
})("undefined" !== typeof require && require, {
     1: [function(b, d, q) {
          var l = b("../../benchmark"),
               g = b("../../tube"),
               c = b("../../bufferloader"),
               w = b("./decode"),
               a = b("./render-canvas"),
               h = function(a, c) {
                    var r = Object.create(h.proto);
                    r.buf = {};
                    r.tube = g();
                    r.benchmark = l();
                    a instanceof File ? r.src = a : "string" === typeof a && (r.src = a);
                    return r
               };
          h.proto = {};
          h.setupBuffers = function(a, h) {
               a.buf.cursor = 0;
               a.buf.abuf = h;
               a.buf.u8 = new Uint8Array(h);
               a.buf.dv = new DataView(h)
          };
          h.proto.on = function() {
               this.tube.on.apply(this.tube, arguments)
          };
          h.proto.off = function() {
               this.tube.off.apply(this.tube, arguments)
          };
          h.proto.load = function() {
               var a = this;
               a.loader = c(a.src, {
                    benchmark: a.benchmark
               });
               a.loader.on("load", function(c) {
                    h.setupBuffers(a, c);
                    a.loaded = !0;
                    a.tube("loaded")
               });
               a.loader.on("error",
                    function(h, c) {
                         a.tube("error", h, c)
                    });
               a.loader.load()
          };
          h.proto.decode = function() {
               if (!this.loaded) return this.on("loaded", this.decode.bind(this)), this.load(), this;
               this.extensions = [];
               this.frames = [];
               w(this)
          };
          h.proto.render = function() {
               if (!this.decoded) return this.on("decoded", this.render.bind(this)), this.decode(), this;
               a(this)
          };
          "undefined" !== typeof modules && (modules.exports = h);
          "undefined" !== typeof window && (window.GIF = h)
     }, {
          "../../benchmark": 2,
          "../../tube": 3,
          "../../bufferloader": 4,
          "./decode": 5,
          "./render-canvas": 6
     }],
     2: [function(b, d, q) {
          var l = function() {
               var g = Object.create(l.proto);
               g.total = 0;
               return g
          };
          l.proto = {};
          l.proto.start = function(g) {
               this[g + "_start_timestamp"] = Date.now()
          };
          l.proto.stop = function(g) {
               if (this[g + "_start_timestamp"]) {
                    var c = Date.now() - this[g + "_start_timestamp"];
                    delete this[g + "_start_timestamp"];
                    this[g] = c + (this[g] || 0);
                    this.total += c
               }
          };
          d.exports = l
     }, {}],
     3: [function(b, d, q) {
          var l = b("./object/setproto"),
               g = b("./string/tokenize"),
               c = b("./string/globber"),
               w = b("./uid"),
               a = b("./nexttick"),
               h = {},
               s = function(h) {
                    h = h || {};
                    var c = h.queue ? function() {
                         var p = arguments;
                         a(function() {
                              c.send.apply(c, p)
                         });
                         return c
                    } : function() {
                         c.send.apply(c, arguments);
                         return c
                    };
                    l(c, s.proto);
                    c.listeners = {};
                    c.globListeners = {};
                    return c
               };
          s.total = {};
          s.proto = {};
          s.proto.on = function(a, c, p) {
               "string" === typeof a ? (p = {}, p[a] = c) : p = a;
               for (var n in p) {
                    a = n.split(" ");
                    c = p[n];
                    Array.isArray(c) || (c = [c]);
                    for (var m = 0, f; f = c[m]; m++) f.uid || (f.uid = w());
                    for (m = 0; f = a[m]; m++) {
                         var e = -1 === f.indexOf("*") ? this.listeners : this.globListeners;
                         e[f] = f in e ? e[f].concat(c) : c.concat()
                    }
               }
               return this
          };
          s.proto.off = function() {
               var a, c, p, n;
               if (0 === arguments.length) return this.listeners = {}, this.globListeners = {}, this;
               if (1 === arguments.length && "string" === typeof arguments[0]) {
                    p = arguments[0].split(" ");
                    for (c = 0; n = p[c]; c++) delete this.listeners[n], delete this.globListeners[n];
                    return this
               }
               if ("function" === typeof arguments[0] || Array.isArray(arguments[0])) {
                    var m = "function" === typeof arguments[0] ? [arguments[0]] : arguments[0];
                    return this
               }
               if (1 < arguments.length) {
                    var f = {};
                    f[arguments[0]] = arguments[1]
               } else f = arguments[0];
               for (var e in f)
                    for (p = e.split(" "), m = f[e], "function" === typeof m && (m = [m]), c = 0; n = p[c]; c++) {
                         if (n in this.listeners) a = this.listeners;
                         else if (n in this.globListeners) a = this.globListeners;
                         else continue;
                         a[n] = a[n].filter(function(n) {
                              return -1 === m.indexOf(n)
                         })
                    }
               return this
          };
          s.proto.send = function(a) {
               s.total[a] || (s.total[a] = 0);
               s.total[a] += 1;
               var l, p = this.listeners,
                    n = this.globListeners,
                    m = g(a),
                    f, e;
               if (arguments.length) {
                    var b = Array.prototype.splice.call(arguments, 1);
                    b.push(a)
               } else b = [];
               for (var w = 0; f = m[w]; w++) {
                    var d = {};
                    if (l = p[f])
                         for (var k = 0; e = l[k]; k++) d[e.uid] = e;
                    f = f.split(":");
                    for (var v in n) {
                         if ("*" !== v && (k = h[v] || (h[v] = v.split(":")), !c(k, f))) continue;
                         l = n[v];
                         for (k = 0; e = l[k]; k++) d[e.uid] = e
                    }
                    l = [];
                    for (e in d) l.push(d[e]);
                    for (k = 0; e = l[k]; k++) e.apply(e, b)
               }
               return this
          };
          d.exports = s
     }, {
          "./object/setproto": 7,
          "./string/tokenize": 8,
          "./string/globber": 9,
          "./uid": 10,
          "./nexttick": 11
     }],
     7: [function(b, d, q) {
          d.exports = function(l, g) {
               if (l.__proto__) l.__proto__ = g;
               else
                    for (var c in g) l[c] = g[c]
          }
     }, {}],
     8: [function(b, d, q) {
          var l = function(g, c) {
               return g.trim().split(c ||
                    l["default"])
          };
          l["default"] = /\s+/g;
          d.exports = l
     }, {}],
     9: [function(b, d, q) {
          var l = function(g, c) {
               var b = g[0],
                    a = g.slice(1),
                    h = c.length;
               if ("*" === b) {
                    for (b = 0; b <= h; ++b)
                         if (l(a, c.slice(b))) return !0;
                    return !1
               }
               return b === c[0] && (!a.length && !h || l(a, c.slice(1)))
          };
          d.exports = l
     }, {}],
     10: [function(b, d, q) {
          var l = function() {
               return l.counter++ + ""
          };
          l.counter = 1;
          d.exports = l
     }, {}],
     11: [function(b, d, q) {
          if (window.ActiveXObject || !window.postMessage) b = function(l) {
               setTimeout(l, 0)
          };
          else {
               var l = [];
               window.addEventListener("message", function(b) {
                    b.source ==
                         window && "next-tick-zero-timeout" == b.data && (b.stopPropagation && b.stopPropagation(), l.length && l.shift()())
               }, !0);
               b = function(b) {
                    l.push(b);
                    window.postMessage("next-tick-zero-timeout", "*")
               }
          }
          d.exports = b
     }, {}],
     4: [function(b, d, q) {
          b("./benchmark");
          var l = b("./object/setproto");
          q = b("./object/extend");
          var g = b("./tube"),
               c = function(b, a) {
                    var h = g();
                    l(h, c.proto);
                    a && a.benchmark && (h.benchmark = a.benchmark);
                    h.src = b;
                    return h
               };
          c.proto = {};
          q(c.proto, g.proto);
          c.proto.load = function() {
               var c = this.src;
               "string" === typeof c ? this.loadFromUrl(c) :
                    c instanceof File ? this.loadFromFile(c) : c instanceof ArrayBuffer && this("load", c)
          };
          c.proto.loadFromFile = function(c) {
               var a = this,
                    h = new FileReader;
               h.addEventListener("load", function(c) {
                    a.benchmark && a.benchmark.stop("fetch-from-disk");
                    a("load", h.result, c)
               });
               h.addEventListener("error", function(c) {
                    a("error", c, h)
               });
               h.addEventListener("progress", function(c) {
                    a("progress", c)
               });
               a.benchmark && a.benchmark.start("fetch-from-disk");
               h.readAsArrayBuffer(c)
          };
          c.proto.loadFromUrl = function(c) {
               var a = this,
                    h = new XMLHttpRequest;
               h.open("GET", c);
               h.responseType = "arraybuffer";
               h.addEventListener("load", function(c) {
                    a.benchmark && a.benchmark.stop("fetch-from-network");
                    a("load", h.response, c)
               });
               h.addEventListener("error", function(c) {
                    a("error", c, h)
               });
               h.addEventListener("progress", function(c) {
                    a("progress", c)
               });
               a.benchmark && a.benchmark.start("fetch-from-network");
               h.send()
          };
          d.exports = c
     }, {
          "./benchmark": 2,
          "./object/setproto": 7,
          "./object/extend": 12,
          "./tube": 3
     }],
     12: [function(b, d, q) {
               d.exports = function(b, g) {
                    for (var c in g) b[c] = g[c];
                    return b
               }
          },
          {}
     ],
     5: [function(b, d, q) {
          (function() {
               var l = b("./spec").blockSigs,
                    g = b("./spec").extSigs,
                    c = b("./palette"),
                    w = b("./animate").makeCurrentFrame,
                    a = b("../../binaryspec"),
                    h = b("./spec").spec,
                    s = a(h),
                    t = {
                         globalPalette: function(n) {
                              var m = n.buf,
                                   a = 3 * n.paletteSize;
                              if (m.abuf.byteLength < m.cursor + a) n.waitingForFileBuffer = !0;
                              else return n.palette = c.binary2rgba(new Uint8Array(m.abuf, m.cursor, a)), m.cursor += a, "dataBlock"
                         },
                         localPalette: function(n) {
                              var m = n.buf,
                                   a = 3 * n.frames[n.frames.length - 1].paletteSize;
                              if (m.abuf.byteLength <
                                   m.cursor + a) n.waitingForFileBuffer = !0;
                              else return n.frames[n.frames.length - 1].palette = c.binary2rgba(new Uint8Array(m.abuf, m.cursor, a)), m.cursor += a, "imageData"
                         },
                         dataBlock: function(n) {
                              var a = n.buf;
                              if (a.abuf.byteLength < a.cursor + 1) n.waitingForFileBuffer = !0;
                              else {
                                   var c = "unknown",
                                        e = "unknown",
                                        e = a.u8[a.cursor];
                                   e in l && (c = l[e]);
                                   if ("extension" === c) {
                                        if (a.abuf.byteLength < a.cursor + 2) {
                                             n.waitingForFileBuffer = !0;
                                             return
                                        }
                                        n = a.u8[a.cursor + 1];
                                        n = n in g ? e = g[n] : "done"
                                   } else "unknown" === c && (c = "dataBlock", a.cursor += 1), n = c;
                                   return n
                              }
                         },
                         trailer: function(n) {
                              return "done"
                         }
                    },
                    r = {
                         header: function(n, a) {
                              return "GIF" != a.signature ? (n.tube("error", "file doesn't seem to be a gif (file signature: '" + a.signature + "')"), "error") : "screenDesc"
                         },
                         screenDesc: function(n, a) {
                              for (var c in a) n[c] = a[c];
                              n.paletteSize = (n.paletteSize[0] << 2) + (n.paletteSize[1] << 1) + n.paletteSize[2];
                              n.paletteSize = Math.pow(2, n.paletteSize + 1);
                              return n.paletteExists ? "globalPalette" : "dataBlock"
                         },
                         imageDesc: function(a, c) {
                              (!a.frames.length || "w" in a.frames[a.frames.length - 1]) && a.frames.push({});
                              var f = a.frames[a.frames.length - 1],
                                   e;
                              for (e in c) f[e] = c[e];
                              f.paletteSize = (f.paletteSize[0] << 2) + (f.paletteSize[1] << 1) + f.paletteSize[2];
                              f.paletteSize = Math.pow(2, f.paletteSize + 1);
                              return f.paletteExists ? "localPalette" : "imageData"
                         },
                         applicationExtension: function(a, c) {
                              var f = p(a);
                              if (!1 === f) a.waitingForFileBuffer = !0, a.buf.cursor -= s.parts.applicationExtension.byteSize;
                              else {
                                   var f = {
                                             data: f
                                        },
                                        e;
                                   for (e in c) f[e] = c[e];
                                   a.extensions.push(f);
                                   return "dataBlock"
                              }
                         },
                         comment: function(a, c) {
                              var f = p(a);
                              if (!1 === f) a.waitingForFileBuffer = !0, a.buf.cursor -= s.parts.comment.byteSize;
                              else {
                                   var f = {
                                             comment: f
                                        },
                                        e;
                                   for (e in c) f[e] = c[e];
                                   a.extensions.push(f);
                                   return "dataBlock"
                              }
                         },
                         plainText: function(a, c) {
                              var f = p(a);
                              if (!1 === f) a.waitingForFileBuffer = !0, a.buf.cursor -= s.parts.plainText.byteSize;
                              else {
                                   var f = {
                                             plainText: f
                                        },
                                        e;
                                   for (e in c) f[e] = c[e];
                                   a.extensions.push(f);
                                   return "dataBlock"
                              }
                         },
                         graphicControl: function(a, c) {
                              a.frames.push({
                                   delay: c.delay,
                                   transparentIndex: c.transparentColor ? c.transparentIndex : -1,
                                   disposalMethod: (c.disposalMethod[0] << 2) + (c.disposalMethod[1] <<
                                        1) + c.disposalMethod[2]
                              });
                              return "dataBlock"
                         },
                         imageData: function(a, c) {
                              var f = p(a);
                              if (!1 === f) a.waitingForFileBuffer = !0, a.buf.cursor -= s.parts.imageData.byteSize, console.log("fucked");
                              else {
                                   var e = a.frames[a.frames.length - 1];
                                   e.lzwCodeSize = c.lzwCodeSize;
                                   e.blockinfo = f;
                                   return "dataBlock"
                              }
                         }
                    },
                    p = function(a) {
                         a.benchmark && a.benchmark.start("read-subblocks");
                         for (var c = [], f = a.buf, e = f.u8, p = e.byteLength, h = f.cursor, b = f.cursor, h = h + 1, k = 0, l = !1, g = 0; !l;) {
                              if (p < b + 1) {
                                   l = !0;
                                   break
                              }
                              k = e[b];
                              b += 1;
                              if (0 === k) {
                                   g += 1;
                                   break
                              }
                              if (p < b + k) {
                                   l = !0;
                                   break
                              }
                              c.push(b + k);
                              b += k;
                              g += k + 1
                         }
                         if (l) return console.log("out of data"), !1;
                         f.cursor += g;
                         a.benchmark && a.benchmark.stop("read-subblocks");
                         return {
                              start: h,
                              blockEnds: c
                         }
                    };
               d.exports = function(a, p) {
                    a: {
                         var f;f = "header";
                         for (var e = a.buf;
                              "done" !== f && "error" !== f;)
                              if (f in t && "function" === typeof t[f]) f = t[f](a);
                              else if (e.abuf.byteLength < s.parts[f].byteSize + e.cursor) {
                              a.waitingForFileBuffer = !0;
                              break a
                         } else {
                              var h = s.decodeBinaryFieldsToJSON(f, e.cursor, e);
                              e.cursor += s.parts[f].byteSize;
                              f = r[f](a, h)
                         }
                         "done" === f && (a.benchmark &&
                              a.benchmark.start("palette"), a.paletteTotal = c.create(a), a.benchmark && a.benchmark.stop("palette"), w.bind(a)(), a.decoded = !0, a.tube("decoded"))
                    }
               }
          })()
     }, {
          "./spec": 13,
          "./palette": 14,
          "./animate": 15,
          "../../binaryspec": 16
     }],
     13: [function(b, d, q) {
          q.blockSigs = {
               33: "extension",
               44: "imageDesc",
               59: "trailer"
          };
          q.extSigs = {
               249: "graphicControl",
               254: "comment",
               1: "plainText",
               255: "applicationExtension"
          };
          q.spec = {
               header: ["str[3] signature", "str[3] version"],
               screenDesc: "u16    w;u16    h;bit    paletteExists;bit[3] resolution ignore;bit    sortFlag ignore;bit[3] paletteSize;u8     bgColorIndex;u8     aspectRatio ignore".split(";"),
               imageDesc: "u8     sig ignore;u16    x;u16    y;u16    w;u16    h;bit    paletteExists;bit    interlaced;bit    sortFlag;bit[2] reserved ignore;bit[3] paletteSize".split(";"),
               applicationExtension: ["u8     sig ignore", "u8     extSig ignore", "u8     blockSize ignore", "str[8] identifier", "str[3] authCode ignore"],
               graphicControl: "u8     sig ignore;u8     extSig ignore;u8     blockSize ignore;bit[3] reserved ignore;bit[3] disposalMethod;bit    userInput ignore;bit    transparentColor;u16    delay;u8     transparentIndex;u8     blockTerminator ignore".split(";"),
               comment: ["u8     sig ignore", "u8     extSig ignore"],
               plainText: "u8    sig ignore;u8    extSig ignore;u8    blockSize;u16   textGridLeft;u16   textGridTop;u16   textGridWidth;u16   textGridHeight;u8    charCellWidth;u8    charCellHeight;u8    fgColorIndex;u8    bgColorIndex".split(";"),
               imageData: ["u8     lzwCodeSize"]
          }
     }, {}],
     14: [function(b, d, q) {
          (function() {
               var l = b("../../color/rgba2css");
               b("../../create/2d");
               var g = b("../../create/imagedata");
               d.exports = {
                    binary2rgba: function(c) {
                         for (var b = new Uint8Array(c.byteLength /
                                   3 * 4), a = 0, h = 0, l = c.byteLength / 3 * 4; h < l; h += 4) b[h] = c[a], b[h + 1] = c[a + 1], b[h + 2] = c[a + 2], b[h + 3] = 255, a += 3;
                         return b
                    },
                    create: function(c) {
                         var b = {
                                   0: 0
                              },
                              a = ["rgba(0,0,0,0)"],
                              h = [
                                   [0, 0, 0, 0]
                              ],
                              d = function(c) {
                                   for (var p = 0, f = c.length; p < f; p += 4) {
                                        var e = c[p + 3];
                                        if (0 !== e) {
                                             var g = c[p],
                                                  d = c[p + 1],
                                                  r = c[p + 2],
                                                  k = (g | d << 8 | r << 16 | e << 24).toString();
                                             k in b || (b[k] = h.length, e = [g, d, r, e], h.push(e), a.push(l(e)))
                                        }
                                   }
                              };
                         "palette" in c && d(c.palette);
                         for (var t = 0; t < c.frames.length; t++) {
                              var r = c.frames[t];
                              "palette" in r && d(r.palette)
                         }
                         c = g(h.length, 1);
                         d = 0;
                         t = 4 * h.length;
                         for (r = c.data; d < t; d += 4) {
                              var p = h[d / 4];
                              r[d] = p[0];
                              r[d + 1] = p[1];
                              r[d + 2] = p[2];
                              r[d + 3] = p[3]
                         }
                         return {
                              rgba2Index: b,
                              index2Rgba: h,
                              index2Css: a,
                              imagedata: c,
                              length: h.length
                         }
                    }
               }
          })()
     }, {
          "../../color/rgba2css": 17,
          "../../create/2d": 18,
          "../../create/imagedata": 19
     }],
     17: [function(b, d, q) {
          d.exports = function(b) {
               return "rgba(" + b[0] + "," + b[1] + "," + b[2] + "," + b[3] + ")"
          }
     }, {}],
     18: [function(b, d, q) {
          b = function(b, g) {
               var c = document.createElement("canvas");
               c.width = b || 0;
               c.height = g || 0;
               return c.getContext("2d")
          };
          "undefined" !== typeof d && (d.exports =
               b)
     }, {}],
     19: [function(b, d, q) {
          b = function g(c, b) {
               return g.ctx.createImageData(c, b)
          };
          b.ctx = document.createElement("canvas").getContext("2d");
          "undefined" !== typeof d && (d.exports = b)
     }, {}],
     15: [function(b, d, q) {
          var l = function(b) {
               var c = b[b.length - 1];
               return function(l) {
                    l = (l || Date.now()) % c;
                    for (var a = 0; a < b.length && !(l < b[a]); a++);
                    return a
               }
          };
          q.makeCurrentFrame = function() {
               1 === this.frames.length && (this.currentFrame = function() {
                    return 0
               });
               for (var b = 0, c = [], d = 0; d < this.frames.length; d++) {
                    var a = this.frames[d],
                         b = b + ("delay" in
                              a && 0 < a.delay ? 10 * a.delay : 100);
                    c.push(b)
               }
               this.currentFrame = l(c)
          }
     }, {}],
     16: [function(b, d, q) {
          var l = b("./string/tokenize"),
               g = b("../deps/bitview/bitview.timb.js"),
               c = function(b) {
                    var a = Object.create(c.proto),
                         h = a.parts = {},
                         d;
                    for (d in b) {
                         for (var g = h, r = d, p = b[d], n = {
                                   bit: 1,
                                   str: 8,
                                   i8: 8,
                                   u8: 8,
                                   i16: 16,
                                   u16: 16,
                                   i32: 32,
                                   u32: 32
                              }, m = {
                                   fields: []
                              }, f = 0, e = 0; e < p.length; e++) {
                              var y = l(p[e]),
                                   B = /(^|\s)ignore($|\s)/.test(p[e]),
                                   q = y[0].split("["),
                                   k = q[0],
                                   v = parseInt(q[1] || 1),
                                   v = n[k] * v;
                              m.fields.push({
                                   name: y[1],
                                   type: k,
                                   ignore: B,
                                   bitSize: v,
                                   isArray: 1 <
                                        q.length
                              });
                              f += v
                         }
                         m.bitSize = f;
                         m.byteSize = f / 8;
                         g[r] = m
                    }
                    return a
               };
          c.proto = {};
          c.proto.decodeBinaryFieldsToJSON = function(c, a, b) {
               for (var l = this.parts[c], d = {}, r = l.fields.length, p = 0, n = 0; n < r; n++) {
                    var m = l.fields[n];
                    if (!m.ignore) {
                         var f = p % 8,
                              e = Math.floor((p - f) / 8);
                         Math.ceil(m.bitSize / 8);
                         switch (m.type) {
                              case "u8":
                                   d[m.name] = b.u8[a + e];
                                   break;
                              case "i8":
                                   d[m.name] = b.dv.getInt8(a + e);
                                   break;
                              case "u16":
                                   d[m.name] = b.dv.getUint16(a + e, !0);
                                   break;
                              case "i16":
                                   d[m.name] = b.dv.getInt16(a + e, !0);
                                   break;
                              case "u32":
                                   d[m.name] = b.dv.getUint32(a +
                                        e, !0);
                                   break;
                              case "i32":
                                   d[m.name] = b.dv.getInt32(a + e, !0);
                                   break;
                              case "str":
                                   d[m.name] = String.fromCharCode.apply(null, new Uint8Array(b.abuf, a + e, m.bitSize >> 3));
                                   break;
                              case "bit":
                                   if (m.isArray) {
                                        for (var e = new g(b.abuf, a + e), y = [], B = f; B < f + m.bitSize; B++) y.push(e.getBit(B));
                                        d[m.name] = y
                                   } else d[m.name] = (new g(b.abuf, a + e)).getBit(f);
                                   break;
                              default:
                                   console.log("please implement: " + m.type + ", " + c)
                         }
                    }
                    p += m.bitSize
               }
               return d
          };
          d.exports = c
     }, {
          "./string/tokenize": 8,
          "../deps/bitview/bitview.timb.js": 20
     }],
     20: [function(b, d, q) {
          b = function(b,
               d) {
               this.buffer = b;
               this.u8 = new Uint8Array(b, d)
          };
          b.prototype.getBit = function(b) {
               return this.u8[b >> 3] >> 7 - (b & 7) & 1
          };
          d.exports = b
     }, {}],
     6: [function(b, d, q) {
          var l = b("../../create/2d"),
               g = b("../../create/imagedata"),
               c = b("../../nexttick"),
               w = b("./decode-lzw"),
               a = function(b, n) {
                    n = n || {};
                    var m = b.benchmark || !1,
                         f = n.frameNum || 0;
                    if (0 === f)
                         for (var e = 0; e < b.frames.length; e++) b.frames[e].ctx = l(b.w, b.h), b.buf.pixeldata = new Uint8Array(b.w * b.h);
                    if (f >= b.frames.length) b.rendered = !0, b.tube("rendered");
                    else {
                         var d = b.frames[f],
                              e = b.buf.pixeldata;
                         m && m.start("decompress-lzw");
                         w(d.blockinfo, b.buf.u8, d.lzwCodeSize, d.w, d.h, e);
                         m && m.stop("decompress-lzw");
                         if (d.interlaced) {
                              m && m.start("deinterlace");
                              for (var g = d.w, d = d.h, r = new Uint8Array(e.length), k = Math.ceil(d / 8), q = Math.ceil(d / 4), x = Math.ceil(d / 2), u = 0; u < d; u++) {
                                   var A, D = g * u;
                                   A = 0 === u % 8 ? u / 8 * g : 0 === (u + 4) % 8 ? g * ((u - 4) / 8 + k) : 0 === u % 2 ? g * ((u - 2) / 4 + q) : g * ((u - 1) / 2 + x);
                                   for (var C = 0; C < g; C++) r[D + C] = e[A + C]
                              }
                              e = r;
                              m && m.stop("deinterlace")
                         }
                         m && m.start("pixeldata-to-canvas");
                         g = b.frames[f];
                         d = g.ctx;
                         if (0 === f) d.putImageData(t(e, b, g),
                              g.x, g.y, 0, 0, g.w, g.h);
                         else {
                              r = f - 1;
                              k = b.frames[r];
                              q = k.ctx.canvas;
                              if (0 === k.disposalMethod || 1 === k.disposalMethod) x = h(b, f, e), d.drawImage(q, 0, 0), d.drawImage(x.canvas, 0, 0, g.w, g.h, g.x, g.y, g.w, g.h);
                              2 === k.disposalMethod && (0 === k.x && 0 === k.y && k.w === b.w && k.h === b.h ? d.putImageData(s(b, f, e), g.x, g.y, 0, 0, g.w, g.h) : (0 < k.y && d.drawImage(q, 0, 0, b.w, k.y, 0, 0, b.w, k.y), 0 < k.x && d.drawImage(q, 0, k.y, k.x, k.h, 0, k.y, k.x, k.h), k.x + k.w < b.w && d.drawImage(q, k.x + k.w, k.y, b.w - k.x - k.w, k.h, k.x + k.w, k.y, b.w - k.x - k.w, k.h), k.y + k.h < b.h && d.drawImage(q,
                                   0, k.y + k.h, b.w, b.h - k.y - k.h, 0, k.y + k.h, b.w, b.h - k.y - k.h), x = h(b, f, e), d.drawImage(x.canvas, 0, 0, g.w, g.h, g.x, g.y, g.w, g.h)));
                              if (3 === k.disposalMethod) {
                                   for (; 0 < r && 3 === b.frames[r].disposalMethod;) r -= 1;
                                   k = b.frames[r];
                                   3 != k.disposalMethod && d.drawImage(k.ctx.canvas, 0, 0);
                                   x = h(b, f, e);
                                   d.drawImage(x.canvas, 0, 0, g.w, g.h, g.x, g.y, g.w, g.h)
                              }
                         }
                         m && m.stop("pixeldata-to-canvas");
                         m = a.bind(void 0, b, {
                              frameNum: f + 1
                         });
                         c(m)
                    }
               },
               h = function(a, b, c) {
                    var d = h.ctx && h.ctx.canvas.width === a.w && h.ctx.canvas.height === a.h ? h.ctx : h.ctx = l(a.w, a.h);
                    b = a.frames[b];
                    c = c || b.pixelData;
                    var e = "palette" in b ? b.palette : a.palette,
                         g = "transparentIndex" in b ? b.transparentIndex : -1; - 1 < g && (e[4 * g + 3] = 0);
                    a = r(a, e, c, b.w, b.h, g);
                    d.putImageData(a, 0, 0, 0, 0, b.w, b.h);
                    return d
               },
               s = function(a, b, c) {
                    b = a.frames[b];
                    c = c || b.pixelData;
                    var d = "palette" in b ? b.palette : a.palette,
                         e = "transparentIndex" in b ? b.transparentIndex : -1; - 1 < e && (d[4 * e + 3] = 0);
                    return r(a, d, c, b.w, b.h, e)
               },
               t = function(a, b, c) {
                    var d = "palette" in c ? c.palette : b.palette,
                         e = "transparentIndex" in c ? c.transparentIndex : -1; - 1 < e && (d[4 * e + 3] = 0);
                    return r(b,
                         d, a, c.w, c.h, e)
               },
               r = function(a, b, c, d, e, h) {
                    h = r.imagedata && r.imagedata.width === a.w && r.imagedata.height === a.h ? r.imagedata : r.imagedata = g(a.w, a.h);
                    for (var l = h.data, q = 0, k = 0; k < e; k++)
                         for (var s = k * a.w, t = 0; t < d; t++) {
                              var u = 4 * (t + s),
                                   w = 4 * c[q];
                              l[u] = b[w];
                              l[u + 1] = b[w + 1];
                              l[u + 2] = b[w + 2];
                              l[u + 3] = b[w + 3];
                              q += 1
                         }
                    return h
               };
          d.exports = a
     }, {
          "../../create/2d": 18,
          "../../create/imagedata": 19,
          "../../nexttick": 11,
          "./decode-lzw": 21
     }],
     21: [function(b, d, q) {
          d.exports = function(b, d, c, q, a, h, s) {
               q *= a;
               var t, r = 0,
                    p = 0,
                    n = 0;
               h = h || new Uint8Array(q);
               var m =
                    new Uint16Array(8192),
                    f = new Uint8Array(4096),
                    e = new Uint8Array(4097),
                    y = 1 << c,
                    B = y + 1,
                    z = y + 2;
               t = -1;
               var k = c + 1,
                    v = (1 << k) - 1;
               for (a = 0; a < y; a++) m[a] = 0, f[a] = a;
               for (var x = 0, u = 0, A = b.start, D = b.blockEnds, C = D.shift(), E = 0; E < q;) {
                    if (0 === p) {
                         if (x < k) {
                              u += d[A] << x;
                              x += 8;
                              A++;
                              A === C && (A += 1, C = D.shift());
                              continue
                         }
                         a = u & v;
                         u >>= k;
                         x -= k;
                         a > z && console.log(":(");
                         if (a === B) {
                              console.log("fuck");
                              break
                         }
                         if (a === y) {
                              k = c + 1;
                              v = (1 << k) - 1;
                              z = y + 2;
                              t = -1;
                              continue
                         }
                         if (-1 === t) {
                              e[p++] = f[a];
                              r = t = a;
                              continue
                         }
                         b = a;
                         a === z && (e[p++] = r, a = t);
                         for (; a > y;) e[p++] = f[a], a = m[a];
                         r = f[a];
                         e[p++] = r;
                         m[z] = t;
                         f[z] = r;
                         z++;
                         0 === (z & v) && 4096 > z && (k++, v += z);
                         t = b
                    }
                    p--;
                    s ? h[n++] = s[e[p]] : h[n++] = e[p];
                    E++
               }
               return h
          }
     }, {}]
}, {}, [1]);
