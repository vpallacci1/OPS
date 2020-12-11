var index
var rightAnswers
var questions
var splash
var indicator
var nexts
var last
var closes
var line
var final
var finalCounter
var test
var main
var faqButtons
var faqDescs
var heights = []
var goodResult = 'Complimenti! Hai superato il quiz base, ma sono pronto ad aiutarti per qualsiasi dubbio'
var midResult = 'Non male ma hai ancora qualche dubbio, allenati insieme a me e migliora!'
var badResult = 'Ahi ahi ahi migliora con me, chiedimi tutto ciò che non sai!'

$( document ).ready(function() {
  window.scrollTo(0, 0)
  index = 0
  rightAnswers = 0

  questions = $(".c-question")
  splash = $(".c-splash")
  indicator = $(".c-indicator")
  nexts = $(".c-answers_next")
  last = $(".c-answers_last")
  closes = $(".c-test_close")
  line = $(".c-line")
  final = $(".c-final")
  finalCounter = $(".c-final_counter")
  test = $(".c-test")
  main = $(".c-main")
  faqButtons = $(".c-faq_toggle")
  faqDescs = $(".c-faq_desc")

  faqDescs.each(function() {
    heights.push(this.getBoundingClientRect().height)
    $(this).addClass("c-faq_desc_disabled")
  })

  faqButtons.each(function(index) {
    $(this).click(function() {
      if ($(this).hasClass("c-faq_toggle_active")) {
        $(this).removeClass("c-faq_toggle_active")
        faqDescs.eq(index).addClass("c-faq_desc_disabled")
        faqDescs.eq(index).removeAttr("style")
      } else {
        $(this).addClass("c-faq_toggle_active")
        faqDescs.eq(index).removeClass("c-faq_desc_disabled")
        faqDescs.eq(index).css("height", heights[index] + "px")
      }
    })
  })

  $(".c-splash_start").click(function() {
    splash.addClass("c-splash_inactive")
    indicator.addClass("c-indicator_active")
    toQuestion(index)
  })

  $(".c-reset").click(function() {
    resetAll()
  })

  nexts.each(function() {
    $(this).click(function() {
      index += 1
      toQuestion(index)
    })
  })

  last.click(function() {
    toResult()
  })

  closes.each(function() {
    $(this).click(function() {
      closeTest()
    })
  })
})

function toQuestion(index) {
  line.addClass("c-line" + index)
  questions.eq(index).addClass("c-question_active")
  questions.eq(index).find(".c-answers_button").each(function() {
    $(this).click(function() {
      questions.eq(index).find(".c-answers_button").addClass("c-answers_button_active")
      questions.eq(index).find(".c-answers_next").addClass("c-answers_next_active")

      if(questions.eq(index).find(".c-answers_last").length) {
        last.addClass("c-answers_last_active")
      }

      if ($(this).hasClass("c-answers_right")) {
        rightAnswers = rightAnswers + 1
      }

      questions.eq(index).find(".c-answers_button").each(function() {
        $(this).unbind()
      })
    })
  })
}

function toResult() {
  if (rightAnswers >= 4) {
    $(".c-final_desc").text(goodResult)
    $(".c-final_good").addClass("c-final_image_active")
  } else if(rightAnswers < 3) {
    $(".c-final_desc").text(badResult)
    $(".c-final_bad").addClass("c-final_image_active")
  } else {
    $(".c-final_desc").text(midResult)
    $(".c-final_good").addClass("c-final_image_active")
  }

  final.addClass("c-final_active")
  indicator.removeClass("c-indicator_active")
  finalCounter.text(rightAnswers)
}

function closeTest() {
  test.addClass("c-test_hidden")
  main.addClass("c-main_active")
  $("body").css("overflow", "auto")
}

function resetAll() {
  window.scrollTo(0, 0)
  index = 0
  rightAnswers = 0

  $(".c-final_good").removeClass("c-final_image_active")
  $(".c-final_bad").removeClass("c-final_image_active")

  questions.each(function() {
    $(this).removeClass("c-question_active")
  })

  splash.removeClass("c-splash_inactive")

  nexts.each(function() {
    $(this).removeClass("c-answers_next_active")
  })

  $(".c-answers_button").removeClass("c-answers_button_active")
  indicator.removeClass("c-indicator_active")


  last.removeClass("c-answers_last_active")
  line.removeClass("c-line1")
  line.removeClass("c-line2")
  line.removeClass("c-line3")
  line.removeClass("c-line4")

  final.removeClass("c-final_active")

  test.removeClass("c-test_hidden")

  main.removeClass("c-main_active")

  $('body').removeAttr('style')
}