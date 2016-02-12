(function (window, Cryptoloji, undefined) {
  'use strict'

  Cryptoloji.states.encrypt = {
    enter: function () {
      Cryptoloji.stateman.emit('header:show')

      Cryptoloji.UI.Keyslider('encrypt', '#encryption_keyslider')
        .fill(_.take(emojiList, 10))

      $(".encryption").addClass("section-show")

      // animate input placeholder text
      animateInputPlaceholder()

      // encrypt text on input
      $('.encryption .main_content_top_input').bind('input propertychange', function() {
        Cryptoloji.UI.encryptText()
      })

      Cryptoloji.stateman.on('keyslider:key-chosen', function (key) {
        Cryptoloji.UI.selectKey(key)
        Cryptoloji.UI.encryptText()
      })

      // show share button at proper time
      Cryptoloji.stateman.on('encrypt:show-share', function() {
        $('#encryption_share_button').fadeIn()
      })

      // show/hide bottom placeholder text
      Cryptoloji.stateman.on('encrypt:hide-output-placeholder', function () {
        $('.main_content_bottom_input').html('').removeClass('placeholdit')
      })

      // empty input field
      $('#encryption_input_cleaner').on('click', function () {
        Cryptoloji.UI.emptyEncryptInput()
        Cryptoloji.UI.emptyEncryptOutput()
      })

      // show input related UI elements
      $('#encryption_input').on('focus', function () {
        $('#encryption_input_cleaner').show()
        $('#encryption_input_count').show()
      })
    },
    leave: function () {
      $('.encryption').removeClass('section-show')
      Cryptoloji.stateman.off('encrypt')
      Cryptoloji.stateman.off('keyslider')
    }
  }

  function animateInputPlaceholder () {
    // store current placeholder
    var encryptionInputPlaceholder = $('#encryption_input').attr('placeholder')
    // remove it for a cleaner start
    $('#encryption_input').attr('placeholder', '')
    // typify placeholder
    $('#encryption_input').typed({
      strings: [encryptionInputPlaceholder],
      typeSpeed: 10,
      contentType: 'text',
      showCursor: false,
      attr: 'placeholder',
      callback: function () {
        // everything back to normal please
        setTimeout(function () { $('body').removeClass('main_content_top_input-first') }, 1000)          
      }
    })
  }

})(window, window.Cryptoloji); 
