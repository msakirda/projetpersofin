'use strict';

/**
 * user-perso service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::user-perso.user-perso');
