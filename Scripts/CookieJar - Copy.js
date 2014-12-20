(function() {
  this.CookieJar = (function() {
    function CookieJar() {}

    CookieJar.prototype.readCookie = function(name) {
      var cname, cookie, cookieList, raw, _i, _len;
      cname = name + '=';
      cookieList = document.cookie.split(';');
      for (_i = 0, _len = cookieList.length; _i < _len; _i++) {
        cookie = cookieList[_i];
        while (cookie.charAt(0) === ' ') {
          cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(cname) === 0) {
          return cookie.substring(cname.length, cookie.length).replace(/"/g, '');
        }
      }
      if (window.Storage && window.JSON) {
        raw = localStorage.getItem(name);
        if (raw) {
          return JSON.parse(raw);
        }
      }
    };

    CookieJar.prototype.writeCookie = function(name, val, expire) {
      var toWrite;
      if (expire == null) {
        expire = null;
      }
      toWrite = name + '=' + escape(val);
      if (expire != null) {
        toWrite += ';expires=' + expire.toGMTString();
      }
      document.cookie = toWrite;
      if (window.Storage && window.JSON) {
        return localStorage.setItem(name, JSON.stringify(val));
      }
    };

    return CookieJar;

  })();

}).call(this);
