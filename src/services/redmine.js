import dotenv from "dotenv";
dotenv.config();

import fetch from "node-fetch";

const REDMINE_URL = process.env.REDMINE_URL;
const API_KEY = process.env.REDMINE_API_KEY;

export async function createTicket(issue) {
  try {
    const response = await fetch(`${REDMINE_URL}/issues.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Redmine-API-Key": API_KEY
      },
      body: JSON.stringify({ issue })
    });

    const text = await response.text(); // primero obtenemos como texto
    console.log("Respuesta cruda de Redmine:", text);

    // Intentamos parsear JSON solo si hay contenido
    if (text) return JSON.parse(text);
    else throw { error: "Redmine respondió con contenido no JSON", raw: text };

  } catch (err) {
    console.error("Error en fetch a Redmine:", err);
    throw err;
  }
}

export async function listTickets() {
  try {
    const response = await fetch(`${REDMINE_URL}/issues.json`, {
      headers: {
        "X-Redmine-API-Key": API_KEY
      }
    });
    const text = await response.text();
    return text ? JSON.parse(text) : [];
  } catch (err) {
    console.error("Error listando tickets:", err);
    throw err;
  }
}

