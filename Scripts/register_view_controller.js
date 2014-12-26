(function() {
  this.IndexViewController = (function() {
    IndexViewController.prototype.XID = null;

    IndexViewController.prototype.API = 'http://localhost:54870/';

    function IndexViewController() {
      this.hideAll();
      $('#eulaForm input[type="submit"]').click((function(_this) {
        return function(event) {
          event.preventDefault();
          _this.XID = '0';
          $('div#EULA').hide();
          return $('div#Register1').fadeIn();
        };
      })(this));
      $('#reg1demo').click((function(_this) {
        return function(event) {
          event.preventDefault();
          CookieJar.writeTemp('xid', 1);
          return window.location.replace('index.html');
        };
      })(this));
      $('#reg1reg').click((function(_this) {
        return function(event) {
          event.preventDefault();
          return _this.registerMachine();
        };
      })(this));
      this.XID = CookieJar.read('xid');
      $('#EULA').show();
    }


    /*
       if (@XID? && @XID != '')
          @initialAuth() 
       else 
          $('#EULA').show()
    
    
    initialAuth: ->
       @showConnecting()
       return if (!@XID? || @XID == '') #safety valve
       $.ajax({
          type: 'GET',
           *url: 'http://localhost:54870/api/initial/' + @XID,
          url: @API + 'client/initial/' + @XID,
          success: (data, status, jqxhr)=>
             @gotInit(data)
       })
    
    gotInit: (data) ->
        * store info
       
        * TEST ONLY
        *alert data
       $('#keyhole').html(data)
        *# TEST
    
       @hideAll()
       d = data.Token
       if d == "0"   #d.Key == 0
          $('div#Register1').fadeIn()
          return
       if d == "1"   #d.Key == 1  # DEMO Mode
          $('input#username').val("Demonstration").attr("disabled", "disabled")
          $('input#password').val("Demonstration").attr("disabled", "disabled")
       if d == "1" || d.length > 12 #d.Key == 1 || d.Key.length > 12
          $('div#Signin').fadeIn()
     */

    IndexViewController.prototype.hideAll = function() {
      $('div#connecting').hide();
      $('div#EULA').hide();
      $('div#Register1').hide();
      return $('div#Register2').hide();
    };

    IndexViewController.prototype.showConnecting = function() {
      this.hideAll();
      return $('div#connecting').fadeIn();
    };

    IndexViewController.prototype.registerMachine = function() {
      return alert('Not yet implemented.');
    };

    IndexViewController.prototype.SignIn = function() {
      this.hideAll();
      return $('div#TXCenter').fadeIn();
    };

    return IndexViewController;

  })();

  $(function() {
    return new IndexViewController;
  });

}).call(this);
