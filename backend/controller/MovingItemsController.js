const Resolvingmodels = require('../models/Resolvingmodel')
const Itemmodel = require('../models/Itemsmodel')
const Usermodel = require('../models/Usermodel');


const ResolvingItems = Resolvingmodels.resolvingmodels;
const ResolvedItems = Resolvingmodels.resolvedItemsmodels;
const ResolvingDiscardItems = Resolvingmodels.resolvingDiscardmodels



const movingItem = async (req, res) => {
    try {

        //Getting datas from the frontend
        const { ResolvingUsername, ResolvingEmail, ResolverEmail, selectedId, notificationId } = req.body;


        //Step 1 : Get and delete item form source collection
        const findItem = await Itemmodel.findOneAndDelete({ _id: selectedId });
        if (!findItem) {
            return res.status(504).send("Item not found");
        }



        //Step 2 : Modify the item data before sending to the Destination collection
        const ResolverUsername = findItem.founderName || findItem.OwnerName;
        const dataToAdd = {
            ...findItem.toObject(), //Spread Existing feild
            resolvingEmail: ResolvingEmail,
            resolverEmail: ResolverEmail,
            resolvingUsername: ResolvingUsername,
            resolverUsername: ResolverUsername,
            resolvingDate: new Date() //Add Current TimeStamp
        }


        //Step 3 : Save to the Destinaion Collection
        const newItem = new ResolvedItems(dataToAdd);
        await newItem.save();
        res.send("Item resolved successfully"); // added a response




        //Deleting Notificatio Message
        const deletefromNotification = await ResolvingItems.findByIdAndDelete(notificationId);
        if (!deletefromNotification) {
            console.log(`Notification with ID ${notificationId} not found`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while resolving the item");
    }
}


const updateusernamefrombackend = async (req, res) => {
    try {
        const { inputValue, currentUsername } = req.body;
        console.log('Current Username:', currentUsername);
        console.log('Input Value:', inputValue);

        // Update all models where resolvingUsername or resolverUsername matches currentUsername
        await ResolvingItems.updateMany({ resolvingUsername: currentUsername }, { $set: { resolvingUsername: inputValue } });
        await ResolvingItems.updateMany({ resolverUsername: currentUsername }, { $set: { resolverUsername: inputValue } });

        await ResolvedItems.updateMany({ resolvingUsername: currentUsername }, { $set: { resolvingUsername: inputValue } });
        await ResolvedItems.updateMany({ resolverUsername: currentUsername }, { $set: { resolverUsername: inputValue } });

        await ResolvingDiscardItems.updateMany({ resolvingUsername: currentUsername }, { $set: { resolvingUsername: inputValue } });
        await ResolvingDiscardItems.updateMany({ resolverUsername: currentUsername }, { $set: { resolverUsername: inputValue } });

        await Itemmodel.updateMany({ OwnerName: currentUsername }, { $set: { OwnerName: inputValue } });
        await Itemmodel.updateMany({ founderName: currentUsername }, { $set: { founderName: inputValue } });



        await Usermodel.updateMany({
            $and: [
                { firstname: currentUsername.split(' ')[0] },
                { lastname: currentUsername.split(' ').slice(1).join(' ') }
            ]
        }, {
            $set: {
                firstname: inputValue.split(' ')[0],
                lastname: inputValue.split(' ').slice(1).join(' ')
            }
        });
        console.log("Username updated Successfully");
        
        res.send({ message: 'Username updated successfully' });
    } catch (error) {
        res.send(error);
    }
}


module.exports = { movingItem, updateusernamefrombackend }