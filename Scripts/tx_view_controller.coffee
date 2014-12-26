class @TXViewController
   API: 'http://localhost:54870/'

   constructor: ->
      #$('div#GiftCenter').hide()
      if CookieJar.xread()
         window.location.replace 'index.html'
      $('#ActTel').focus().keypress (event) =>
         regex = new RegExp("^[a-zA-Z0-9]+$")
         str = String.fromCharCode(if event.charCode? then event.charCode else event.which)
         if regex.test(str)
            return true
         event.preventDefault()
         return false
      $('#lookupAct').click (event) =>
         event.preventDefault()
         @LookupAct()
      $('#lookupTel').click (event) =>
         event.preventDefault()
         @LookupTel()      

   LookupAct: ->
      dat = $('form#TX').serialize()
      $.ajax({
         type: 'POST',   
         data: dat,         
         url: @API + 'client/lookupAct/',
         success: (data, status, jqxhr)=>
            @gotAccount(data)
      })

   gotAccount: (data) ->
      @HideAll()
      #$('div#TXCenter').hide()
      $('div#current span.val').html(@Money(data.giftbal))
      $('div#new span.val').html(@Money(data.giftbal))
      $('div#amount').html(@Money(0))
      $('div#GiftCenter').fadeIn(500)
      
   LookupTel: ->
   
   HideAll: ->
      $('div#TXCenter').hide()

   Money: (mon) ->
      dols = '0'
      cents = '00'
      mons = '' + mon
      if mons.length < 2         
         cents = '0' + mons if mons.length == 1
      else
         dols = mons.substring(0,mons.length - 2)
         cents = mons.substring(mons.length - 2)
      return "$" + dols + "." + cents

$ ->
   new TXViewController

