// Herramienta Web de Videoconferencias con mensajería, archivos y SharePoint
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Video, Send, File, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function VideoConferenciaApp() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [files, setFiles] = useState([]);

  const handleSend = () => {
    if (message.trim()) {
      setMessages([...messages, { text: message, sender: "Tú" }]);
      setMessage("");
    }
  };

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    setFiles([...files, ...uploadedFiles]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Video Conferencia */}
        <Card className="rounded-2xl shadow-xl">
          <CardContent className="p-4">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Video className="text-indigo-500" /> Videollamada en curso
            </h2>
            <div className="bg-black rounded-xl h-64 mb-4"></div>
            <Button className="w-full">Unirse a la llamada</Button>
          </CardContent>
        </Card>

        {/* Mensajería y Archivos */}
        <Card className="rounded-2xl shadow-xl">
          <CardContent className="p-4 flex flex-col gap-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Send className="text-indigo-500" /> Mensajería
            </h2>
            <div className="h-40 overflow-y-auto bg-white rounded-xl p-2">
              {messages.map((msg, index) => (
                <div key={index} className="mb-1">
                  <strong>{msg.sender}:</strong> {msg.text}
                </div>
              ))}
            </div>
            <Textarea
              placeholder="Escribe tu mensaje..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button onClick={handleSend}>Enviar</Button>

            <div>
              <h3 className="font-semibold mb-1 flex items-center gap-1">
                <File className="text-indigo-500" /> Archivos Adjuntos
              </h3>
              <Input type="file" multiple onChange={handleFileUpload} />
              <ul className="list-disc pl-4 mt-2">
                {files.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* SharePoint */}
        <Card className="rounded-2xl shadow-xl md:col-span-2">
          <CardContent className="p-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <ShieldCheck className="text-indigo-500" /> SharePoint Colaborativo
            </h2>
            <iframe
              src="https://yourcompany.sharepoint.com/sites/YourSite/Shared%20Documents"
              className="w-full h-96 mt-4 rounded-xl border"
              title="SharePoint"
            ></iframe>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}