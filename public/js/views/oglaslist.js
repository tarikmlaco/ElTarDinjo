window.OglasListView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        var oglasi = this.model.models;
        var len = oglasi.length;
        var startPos = (this.options.page - 1) * 8;
        var endPos = Math.min(startPos + 8, len);

        $(this.el).html('<h3>Stambeni prostori</h3><div class="list-group thumbnails"></div>');

        for (var i = startPos; i < endPos; i++) {
            $('.thumbnails', this.el).append(new OglasListItemView({model: oglasi[i]}).render().el);
        }

        $(this.el).append(new Paginator({model: this.model, page: this.options.page}).render().el);

        return this;
    }
});

window.OglasListItemView = Backbone.View.extend({
    tagName: 'a',
    className: "list-group-item",

    initialize: function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});