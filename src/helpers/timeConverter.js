module.exports = {
	timeConverter: function (amount, type) {
		switch (type) {
			case "seconds":
				//     1 segundo * cantidad
				return 1000 * aumount;
			case "minutes":
				//      1 minuto * cantidad
				return 1000 * 60 * amount;
			case "hours":
				//        1 hora      * cantidad
				return 1000 * 60 * 60 * amount;
			case "days":
				//           1   dia       * cantidad
				return 1000 * 60 * 60 * 24 * amount;
		}
	},
};
