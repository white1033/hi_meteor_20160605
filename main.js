Messages = new Mongo.Collection('messages')

if (Meteor.isClient) {

  Meteor.startup(function() {
    Accounts.ui.config({
      passwordSignupFields: 'USERNAME_ONLY',
    });
  });

  Meteor.subscribe('messages', 5)

  Template.body.helpers({
    messages: function() {
      return Messages.find()
    }
  })

  Template.body.events({
    'change #message': function(event) {
      let text = $(event.target).val()
      $(event.target).val('')
      let message = { text }
      Meteor.call('createMessage', message)
    }
  })
}

if (Meteor.isServer) {
  Meteor.methods({
    createMessage: function(message) {
      let user = Meteor.userId()
      if (user) {
        message.username = Meteor.user().username
        message.num = Messages.find().count() + 1
        message.from = 'db'
        message.createdAt = new Date()
        Messages.insert(message)
      }
    }
  })

  Meteor.publish('messages', function(limit) {
    return Messages.find({}, {sort: {createdAt: -1}, limit})
  })
}
