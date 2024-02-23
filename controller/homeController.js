/**
 * @swagger
 * tags:
 *  name: Home
 *  description: all the operation related home
 */
/**
 * @swagger
 * /:
 *  get:
 *      Summary: get home section
 *      description: display the message that my server working or not
 *      responses:
 *          200:
 *              description: Ecommerce API projects
 *          500:
 *              description: Error in finding the home page
 *      tags:
 *      - Home
 */
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