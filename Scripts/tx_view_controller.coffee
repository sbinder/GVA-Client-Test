class @TXViewController
   XID: null   # hold current exchange ID
   OID: null   # hold current operator ID
   API: 'http://localhost:54870/'

   constructor: ->
      $('#ActTel').keypress (event) =>
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
      $.ajax({
         type: 'GET',
         url: @API + 'client/lookupAct',
         url: @API + 'api/initial/' + @XID,
         success: (data, status, jqxhr)=>
            @gotInit(data)
      })
      
   LookupTel: ->


$ ->
   new TXViewController

