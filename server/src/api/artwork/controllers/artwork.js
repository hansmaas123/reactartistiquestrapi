"use strict";

/**
 * artwork controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::artwork.artwork", ({ strapi }) => ({
  /**
   * As the controller action is named
   * exactly like the original `create` action provided by the core controller,
   * it overwrites it.
   */
  async create(ctx) {
    // Creates the new artwork using a service
    const newArtwork = await strapi.service("api::artwork.artwork").create(ctx);

    const sanitizedArtwork = await this.sanitizeOutput(newArtwork, ctx);

    ctx.body = sanitizedArtwork;
  },

  /**
   * Override findOne so the artwork's owner is populated on the detail
   * endpoint. Only the owner's `username` (and id) is exposed — never the
   * email — so the client can show "MADE BY" and decide who may edit,
   * without opening up the whole users API.
   */
  async findOne(ctx) {
    const { id } = ctx.params;
    const query = {
      ...ctx.query,
      populate: { owner: { fields: ["username"] } },
    };

    const entity = await strapi
      .service("api::artwork.artwork")
      .findOne(id, query);

    const sanitized = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitized);
  },
}));
