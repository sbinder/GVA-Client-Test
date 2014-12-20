# CoffeeScript
class @IndexViewController
   API: 'http://localhost:54870/'
   XID: null   # hold current exchange ID

   constructor: ->
      #API = 'http://localhost:54870/'
      @hideAll()
      $('#signinForm input[type="submit"]').click (event) =>
         event.preventDefault()         
         @SignIn()

      #CookieJar.write('xid','') #TESTING: Clear Cookie
      @XID = CookieJar.read('xid')
      if (@XID? && @XID != '')
         @initialAuth() 
      else 
         window.location.replace 'register.html'

   initialAuth: =>

      #alert @API + 'api/initial/'

      return if (!@XID? || @XID == '') #safety valve
      @showConnecting()
      #alert "Sending request (" + @XID + ")"
      $.ajax({
         type: 'GET',
         #url: 'http://localhost:54870/api/initial/' + @XID,
         url: @API + 'api/initial/' + @XID,
         success: (data, status, jqxhr)=>
            @gotInit(data)
      })

   SigninAuth: =>
      dat = $('form#signinForm').serialize()
      return if (!@XID? || @XID == '') #safety valve
      @showConnecting()
      #alert "Sending request (" + @XID + ")"
      $.ajax({
         type: 'POST',
         #url: 'http://localhost:54870/client/authenticate'
         url: @API + 'client/authenticate',
         data: dat,
         success: (data, status, jqxhr)=>
            @gotLogin(data)
      })
   
   gotLogin: (data) ->
      # store info

      # TEST ONLY
      $('#keyhole').html(data)
      ## TEST

      @hideAll()
      #d = $.parseJSON(data)      
      $('#TXCenter').fadeIn()
      $('#ActTel').focus()

   gotInit: (data) ->
      # store info

      # TEST ONLY
      $('#keyhole').html(data)
      ## TEST

      @hideAll()
      d = $.parseJSON(data)      
      #alert d.Key
      if d.Key == 0
         window.location.replace 'register.html'
         return
      if d.Key == 1  # DEMO Mode
         $('input#username').val("Demonstration").attr("readonly", "readonly")
         $('input#password').val("Demonstration").attr("readonly", "readonly")
      if d.Key == 1 || d.Key.length > 12
         $('#XID').val(d.Key)
         $('div#Signin').fadeIn()
   
   hideAll: ->
      $('div#connecting').hide()
      $('div#Signin').hide()
      $('div#TXCenter').hide()
      
   showConnecting: ->
      @hideAll()
      $('div#connecting').fadeIn()


   SignIn: ->
      @SigninAuth()
      #@hideAll()
      #$('div#TXCenter').fadeIn()
   
$ ->
   new IndexViewController
