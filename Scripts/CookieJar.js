(function() {
  this.CookieJar = (function() {
    function CookieJar() {}

    CookieJar.read = function(name) {
      var result;
      result = this.readCookie(name);
      if ((result != null)) {
        return result;
      }
      result = this.readLocal(name);
      if ((result != null)) {
        return result;
      }
      result = this.readSession(name);
      return result;
    };

    CookieJar.write = function(name, val, expire) {
      if (expire == null) {
        expire = null;
      }
      this.writeCookie(name, val, expire);
      this.writeLocal(name, val, expire);
      return this.writeSession(name, val);
    };

    CookieJar.readCookie = function(name) {
      var cname, cookie, cookieList, _i, _len;
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
      return null;
    };

    CookieJar.writeCookie = function(name, val, expire) {
      var toWrite;
      if (expire == null) {
        expire = null;
      }
      toWrite = name + '=' + escape(val);
      if (expire != null) {
        toWrite += ';expires=' + expire.toGMTString();
      }
      return document.cookie = toWrite;
    };

    CookieJar.writeTemp = function(name, val) {
      this.writeCookie(name, val);
      return this.writeSession(name, val);
    };

    CookieJar.readLocal = function(name) {
      var rw;
      if (window.Storage && window.JSON) {
        rw = localStorage.getItem(name);
        if ((this.rw != null)) {
          return JSON.parse(rw);
        }
      }
      return null;
    };

    CookieJar.readSession = function(name) {
      var rw;
      if (window.Storage && window.JSON) {
        rw = sessionStorage.getItem(name);
        if ((this.rw != null)) {
          return JSON.parse(rw);
        }
      }
      return null;
    };

    CookieJar.writeLocal = function(name, val) {
      if (window.Storage && window.JSON) {
        return localStorage.setItem(name, JSON.stringify(val));
      }
    };

    CookieJar.writeSession = function(name, val) {
      if (window.Storage && window.JSON) {
        return sessionStorage.setItem(name, JSON.stringify(val));
      }
    };

    CookieJar.xwrite = function(xid, oid) {
      var now;
      now = new Date();
      now.setDate(now.getDate + 366);
      if (xid.length > 12) {
        this.write('xid', xid, now);
      } else {
        this.writeTemp('xid', xid);
      }
      return this.writeTemp('oid', oid);
    };

    CookieJar.xread = function() {
      var o, x;
      x = this.read('xid');
      o = this.read('oid');
      $('#XID').val(x);
      $('#OID').val(o);
      return x === '' || o === '';
    };

    return CookieJar;

  })();

}).call(this);
