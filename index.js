var classes = require('classes')
  , domify = require('domify')
  , Emitter = require('emitter')
  , events = require('events')
  , prevent = require('prevent')
  , stop = require('stop')
  , template = require('./templates/template.html');


module.exports = UICheckbox;

function UICheckbox(el) {
	this.el = el || domify(template);

  	this.init();
}


var fn = UICheckbox.prototype;
Emitter(fn);

fn.init = function() {
	this.checkbox = this.el.querySelector('input');

	if (!this.checkbox) { return this; }

	this.classes = classes(this.el);
	this.events = events(this.el, this);

	this.events.bind('click');

	if (this.checkbox.checked) {
		this.check();
	} else {
		this.uncheck();
	}

	return this;
}

fn.check = function() {
	this.checkbox.checked = true;
	this.classes
		.remove('ui-checkbox-unchecked')
		.add('ui-checkbox-checked');

	this.emit('change', true);

	return this;
};

fn.uncheck = function() {
	this.checkbox.checked = false;
	this.classes
		.remove('ui-checkbox-checked')
		.add('ui-checkbox-unchecked');

	this.emit('change', false);
	return this;
};

fn.toggle = function() {
	if (this.checkbox.checked) {
		this.uncheck();
	} else {
		this.check();
	}

	return this;
};

fn.name = function(name) {
	if (!name) {
		return value(this.checkbox);
	}

	this.checkbox.name = name;
	return this;
};

fn.onclick = function(e) {
	prevent(e);
	stop(e);

	this.toggle();
};

fn.destroy = function() {

};

fn.isChecked = function() {
	return this.checkbox.checked;
};