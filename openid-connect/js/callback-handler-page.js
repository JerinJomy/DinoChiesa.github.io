// callback-handler-page.js
// ------------------------------------------------------------------
//
// for callback-handler.html
//
// created: Thu Oct  1 13:37:31 2015
// last saved: <2019-August-29 17:37:10>
/* jshint esversion: 9 */
/* global $, atob */

function decodeToken(matches) {
  if (matches.length == 4) {
    var styles = ['header','payload','signature'];
    var $decodeddiv = $('#id_token-decoded');
    matches.slice(1,-1).forEach(function(item,index){
      var json = atob(item);
      var obj = JSON.parse(json);
      $decodeddiv.append('<pre class="jwt-'+ styles[index] +'">' +
                         JSON.stringify(obj,null,2) +
                         '</pre>');
    });
  }
}

function formatIdToken() {
  let $$ = $( '#id_token-value div.cb-value' ),
      text = $$.text(),
      re1 = new RegExp('^([^\\.]+)\\.([^\\.]+)\\.([^\\.]+)$');
  if (text) {
    decodeToken(re1.exec(text));
    text = text.replace(re1, '<span class="jwt-header">$1</span>.<span class="jwt-payload">$2</span>.<span class="jwt-signature">$3</span');
    $$.html(text);
  }
}

function copyButtonHtml(targetElementId) {
  let html = '<button type="button" title="copy to clipboard" class="btn btn-default btn-md btn-copy" ' +
    'data-target="'+targetElementId+'" title="copy to clipboard">\n' +
    '  <span class="glyphicon glyphicon-copy"></span>\n' +
    '</button>\n';
  return html;
}

function copyToClipboard(event) {
  let $elt = $(this),
      sourceElement = $elt.data('target'),
      // grab the element to copy
      $source = $('#' + sourceElement),
      // Create a temporary hidden textarea.
      $temp = $("<textarea>"),
      textToCopy = ($source[0].tagName == 'TEXTAREA') ? $source.val() : $source.text();

  $("body").append($temp);
  $temp.val(textToCopy).select();
  document.execCommand("copy");
  $temp.remove();
}

$(document).ready(function() {
  let search = window.location.hash,
      hash = {},
      fnStartsWith = function(s, searchString, position) {
        position = position || 0;
        return s.lastIndexOf(searchString, position) === position;
      };

  if ( ! search || search === '') {
    search = window.location.search.replace('?', '');
  }

  search.split('&').forEach(function(item){
    let e = item.split('=');
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
      let $newdiv = $("<div id='"+ key +"-value' class='cb-element cb-clearfix'/>"),
          valueId = 'val-' + Math.random().toString(36).substring(2, 15),
          html = {
            label : '<div class="cb-label">' + key + ':' + copyButtonHtml(valueId) +'</div>',
            value : '<div id="' + valueId + '"class="cb-value">' + hash[key] + '</div>'
          };
      $newdiv.html(html.label + html.value);
      $$.append($newdiv);
      if (key == 'id_token') {
        $newdiv.append("<div id='id_token-decoded' class='jwt-decoded'/>");
      }
    }
  });

  $( '.btn-copy' ).on('click', copyToClipboard);

  setTimeout(formatIdToken, 2100);

});
