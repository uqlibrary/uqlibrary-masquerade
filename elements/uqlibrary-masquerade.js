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
				value: 'Library masquerade'
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
      var url = "https://www.library.uq.edu.au/uqlais/masquerade?" +
        "user=" + this._masqueradeValue;

      window.location.href = url;
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