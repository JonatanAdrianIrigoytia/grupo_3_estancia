const errorHelper = {
	fillErrors: (fieldErrors, errors = {}) => {
		fieldErrors.forEach((error) => {
			errors[error.field] = { msg: error.msg };
		});
		return errors;
	},
};

module.exports = errorHelper;
