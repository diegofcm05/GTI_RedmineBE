import express from "express";
import { createTicket, listTickets } from "../services/redmine.js";

const router = express.Router();

// Listar tickets
router.get("/", async (req, res) => {
  try {
    const data = await listTickets();
    res.json(data);
  } catch (err) {
    console.error("Error listando tickets:", err);
    res.status(500).json({ error: "Error al listar tickets", details: err });
  }
});

// Crear ticket
router.post("/", async (req, res) => {
  try {
    // Ajusta los IDs según Redmine
    const issue = {
      project_id: "sistema-tickets", // el identifier exacto
      subject: req.body.subject,
      description: req.body.description,
      tracker_id: req.body.tracker_id, // usa el ID correcto del tracker
      priority_id: req.body.priority_id, // usa el ID correcto de prioridad
      status_id: 1     // ID numérico del estado (nuevo/open)
    };

    console.log("Ticket que se enviará a Redmine:", issue);

    const result = await createTicket(issue);
    res.status(201).json(result);
  } catch (err) {
    console.error("Error al crear ticket:", err);
    res.status(400).json({ error: "Error al crear ticket", details: err });
  }
});

export default router;
