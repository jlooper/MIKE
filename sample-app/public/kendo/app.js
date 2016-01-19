window.MIKE = (function($){
	var _window = $(window);
	var _MIKE = {};
	var _kendoRouter = {};
	var _baseLayout = {};
	var _contactView = {};
	var _listView = {};
	var _homeView = {};

	
	
	//set up our views, layout, and routes
	_MIKE.initSPA = function() {

			
		_baseLayout = new kendo.Layout('base-layout-template');

		_kendoRouter = new kendo.Router();
		

		_kendoRouter.bind('change', function(e) {
			_MIKE.setStyles();
		});	

		_contactView = new kendo.View('contact-view', {
			model: window.Contact.getContactModel()
		});

		_listView = new kendo.View('list-view', {
			model: window.List.getListModel()
		});
		
		_homeView = new kendo.View('home-view', {
		});
		
		_kendoRouter.route('/', function() {
			_baseLayout.showIn('#content', _homeView);
		});
		
		_kendoRouter.route('/contact', function() {
			_baseLayout.showIn('#content', _contactView);
		});

		_kendoRouter.route('/list', function() {
			_baseLayout.showIn('#content', _listView);
		});

		
		
		
	}

	//start our router and render our initial view
	_MIKE.startSPA = function() {
		_kendoRouter.start();
		_baseLayout.render('#main');
	}

	_MIKE.getLists = function() {

		var template = kendo.template("<div><tr><td>#= rName #</td><td>#= time # minutes</td><td>#= heat # degrees</td><td>You need #= ing1num # #= ing1unit # #= ing1 #, #= ing2num # #= ing2unit # #= ing2 #, #= ing3num # #= ing3unit # #= ing3 # </td><td>#= procedure #</td><td><span id=#= _id # class='removeItem'>x</span></td></tr></div>");

            var dataSource = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: "/api/lists/",
                        dataType: "json"
                    }
                }
            });

            $("#recipeListView").kendoListView({
                dataSource: dataSource,
                template: kendo.template(template)
            });
			
			$("#recipeListView").on("click", ".removeItem", function(e) {
			   $.ajax({
					url: '/api/list/'+e.currentTarget.id+'',
					type: 'delete',
					contentType: 'application/json',
					success: function(result) {
	            		$('#recipeListView').data('kendoListView').dataSource.read();
	        		}
				}).done(function(data) {
					$("#step3next").prop('disabled', false);
					$("#step3submit").prop('disabled', true);
					$('.alert-success').toggle();
					$(".success-message").html(data.message);
				}).fail(function(data) {
					$("#step3next").prop('disabled', true);
					$("#step3submit").prop('disabled', false);					
					$('.alert-danger').toggle();
					$(".failure-message").html(data.message);
				});
            		   
            }); 

	}
	
	_MIKE.setStyles = function() {
		//this can vary depending on where a user enters the application
		var currentView = document.URL.split('#/')[1];
		console.log(currentView)
		$('.navbar-nav>li').removeClass('active')


		if(currentView === undefined || currentView === '') {
			$('.navbar-nav>li.home').addClass('active');
		}
		else {
			$('.navbar-nav>li.' + currentView + '').addClass('active');
		}


		$('.btn-toggle').click(function() {
		    $(this).find('.btn').toggleClass('active');  
		    
		    if ($(this).find('.btn-primary').size()>0) {
		    	$(this).find('.btn').toggleClass('btn-primary');
		    }
		    if ($(this).find('.btn-danger').size()>0) {
		    	$(this).find('.btn').toggleClass('btn-danger');
		    }
		    if ($(this).find('.btn-success').size()>0) {
		    	$(this).find('.btn').toggleClass('btn-success');
		    }
		    if ($(this).find('.btn-info').size()>0) {
		    	$(this).find('.btn').toggleClass('btn-info');
		    }
		    
		    $(this).find('.btn').toggleClass('btn-default');
       
		});


	}


	//start the app
	_MIKE.startApp = function () {
			this.initSPA();
			this.startSPA();
			this.getLists();
			this.setStyles();
	}

	return _MIKE;

})(jQuery);