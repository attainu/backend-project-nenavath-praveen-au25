const User = require("../model/User");
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async(req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString();
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, {
                $set: req.body,
            }, { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(401).json(err);
    }
});

//DELETE
router.delete("/userdelete", verifyTokenAndAuthorization, async(req, res) => {
    try {
        await User.findByIdAndDelete(req.body.id);
        res.status(200).json("User has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET USER
router.post("/find/id", verifyTokenAndAdmin, async(req, res) => {
    try {
        const user = await User.findById(req.body.id);
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL USER
router.get("/", verifyTokenAndAdmin, async(req, res) => {
    const query = req.query.new;
    try {
        const users = query ?
            await User.find().sort({ _id: -1 }).limit(5) :
            await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;