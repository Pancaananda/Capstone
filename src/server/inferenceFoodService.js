const { Firestore } = require('@google-cloud/firestore');
const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');

// Inisialisasi Firestore
const firestore = new Firestore();

// Fungsi untuk mendeteksi makanan
async function detectFood(model, imageData) {
    // Pastikan imageData ada
    if (!imageData) {
        throw new InputError("Image data is required.");
    }

    // Ubah imageData menjadi tensor, misalnya menggunakan tf.node.decodeImage(imageData)
    const imageTensor = tf.node.decodeImage(imageData);  // Pastikan imageData dalam format buffer atau base64

    // Preprocessing data sesuai dengan model Anda
    const preprocessedData = imageTensor.expandDims(0).toFloat().div(tf.scalar(255));

    // Prediksi menggunakan model
    const prediction = await model.predict(preprocessedData);

    // Ambil hasil prediksi, misalnya top 3 prediksi
    const predictedClassIndex = prediction.argMax(-1).dataSync()[0];  // Contoh: Ambil kelas dengan skor tertinggi

    // Cari nama makanan berdasarkan kelas yang diprediksi di Firestore
    const food = await getFoodFromClass(predictedClassIndex);

    return food;
}

// Fungsi untuk mengambil data makanan berdasarkan nama (bukan ID)
async function getFoodFromClass(classIndex) {
    try {
        // Cari data makanan di Firestore berdasarkan nama yang sesuai dengan classIndex
        const foodSnapshot = await firestore.collection('Foods').where('classIndex', '==', classIndex).get();

        if (foodSnapshot.empty) {
            throw new Error("Food not found for the predicted class.");
        }

        // Mengambil data dari document pertama yang ditemukan
        const foodData = foodSnapshot.docs[0].data();

        return {
            name: foodData.nama,  // Nama makanan yang ditemukan
            nutrition: foodData.nutrisi,  // Nutrisi makanan
            per: foodData.per,  // Ukuran porsi makanan
        };
    } catch (error) {
        console.error("Error retrieving food data:", error);
        throw new Error("Failed to retrieve food data.");
    }
}

module.exports = {
    detectFood,
};
