;var xjModules = {
	body: function () {
		return document.getElementsByTagName('body')[0]
	},
	getDom: function (className) {
		return document.getElementsByClassName(className)
	},
	loading: function () {
		if(this.getDom('xj-loading-container').length === 0 ){
			var div = document.createElement('div')
			div.className = 'xj-loading-container'
			div.innerHTML = '<div class="xj-loading"></div>'
			this.body().appendChild(div)
		}
	},
	removeLoading: function () {
		if (this.getDom('xj-loading-container').length > 0) {
			this.body().removeChild(this.getDom('xj-loading-container')[0])
		}
	}
}