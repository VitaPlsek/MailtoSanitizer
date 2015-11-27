(function(global) {
  "use strict";

  function MailtoSanitizer(at, dot) {
    this.at = at || 'at';
    this.dot = dot || 'dot';
  }

  MailtoSanitizer.prototype.mailto = function(input) {
    var email = this.replace(input);
    return this.enclusureWithATag_(email);
  };

  MailtoSanitizer.prototype.replace = function(input) {
    return input.replace(this.getAtReplacement_(), "@")
      .replace(this.getDotReplacement_(), ".");
  };

  MailtoSanitizer.prototype.enclusureWithATag_ = function(email) {
    return '<a href="mailto:' + email + '">' + email + '</a>';
  };

  MailtoSanitizer.prototype.getAtReplacement_ = function() {
    return this.parenthise(this.at);
  };

  MailtoSanitizer.prototype.getDotReplacement_ = function() {
    return this.parenthise(this.dot);
  };

  MailtoSanitizer.prototype.parenthise = function(input) {
    return "(" + input + ")";
  };

  global.MailtoSanitizer = MailtoSanitizer;

  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = MailtoSanitizer;
  }

})(typeof window !== "undefined" ? window : this);
