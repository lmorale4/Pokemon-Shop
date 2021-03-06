const User = require('./user');
const Pokemon = require('./pokemon');
const Order = require('./order');
const Review = require('./review');
const OrderItem = require('./orderItem');

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Order.belongsTo(User);
Review.belongsTo(User);
Review.belongsTo(Pokemon);
User.hasMany(Review);

OrderItem.belongsTo(Order);
OrderItem.belongsTo(Pokemon);

Order.hasMany(OrderItem, { as: 'items' });

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Pokemon,
  Order,
  Review,
  OrderItem,
};
