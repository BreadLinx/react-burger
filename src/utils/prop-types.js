import PropTypes from "prop-types";

export const ingridientPropTypes = PropTypes.shape({
  calories: PropTypes.number,
  carbohydrates: PropTypes.number,
  fat: PropTypes.number,
  image: PropTypes.string,
  image_large: PropTypes.string,
  image_mobile: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  proteins: PropTypes.number,
  type: PropTypes.string,
  __v: PropTypes.number,
  _id: PropTypes.string,
});

export const constructorsIngridientPropTypes = PropTypes.shape({
  calories: PropTypes.number,
  carbohydrates: PropTypes.number,
  fat: PropTypes.number,
  image: PropTypes.string,
  image_large: PropTypes.string,
  image_mobile: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  proteins: PropTypes.number,
  type: PropTypes.string,
  __v: PropTypes.number,
  _id: PropTypes.string,
  dragId: PropTypes.number,
  isDragging: PropTypes.bool,
});

export const orderPropTypes = PropTypes.shape({
  _id: PropTypes.string,
  ingredients: PropTypes.arrayOf(PropTypes.string),
  status: PropTypes.string,
  name: PropTypes.string,
  createdAt: PropTypes.string,
  updatedAt: PropTypes.string,
  number: PropTypes.number,
});
