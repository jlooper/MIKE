window.MIKE = (function($){
	var _window = $(window);
	var _MIKE = {};
	var _kendoRouter = {};
	var _baseLayout = {};
	var _contactView = {};
	var _homeView = {};
	
	//set up our views, layout, and routes
	_MIKE.initSPA = function() {


		_baseLayout = new kendo.Layout('base-layout-template');

		_kendoRouter = new kendo.Router();
		

		_kendoRouter.bind('change', function(e) {
			_MIKE.selectMenuItem();
		});		

		_contactView = new kendo.View('contact-view', {
			model: window.Contact.getContactModel()
		});
		
		_homeView = new kendo.View('home-view', {
			
		});
		
		_kendoRouter.route('/', function() {
			_baseLayout.showIn('#content', _homeView);
		});

		_kendoRouter.route('/contact', function() {
			_baseLayout.showIn('#content', _contactView);
		});

		
		
	}

	//start our router and render our initial view
	_MIKE.startSPA = function() {
		_kendoRouter.start();
		_baseLayout.render('#main');
	}

	
	_MIKE.selectMenuItem = function() {
		//this can vary depending on where a user enters the application
		var currentView = document.URL.split('#/')[1];
		
		$('.navbar-nav>li').removeClass('active')

		if(currentView === undefined || currentView === '') {
			$('.navbar-nav>li.home').addClass('active');
		}
		else {
			$('.navbar-nav>li.' + currentView + '').addClass('active');
		}
	}


	//start the app
	_MIKE.startApp = function () {
			this.initSPA();
			this.startSPA();
			this.selectMenuItem();
	}

	return _MIKE;

})(jQuery);