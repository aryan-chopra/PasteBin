import mongoose from "mongoose"

const entitySchema = new mongoose.Schema({
    url: {
        type: String,
        required: [true, "Each entity must have a unique url"],
        // validate: {
        //     validator: urlValidator,
        //     content: "A document already has this url"
        // },
        unique: true,
    },
    burnAfterRead: {
        type: Boolean,
        default: false,
    },
    content: {
        type: String,
        required: [true, "Each entity must have a content String"],
        validator: {
            validate: contentValidator,
            message: "content cannot be empty"
        }
    },
    title: {
        type: String,
        required: [true, "Each entity must have a title string"],
        validator: {
            validate: titleValidator,
            message: "title cannot be empty"
        }
    },
    contentType: {
        type: String,
        required: [true, "Content type must be set to a valid value"],
        validate: {
            validator: contentTypeValidator,
            message: "Invalid contentType, valid values are: C, Cpp, Go, Java, Text"
        }
    },
    expiresAfter: {
        type: Date,
    },
}, { timestamps: true, collection: "entities" })

// Indexes

entitySchema.index(
    { expiresAfter: 1 },
    { expireAfterSeconds: 0 }
)

// Custom Validators

function contentValidator(content) {
    return content !== ""
}

function titleValidator(title) {
    return title !== ""
}

function contentTypeValidator(contentType) {
    const validContentTypes = ["Cpp", "Java", "Go", "C", "Text"]
    return validContentTypes.includes(contentType)
}

// async function urlValidator(url) {
//     const exists = await Entity.findOne({ url: url })
//     return !exists
// }

entitySchema.method("toJSON", function () {
    const { __v, _id, ...Object } = this.toObject()
    Object.id = _id
    return Object
})

const Entity = mongoose.model("entity", entitySchema)
export default Entity