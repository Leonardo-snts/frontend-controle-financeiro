import React, { useState } from "react";
import axios from "axios";

const UploadPDF: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Por favor, selecione um arquivo.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/process-file/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage("Arquivo enviado com sucesso!");
    } catch (error) {
      console.error(error);
      setMessage("Erro ao enviar o arquivo.");
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 flex place-content-center flex-col">
      <h2 className="text-xl font-bold text-center mb-6 text-gray-800">
        Upload de Arquivos
      </h2>
      <div className="space-y-4">
      <input
        type="file"
        accept=".xlsx"
        onChange={handleFileChange}
        className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-indigo-100 file:text-indigo-600 hover:file:bg-indigo-200"
      />
      <button
        onClick={handleUpload}
        className="w-full bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600"
      >
        Enviar PDF
      </button>
      {message && <p className="mt-4 text-center text-sm">{message}</p>}
      </div>
    </div>
  );
};

export default UploadPDF;
