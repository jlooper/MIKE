window.Contact = (function($){
	var _contactModule = {};
	var _contactViewModel = {};

	
	//temporary before RequireJS
	_contactViewModel = kendo.observable({
		fName: '',
		lName: '',
		email: '',
		schedule: '',
		phone: '',
		message: '',


		
		submitContactRequest: function(e){

			e.preventDefault();

			var dataToPost = {
				lName: _contactViewModel.get('lName'),
				fName: _contactViewModel.get('fName'),
				email: _contactViewModel.get('email'),
				schedule: _contactViewModel.get('schedule'),
				phone: _contactViewModel.get('phone'),
				message: _contactViewModel.get('message')
			};

			var serializedDataToPost = JSON.stringify(dataToPost);

			var validator = $("#contactForm").kendoValidator().data("kendoValidator");
            
            if (validator.validate()) {
			
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

			} else {
                $('.alert-danger').toggle();
				$(".failure-message").html("Sorry, you seem to be missing some information. Please correct the errors before proceeding");
            }
		}
	});

	_contactModule.getContactModel = function() {
		return _contactViewModel;
	}

	return _contactModule;

})(jQuery);