'use strict';

Module.register("MMM-ShowHideModules", {
	isDebug: null,
	isLoaded: null,
	activeModule: null,

	start: function() {
		this.isDebug = this.config.debug === true;
		this.debug('start', 'Module is started');

		this.title = "Loading...";
		this.activeModule = null;
		// this.sendNotification("HIDE_MODULE", this.config);
	},

	notificationReceived: function(notification, payload) {
		if (notification === 'MODULE_DOM_CREATED') {
			for (let i = 0; i < this.config.modules.length; i++) {
				const module = this.config.modules[i];
				if (i === 0) {
					this.activeModule = this.findAndChangeModuleState(module.module, module.header, 'nothing');
				} else {
					this.findAndChangeModuleState(module.module, module.header, 'hide');
				}
			}
		}
	},

	getStyles: function() {
	    return ['font-awesome.css', this.file(`./css/MMM-ShowHideModules.css`)];
	},

	getDom: function() {
		const wrapper = document.createElement("div");
		const links = [];
		for (let i = 0; i < this.config.modules.length; i++) {
			const module = this.config.modules[i];
			links.push(`<span class="${!i ? 'bright':''}" data-module="${module.module}" data-header="${module.header}">${module.header}</span>`)
		}
		wrapper.innerHTML = `<div class="dimmed">${links.join('')}</div>`;

		wrapper.addEventListener("click", this.onClick.bind(this));
		return wrapper;
	},

	onClick: function(event) {
		event.stopPropagation();
		if (event.target.className) {
			// prevent spamming the show/hide on the same module
			return;
		}

		const bright$ = event.target.parentNode.querySelector('.bright')
		if (bright$) {
			bright$.className = '';
		}
		event.target.className = 'bright'

		const dataModule = event.target.getAttribute('data-module');
		const dataHeader = event.target.getAttribute('data-header');
		if (dataModule && dataHeader) {
			if (this.activeModule) {
				this.changeModuleState(this.activeModule, 'hide');
			}
			this.activeModule = this.findAndChangeModuleState(dataModule, dataHeader, 'show');
		}
	},

	debug: function (fct, message) {
		if (this.isDebug === true) {
			Log.log(`%c[${this.identifier}]%c[${fct}]%c ${message}`, 'background:#ba7d5e;color:white;', 'background:#95ff0a;color:white', 'color:black');
		}
	},

	findAndChangeModuleState: function(dataModule, dataHeader, type) {
		const modules = MM.getModules();
		const module = modules.find(module => module.name === dataModule && module.data.header === dataHeader);
		this.debug('findAndChangeModuleState', `${dataModule} ${dataHeader} ${module}`);
		if (module) {
			this.changeModuleState(module, type);
			return module;
		}
		return null;
	},

	changeModuleState: function(module, type) {
		this.debug('changeModuleState', `${type} ${module.identifier}`)
		const callback = () => {
		};
		const options = { lockString: self.identifier };
		switch (type) {
			case "hide":
				module.hide(0, callback, options);
				break;
			case "show":
				module.show(0, callback, options);
				break;
			case "toggle":
				if (module.hidden) {
					module.show(0, callback, options);
				} else {
					module.hide(0, callback, options);
				}
				break;
		}
	}
});
