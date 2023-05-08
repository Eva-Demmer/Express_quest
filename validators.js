const { body, validationResult } = require('express-validator');

const validateMovie = [
    body("title").notEmpty().withMessage("This field is required").isLength({ max: 100 }).withMessage("Title must not exceed 100 characters"),
    body("director").notEmpty().withMessage("This field is required").isLength({ max: 100 }).withMessage("Director must not exceed 100 characters"),
    body("year").notEmpty().withMessage("This field is required").isInt({ min: 1900 }).isLength({ min: 4, max: 4 }).withMessage("Year must be between 1900 and current year"),
    body("color").notEmpty().withMessage("This field is required").isInt({ min: 0, max: 1 }).withMessage("Color input must be 0 or 1"),
    body("duration").notEmpty().withMessage("This field is required").isNumeric().isFloat({ max: 240 }).withMessage("Duration must be a number between 1 and 240"),
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
  body("firstname").notEmpty().withMessage("This field is required").isLength({ max: 50 }).withMessage("Firstname must not exceed 50 characters"),
  body("lastname").notEmpty().withMessage("This field is required").isLength({ max: 50 }).withMessage("Lastname must not exceed 50 characters"),
  body("email").notEmpty().withMessage("This field is required").isEmail().withMessage("Email not valid"),
  body("city").notEmpty().withMessage("This field is required").isLength({ max: 100 }).withMessage("City must not exceed 255 characters"),
  body("language").notEmpty().withMessage("This field is required").isLength({ max: 100 }).withMessage("Language must not exceed 255 characters"),
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
