// Includes
const http = require('../util/http.js').func

// Args
exports.required = ['groupId']
exports.optional = []

// Docs
/**
 * ✅ Get a group's info.
 * @category Group
 * @alias getGroup
 * @param {number} groupId - The id of the group.
 * @returns {Promise<Group>}
 * @example const noblox = require("noblox.js")
 * const groupInfo = await noblox.getGroup(1)
**/

// Define
function getGroup (groupId) {
  return new Promise((resolve, reject) => {
    const httpOpt = {
      url: `//groups.roblox.com/v1/groups/${groupId}`,
      options: {
        method: 'GET',
        resolveWithFullResponse: true
      }
    }
    return http(httpOpt)
      .then(function (res) {
        if (res.status === 200) {
          const body = res.data

          if (body.shout) {
            body.shout.created = new Date(body.shout.created)
            body.shout.updated = new Date(body.shout.updated)
          }

          resolve(body)
        } else {
          const body = res.data || {}
          if (body.errors && body.errors.length > 0) {
            const errors = body.errors.map((e) => {
              return e.message
            })
            reject(new Error(`${res.status} ${errors.join(', ')}`))
          } else {
            reject(new Error(`${res.status} ${res.data}`))
          }
        }
      }).catch(error => reject(error))
  })
}

exports.func = function (args) {
  return getGroup(args.groupId)
}