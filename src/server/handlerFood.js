const { detectFood } = require("../services/inferenceFoodService");

const getFoodDetection = async (req, h) => {
    try {
        const { imageData } = req.payload;  // misalnya kita mengirim data gambar atau deskripsi makanan

        // Deteksi makanan menggunakan model yang sudah diload
        const foodData = await detectFood(req.server.app.foodModel, imageData);

        return h.response({
            status: 'success',
            foodData  // Mengembalikan data makanan yang terdeteksi
        }).code(200);
    } catch (error) {
        console.error("Error detecting food:", error);
        return h.response({ message: "Failed to detect food", error: error.message }).code(500);
    }
};

module.exports = {
    getFoodDetection,
};
