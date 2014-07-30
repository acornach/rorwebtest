(function(a) {
    a.fn.scrollingCarousel = function(u, q) {
        if (1 < this.length) {
            var v = [];
            this.each(function(b) {
                v.push(a(this).scrollingCarousel(u, b))
            });
            return v
        }
        var b = a.extend({}, a().scrollingCarousel.defaults, u),
            r, l;
        this.Destroy = function() {
            var b = this;
            a(b).removeData("scrollingCarousel");
            b.children(":eq(1)").remove();
            0 < a(this).find("> div").length ? (b[0].innerHTML = a(this).find("> div")[0].innerHTML, b.children().each(function() {
                a(this, b)[0].style.cssText = ""
            })) : b.find("li").each(function() {
                a(this, b)[0].style.cssText = ""
            });
            b.children()[0].style.cssText = "";
            b[0].style.cssText = "";
            b.unbind()
        };
        this.Update = function(l) {
            b = null;
            b = a.extend({}, a().scrollingCarousel.defaults, l);
            this.Destroy(!0);
            return this.Create()
        };
        this.Create = function(q, o) {
            if (!a(this).html()) return !1;
            var d = this;
            d.html();
            if (!0 == a(d).data("scrollingCarousel") && "pause" != o) return this;
            null != b.beforeCreateFunction && a.isFunction(b.beforeCreateFunction) && b.beforeCreateFunction(d, b);
            var f, h = 0,
                c, p, m, i, n, j = {},
                e = d[0];
            e.style.paddingLeft = "0";
            e.style.paddingRight = "0";
            var k = e.offsetWidth;
            switch (d.children()[0].nodeName.toLowerCase()) {
                case "div":
                    o || (e.innerHTML = "<div>" + d[0].innerHTML + "</div>", e.innerHTML += e.innerHTML);
                    f = d.children("div");
                    m = d.children("div:first").children("div");
                    break;
                case "ul":
                    o || (e.innerHTML += e.innerHTML);
                    f = d.find("ul");
                    m = d.find("ul:first > li");
                    break;
                case "ol":
                    o || (e.innerHTML += e.innerHTML);
                    f = d.find("ol");
                    m = d.find("ol:first > li");
                    break;
                default:
                    return console.log("unable to initialise scroller - please ensure contents are either in a UL, an OL or in DIVs"), !1
            }
            switch (b.scrollSpeed.toLowerCase()) {
                case "slow":
                    p = 3;
                    break;
                case "fast":
                    p = 4;
                    break;
                default:
                    p = 0
            }
            var g = 0,
                t = 0,
                s = 0;
            switch (b.scrollerAlignment.toLowerCase()) {
                case "vertical":
                    a(m).each(function() {
                        g += a(this, d).outerHeight(!0);
                        a(this, d)[0].offsetWidth > s && (s = a(this, d)[0].offsetWidth)
                    });
                    break;
                default:
                    a(m).each(function() {
                        g += a(this, d).outerWidth(!0);
                        a(this, d)[0].offsetHeight > t && (t = a(this, d)[0].offsetHeight)
                    })
            }
            if (!o) {
                "vertical" != b.scrollerAlignment.toLowerCase() ? e.style.height = t + "px" : (e.style.width = s + "px", e.style.height = 0 < a(e).height() ? a(e).height() + "px" : a(e).parent().height() + "px", k = e.offsetHeight);
                if (g > k) m = Math.round(g / 100 * b.scrollerOffset) - Math.round(k / 2), m > g - k && (m = g - k);
                else return a(f[1]).remove(), !1;
                e.style.overflow = "hidden";
                e.style.position = "relative";
                f.each(function() {
                    a(this, d)[0].style.position = "absolute";
                    if (b.scrollerAlignment.toLowerCase() != "vertical") {
                        a(this, d)[0].style.top = "0";
                        a(this, d)[0].style.width = g + "px"
                    } else {
                        a(this, d)[0].style.left = "0";
                        a(this, d)[0].style.height = g + "px";
                        a(this, d)[0].style.width = s + "px"
                    }
                    a(this).children().each(function() {
                        if (b.scrollerAlignment.toLowerCase() != "vertical") a(this, d)[0].style.cssFloat = "left";
                        a(this, d)[0].style.position = "static"
                    })
                });
                "vertical" != b.scrollerAlignment.toLowerCase() ? (f[0].style.left = 0 < m ? "-" + m + "px" : "0", !0 == b.looped ? f[1].style.left = f[0].offsetLeft - g + "px" : (f[1].style.display = "none", f[1].style.top = "-1000px")) : (f[0].style.top = 0 < m ? "-" + m + "px" : "0", !0 == b.looped ? f[1].style.top = f[0].offsetTop - g + "px" : (f[1].style.display = "none", f[1].style.left = "-1000px"));
                d.mouseenter(function() {
                    j.startCarousel()
                });
                d.mouseleave(function() {
                    j.stopCarousel(true);
                    b.autoScroll == true && j.autoScroll()
                });
                d.mousemove(function(b) {
                    var c = {
                        x: 0,
                        y: 0
                    };
                    if (b.pageX || b.pageY) {
                        c.x = b.pageX;
                        c.y = b.pageY
                    } else {
                        var a = document.documentElement,
                            d = document.body;
                        c.x = b.clientX + ((a.scrollLeft || d.scrollLeft) - (a.clientLeft || 0));
                        c.y = b.clientY + ((a.scrollTop || d.scrollTop) - (a.clientTop || 0))
                    }
                    cursorPosition = c
                })
            }
            j.autoScroll = function() {
                var a = 40;
                !1 != b.looped && (l && (clearInterval(l), l = 0), c = c ? c : "vertical" != b.scrollerAlignment.toLowerCase() ? parseInt(f[0].style.left) : parseInt(f[0].style.top), b.autoScrollSpeed = 1E3 > b.autoScrollSpeed ? 1E3 : b.autoScrollSpeed, b.autoScrollSpeed / a < k ? i = Math.round(k / (b.autoScrollSpeed / a)) : (i = 1, a = Math.round(b.autoScrollSpeed / k)), l = setInterval(function() {
                    switch (b.autoScrollDirection.toLowerCase()) {
                        case "right":
                        case "down":
                            if (c + i > g) {
                                c = 0;
                                h = h == 0 ? 1 : 0
                            } else c = c + i;
                            break;
                        default:
                            if (c - i < 0 - (g - k)) {
                                c = k;
                                h = h == 0 ? 1 : 0
                            } else c = c - i
                    }
                    if (b.scrollerAlignment.toLowerCase() != "vertical") {
                        f[h].style.left = c + "px";
                        f[h == 0 ? 1 : 0].style.left = c - g + "px"
                    } else {
                        f[h].style.top = c + "px";
                        f[h == 0 ? 1 : 0].style.top = c - g + "px"
                    }
                }, a))
            };
            j.startCarousel = function() {
                l && (clearInterval(l), l = 0);
                n = "vertical" != b.scrollerAlignment.toLowerCase() ? Math.round(a(e).offset().left + e.offsetWidth / 2) : Math.round(a(e).offset().top + e.offsetHeight / 2);
                c = c ? c : "vertical" != b.scrollerAlignment.toLowerCase() ? parseInt(f[0].style.left) : parseInt(f[0].style.top);
                r = setInterval(function() {
                    var a, d = b.scrollerAlignment.toLowerCase() != "vertical" ? cursorPosition.x : cursorPosition.y,
                        e = k / 2;
                    a = d < n ? n - d : d - n;
                    i = a < Math.ceil(e / 100 * 30) ? 1 : a < Math.ceil(e / 100 * 50) ? 2 * p : a < Math.ceil(e / 100 * 70) ? 3 * p : a < Math.ceil(e / 100 * 90) ? 4 * p : 6 * p;
                    if (d < n)
                        if (c + i > 0 && b.looped == false) c = 0;
                        else if (c + i > g) {
                        c = 0;
                        h = h == 0 ? 1 : 0
                    } else c = c + i;
                    else if (d > n)
                        if (c - i < 0 - (g - k))
                            if (b.looped == false) c = 0 - (g - k);
                            else {
                                c = k;
                                h = h == 0 ? 1 : 0
                            } else c = c - i; if (b.scrollerAlignment.toLowerCase() != "vertical") {
                        f[h].style.left = c + "px";
                        f[h == 0 ? 1 : 0].style.left = c - g + "px"
                    } else {
                        f[h].style.top = c + "px";
                        f[h == 0 ? 1 : 0].style.top = c - g + "px"
                    }
                }, 40)
            };
            j.stopCarousel = function(a) {
                if (r && (clearInterval(r), r = 0, a && !(!1 == b.looped || !0 == b.autoScroll) && 1 < i)) {
                    for (var d = 0, a = i; 1 < a; a--) d += a;
                    var e = "vertical" != b.scrollerAlignment.toLowerCase() ? cursorPosition.x : cursorPosition.y;
                    e < n ? c + d > g && (c -= g, h = 0 == h ? 1 : 0) : c - d < 0 - (g - k) && (c += g, h = 0 == h ? 1 : 0);
                    var j = setInterval(function() {
                        if (i > 1) {
                            c = e < n ? c + i : c - i;
                            if (b.scrollerAlignment.toLowerCase() != "vertical") {
                                f[h].style.left = c + "px";
                                f[h == 0 ? 1 : 0].style.left = c - g + "px"
                            } else {
                                f[h].style.top = c + "px";
                                f[h == 0 ? 1 : 0].style.top = c - g + "px"
                            }
                            i--
                        } else clearInterval(j)
                    }, 50)
                }
            };
            "pause" != o && !0 == b.autoScroll && j.autoScroll();
            switch (o) {
                case "pause":
                    j.stopCarousel();
                    l && (clearInterval(l), l = 0);
                    d.unbind("mouseenter");
                    d.unbind("mouseleave");
                    a(d).data("scrollingCarousel", !1);
                    return;
                case "play":
                    a("html").mousemove(function(c) {
                        var e = {
                            x: 0,
                            y: 0
                        };
                        if (c.pageX || c.pageY) e.x = c.pageX, e.y = c.pageY;
                        else {
                            var f = document.documentElement,
                                g = document.body;
                            e.x = c.clientX + (f.scrollLeft || g.scrollLeft) - (f.clientLeft || 0);
                            e.y = c.clientY + (f.scrollTop || g.scrollTop) - (f.clientTop || 0)
                        }
                        cursorPosition = e;
                        cursorPosition.x >= d.offset().left && (cursorPosition.x <= d.offset().left + d[0].offsetWidth && cursorPosition.y >= d.offset().top && cursorPosition.y <= d.offset().top + d[0].offsetHeight) && j.startCarousel();
                        d.mouseenter(function() {
                            j.startCarousel()
                        });
                        d.mouseleave(function() {
                            j.stopCarousel(!0);
                            !0 == b.autoScroll && j.autoScroll()
                        });
                        a(this).unbind("mousemove");
                        !0 == b.autoScroll && j.autoScroll()
                    })
            }
            a(d).data("scrollingCarousel", !0);
            null != b.afterCreateFunction && a.isFunction(b.afterCreateFunction) && b.afterCreateFunction(d, b);
            return this
        };
        this.Pause = function() {
            this.Create(q, "pause")
        };
        this.Play = function() {
            this.Create(q, "play")
        };
        return this.Create(q)
    };
    jQuery.fn.scrollingCarousel.defaults = {
        autoScroll: !1,
        autoScrollDirection: "left",
        autoScrollSpeed: 1E4,
        looped: !0,
        scrollerAlignment: "horizontal",
        scrollerOffset: 0,
        scrollSpeed: "slow",
        beforeCreateFunction: null,
        afterCreateFunction: null
    }
})(jQuery);

$('document').ready(function(){
$('.carousel-demo1').scrollingCarousel();
});