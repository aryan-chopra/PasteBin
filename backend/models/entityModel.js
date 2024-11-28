import mongoose from "mongoose"

const entitySchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
        unique: true,
    },
    content: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    contentType: {
        type: String,
        required: true,
    },
    expiresAfter: {
        type: Date,
    },
}, { timestamps: true, collection: "entities" })

entitySchema.index(
    { expiresAfter: 1 },
    { expireAfterSeconds: 0 }
)

entitySchema.method("toJSON", function () {
    const { __v, _id, ...Object } = this.toObject()
    Object.id = _id
    return Object
})

const Entity = mongoose.model("entity", entitySchema)
export default Entity