// src/hooks/useDownloadFile.ts
import { useCallback } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export const useDownloadFile = () => {
  const downloadFile = useCallback(async (filename: string) => {
    try {
      const response = await fetch(`${API_URL}/materials/download/${filename}`);

      if (!response.ok) {
        throw new Error("Error al descargar archivo");
      }

      // Convertimos respuesta a blob
      const blob = await response.blob();

      // Creamos URL temporal del blob
      const url = window.URL.createObjectURL(blob);

      // Creamos link invisible para disparar descarga
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();

      // Limpieza
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("❌ Error descargando:", error);
    }
  }, []);

  return { downloadFile };
};

