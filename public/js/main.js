var AppRouter = Backbone.Router.extend({

    routes: {
        ""                  : "home",
        "oglasi"	            : "list",
        "oglasi/page/:page"	: "list",
        "oglasi/add"         : "addOglas",
        "oglasi/:id"         : "oglasDetails",
        "about"             : "about",
        "login"             : "login",
        "users"             : "users"
    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);
    },

    /*

    home: function (id) {
        if (!this.homeView) {
            this.homeView = new HomeView();
        }
        $('#content').html(this.homeView.el);
        this.headerView.selectMenuItem('home-menu');
    },
*/
    home: function (id) {
        if (!this.carouselView) {
            this.carouselView = new CarouselView();
        }
        $('#content').html(this.carouselView.el);
        this.headerView.selectMenuItem('home-menu');
    },

	list: function(page) {
        var p = page ? parseInt(page, 10) : 1;
        var oglasiList = new OglasCollection();
        oglasiList.fetch({success: function(){
            $("#content").html(new OglasListView({model: oglasiList, page: p}).el);
        }});
        this.headerView.selectMenuItem('home-menu');
    },

    users: function(page) {
        var p = page ? parseInt(page, 10) : 1;
        var usersList = new UsersCollection();
        usersList.fetch({success: function(){
            $("#content").html(new UserListView({model: usersList, page: p}).el);
        }});
        this.headerView.selectMenuItem('home-menu');
    },

    oglasDetails: function (id) {
        var oglas = new Oglas({_id: id});
        oglas.fetch({success: function(){
            $("#content").html(new OglasView({model: oglas}).el);
        }});
        this.headerView.selectMenuItem();
    },

	addOglas: function() {
        var oglas = new Oglas();
        $('#content').html(new OglasView({model: oglas}).el);
        this.headerView.selectMenuItem('add-menu');
	},

    about: function () {
        if (!this.aboutView) {
            this.aboutView = new AboutView();
        }
        $('#content').html(this.aboutView.el);
        this.headerView.selectMenuItem('about-menu');
    },

    login: function () {
        if (!this.loginView) {
            this.loginView = new LoginView();
        }
        $('#content').html(this.loginView.el);
        this.headerView.selectMenuItem('about-menu');
    }

});

utils.loadTemplate(['HomeView', 'HeaderView', 'OglasView', 'OglasListItemView','UserListItemView', 'AboutView', 'LoginView', 'CarouselView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});