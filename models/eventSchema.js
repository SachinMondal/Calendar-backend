const mongoose=require("mongoose");
 
const EventSchema=new mongoose.Schema({
    title:String,
    description:String,
    start:String,
    end:String,
    allDay:Boolean,
    completed:{
        type:Boolean,
        default:false
    },
    // attendees:[{type:mongoose.Schema.Types.ObjectId, ref:"User"}],
    creator:{type:String}
})

const Event=mongoose.model('Event', EventSchema);

module.exports=Event;