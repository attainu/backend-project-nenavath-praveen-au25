const Product = require("../model/Product");
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();
const cloudinary = require("cloudinary").v2;
const multer = require("multer")
const path = require('path');
const { stringify } = require("querystring");
cloudinary.config({
    cloud_name: "dtzlqivcd",
    api_key: "789299334293845",
    api_secret: "RJmv1_ijO6xYuHKaRZDnPqlB6-w"

})
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './filefolder')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})


const upload = multer({ storage: storage });
async function uploadToCloudinary(filePath) {
    let filePathToCloudinary = filePath
    return cloudinary.uploader.upload(filePath, { "photo": filePathToCloudinary })
        .then((reult) => {
            return {
                message: "succcess",
                url: result.url
            }
        }).catch((err) => {
            return {
                message: "failed",

            }
        })
}



//CREATE

router.post("/createproduct", upload.single('photo'), async(req, res) => {
    console.log(req.file.path)
    let localpath = req.file.path.replace(/\\/g, "/")
    try {
        let result = await uploadToCloudinary(localpath);
        try {
            const newProduct = new Product({
                "title": req.body.title,
                "desc": req.body.desc,
                "img": `${result}`,
                "categories": req.body.categories,
                "size": req.body.size,
                "color": req.body.color,
                "price": req.body.price
            });

            const savedProduct = await newProduct.save();
            res.status(200).json(savedProduct);
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }

    } catch (err) {}

});

//UPDATE
router.post("/updateid", verifyTokenAndAdmin, async(req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.body.id, {
                $set: req.body,
            }, { new: true }
        );
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE
router.post("/delete", verifyTokenAndAdmin, async(req, res) => {
    try {
        await Product.findByIdAndDelete(req.body.id);
        res.status(200).json("Product has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET PRODUCT
router.post("/product", async(req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL PRODUCTS
router.get("/products", async(req, res) => {

    try {
        let products;

        products = await Product.find();

        console.log(products);
        res.render('bhg', { items: products })
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;