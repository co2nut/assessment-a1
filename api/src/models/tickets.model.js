// tickets-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'tickets';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    ticketType: { type: String, required: true },//future request, defect/bugs, test case
    severity: { type: Number, required: true }, // 1:normal; 2:urgent;
    priority: { type: Number, required: true },//1:important, 2:
    summary: { type: String, required: true },
    descriptions: { type: String, required: true },
    actions:[
      {
        summary:{ type: String },
        description:{ type: String },
        createdBy:{ type: String },
        createdAt:{ type: String },
      }
    ],
    createdBy: { type: String },
    createdAt:{ type: String} ,
    updatedBy: { type: String },
    updatedAt:{ type: String },
    status:{ type: String, default:'1' },
  }, {
    timestamps: true,
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
  
};
