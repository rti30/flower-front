import newCartApi from './cart';
import newUserApi from './user';
//import newOrdersApi from './orders';
import newProductApi from './product';
import newNewsApi from './news';
import newCategoryApi from './category';
import newLikeApi from './like';
import newRatingApi from './rating';

import server from './server'
const { connect } = server;

export const userApi = newUserApi(connect);
export const cartApi = newCartApi(connect);
export const productApi = newProductApi(connect);
export const categoryApi = newCategoryApi(connect);
export const newsApi = newNewsApi(connect);
export const likeApi = newLikeApi(connect);
export const ratingApi = newRatingApi(connect);
