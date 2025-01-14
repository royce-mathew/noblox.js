// Includes
const http = require('../util/http.js').func

// Args
exports.required = ['placeId']
exports.optional = ['page', 'jar']

// Docs
/**
 * 🔐 Returns the existing developer products in a specified game.
 * @category Game
 * @alias getDeveloperProducts
 * @param {number} placeId - The ID of the place whose developer products you want to retrieve
 * @param {number} [page=1] - Which page of developer products to return (pageSize is 50)
 * @returns {Promise<DeveloperProductsResult>}
 */

function getDeveloperProducts (jar, placeId, page) {
  return new Promise((resolve, reject) => {
    const httpOpt = {
      url: `//api.roblox.com/developerproducts/list?placeid=${placeId}&page=${page}`,
      options: {
        method: 'GET',
        jar: jar,
        resolveWithFullResponse: true
      }
    }
    return http(httpOpt)
      .then(function (res) {
        if (res.status === 200) {
          resolve(res.data)
        } else {
          const body = res.data || {}
          if (body.errors && body.errors.length > 0) {
            const errors = body.errors.map((e) => {
              return e.message
            })
            reject(new Error(`${res.status} ${errors.join(', ')}`))
          } else {
            reject(new Error(`${res.status} An error has occurred ${res.data ? res.data : ''}`))
          }
        }
      })
      .catch(error => reject(error))
  })
}

// Define
exports.func = function (args) {
  return getDeveloperProducts(args.jar, args.placeId, args.page || 1)
}
