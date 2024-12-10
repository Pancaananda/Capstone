const tf = require('@tensorflow/tfjs-node');

async function loadModel() {
    const diseaseModel = await tf.loadLayersModel(process.env.MODEL_URL);
    const foodModel = await tf.loadLayersModel(process.env.FOOD_MODEL_URL);  // Memuat model makanan

    return {
        diseaseModel,
        foodModel,  // Mengembalikan kedua model
    };
}

module.exports = loadModel;
