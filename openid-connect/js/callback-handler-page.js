// callback-handler-page.js
// ------------------------------------------------------------------
//
// for callback-handler.html
//
// created: Thu Oct  1 13:37:31 2015
// last saved: <2017-March-06 14:06:33>


function decodeToken(matches) {
  if (matches.length == 4) {
    var $decodeddiv = $("#id_token-decoded");
    $decodeddiv.html = 'decoded JWT here';
  }
}

function formatIdToken() {
  var $$ = $( '#id_token-value div.cb-value' ),
      text = $$.text(),
      re1 = new RegExp('^([^\\.]+)\\.([^\\.]+)\\.([^\\.]+)$');
  if (text) {
    text = text.replace(re1, '<span class="jwt-header">$1</span>.<span class="jwt-payload">$2</span>.<span class="jwt-signature">$3</span');
    $$.html(text);
    decodeToken(re1.exec(text));
  }
}


$(document).ready(function() {
  var search = window.location.hash,
      hash = {},
      fnStartsWith = function(s, searchString, position) {
        position = position || 0;
        return s.lastIndexOf(searchString, position) === position;
      };

  if ( ! search || search === '') {
    search = window.location.search.replace('?', '');
  }

  search.split('&').forEach(function(item){
    var e = item.split('=');
    if (e[0] && e[0] !== '') {
      if (fnStartsWith(e[0], '#')) { e[0] = e[0].substring(1); }
      hash[e[0]] = decodeURIComponent(e[1]);
    }
  });

  // emit that information into fields in the output:
  var $$ = $('#output');
  $$.empty();

  Object.keys(hash).forEach(function(key){
    if (key) {
      var $newdiv = $("<div id='"+ key +"-value' class='cb-element'/>");
      if (key != 'id_token') {
        $newdiv.addClass("cb-clearfix");
      }
      $newdiv.html('<div class="cb-label">' + key + ':</div><div class="cb-value">' + hash[key] + '</div>');
      $$.append($newdiv);
      if (key == 'id_token') {
        $newdiv = $("<div id='"+ key +"-decoded' class='cb-element'/>");        
        $newdiv.addClass("cb-clearfix");
        //$newdiv.html('<div class="cb-label">' + key + ':</div><div class="cb-value">' + hash[key] + '</div>');
        $$.append($newdiv);
      }
    }
  });

  setTimeout(formatIdToken, 2600);

});
