/**
 * Created by Tarik on 15.4.2015.
 */
window.CarouselView = Backbone.View.extend({
    events: {
        'click .carousel-prev': 'prev',
        'click .carousel-next': 'next'
    },
    isDone: true,
    initialize: function(options) {
        $(this.el).html(this.template());
        isDone=true;
        //_.bindAll(this);
        this.items = _.map(this.$('.carousel-item').hide(), function(i) { return i; });
        this.current = 0;
        this.render();
    },
    render: function() {
        $(this.items[this.current]).show();
        return this;
    },
    prev: function() {
        if(isDone) {
            isDone=false;
            $(this.items[this.current]).fadeOut(function () {
                this.current = this.current - 1;
                if (this.current === -1) {
                    this.current = this.items.length - 1
                }
                $(this.items[this.current]).fadeIn(function(){
                    isDone=true;
                });
            }.bind(this));
        }
    },
    next: function() {
        if(isDone) {
            isDone=false;
            $(this.items[this.current]).fadeOut(function () {
                this.current = this.current + 1;
                if (this.current === this.items.length) {
                    this.current = 0
                }
                $(this.items[this.current]).fadeIn(function(){
                    isDone=true;
                });
            }.bind(this));
        }
    }
});