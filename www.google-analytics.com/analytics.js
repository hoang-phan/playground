window.findingUserList = false;
window.killRaidBoss = function() {
  if (localStorage.getItem('killRaidBoss') !== 't') {
    return;
  }

  var currentHref = location.href;

  if (currentHref.indexOf('https://www.drapro-nutaku.dmmgames.com/mypage?') == 0) {
    var reliefStatusBtn = $('.reliefStatusBtn.helpNow')[0];
    if (reliefStatusBtn) {
      reliefStatusBtn.click();
      return;
    }

    if (Math.random() < 0.1) {
      var eventBtn = $('.eventBtn')[0];
      if (eventBtn) {
        eventBtn.click();
        return;
      }
    }

    location.reload();
    return;
  }

  if (currentHref.indexOf('https://www.drapro-nutaku.dmmgames.com/raid/request_list') == 0) {
    // var notRareRaid = $('.raidList.new:not(:contains("Rare")) .btn a');
    // var len = notRareRaid.length;
    // if (len > 1) {
    //   var values = $('.raidList.new:not(:contains("Rare"))').map(function(i, a) { return parseInt($(this).find('dd:first').text()); });
    //   var maxValue = Math.max(...Array.from(values)).toString();
    //   $('.raidList.new:contains("' + maxValue + '"):not(:contains("Rare")) .btn a')[0].click();
    //   localStorage.setItem('href', currentHref);
    //   return;
    // }
    // if (len > 0) {
    //   $('.raidList.new:not(:contains("Rare")) .btn a')[0].click();
    //   localStorage.setItem('href', currentHref);
    //   return;
    // }

    var rotationI = parseInt('0' + localStorage.getItem('rotationI'));
    var i = rotationI % $('.raidList.new .btn a').length;

    var raidListNewBtn = $('.raidList.new .btn a')[i];
    if (raidListNewBtn) {
      localStorage.setItem('rotationI', i + 1);
      raidListNewBtn.click();
      if (currentHref.indexOf('https://www.drapro-nutaku.dmmgames.com/raid/request_list/0/1') == 0) {
        localStorage.setItem('href', currentHref);
      }
      return;
    }

    if ($('.raidList .btn a').length > 0) {
      var values1 = $('.raidList:contains("Combo Chance")').map(function(i, a) { return parseInt($(this).find('dd:first').text()); });
      var toAttack = Array.from(values1).filter(function(a) { return a <= 200000000 && a >= 3000000 })[0];
      if (toAttack) {
        toAttackBtn = $('.raidList:contains("' + toAttack + '"):contains("Combo Chance") .btn a')[0];
        localStorage.setItem('attack50', toAttackBtn.href);
        toAttackBtn.click();
        return;
      }
    }

    location.reload();
    return;  
  }

  if (location.href.indexOf('https://www.drapro-nutaku.dmmgames.com/item?') == 0) {
    var currentBp1 = parseInt(localStorage.getItem('currentBp') + '');
    var toUse = '';

    if (currentBp1 < 3) {
      toUse = ['Limited BP Potion', 'BP fully recovered'];
    } else if (currentBp1 < 40) {
      toUse = ['BP Potion [50%]', 'BP Potion [30%]'];
    } else {
      toUse = ['BP Potion [30%]'];
    }

    var selector = toUse.map(function(a) {
      return '.itemList:contains("' + a + '") a.btnLR';
    }).join(', ');

    $(selector)[0].click();
    setTimeout(function() {
      if ($('.mypage a').length > 0) {
        $('.mypage a')[0].click();
      }
    }, 1000);
    return;
  }

  if ($('#raidNew-btnAttackFree').length > 0) {
    var attack50 = localStorage.getItem('attack50');
    var toAttack50 = attack50 && currentHref.indexOf(attack50) > -1;
    var attackBtn = toAttack50 ? '#raidNew-btnAttack50' : '#raidNew-btnAttackFree';
    var currentBp = parseInt($('#raidNew-bp').text().trim());

    if (!toAttack50) {
      localStorage.removeItem('attack50');
    }
    localStorage.setItem('currentBp', currentBp);

    if ($(attackBtn).length > 0 && $(attackBtn).css('display') != 'none') {
      if (attackBtn == '#raidNew-btnAttackFree') {
        attack(attackBtn, 7);
        return;
      } else {
        if (currentBp < 50) {
          $('#raidNew-btnBpRecover')[0].click();
          return;
        }
        $(attackBtn)[0].click();
        setTimeout(function() {
          $(attackBtn)[0].click();
        }, 400);
        setTimeout(function() {
          $(attackBtn)[0].click();
        }, 800);
        setTimeout(function() {
          $(attackBtn)[0].click();
        }, 1200);
        setTimeout(function() {
          $(attackBtn)[0].click();
          localStorage.removeItem('attack50');
          setTimeout(function() {
            var href = localStorage.getItem('href');
            if (href) {
              localStorage.removeItem('href');
              location.href = href;
            } else {
              $('.mypage a')[0].click();
            }
          }, 300);
        }, 1600);
        return;
      }
    }
  }

  var enterBtn = $('#enterBtn')[0];
  if (enterBtn) {
    enterBtn.click();
    return;
  }

  if ($('.mypage a').length > 0) {
    var href1 = localStorage.getItem('href');
    if (href1) {
      localStorage.removeItem('href');
      location.href = href1;
    } else {
      $('.mypage a')[0].click();
    }
    return;
  }
}

window.attackingCombo = function() {
  if (localStorage.getItem('attackingCombo') !== 't') {
    return;
  }

  if ($('.btnImgRaid1').length > 0) {
    $('.btnImgRaid1')[0].click();
    return;
  }

  if (location.href.indexOf('https://www.drapro-nutaku.dmmgames.com/item') == 0) {
    localStorage.setItem('itemsPage', location.href);
    return;
  }

  if (location.href.indexOf('https://www.drapro-nutaku.dmmgames.com/raid/battle_top') != 0) {
    return;
  }

  setTimeout(function() {
    if ($('#raidNew-btnAttack50').length == 0 || $('#raidNew-btnAttack50').css('display') == 'none') {
      return;
    }

    if ($('#raidNew-btnAttack50').hasClass('off')) {
      $('#raidNew-btnBpRecover')[0].click();
      return;
    }

    if ($('#raidBattleHistoryFrame .raidUserList .wordwrap a')[0].innerHTML == 'hpbk10') {
      location.reload();
      return;
    }

    $('#raidNew-btnAttack50')[0].click();
    setTimeout(function() {
      location.reload();
    }, 500);
  }, 100)
}

window.autoBlazeCrowd = function () {
  if (localStorage.getItem('autoBlazeCrowd') !== 't' || location.href.indexOf('https://www.drapro-nutaku.dmmgames.com/blaze/index') != 0) {
    return;
  }

  if ($(window).width() > 600) {
    doAcceptNewReinforcementBlazeCrowd();
    return;
  }

  if ($(window).height() > 1000) {
    doBoostBlazeCrowd('front');
  } else {
    doAutoBlazeCrowd();
  }
}

window.doAutoBlazeCrowd = function(pos) {
  var ap = parseInt($('#nowApText').text());
  var scrolls = parseInt($('#iconBook3Num').text());
  var books = parseInt($('#iconScroll3Num').text());
  var position = pos || 'front';

  if (scrolls < 3 && books < 6) {
    $('#receiveBtn')[0].click();
    setTimeout(function() {
      $('#allReceiveBtn')[0].click();
      setTimeout(function() {
        location.reload();
      }, 1000);
    }, 1000);
    return;
  }

  var stage = 'death';

  if (scrolls >= 3) {
    stage = 'normal';
  }

  $('a#battleBtn').click();
  setTimeout(function() {
    $('.blazeBattleList.'+ stage +' .blazeSummonBtn').click();
    if (stage == 'death' && ap < 25 || stage == 'normal' && ap < 15) {
      setTimeout(function() {
        var toUse = ap < 5 ? '.ap_item:not(:contains("%")) .itemUseBtn' : '.ap_item:contains("50%") .itemUseBtn, .ap_item:contains("30%") .itemUseBtn';
        $(toUse)[0].click();
        setTimeout(function() {
          location.reload();
        }, 100);
      }, 100);
    } else {
      $('.selectPositionBtn.' + position).click();
    }
  }, 300);
}

window.removeAllBCActions = function() {
  localStorage.removeItem('autoBlazeCrowd');
  localStorage.removeItem('acceptReinforcementBlazeCrowd');
  localStorage.removeItem('acceptNewReinforcementBlazeCrowd');
  localStorage.removeItem('boostBlazeCrowd');
  localStorage.removeItem('feedForBlazeCrowd');
}

window.acceptReinforcementBlazeCrowd = function () {
  if (localStorage.getItem('acceptReinforcementBlazeCrowd') !== 't' || location.href.indexOf('https://www.drapro-nutaku.dmmgames.com/blaze/index') != 0) {
    return;
  }

  if ($('#rescueListBtn.off').length > 0) {
    location.reload();
    return;
  }

  setTimeout(findUserList, 500);
}

window.acceptNewReinforcementBlazeCrowd = function () {
  if (localStorage.getItem('acceptNewReinforcementBlazeCrowd') !== 't' || location.href.indexOf('https://www.drapro-nutaku.dmmgames.com/blaze/index') != 0) {
    return;
  }

  doAcceptNewReinforcementBlazeCrowd();
}

window.doAcceptNewReinforcementBlazeCrowd = function() {
  if ($('#rescueListBtn.off').length > 0) {
    location.reload();
    return;
  }

  setTimeout(function() {
    var notEnter = ['hpbk10', 'Mer000', 'Abraxas', 'Batchie', 'Gearsus', 'Survivor', 'Gamer'];
    var query = notEnter.map(function(el) { return ':not(:contains("' + el + '"))' }).join('');
    findUserList('.hard' + query + ':contains("0:59:")');
  }, 500);
}

window.boostBlazeCrowd = function () {
  if (localStorage.getItem('boostBlazeCrowd') !== 't' || location.href.indexOf('https://www.drapro-nutaku.dmmgames.com/blaze/index') != 0) {
    return;
  }

  if ($(window).width() > 600) {
    doAcceptNewReinforcementBlazeCrowd();
    return;
  }

  if ($(window).height() > 1000) {
    doAutoBlazeCrowd('back');
  } else {
    doBoostBlazeCrowd();
  }
}

window.doBoostBlazeCrowd = function(pos) {
  var position = pos || 'back';

  if ($('#rescueListBtn.off').length > 0) {
    location.reload();
    return;
  }

  setTimeout(function() {
    findUserList(false, position);
  }, 500);
}

window.findUserList = function(listText, startPosition) {
  var text = listText || ':contains("hpbk10")';
  var position = startPosition || 'front';

  if (!$('#rescueDialog').hasClass('open')) {
    $('#rescueListBtn')[0].click();
  }

  var userList = $('.blazeUserList' + text)[0];
  if (userList) {
    $(userList).find('.rescueBattleBtn')[0].click();
    var bp = parseInt($('#nowBpText').text());

    threshold = 30;
    if ($(userList).hasClass('hard')) {
      threshold = 25;
    } else if ($(userList).hasClass('normal')) {
      threshold = 20;
    }

    if (bp < threshold) {
      var toUse = bp < 5 ? '.bp_item:not(:contains("%")) .itemUseBtn' : '.bp_item:contains("50%") .itemUseBtn, .bp_item:contains("30%") .itemUseBtn';
      setTimeout(function() {
        $(toUse)[0].click();
        setTimeout(function() {
          location.reload();
        }, 100);
      }, 100);
    } else {
      $('.selectPositionBtn.' + position).click();
    }
    return;
  }

  if ($('#ajaxLoadingImg').length == 0) {
    if ($('#rescueDialog .pagerArrowR:not(.off)').length > 0) {
        $('#rescueDialog .pagerArrowR:not(.off)').trigger('tap');
    } else {
      $('.scrollDialogClose')[0].click();
    }
  }
  window.findingUserList = setTimeout(function() {
    findUserList(text, position);
  }, 1000);
}

window.attack = function(attackBtn, times) {
  var attackBtns = $(attackBtn);
  if (times > 0 && attackBtns.length > 0 && attackBtns.css('display') != 'none') {
    attackBtns[0].click();
    setTimeout(function() {
      attack(attackBtn, times - 1);
    }, 400);
  } else {
    localStorage.removeItem('attack50');
    var href = localStorage.getItem('href');
    if (href) {
      localStorage.removeItem('href');
      location.href = href;
    } else {
      $('.mypage a')[0].click();
    }
  }
}

window.feedForBlazeCrowd = function(difficulty) {
  if (localStorage.getItem('feedForBlazeCrowd') !== 't' || location.href.indexOf('https://www.drapro-nutaku.dmmgames.com/blaze/index') != 0) {
    return;
  }

  doAutoBlazeCrowd('back');
}

window.startAnalytic = function() {
  if (localStorage.getItem('startAnalytic') !== 't' || location.href.indexOf('https://www.drapro-nutaku.dmmgames.com/gacha?') != 0) {
    return;
  }

  var acquiredTime = $('.frame:contains("L Rare Acquisition Info") .date').text().split(" ")[1];
  if (acquiredTime != localStorage.getItem('latestTime')) {
    localStorage.setItem('latestTime', acquiredTime);
    var hour = acquiredTime.split(':')[0];
    var freq = parseInt('0' + localStorage.getItem('freq:' + hour)) + 1;
    localStorage.setItem('freq:' + hour, freq);
  }

  setTimeout(function() {
    location.reload();
  }, 60000);
}

$('body').on('keyup', function(e) {
  switch (e.key) {
    case 'i':
      location.href = localStorage.getItem('itemsPage');
    break;

    case 'k':
      localStorage.setItem('killRaidBoss', 't');
      localStorage.removeItem('attackingCombo');
      killRaidBoss();
    break;

    case 'l':
      localStorage.removeItem('killRaidBoss');
      localStorage.removeItem('attackingCombo');
    break;

    case ';':
      localStorage.setItem('attackingCombo', 't');
      localStorage.removeItem('killRaidBoss');
      attackingCombo()
    break;

    case 'z':
      removeAllBCActions();
      localStorage.setItem('boostBlazeCrowd', 't');
      boostBlazeCrowd();
    break;

    case 'b':
      removeAllBCActions();
      localStorage.setItem('autoBlazeCrowd', 't');
      autoBlazeCrowd();
    break;

    case 'v':
      removeAllBCActions();
      localStorage.setItem('acceptNewReinforcementBlazeCrowd', 't');
      acceptNewReinforcementBlazeCrowd();
    break;

    case 'c':
      removeAllBCActions();
      if (findingUserList) {
        clearTimeout(findingUserList);
      }
    break;

    case 'n':
      removeAllBCActions();
      localStorage.setItem('feedForBlazeCrowd', 't');
      feedForBlazeCrowd('normal');
    break;

    case 'm':
      removeAllBCActions();
      localStorage.setItem('feedForBlazeCrowd', 't');
      feedForBlazeCrowd('hard');
    break;

    case ',':
      removeAllBCActions();
      localStorage.setItem('feedForBlazeCrowd', 't');
      feedForBlazeCrowd('death');
    break;

    case '.':
      removeAllBCActions();
      localStorage.setItem('acceptReinforcementBlazeCrowd', 't');
      acceptReinforcementBlazeCrowd();
      break;
    case 'q':
      localStorage.setItem('startAnalytic', 't');
      startAnalytic();
      break;
    case 'w':
      localStorage.removeItem('startAnalytic');
      break;
  }
});

killRaidBoss();
attackingCombo();
autoBlazeCrowd();
acceptReinforcementBlazeCrowd();
acceptNewReinforcementBlazeCrowd();
boostBlazeCrowd();
feedForBlazeCrowd();
startAnalytic();

if (location.href.indexOf('https://www.drapro-nutaku.dmmgames.com/blaze/gacha_result') == 0) {
  $($('form.taC')[$('form.taC').length - 1]).submit();
}

if (location.href.indexOf('https://www.drapro-nutaku.dmmgames.com/present/batch_receive') == 0) {
  $('.allReceiveBtn a')[0].click();
}

if (location.href.indexOf('https://www.drapro-nutaku.dmmgames.com/gacha/result/4') == 0) {
  $('form[name=rare_gacha_id_4]').submit();
}
