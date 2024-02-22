module.exports.home = async (req, res)=>{
    try {
        return res.status(200).json({
            message: "e-commerce API project"
        })
    } catch (error) {
        console.log("Error in finding home page");
        return res.status(500).json({
            message: "Error in finding home page",
        })
    }
}