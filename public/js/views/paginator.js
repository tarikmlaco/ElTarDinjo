window.Paginator = Backbone.View.extend({

    className: "pagination pagination-centered",

    initialize:function () {
        this.model.bind("reset", this.render, this);
        this.render();
    },

    render:function () {

        var items = this.model.models;
        var len = items.length;
        var pageCount = Math.ceil(len / 8);

        $(this.el).html('<nav><ul class="pagination pagination-centered"></ul></nav>');
        $('ul', this.el).append('<li><a href="#oglasi/page/'+ ((this.options.page-1)==0?(this.options.page):(this.options.page-1)) +'" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>');

        for (var i=0; i < pageCount; i++) {
            $('ul', this.el).append("<li" + ((i + 1) === this.options.page ? " class='active'" : "") + "><a href='#oglasi/page/"+(i+1)+"'>" + (i+1) + "</a></li>");
        }
        $('ul', this.el).append('<li><a href="#oglasi/page/'+((this.options.page)==pageCount?(this.options.page):(this.options.page+1))+'" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>');
        return this;
    }
});