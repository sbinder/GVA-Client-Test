# CoffeeScript
class @IndexViewController
   API: 'http://localhost:54870/'
   #XID: null   # hold current exchange ID

   constructor: ->
      @hideAll()
      CookieJar.xread()
      $('#signinForm input[type="submit"]').click (event) =>
         event.preventDefault()         
         @SignIn()

      #CookieJar.write('xid','') #TESTING: Clear Cookie
      #@XID = CookieJar.read('xid')
      #if (@XID? && @XID != '')
      if $('#XID').val() != ''
         @initialAuth() 
      else 
         window.location.replace 'register.html'

   initialAuth: =>
      #return if (!@XID? || @XID == '') #safety valve
      return if $('#XID').val() == '' #!@XID? || @XID == '') #safety valve
      @showConnecting()
      $.ajax({
         type: 'GET',
         url: @API + 'client/initial/' + $('#XID').val() #@XID,
         success: (data, status, jqxhr)=>
            @gotInit(data)
      })

   SigninAuth: =>
      dat = $('form#signinForm').serialize()
      return if $('#XID').val() == '' #(!@XID? || @XID == '') #safety valve
      @showConnecting()
      $.ajax({
         type: 'POST',
         url: @API + 'client/authenticate',
         data: dat,
         success: (data, status, jqxhr)=>
            @gotLogin(data)
      })
   
   gotLogin: (data) ->      
      CookieJar.xwrite(data.Token, data.Auth)      
      window.location.replace('tx.html')

   gotInit: (data) ->
      # store info

      @hideAll()
      d = data.Token
      CookieJar.write('xid', d)
      if d == '0' #d.Key == 0
         window.location.replace 'register.html'
         return
      if d == '1' #d.Key == 1  # DEMO Mode
         $('input#username').val("Demonstration").attr("readonly", "readonly")
         $('input#password').val("Demonstration").attr("readonly", "readonly")
      if d == '1' || d.length > 12  #d.Key == 1 || d.Key.length > 12
         $('#XID').val(d)
         $('div#Signin').fadeIn()
   
   hideAll: ->
      $('div#connecting').hide()
      $('div#Signin').hide()
      
   showConnecting: ->
      @hideAll()
      $('div#connecting').fadeIn()


   SignIn: ->
      @SigninAuth()
   
$ ->
   new IndexViewController
