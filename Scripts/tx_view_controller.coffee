class TXViewController
   API: 'http://localhost:54870/'
   transaction: 0
   balance: 0   
   direction: -1

   constructor: ->
      $('body').keydown (event)=>
         if $('div#GiftCenter').is(':visible') 
            @GotTXKey(event)
         
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
      @balance = data.giftbal
      @transaction = 0
      $('div#current span.val').html(@Money(@balance))
      @ShowTX()
      #$('div#new span.val').html(@Money(data.giftbal))
      #$('div#amount').html(@Money(0))
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
         dols = '0' if dols.length == 0
         cents = mons.substring(mons.length - 2)
      return "$" + dols + "." + cents

   ShowTX: =>
      $('div#amount').html(@Money(@transaction))
      $('div#new span.val').html(@Money(@balance + (@transaction * @direction)))

   GotTXKey: (event) =>
      oldTX = @transaction
      regex = new RegExp("^[0-9]+$")
      str = String.fromCharCode(event.which)
      if regex.test(str)
         @transaction *= 10
         @transaction += parseInt(str);
      if event.which == 8 || event.which == 46
         ts = '' + @transaction
         if ts.length > 1          
            @transaction = parseInt(ts.substring(0, -1 + ts.length))         
         else 
            @transaction = 0
      if @balance + (@transaction * @direction) < 0
         @transaction = oldTX         
      @ShowTX()      
      #return true
      #event.preventDefault()
      #return false


$ ->
   new TXViewController

