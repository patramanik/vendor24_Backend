const {User,Category,Service} = require('../models');

// const addService = async (req, res, next) => {
//     try {
//         const {title,desc,} = req.body;
//         const { _id } = req.user;
//         const isCategoryExist = await Category.findOne({ title });
//         if (isCategoryExist) {
//             res.code = 400;
//             throw new Error(`Category already exists`);
//         }
//         const categoryId = isCategoryExist._id;
//         const user = await User.findById(_id).select("-password -varificationCode -forgotPasswordCode");
//         if (!user) {
//             return res.status(400).json({
//                 code: 400,
//                 message: "User not found"
//             });
//         }
//         const service = await Service.create({
//             title,
//             desc,
//             category: categoryId,
//             user: user._id
//         });
//         if (!service) {
//             res.code = 400;
//             throw new Error(`Service not created`);
//         }
        
//     } catch (err) {
//         next(err);
//     }
// };

// Define the controller function
const addService = async (req, res) => {
    try {
        // Destructure the request body
        const { categoryId, name, description, image } = req.body;

        // Check if the category exists
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }

        // Create a new service
        const newService = new Service({
            userId,
            categoryId,
            name,
            description,
            image
        });

        // Save the service to the database
        const savedService = await newService.save();

        // Send success response
        res.status(201).json(savedService);
    } catch (error) {
        // Handle errors
        console.error("Error adding service:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


module.exports ={
    addService,
}