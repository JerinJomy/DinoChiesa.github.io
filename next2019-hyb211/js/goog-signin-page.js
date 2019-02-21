// goog-signin-page.js
// ------------------------------------------------------------------
/* jshint esversion: 8, node: false */
/* global console, Buffer, window */

(function (){
  'use strict';

  function oneDiv(label, value) {
    return '<div class="label">'+ label +'</div>' +
      '<div class="value">' + value + '</div>';
  }

  function onSignIn(googleUser) {
    var elt = document.getElementById("output");
    var profile = googleUser.getBasicProfile();
    var html = oneDiv('ID',  profile.getId()) +
      oneDiv('Full Name', profile.getName()) +
      oneDiv('Given Name',  profile.getGivenName()) +
      oneDiv('Family Name', profile.getFamilyName()) +
      oneDiv("Email", profile.getEmail()) +
      '<div class="image"><img src="' + profile.getImageUrl() + '"></div>';

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    html += oneDiv("ID Token", id_token);
    elt.innerHTML = html;
  }

  window.onSignIn = onSignIn;

}());
