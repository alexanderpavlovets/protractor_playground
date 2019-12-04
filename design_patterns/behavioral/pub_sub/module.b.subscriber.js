
// This module is a subscriber

const pubSub = require('./pubsub')

const subscription = pubSub.subscribe('anEvent', data => {
    console.log(
        `'anEvent', was published with this data: '${data.msg}'`
    )
    subscription.unsubscribe() // comment this, to not unsubscribe.
})
