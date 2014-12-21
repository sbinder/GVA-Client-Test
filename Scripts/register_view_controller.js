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
          return _this.initialAuth();
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
      if ((this.XID != null) && this.XID !== '') {
        this.initialAuth();
      } else {
        $('#EULA').show();
      }
    }

    IndexViewController.prototype.initialAuth = function() {
      this.showConnecting();
      if ((this.XID == null) || this.XID === '') {
        return;
      }
      return $.ajax({
        type: 'GET',
        url: this.API + 'api/initial/' + this.XID,
        success: (function(_this) {
          return function(data, status, jqxhr) {
            return _this.gotInit(data);
          };
        })(this)
      });
    };

    IndexViewController.prototype.gotInit = function(data) {
      var d;
      $('#keyhole').html(data);
      this.hideAll();
      d = $.parseJSON(data);
      if (d.Key === 0) {
        $('div#Register1').fadeIn();
        return;
      }
      if (d.Key === 1) {
        $('input#username').val("Demonstration").attr("disabled", "disabled");
        $('input#password').val("Demonstration").attr("disabled", "disabled");
      }
      if (d.Key === 1 || d.Key.length > 12) {
        return $('div#Signin').fadeIn();
      }
    };

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
