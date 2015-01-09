window.Contact = (function($){
	var _contactModule = {};
	var _contactViewModel = {};

	
	//temporary before RequireJS
	_contactViewModel = kendo.observable({
		fName: '',
		lName: '',
		email: '',
		schedule: '',
		status: '',
		message: '',


		
		submitContactRequest: function(e){

			e.preventDefault();

			var dataToPost = {
				lName: _contactViewModel.get('lName'),
				fName: _contactViewModel.get('fName'),
				email: _contactViewModel.get('email'),
				schedule: _contactViewModel.get('schedule'),
				status: _contactViewModel.get('status'),
				message: _contactViewModel.get('message')
			};

			var serializedDataToPost = JSON.stringify(dataToPost);

			$.ajax({
				url: '/api/contacts',
				type: 'post',
				data: serializedDataToPost,
				contentType: 'application/json'
			}).done(function(data) {
				$('.alert-success').toggle();
				$(".success-message").html(data.message);
			}).fail(function(data) {
				$('.alert-danger').toggle();
				$(".fail-message").html(data.message);
			});
		}
	});

	_contactModule.getContactModel = function() {
		return _contactViewModel;
	}

	return _contactModule;

})(jQuery);