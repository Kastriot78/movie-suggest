import ContactModel from "../models/Contact.js";

export const getAllContacts = async (req, res) => {
    try {
        const contacts = await ContactModel.find().sort({ _id: -1 });
        res.status(200).send(contacts);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export const createContact = async (req, res) => {
    const contactData = req.body;
    try {
        const newContact = new ContactModel(contactData);
        await newContact.save();
        res.status(201).json("New contact created");
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}