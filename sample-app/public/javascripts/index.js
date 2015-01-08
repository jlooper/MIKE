/*(function() {

	$("#timepicker").kendoTimePicker();
	
	  	var model = kendo.observable({

  			//model goes here, including click actions
 			var layout = new kendo.Layout('#layout'),
  			var views = {
    			about: new kendo.View('#about')
    		},
  			var router = new kendo.Router({
			    init: function() {
			      // render the layout first
			      layout.render('#root');
			    }
			  });

			  router.route('/about', function() {
			    layout.showIn("#content", views.about);
			  });
   
  		});

  kendo.bind(document.body, model);

}());*/

(function() {

$("#timepicker").kendoTimePicker();

  // declare thee datasource outside of the grid
  // so we can control which page of data to show
  var dataSource = new kendo.data.DataSource({
    type: 'odata',
    transport: {
      read: 'http://demos.kendoui.com/service/Northwind.svc/Orders'
    },
    pageSize: 20,
    serverPaging: true
  });

  

}());