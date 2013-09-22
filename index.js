var classes = require('classes'),
	domify = require('domify'),
	Emitter = require('emitter'),
	events = require('events'),
	prevent = require('prevent'),
	stop = require('stop'),
	template = require('./templates/template.html');


module.exports = UICheckbox;

/**
 * @class UICheckbox
 * Input Checkbox
 *
 * @constructor
 * Creates a new Checkbox instance.
 * @param {HTMLElement} [el] The input HTML element.
 */
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
	this.events();

	if (this.checkbox.checked) {
		this.check();
	} else {
		this.uncheck();
	}

	return this;
};

fn.events = function() {
	this.elEvents = events(this.el, this);
	this.elEvents.bind('click', 'onCheck');
};

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
		return this.checkbox.name;
	}

	this.checkbox.name = name;
	return this;
};

fn.onCheck = function(e) {
	prevent(e);
	stop(e);

	this.toggle();
};

fn.unbind = function() {
	this.elEvents.unbind('click', 'onCheck');
};

fn.destroy = fn.unbind;

fn.isChecked = function() {
	return this.checkbox.checked;
};

fn.val = fn.isChecked;