// import ProductDetailModel from "../Models/ProductDetailModel.js";
// import ProductModel from "../Models/ProductModel.js";

// export const createProductDetail = async (req, res) => {
//   try {
//     const { name, price, description } = req.body;
//     const images = req.files?.map(file => file.path) || [];

//     if (!name || !price || !description) {
//       return res.status(400).json({ error: "name, price and description are required" });
//     }
//     if (images.length === 0) {
//       return res.status(400).json({ error: "At least one image is required" });
//     }

//     // If Product schema expects `image` singular, and you want multiple images, change schema accordingly.
//     // Assuming Product schema supports `images` (array of strings):
//     const product = new ProductModel({
//       name,
//       price,
//       images,  // make sure your Product schema has 'images' as array
//     });

//     await product.save();

//     const productDetail = new ProductDetailModel({
//       productId: product._id,
//       description,
//       moreImages: images,  // use uploaded images here
//     });

//     await productDetail.save();

//     res.status(201).json({
//       success: true,
//       product,
//       productDetail,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
