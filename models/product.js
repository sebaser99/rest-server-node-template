const {Schema, model} = require('mongoose');

const ProductSchema = new Schema({
    nombre: {
        type: String,
        required: [true, "El nombre del producto es obligatorio"],
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
    },
    precio: {
        type: Number,
        default: 0
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    descripcion: {type: String},
    disponible: {type: Boolean, default: true}
});

ProductSchema.methods.toJSON = function (){
    const { __v, _id, ...product} = this.toObject()

    return {...product,
        uid: _id
    
    }

}

module.exports = model('Product', ProductSchema);