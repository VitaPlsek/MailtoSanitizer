describe('Mailto sanitizer', function() {

  describe('replace method', function() {
    var email = "name(zavinac)domain(tecka)cz";

    beforeEach(function() {
      this.mailtoSanitizer = new MailtoSanitizer("zavinac", "tecka");
      this.replaced = this.mailtoSanitizer.replace(email);
    });

    it('should leave domain, name and country', function() {
      expect(this.replaced).toMatch('name');
      expect(this.replaced).toMatch('domain');
      expect(this.replaced).toMatch('cz');
    });

    it('should remove zavinac and tecka ', function() {
      expect(this.replaced).not.toMatch('(zavinac)');
      expect(this.replaced).not.toMatch('(tecka)');
    });

    it('should remove zavinac and tecka without ()', function() {
      expect(this.mailtoSanitizer.replace('zavinac')).toMatch('zavinac');
      expect(this.mailtoSanitizer.replace('tecka')).toMatch('tecka');
    });

    it('should migrate mail correctly', function() {
      expect(this.replaced).toMatch('name@domain.cz');
    });

    describe('with default configuration', function() {
      it('should replace dot and at', function() {
        this.mailtoSanitizer = new MailtoSanitizer();

        var replaced = this.mailtoSanitizer.replace('name(at)domain(dot)cz');
        expect(replaced).toMatch('name@domain.cz');
      })
    });

  });

  describe('mailto transformation', function() {
    beforeEach(function() {
      this.mailtoSanitizer = new MailtoSanitizer();

      var email = 'name(at)domain(dot)cz';
      this.mailto = this.mailtoSanitizer.mailto(email);
    });

    it('should contain mailto: and a href', function() {
      expect(this.mailto).toMatch('mailto:');
      expect(this.mailto).toMatch('a href');
    });

    it('should have linked email', function() {
      expect(this.mailto).toBe('<a href="mailto:name@domain.cz">name@domain.cz</a>');
    });
  });

});
