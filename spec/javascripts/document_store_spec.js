//= require 'sinon-rails'
//= require application

describe("DocumentStore", function() {
    it("works", function() {
        DocumentStore.listen(function(store) {
            expect(store.raw).to.equal('hesj');
        });
        DocumentActions.initialize({
            raw: 'hej'
        });
    });
});
