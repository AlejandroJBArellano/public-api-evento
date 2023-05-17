const { Schema, model } = require("mongoose");

const EventSchema = new Schema(
	{
		customFieldsForVCard: [{
            fieldVCard: String,
            valueAttendee: String
        }]
	},
	{
		timestamps: true,
		versionKey: false,
		strict: false,
	}
);
EventSchema.index({ "$**": "text" });

module.exports =  model("Event", EventSchema);
