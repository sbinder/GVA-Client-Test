(function() {
  this.TransactionViewController = (function() {
    TransactionViewController.prototype.modes = {
      gift: null,
      loyalty: null
    };

    TransactionViewController.prototype.current_mode = null;

    TransactionViewController.prototype.inversion_factor = -1;

    function TransactionViewController(gift_amount, loyalty_amount, current_mode, multiplier) {
      if (gift_amount == null) {
        gift_amount = 0;
      }
      if (loyalty_amount == null) {
        loyalty_amount = 0;
      }
      this.current_mode = current_mode;
      if (multiplier == null) {
        multiplier = 1;
      }
      this.modes.gift = new Transaction("dollars", gift_amount);
      this.modes.loyalty = new Transaction("points", loyalty_amount, multiplier);
      this.attach_elements();
      this.attach_events();
      this.update_view();
    }

    TransactionViewController.prototype.attach_elements = function() {
      this.$starting_balance = $('#current_bal .amount');
      this.$ending_balance = $('#new_bal .amount');
      this.$amount_entered = $('#amt');
      this.$confirm_button = $('#transaction-confirm-button');
      this.$gift_loyalty_switch = $('#gift_loyalty_switch');
      this.$keypad_buttons = $('#keypad td');
      this.$mode_labels = $('.mode p');
      this.$commit_button = $('.commit');
      this.$ending_balance_hidden = $('#new_transaction_amount');
      this.$account_type_hidden = $('#new_transaction_account_type');
      return this.$account_type_label = $('#gift_loyalty_switch span');
    };

    TransactionViewController.prototype.attach_events = function() {
      this.$keypad_buttons.fastClick((function(_this) {
        return function(e) {
          var entry;
          entry = $(e.target).data('value');
          if (entry !== 'b') {
            _this.modes[_this.current_mode].append_digit(entry);
          } else {
            _this.modes[_this.current_mode].backspace();
          }
          _this.modes[_this.current_mode].invert(_this.inversion_factor);
          return _this.update_view();
        };
      })(this));
      this.$mode_labels.fastClick((function(_this) {
        return function(e) {
          return _this.change_inversion($(e.target));
        };
      })(this));
      this.$gift_loyalty_switch.fastClick((function(_this) {
        return function(e) {
          return _this.toggle_account_type();
        };
      })(this));
      return this.$commit_button.fastClick((function(_this) {
        return function(e) {
          if ($(e.target).hasClass('actual')) {
            return $('#new_transaction').submit();
          }
        };
      })(this));
    };

    TransactionViewController.prototype.toggle_account_type = function() {
      if (this.current_mode === "loyalty") {
        this.current_mode = "gift";
      } else {
        this.current_mode = "loyalty";
      }
      return this.update_view();
    };

    TransactionViewController.prototype.change_inversion = function($target) {
      this.inversion_factor = (function() {
        switch ($target.data('mode')) {
          case 'credit':
            this.$amount_entered.removeClass('deduct').addClass('credit');
            return 1;
          case 'deduct':
            this.$amount_entered.removeClass('credit').addClass('deduct');
            return -1;
        }
      }).call(this);
      this.modes[this.current_mode].invert(this.inversion_factor);
      this.$mode_labels.removeClass('selected');
      $target.addClass('selected');
      return this.update_view();
    };

    TransactionViewController.prototype.update_view = function() {
      this.$starting_balance.text(this.modes[this.current_mode].to_string("starting_balance"));
      this.$ending_balance.text(this.modes[this.current_mode].to_string("ending_balance"));
      this.$commit_button.toggleClass('disabled', !this.amount_entered_valid());
      this.$amount_entered.text(_.str.sprintf("$%.2f", this.modes[this.current_mode].amount_entered));
      this.$account_type_label.text((function() {
        switch (this.current_mode) {
          case 'loyalty':
            return 'gift';
          case 'gift':
            return 'loyalty';
        }
      }).call(this));
      return this.$account_type_hidden = this.current_mode;
    };

    TransactionViewController.prototype.amount_entered_valid = function() {
      return this.modes[this.current_mode].amount_entered !== 0;
    };

    return TransactionViewController;

  })();

  $(function() {
    var account_type, gift_amount, loyalty_amount, multiplier;
    gift_amount = $('meta[name="transaction-starting-amount"]').attr('content') / 100;
    loyalty_amount = $('meta[name="loyalty-starting-amount"]').attr('content') - 0;
    account_type = $('#new_transaction_account_type').val();
    multiplier = parseFloat($('meta[name="loyalty-multiplier"]').attr('content'));
    return new TransactionViewController(gift_amount, loyalty_amount, account_type, multiplier);
  });

}).call(this);
