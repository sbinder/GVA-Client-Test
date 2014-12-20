class @TransactionViewController
  modes:
    gift: null
    loyalty: null

  # Either "gift" or "loyalty". Corresponds to the keys for `modes`
  current_mode: null

  # Either 1 for credit or -1 for deduct
  inversion_factor: -1

  constructor: (gift_amount = 0, loyalty_amount = 0, @current_mode, multiplier = 1) ->
    @modes.gift    = new Transaction("dollars", gift_amount)
    @modes.loyalty = new Transaction("points",  loyalty_amount, multiplier)

    @attach_elements()
    @attach_events()
    @update_view()

  attach_elements: ->
    @$starting_balance    = $('#current_bal .amount')
    @$ending_balance      = $('#new_bal .amount')
    @$amount_entered      = $('#amt')
    @$confirm_button      = $('#transaction-confirm-button')
    @$gift_loyalty_switch = $('#gift_loyalty_switch')
    @$keypad_buttons      = $('#keypad td')
    @$mode_labels         = $('.mode p')
    @$commit_button       = $('.commit')

    @$ending_balance_hidden   = $('#new_transaction_amount')
    @$account_type_hidden     = $('#new_transaction_account_type')
    @$account_type_label      = $('#gift_loyalty_switch span')

  attach_events: ->
    @$keypad_buttons.fastClick (e) =>
      entry = $(e.target).data('value')

      if entry != 'b'
        @modes[@current_mode].append_digit(entry)
      else
        @modes[@current_mode].backspace()

      @modes[@current_mode].invert @inversion_factor
      @update_view()

    @$mode_labels.fastClick (e) => 
      @change_inversion $(e.target)

    @$gift_loyalty_switch.fastClick (e) =>
      @toggle_account_type()

    @$commit_button.fastClick (e) =>
      if $(e.target).hasClass 'actual'
        $('#new_transaction').submit()

  toggle_account_type: ->
    if @current_mode == "loyalty"
      @current_mode = "gift"
    else
      @current_mode = "loyalty"

    @update_view()

  change_inversion: ($target) ->
    @inversion_factor = switch $target.data('mode')
      when 'credit'
        @$amount_entered.removeClass('deduct').addClass('credit')
        1
      when 'deduct'
        @$amount_entered.removeClass('credit').addClass('deduct')
        -1

    @modes[@current_mode].invert @inversion_factor

    @$mode_labels.removeClass('selected')
    $target.addClass('selected')

    @update_view()

  update_view: ->
    @$starting_balance.text @modes[@current_mode].to_string("starting_balance")
    @$ending_balance.text   @modes[@current_mode].to_string("ending_balance")

    @$commit_button
      .toggleClass 'disabled', !@amount_entered_valid()

    @$amount_entered
      .text _.str.sprintf "$%.2f", @modes[@current_mode].amount_entered

    @$account_type_label.text switch @current_mode
      when 'loyalty' then 'gift'
      when 'gift'    then 'loyalty'

    @$account_type_hidden = @current_mode

  amount_entered_valid: ->
    @modes[@current_mode].amount_entered != 0


# Raise the roof
$ ->
  gift_amount = 
    $('meta[name="transaction-starting-amount"]').attr('content')/100
  loyalty_amount =
    $('meta[name="loyalty-starting-amount"]').attr('content')-0
  account_type = 
    $('#new_transaction_account_type').val()
  multiplier = 
    parseFloat $('meta[name="loyalty-multiplier"]').attr('content')

  new TransactionViewController(gift_amount, loyalty_amount, account_type, multiplier)
