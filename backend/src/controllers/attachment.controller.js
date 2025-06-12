import Attachment from "../models/attachment.model.js";

export const createAttachment = async (req, res) => {
  try {
    const { order, attachmentName, includeInPlan, isFromTemplate, description } = req.body;

    // Validate required fields
    if (!order || !attachmentName || !req.file) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // ✅ Convert Windows-style \ to UNIX-style /
    const documentFile = req.file.path.replace(/\\/g, "/");

    // Create a new attachment
    const attachment = new Attachment({
      order,
      attachmentName,
      documentFile, // ✅ Corrected file path
      includeInPlan: includeInPlan || false,
      isFromTemplate: isFromTemplate || false,
      description: description || "",
    });

    await attachment.save();
    res.status(201).json(attachment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Get all Attachments
export const getAllAttachments = async (req, res) => {
  try {
    console.log("Fetching attachments from the database...");
    const attachments = await Attachment.find(); // Fetch all attachments
    console.log("Attachments fetched:", attachments);
    res.status(200).json(attachments);
  } catch (error) {
    console.error("Error fetching attachments:", error.message);
    res.status(500).json({ message: error.message });
  }
};  

// Get a single Attachment by ID
export const getAttachmentById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("🔍 Fetching attachment with ID:", id); // ✅ Debugging

    const attachment = await Attachment.findById(id);
    
    if (!attachment) {
      console.log("⚠️ No attachment found for ID:", id);
      return res.status(404).json({ message: "Attachment not found" });
    }

    console.log("✅ Attachment found:", attachment);
    res.status(200).json(attachment);
  } catch (error) {
    console.error("❌ Error fetching attachment:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// Update an Attachment by ID
export const updateAttachment = async (req, res) => {
  const { id } = req.params;
  console.log("Attachment ID:", id);
  console.log("Request Body:", req.body);
  console.log("Request File:", req.file);

  try {
    let attachment = await Attachment.findById(id);
    if (!attachment) {
      return res.status(404).json({ message: "Attachment not found" });
    }

    // Convert "true"/"false" strings to Boolean
    const parseBoolean = (value) => (value === "true" ? true : value === "false" ? false : value);

    attachment.order = req.body.order ?? attachment.order;
    attachment.attachmentName = req.body.attachmentName ?? attachment.attachmentName;
    attachment.includeInPlan = parseBoolean(req.body.includeInPlan) ?? attachment.includeInPlan;
    attachment.isFromTemplate = parseBoolean(req.body.isFromTemplate) ?? attachment.isFromTemplate;
    attachment.description = req.body.description ?? attachment.description;

    // Update file if a new one is uploaded
    if (req.file) {
      attachment.documentFile = req.file.path.replace(/\\/g, "/");
    }

    await attachment.save();
    res.status(200).json({ message: "Attachment updated successfully", attachment });
  } catch (error) {
    console.error("Error updating attachment:", error.message);
    res.status(500).json({ message: error.message });
  }
};





// Delete an Attachment by ID
export const deleteAttachment = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAttachment = await Attachment.findByIdAndDelete(id);

    if (!deletedAttachment) {
      return res.status(404).json({ message: "Attachment not found" });
    }

    res.status(200).json({ message: "Attachment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// // Get an attachment by ID
// export const getAttachmentById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     console.log("Fetching Attachment ID:", id);

//     const attachment = await Attachment.findById(id);

//     if (!attachment) {
//       return res.status(404).json({ message: "Attachment not found" });
//     }

//     res.status(200).json({ attachment });
//   } catch (error) {
//     console.error("Error fetching attachment:", error.message);
//     res.status(500).json({ message: "Server error" });
//   }
// };