[![Build Status](https://travis-ci.org/winsik/MailtoSanitizer.svg?branch=master)](https://travis-ci.org/winsik/MailtoSanitizer)

# MailtoSanitizer

Simple utility for transformation sanitized email in mailto element.

## Instalation

### Bower

```
bower install mailto-sanitizer
```

### Npm

```
npm install mailto-sanitizer
```

## Usage

### Default behavior

replaceMethod replaces string a
(at) and (dot) are replaced with @ and .

```javascript
var sanitizer = new MailtoSanitizer();

var mailto = sanitizer.replace('name(at)domain(dot).cz');
console.log(mailto); // <a href="mailto:name@domain.cz">name@domain.cz</a>
```

### Configurable replacements
At and dot replacements can be configured with constructor parameters.


```javascript
var sanitizer = new MailtoSanitizer('zavináč', 'tečka');

var mailto = sanitizer.replace('name(zavináč)domain(tečka).cz');
console.log(mailto); // <a href="mailto:name@domain.cz">name@domain.cz</a>
```

### Example with element replacement

```html
<span class="email-replace">angular(zavináč)angular(tečka)cz</span>
```

```javascript
var sanitizer = new MailtoSanitizer("zavináč", "tečka");
var text = $('.email-replace').each(function() {
  $(this).html(sanitizer.replace($(this).html()));
});
```