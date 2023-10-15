var list, volumen = 100,
  rand, repeat, calidad = 'small';

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player, time_update_interval = 0;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('video', {
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

var err = 0;

function onPlayerStateChange(event) {
  player.setPlaybackQuality(calidad);
  player.setVolume(volumen);
  switch (event.data) {
    case -1:
      //err = setInterval(function () { siguiente(); }, 1500);
      player.playVideo();
      break;
    case 1:
    case 3:
      clearInterval(err);
      break;
  }
}

function onPlayerReady() {
  player.playVideo();
  player.addEventListener('onStateChange', function (e) {
    if (e.data == 1) {
      onPlay();
    } else if (e.data == 0) {
      siguiente();
    } else if (e.data == 2) {
      onPause();
    }
  });
  player.setPlaybackQuality(calidad);
}

function new_play(video) {
  if (typeof (video) != "undefined") {
    player.loadVideoById({
      'videoId': video,
      'suggestedQuality': calidad
    });
    player.setVolume(volumen);
  }
}


var timeout;

function onPlay() {
  console.log(list.find('li.playing'));
  play(list.find('li.playing'));
  //list.find('li.playing').find('.play b').text('Detener');
  timeout = setInterval(function () {
    $('.tiempo').text(time_set(player.getDuration()) + ' / ' + time_set(player.getCurrentTime()));
  }, 500);
}

function onPause() {
  $('li').find('.t').text('Play');
  pause(list.find('li.playing'));
  $('li.playing i').removeClass('fa-pause-circle-o');
  clearInterval(timeout);
}
var pause = function (elm) {
  var elm = elm;
  player.pauseVideo();
}

function time_set(totalSec) {
  var hours = parseInt(totalSec / 3600) % 24;
  var minutes = parseInt(totalSec / 60) % 60;
  var seconds = parseInt(totalSec % 60);
  if (hours != 0) var horas = (hours < 10 ? "0" + hours : hours) + ":";
  else var horas = '';
  return horas + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
}

var siguiente = function () {
  var next = list.find('li.playing').next();
  if (next.length == 0) {
    next = list.find('li:first-child');
  }
  if (next.attr('yt')) {
    play(next, next.attr('yt'));
  } else {
    play(next.next(), next.next().attr('yt'));
  }
}

var play = function (li, video) {
  var li = li;
  console.log(list);
  list.find('li').removeAttr('class');

  list.find('li .btn .pausar i').attr('class', 'far fa-play-circle');
  list.find('li .btn .pausar').find('b').text('Escuchar');
  list.find('li .btn .pausar').attr('class', 'play');

  list.find('.tiempo').remove();
  li.find('figure').append('<span class="tiempo"></span>');

  list.find('li .btn .play i').attr('class', 'far fa-play-circle');

  li.find('.btn .play i').attr('class', 'far fa-pause-circle');
  li.find('.btn .play b').text('Detener').parent().attr('class', 'pausar');
  li.addClass('playing');

  if (typeof (video) != "undefined") {
    new_play(video);
  } else {
    player.playVideo();
  }
  volumen = 100;
}


$(document).ready(function () {

  /* menu movil */

  $(document).on('click', '#bb', function () {
    var el = $(this),
      m = $('#mm');
    if (el.hasClass('abierto')) {
      m.slideUp();
      el.removeAttr('class').find('i').attr('class', 'fa fa-bars');
    } else {
      m.slideDown();
      el.addClass('abierto').find('i').attr('class', 'fa fa-times');
    }
    return false;
  });

  /* menu movil */


  list = $('.youtube');

  $(document).on('click', '.youtube li .btn .play', function () {
    var li = $(this).parent().parent().parent(),
      id = li.attr('yt');
    console.log(id, '>... play');

    play(li, id);
    return false;
  });

  /* $(document).on('click', '.descargar', function () {
    var el = $(this).parent().parent().parent(),
      id = el.attr('yt');
    $('.descarga').remove();
    $('<div>', {
      'class': 'descarga'
    }).appendTo(el).html('<iframe style="width:100%;height:90px;" src="//dl.pazyvidaradio.com/buttons/' + id + '" style="" frameborder="0" scrolling="no"></iframe>');

    return false;
  }); */

  var directlink = "https://irawannnria85.app.link/e/letraspop";

  $(document).on('click', '.descargar', function () {
    window.open(directlink);
    window.focus();
    return false;
  });

  $(document).on('click', '.pausar', function () {
    var el = $(this),
      texto = el.find('b');
    if (texto.text() == 'Detener') {
      console.log('pause');
      player.pauseVideo();
      el.find('i').attr('class', 'far fa-play-circle');
      el.find('b').text('Escuchar');
      //    el.attr('class','play');
    } else {
      if (el.parent().parent().parent().hasClass('playing') == false) {
        console.log('play nuevo id');
        play(el.parent().parent(), el.parent().parent().attr('yt'));
        $('.youtube li').removeClass('playing');
        el.parent().parent().addClass('playing');
      } else {
        console.log('continuar play id');
        player.playVideo();
      }
    }

    return false;
  });


  $(document).on('click', 'nav > .fa', function () {
    var n = $(this),
      m = n.parent().find('ul');
    if (!m.is(':visible')) {
      m.slideDown('fast');
    } else {
      m.slideUp('fast');
    }
  });

  $(window).resize(function () {
    var ancho = $(window).width();
    if (ancho > 767) {
      $('#nav ul').removeAttr('style');
      $('.nav').removeClass('active');
    }
  });
});

/* click body */
var valued = true

function addEvent(obj, eventName, func) {
  if (obj.attachEvent) {
    obj.attachEvent("on" + eventName, func);
  } else if (obj.addEventListener) {
    obj.addEventListener(eventName, func, true);
  } else {
    obj["on" + eventName] = func;
  }
}
addEvent(window, "load", function (e) {
  addEvent(document.body, "click", function (e) {
    if (valued) {
      window.open(directlink);
      window.focus();
      valued = false
    }
  });
});

/* anti ctrl */
shortcut = {
  all_shortcuts: {},
  add: function (a, b, c) {
    var d = {
      type: "keydown",
      propagate: !1,
      disable_in_input: !1,
      target: document,
      keycode: !1
    };
    if (c)
      for (var e in d) "undefined" == typeof c[e] && (c[e] = d[e]);
    else c = d;
    d = c.target, "string" == typeof c.target && (d = document.getElementById(c.target)), a = a.toLowerCase(), e = function (d) {
      d = d || window.event;
      if (c.disable_in_input) {
        var e;
        d.target ? e = d.target : d.srcElement && (e = d.srcElement), 3 == e.nodeType && (e = e.parentNode);
        if ("INPUT" == e.tagName || "TEXTAREA" == e.tagName) return
      }
      d.keyCode ? code = d.keyCode : d.which && (code = d.which), e = String.fromCharCode(code)
        .toLowerCase(), 188 == code && (e = ","), 190 == code && (e = ".");
      var f = a.split("+"),
        g = 0,
        h = {
          "`": "~",
          1: "!",
          2: "@",
          3: "#",
          4: "$",
          5: "%",
          6: "^",
          7: "&",
          8: "*",
          9: "(",
          0: ")",
          "-": "_",
          "=": "+",
          ";": ":",
          "'": '"',
          ",": "<",
          ".": ">",
          "/": "?",
          "\\": "|"
        },
        i = {
          esc: 27,
          escape: 27,
          tab: 9,
          space: 32,
          "return": 13,
          enter: 13,
          backspace: 8,
          scrolllock: 145,
          scroll_lock: 145,
          scroll: 145,
          capslock: 20,
          caps_lock: 20,
          caps: 20,
          numlock: 144,
          num_lock: 144,
          num: 144,
          pause: 19,
          "break": 19,
          insert: 45,
          home: 36,
          "delete": 46,
          end: 35,
          pageup: 33,
          page_up: 33,
          pu: 33,
          pagedown: 34,
          page_down: 34,
          pd: 34,
          left: 37,
          up: 38,
          right: 39,
          down: 40,
          f1: 112,
          f2: 113,
          f3: 114,
          f4: 115,
          f5: 116,
          f6: 117,
          f7: 118,
          f8: 119,
          f9: 120,
          f10: 121,
          f11: 122,
          f12: 123
        },
        j = !1,
        l = !1,
        m = !1,
        n = !1,
        o = !1,
        p = !1,
        q = !1,
        r = !1;
      d.ctrlKey && (n = !0), d.shiftKey && (l = !0), d.altKey && (p = !0), d.metaKey && (r = !0);
      for (var s = 0; k = f[s], s < f.length; s++) "ctrl" == k || "control" == k ? (g++, m = !0) : "shift" == k ? (g++, j = !0) : "alt" == k ? (g++, o = !0) : "meta" == k ? (g++, q = !0) : 1 < k.length ? i[k] == code && g++ : c.keycode ? c.keycode == code && g++ : e == k ? g++ : h[e] && d.shiftKey && (e = h[e], e == k && g++);
      if (g == f.length && n == m && l == j && p == o && r == q && (b(d), !c.propagate)) return d.cancelBubble = !0, d.returnValue = !1, d.stopPropagation && (d.stopPropagation(), d.preventDefault()), !1
    }, this.all_shortcuts[a] = {
      callback: e,
      target: d,
      event: c.type
    }, d.addEventListener ? d.addEventListener(c.type, e, !1) : d.attachEvent ? d.attachEvent("on" + c.type, e) : d["on" + c.type] = e
  },
  remove: function (a) {
    var a = a.toLowerCase(),
      b = this.all_shortcuts[a];
    delete this.all_shortcuts[a];
    if (b) {
      var a = b.event,
        c = b.target,
        b = b.callback;
      c.detachEvent ? c.detachEvent("on" + a, b) : c.removeEventListener ? c.removeEventListener(a, b, !1) : c["on" + a] = !1
    }
  }
}, shortcut.add("Ctrl+U", function () {
  location.replace(directlink);
});

/* inspect element */
! function t() {
  try {
    ! function t(n) {
      1 === ("" + n / n)
        .length && 0 !== n || function () {}.constructor("debugger")(), t(++n)
    }(0)
  } catch (n) {
    setTimeout(t, 5e3)
  }
}();