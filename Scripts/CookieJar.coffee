﻿# CoffeeScript
class @CookieJar
   constructor: ->

   @read: (name) ->
      result = @readCookie name
      return result if (result?) 
      # fallback to local storage
      result = @readLocal name
      return result
   
   @write: (name, val, expire = null) ->
      @writeCookie(name, val, expire)
      # alswo write to local storage as backp
      @writeLocal(name, val, expire)

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

   @readLocal: (name) ->
      if window.Storage and window.JSON
         raw = localStorage.getItem(name)
         #alert 'Local Storage: ' + raw
         return JSON.parse(raw) if raw
      return null

   @readSession: (name) ->
      if window.Storage and window.JSON
         raw = sessionStorage.getItem(name)
         return JSON.parse(raw) if raw
      return null

   @writeLocal: (name, val) ->
      if window.Storage and window.JSON
         localStorage.setItem(name, JSON.stringify(val))

   @writeSession: (name, val) ->
      if window.Storage and window.JSON
         sessionStorage.setItem(name, JSON.stringify(val))