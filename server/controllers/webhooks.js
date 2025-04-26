import { Webhook } from "svix";

import User from "../models/User.js";

//API controller function to manage clerk user with database

export const clerkWebhooks = async (req, res) => {
  try {
    //create a svix instance with clerk webhook secret
    const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    await webhook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    //getting data from the request body
    const { data, type } = req.body;

    //switch case to handle different types of events

    switch (type) {
      case "user.created":
        //create a new user in the database
        const newUser = new User({
          _id: data.id,
          name: data.first_name + " " + data.last_name,
          email: data.email_addresses[0].email_address,
          image: data.image_url,
          resume: "",
        });
        await User.create(newUser);
        res.json({});
        break;
      case "user.deleted":
        // Delete the user from the database
        await User.findByIdAndDelete(data.id);
        res.json({});
        break;
      case "user.updated":
        //update the user in the database
        await User.findByIdAndUpdate(data.id, {
          name: data.first_name + " " + data.last_name,
          email: data.email_addresses[0].email_address,
          image: data.image_url,
        });
        res.json({});
        break;

      default:
        break;
    }
    //send a success response
  } catch (error) {
    console.log(error);
    res.json({
      error: error.message,
      message: "Something went wrong with the webhook",
    });
  }
};
