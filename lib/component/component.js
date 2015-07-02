Template.CodeMirror.onRendered(function() {
  var self = this;

  self.options = _.extend({
  	codemirror: {
  		lineNumbers: true
  	},
  	reactiveCode: new ReactiveVar('')
  }, self.data.options);

	var textarea = this.find('textarea');
	var editor = CodeMirror.fromTextArea(textarea, 
																			 self.options.codemirror);

	editor.on('change', function(doc) {
		var val = doc.getValue();
		textarea.value = val;
		self.options.reactiveCode.set(val);
	});

	Tracker.autorun(function () {
		var val = self.options.reactiveCode.get();
		if(val != editor.getValue()) {
			editor.setValue(val);
		}
	});

});

Template.CodeMirror.onDestroyed(function() {
	this.$('textarea').parent().find('.CodeMirror').remove();
});

Template.CodeMirror.helpers({
	editorId: function() {
		return this.id || 'code-mirror-textarea';
	},

	editorName: function() {
		return this.name || 'code-mirror-textarea';
	}
});
