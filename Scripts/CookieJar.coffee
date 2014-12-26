# CoffeeScript
class @CookieJar
   constructor: ->

   @read: (name) ->
      result = @readCookie name
      return result if (result?) 
      # fallback to local storage
      result = @readLocal name
      return result if (result?)
      # fallback to session storage
      result = @readSession name
      return result
   
   @write: (name, val, expire = null) ->
      @writeCookie(name, val, expire)
      # also write to local storage as backp
      @writeLocal(name, val, expire)
      # write to session as well
      @writeSession(name, val)

   @readCookie: (name) ->
      cname = name + '='
      cookieList = document.cookie.split(';')
      for cookie in cookieList
         cookie = cookie.substring(1,cookie.length) while cookie.charAt(0) is ' '
         return cookie.substring(cname.length, cookie.length).replace(/"/g, '') if cookie.indexOf(cname) is 0
      return null

   @writeCookie: (name, val, expire = null) ->
      toWrite = name + '=' + escape(val)
      toWrite += ';expires=' + expire.toGMTString() if expire?
      document.cookie = toWrite

   @writeTemp: (name, val) ->
      @writeCookie(name, val)
      # write to session as backup
      @writeSession(name, val)

   @readLocal: (name) ->
      if window.Storage and window.JSON
         rw = localStorage.getItem(name)
         return JSON.parse(rw) if (@rw?)
      return null

   @readSession: (name) ->
      if window.Storage and window.JSON
         rw = sessionStorage.getItem(name)
         return JSON.parse(rw) if (@rw?)
      return null

   @writeLocal: (name, val) ->
      if window.Storage and window.JSON
         localStorage.setItem(name, JSON.stringify(val))

   @writeSession: (name, val) ->
      if window.Storage and window.JSON
         sessionStorage.setItem(name, JSON.stringify(val))

   # Client-specific additions
   @xwrite: (xid, oid) ->
      now = new Date()
      now.setDate(now.getDate + 366)   # xid expires 1 year
      if (xid.length > 12) # only keep non-demo keys
         @write('xid', xid, now)
      else 
         @writeTemp('xid', xid)
      @writeTemp('oid', oid)

   # Returns TRUE for auth failures (either machine or operator)
   @xread: ->
      x = @read('xid')
      o = @read('oid')       
      $('#XID').val(x)
      $('#OID').val(o)
      return x == '' || o == ''
