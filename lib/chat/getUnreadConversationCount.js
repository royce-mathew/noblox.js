const http = require('../util/http.js').func

exports.optional = ['jar']

// Docs
/**
 * 🔐 Get the number of unread conversations.
 * @category Chat
 * @alias getUnreadConversationCount
 * @returns {Promise<GetUnreadConversationCountResult>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * const unreadConversationCount = noblox.getUnreadConversationCount()
**/

exports.func = (args) => {
  const jar = args.jar

  return http({
    url: '//chat.roblox.com/v2/get-unread-conversation-count',
    options: {
      method: 'GET',
      jar: jar,
      resolveWithFullResponse: true
    }
  }).then((res) => {
    if (res.status !== 200) {
      throw new Error('You are not logged in')
    } else {
      return res.data
    }
  })
}
