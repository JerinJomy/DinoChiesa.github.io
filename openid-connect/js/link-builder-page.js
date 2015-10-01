// link-builder-page.js
// ------------------------------------------------------------------
//
// page logic for link-builder.html
//
// created: Thu Oct  1 13:37:31 2015
// last saved: <2015-October-01 14:52:34>


var model = {
      edgeorg : '',
      edgeenv : '',
      clientid : '',
      cburi : '',
      rtype : [],
      scope : []
    };

function updateLink() {
  var linkTemplate = "https://${edgeorg}-${edgeenv}.apigee.net/oauth2/v1/authorize?client_id=${clientid}&redirect_uri=${cburi}&response_type=${rtype}&state=12345&scope=${scope}";
  Object.keys(model).forEach(function(key) {
    var pattern = "${" + key + "}", value = '';
    if (model[key]) {
     value = (typeof model[key] != 'string') ? model[key].join('+') : model[key];
    }
    linkTemplate = linkTemplate.replace(pattern,value);
  });
  $('#authzlink').text(linkTemplate);
  $('#authzlink').attr('href', linkTemplate);
}

function onInputChanged() {
  // Check input( $( this ).val() ) for validity here
  var $$ = $(this), name = $$.attr('id'), value = $$.val();
  model[name] = value;
  updateLink();
}

function onSelectChanged() {
  var $$ = $(this), name = $$.attr('name'), values = [];
  $$.find("option:selected" ).each(function() {
    values.push($( this ).text());
  });
  model[name] = values;
  updateLink();
}

function updateModel(event) {

  Object.keys(model).forEach(function(key) {
    var $item = $('#' + key), value = $item.val();
    model[key] = value;
  });
  updateLink();

  if (event)
    event.preventDefault();
}

$(document).ready(function() {
  $('.rtype-chosen').chosen({
    no_results_text: "No matching response types...",
    allow_single_deselect: true
  });
  $('.scope-chosen').chosen({
    no_results_text: "No matching scopes...",
    allow_single_deselect: true
  });


  $( "form input[type='text']" ).change(onInputChanged);
  $( "form select" ).change(onSelectChanged);
  $( "form button" ).submit(updateModel);

  updateModel();

});
