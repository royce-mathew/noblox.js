const http = require('../util/http.js').func
const getGeneralToken = require('../util/getGeneralToken.js').func

exports.required = ['userIds', 'title']
exports.optional = ['jar']

// Docs
/**
 * 🔐 Start a group conversation.
 * @category Chat
 * @alias startGroupConversation
 * @param {Array<number>} userIds - An array of userIds to add.
 * @param {string} title - The title of the group.
 * @returns {Promise<StartGroupConversationResponse>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * noblox.startGroupConversation([1, 2, 3], "A group conversation.")
**/

function startGroupConversation (userIds, chatTitle, jar, token) {
  return new Promise((resolve, reject) => {
    const httpOpt = {
      url: '//chat.roblox.com/v2/start-group-conversation',
      options: {
        method: 'POST',
        jar: jar,
        headers: {
          'X-CSRF-TOKEN': token
        },
        json: {
          participantUserIds: userIds,
          title: chatTitle
        },
        resolveWithFullResponse: true
      }
    }

    return http(httpOpt).then((res) => {
      if (res.status === 200) {
        if (!res.data.resultType === 'Success') {
          reject(new Error(res.data.statusMessage))
        } else {
          resolve(res.data)
        }
      } else {
        let error = 'An unknown error has occurred.'
        if (res.data && res.data.errors) {
          error = res.data.errors.map((e) => e.message).join('\n')
        }
        reject(new Error(error))
      }
    }).catch(error => reject(error))
  })
}

exports.func = (args) => {
  const jar = args.jar

  return getGeneralToken({ jar: jar }).then((xcsrf) => {
    return startGroupConversation(args.userIds, args.title, jar, xcsrf)
  })
}
