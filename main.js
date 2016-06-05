if (Meteor.isClient) {
    Template.body.helpers({
        messages: [
            {text: 'hihi kkd', num: 1},
            {text: 'hihi yen han', num: 2},
            {text: 'hihi aya', num: 3},
        ]
    })
}
