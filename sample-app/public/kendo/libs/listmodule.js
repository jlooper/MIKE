window.List = (function($){
	var _listModule = {};
	var _listViewModel = {};

	_listViewModel = kendo.observable({
		rName: '',
		time: '',
		heat: '',
		ing1num: '',
		ing1unit: '',
		ing1: '',
		ing2num: '',
		ing2unit: '',
		ing2: '',
		ing3num: '',
		ing3unit: '',
		ing3: '',
		procedure: '',

		

		submitListRequest: function(e){

			e.preventDefault();

			var dataToPost = {
				rName: _listViewModel.get('rName'),
				time: _listViewModel.get('time'),
				heat: _listViewModel.get('heat'),
				ing1num: _listViewModel.get('ing1num'),
				ing1unit: _listViewModel.get('ing1unit'),
				ing1: _listViewModel.get('ing1'),				
				ing2num: _listViewModel.get('ing2num'),
				ing2unit: _listViewModel.get('ing2unit'),
				ing2: _listViewModel.get('ing2'),
				ing3num: _listViewModel.get('ing3num'),
				ing3unit: _listViewModel.get('ing3unit'),
				ing3: _listViewModel.get('ing3'),
				procedure: _listViewModel.get('procedure')
			};

			var serializedDataToPost = JSON.stringify(dataToPost);

			var validator = $("#recipeForm").kendoValidator().data("kendoValidator");
            
            if (validator.validate()) {
			
			$.ajax({
				url: '/api/lists',
				type: 'post',
				data: serializedDataToPost,
				contentType: 'application/json',
				success: function(result) {
            		$('#recipeListView').data('kendoListView').dataSource.read();
        		}
			}).done(function(data) {
				$('.alert-success').toggle();
				$(".success-message").html(data.message);
			}).fail(function(data) {
				$('.alert-danger').toggle();
				$(".fail-message").html(data.message);
			});
			} else {
                $('.alert-danger').toggle();
				$(".failure-message").html("Sorry, you seem to be missing some information. All fields are required.");
            }
		}


	});

	_listModule.getListModel = function() {
		return _listViewModel;
	}

	return _listModule;

})(jQuery);