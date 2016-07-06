/**
 * By Jan-Willem Wisgerhof <j.wisgerhof@uq.edu.au>
 */
(function () {
	Polymer({
		is: 'uqlibrary-masquerade',
		properties: {
			/**
			 * Whether to show the hamburger menu
			 */
			standAlone: {
				type: Object,
				value: true
			},
			/**
			 * Whether the Masquerade app should auto load the API
			 * @type Boolean
			 */
			autoLoad: {
				type: Object,
				value: true
			},
			/**
			 * header title - application name
			 */
			headerTitle: {
				type: String,
				value: 'Masquerade'
			},
		  	/**
			 * The entered value
		   	 */
			_masqueradeValue: {
				type: String,
				value: ''
		  	},
		  	/**
		   	 * Holds the user object
		   	 */
		  	_account: {
				type: Object,
				value: {
			  		hasSession: false
				}
      		}
		},
		ready: function () {
			var self = this;
			this.$.accountApi.addEventListener('uqlibrary-api-account-loaded', function (e) {
				if (e.detail.hasSession) {
					self._account = e.detail;
				} else {
					self.$.accountApi.login(document.location.href);
				}

        self.fire("uqlibrary-masquerade-loaded");
			});

			this.$.accountApi.get();
		},
    /**
     * Called when the user clicks the masquerade button
     * @private
     */
    _masquerade: function () {
			
			//first character has to be a string (student number is valid, but can't get get all data, so use user id)
			if (!parseInt(this._masqueradeValue[0])) {
				var url = 'https://www.library.uq.edu.au/uqlais/masquerade?' +
						'user=' + this._masqueradeValue + '&return=' + window.btoa(window.location.href);

				document.cookie = 'UQLMasquerade=' + this._masqueradeValue;
				window.location.href = url;
			}
    },
		/**
		 * Toggles the drawer panel of the main UQL app
		 * @private
		 */
		_toggleDrawerPanel: function () {
			this.fire('uqlibrary-toggle-drawer');
		}
	})
})();