describe('ui-checkbox', function() {
    var UICheckbox = require('ui-checkbox');

    beforeEach(function() {
        this.el = document.querySelector('.ui-checkbox');
        this.checkbox = new UICheckbox(this.el);
    });

    afterEach(function() {

    });



    it('should return instance of ui-checkbox', function() {
        expect(this.checkbox).to.be.an.instanceof(UICheckbox);
    });

    it('should respondTo init and destroy methods', function() {
        expect(this.checkbox).to.respondTo('init');
        expect(this.checkbox).to.respondTo('destroy');
    });


    describe('#isChecked()', function(){
        it('should be checked', function() {
            expect(this.checkbox.isChecked()).to.be.true;
        });
    });


    describe('#uncheck()', function(){
        it('should be unchecked', function() {
            this.checkbox.uncheck();
            expect(this.checkbox.isChecked()).to.be.false;
        });

        it('should be checked', function() {
            this.checkbox.check();
            expect(this.checkbox.isChecked()).to.be.true;
        });
    });

});
