# CoffeeScript
class @IndexViewController
   XID: null   # hold current exchange ID
   #jar: null   # hold cookie jar

   constructor: ->

      @hideAll()
      $('#eulaForm input[type="submit"]').click (event) =>
         event.preventDefault()
         @XID = '0'  # new flag
         @initialAuth()
      $('#reg1demo').click (event) =>
         event.preventDefault()
         CookieJar.writeCookie('xid', 1)  #temp cookie
         #CookieJar.write('xid', 1)
         window.location.replace 'index.html'
      $('#reg1reg').click (event) =>
         event.preventDefault()
         @registerMachine()

      #jar = new CookieJar

      #jar.writeCookie('xid','')
      #@XID = jar.readCookie('xid')
      @XID = CookieJar.read('xid')

      if (@XID? && @XID != '')
         @initialAuth() 
      else 
         $('#EULA').show()

      #jar.writeCookie('xid','TEST')

   initialAuth: ->
      @showConnecting()
      return if (!@XID? || @XID == '') #safety valve
      $.ajax({
         type: 'GET',
         url: 'http://localhost:54870/api/initial/' + @XID,
         success: (data, status, jqxhr)=>
            @gotInit(data)
      })
   
   gotInit: (data) ->
      # store info

      # TEST ONLY
      $('#keyhole').html(data)
      ## TEST

      @hideAll()
      d = $.parseJSON(data)      
      #alert d.Key
      if d.Key == 0
         $('div#Register1').fadeIn()
         return
      if d.Key == 1  # DEMO Mode
         $('input#username').val("Demonstration").attr("disabled", "disabled")
         $('input#password').val("Demonstration").attr("disabled", "disabled")
      if d.Key == 1 || d.Key.length > 12
         $('div#Signin').fadeIn()
   
   hideAll: ->
      $('div#connecting').hide()
      $('div#EULA').hide()
      $('div#Register1').hide()
      $('div#Register2').hide()
      
   showConnecting: ->
      @hideAll()
      $('div#connecting').fadeIn()

   registerMachine: ->
      alert 'Not yet implemented.'

   SignIn: ->
      #alert 'Not yet implemented.'
      # but go ahead anyway   
      @hideAll()
      $('div#TXCenter').fadeIn()
   
$ ->
   new IndexViewController
