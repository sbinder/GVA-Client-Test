# CoffeeScript
class @CookieJar

   constructor: ->

   readCookie: (name) ->
      #alert 'Cookie: ' + document.cookie
      cname = name + '='
      cookieList = document.cookie.split(';')
      for cookie in cookieList
         cookie = cookie.substring(1,cookie.length) while cookie.charAt(0) is ' '
         return cookie.substring(cname.length, cookie.length).replace(/"/g, '') if cookie.indexOf(cname) is 0
      # fallback to local storage
      if window.Storage and window.JSON
         raw = localStorage.getItem(name)
         #alert 'Local Storage: ' + raw
         return JSON.parse(raw) if raw

   writeCookie: (name, val, expire = null) ->
      toWrite = name + '=' + escape(val)
      toWrite += ';expires=' + expire.toGMTString() if expire?
      document.cookie = toWrite
      # alswo write to local storage as backp
      if window.Storage and window.JSON
         localStorage.setItem(name, JSON.stringify(val))
