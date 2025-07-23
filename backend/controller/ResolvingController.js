const Resolvingmodels = require('../models/Resolvingmodel')
const Itemmodel = require('../models/Itemsmodel')
const ResolvingItems = Resolvingmodels.resolvingmodels;
const ResolvedItems = Resolvingmodels.resolvedItemsmodels;
const DiscardedResolution = Resolvingmodels.resolvingDiscardmodels;


const getAllResolvingItems = async (req, res) => {
    try {

        const item = await ResolvingItems.find();
        res.json(item);
        // console.log(item);

    }
    catch (err) {
        console.error(err);
        res.status(500).send("Error fetching resolveitems from database");
    }
}



const getAllResolvedItems = async (req, res) => {
    try {

        const product = await ResolvedItems.find();
        res.json(product);
        // console.log(product);

    }
    catch (err) {
        console.error(err);
        res.status(500).send("Error fetching data from database");
    }
}




const createResolvingItem = async (req, res) => {
    try {
        const { itemId, message, resolverEmail, resolvingusername, resolvingEmail } = req.body;
            const myphoto = req.file ? req.file.filename : null;

        // console.log('Received data:', req.body);
        const notification = new ResolvingItems({
            resolverEmail: resolverEmail,
            message: message,
            itemId: itemId,
            resolvingUsername: resolvingusername,
            myphoto: myphoto,
            resolvingEmail: resolvingEmail,
        });
        await notification.save();
        res.send("Resolution Submitted Successfull");
    } catch (err) {
        res.status(500).send({ successmessage: 'Error In Sumbitting Resolution message' })
    }
}



const resolutionMessageMarkRead = async (req, res) => {
    try {
        const resolverEmail = req.body.userEmail;
        // console.log(resolverEmail);

        const result = await ResolvingItems.updateMany({ resolverEmail: resolverEmail }, { $set: { read: true } });
        // console.log(result);

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating resolution documents' });

    }
}
const generalMessageMarkRead = async (req, res) => {
    try {
        const resolvingEmail = req.body.userEmail;
        // console.log(resolvingEmail);

        const result = await DiscardedResolution.updateMany({ resolvingEmail: resolvingEmail }, { $set: { read: true } });
        // console.log(result);

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating general documents' });

    }
}




const discardResolvingItem = async (req, res) => {
    try {
        const notificationId = req.body.id;
        const result = await ResolvingItems.findByIdAndDelete(notificationId);
        console.log(result);

        res.send("Notification deleted successfully");
    } catch (error) {
        res.status(500).send("Error finding Notification ");
    }
}



const creatediscardedResolution = async (req, res) => {
    try {
        const { resolverusername, resolvingusername, itemid , resolvingemail,resolveremail,type} = req.body;
        console.log(itemid);

        const response = await Itemmodel.findById(itemid);
        console.log("item mila" , response);

        const itemname = response.name;
        console.log("itemname mila" , itemname);

        const Data = new DiscardedResolution({
            resolverUsername: resolverusername,
            resolvingUsername: resolvingusername,
            itemName: itemname,
            resolvingEmail:resolvingemail,
            resolverEmail:resolveremail,
            type:type
        })
      


        await Data.save();
        res.send("discarded Resolution save");

    } catch (error) {
        console.log(error);

        res.status(500).send({ errormessage: 'Error In Sumbitting discarded resolution' });

    }

}

const getAlldiscardedResolution = async(req,res)=>{
    try{
    const alldiscardedresolution = await DiscardedResolution.find();
    // console.log("general messages" + alldiscardedresolution);
    res.json(alldiscardedresolution)
    }  catch (err) {
        // console.error(err);
        res.status(500).send("Error fetching Discarded Resolution");
    }
}

const deletediscardResolutionMessage = async(req,res)=>{
    try {
        const {id} = req.body;
        const response = await DiscardedResolution.findByIdAndDelete(id);
        res.send("Message Deleted Successfully");
    } catch (error) {
                res.status(500).send("Error finding message ");

    }
}



const checkalreadyresolutionsend = async (req, res) => {
  try {
    const { itemId, resolvingEmail, resolverEmail } = req.query;
// console.log("backend reseaved above");
// console.log("itemid = " , itemId);
// console.log("resolvingemail = " ,resolvingEmail);
// console.log("resolveremail = " , resolverEmail);
    const existingResolution = await ResolvingItems.findOne({
      itemId,
      resolvingEmail,
      resolverEmail
    });

    if (existingResolution) {
      res.send({ exists: true });
      console.log("backend recived true " );

    } else {
        res.send({ exists: false });
        console.log("backend recived false " );
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Error checking resolution status" });
  }
}


    module.exports = {getAllResolvingItems, getAllResolvedItems, createResolvingItem, resolutionMessageMarkRead,generalMessageMarkRead, discardResolvingItem, creatediscardedResolution,getAlldiscardedResolution,deletediscardResolutionMessage,checkalreadyresolutionsend}