import getPaginatedResponse from "@reactioncommerce/api-utils/graphql/getPaginatedResponse.js";
import wasFieldRequested from "@reactioncommerce/api-utils/graphql/wasFieldRequested.js";
import { decodeShopOpaqueId } from "@reactioncommerce/reaction-graphql-xforms/shop";

/**
 * @name Shop/roles
 * @method
 * @memberof Shop/GraphQL
 * @summary find and return the roles for a shop
 * @param {Object} _ - unused
 * @param {Object} connectionArgs - an object of all arguments that were sent by the client
 * @param {String} connectionArgs.shopId - id of shop to query
 * @param {String} connectionArgs.after - Connection argument
 * @param {String} connectionArgs.before - Connection argument
 * @param {Number} connectionArgs.first - Connection argument
 * @param {Number} connectionArgs.last - Connection argument
 * @param {Object} context - an object containing the per-request state
 * @param {Object} info Info about the GraphQL request
 * @returns {Promise<Object[]>} Promise that resolves with array of user Roles objects
 */
export default async function roles({ _id }, connectionArgs, context, info) {
  // Transform ID from base64
  const dbShopId = decodeShopOpaqueId(_id);

  const query = await context.queries.roles(context, dbShopId);

  return getPaginatedResponse(query, connectionArgs, {
    includeHasNextPage: wasFieldRequested("pageInfo.hasNextPage", info),
    includeHasPreviousPage: wasFieldRequested("pageInfo.hasPreviousPage", info),
    includeTotalCount: wasFieldRequested("totalCount", info)
  });
}
