window.Contact = (function($){
	var _contactModule = {};
	var _contactViewModel = {};

	$("#timepicker").kendoTimePicker();

	//temporary before RequireJS
	_contactViewModel = kendo.observable({
		unit: '',
		age: 0,
		height: 0,
		gender: '',
		calipers: true,
		heightDisplay: '(cm)',
		unitSelect: function() {
			if(this.get('unit') === 'metric') {
				this.set('heightDisplay', '(cm)');
			}
			else if(this.get('unit') === 'imperial') {
				this.set('heightDisplay', '(in)');
			}
		},
		saveSettings: function() {
			var dataToPost = {
				unit: _contactViewModel.get('unit'),
				age: _contactViewModel.get('age'),
				height: _contactViewModel.get('height'),
				gender: _contactViewModel.get('gender'),
				calipers: _contactViewModel.get('calipers')
			};

			var serializedDataToPost = JSON.stringify(dataToPost);

			$.ajax({
				url: '/settings',
				type: 'put',
				data: serializedDataToPost,
				contentType: 'application/json'
			}).done(function() {
				console.log('Settings saved!');
			}).fail(function() {
				console.log('Settings failed to save.');
			});
		},
		loadSettings: function() {
			/*$.ajax({
				url: '/settings',
				type: 'get',
				contentType: 'application/json'
			}).done(function(userData) {
				if(userData) { //did we actually save data?
					_contactViewModel.set('unit', userData.unit);
					_contactViewModel.set('age', userData.age);
					_contactViewModel.set('height', userData.height);
					_contactViewModel.set('gender', userData.gender);
					_contactViewModel.set('calipers', userData.calipers);

					console.log('User settings successfully loaded!')
				}
			}).fail(function() {
				console.log('Something went wrong while loading user settings.');
			});*/
		}
	});

	_contactModule.getSettingsModel = function() {
		return _contactViewModel;
	}

	return _contactModule;

})(jQuery);