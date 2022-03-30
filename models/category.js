const {Schema, model} = require('mongoose');

const CategorySchema = new Schema({
    nombre: {
        type: String,
        required: [true, "La categoría es obligatoria"],
        unique: true
    },
    estado: {
        type: Boolean,
        required: true,
        default: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuarios',
        required: [true, "El usuario es obligatorio"]
    }
});

CategorySchema.methods.toJSON = function (){
    const { __v, _id, ...category} = this.toObject()

    return {...category,
        uid: _id
    
    }

}

module.exports = model('Category', CategorySchema);