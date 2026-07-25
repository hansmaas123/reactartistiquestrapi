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

    const entity = await strapi.entityService.findOne(
      "api::artwork.artwork",
      id,
      { populate: { owner: { fields: ["username"] } } }
    );

    if (!entity) {
      return ctx.notFound();
    }

    const sanitized = await this.sanitizeOutput(entity, ctx);
    const response = this.transformResponse(sanitized);

    // sanitizeOutput drops the owner relation because the Public role has no
    // access to users. Re-attach a minimal owner (id + username only, never
    // the email) so the client can show "MADE BY" and gate the edit button.
    if (entity.owner) {
      response.data.attributes.owner = {
        data: {
          id: entity.owner.id,
          attributes: { username: entity.owner.username },
        },
      };
    }

    return response;
  },
}));
