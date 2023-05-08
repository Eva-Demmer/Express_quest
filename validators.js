const { body, validationResult } = require('express-validator');

const validateMovie = [
    body("title").isLength({ max: 100 }).withMessage("Title must not exceed 100 characters"),
    body("director").isLength({ max: 100 }).withMessage("Director must not exceed 100 characters"),
    body("year").isInt({ min: 1900 }).isLength({ min: 4, max: 4 }).withMessage("Year must be between 1900 and current year"),
    body("color").isInt({ min: 0, max: 1 }).withMessage("Color input must be 0 or 1"),
    body("duration").isNumeric().isFloat({ max: 240 }).withMessage("Duration must be a number between 1 and 240"),
    (req, res, next) => {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        res.status(422).json({ validationErrors: errors.array() });
      } else {
        next();
      }
    },
  ];

const validateUser = [
  body("firstname").isLength({ max: 50 }).withMessage("Firstname must not exceed 50 characters"),
  body("lastname").isLength({ max: 50 }).withMessage("Lastname must not exceed 50 characters"),
  body("email").isEmail().withMessage("Email not valid"),
  body("city").isLength({ max: 100 }).withMessage("City must not exceed 255 characters"),
  body("language").isLength({ max: 100 }).withMessage("Language must not exceed 255 characters"),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ validationErrors: errors.array() });
    } else {
      next();
    }
  },
];

module.exports = {
    validateMovie,
    validateUser,
}; 