"use client";

import { useEffect } from "react";
import { FileImage, X } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";

import { storage } from "@/lib/firebase";
import Image from "next/image";

export default function ImageUpload({ imageUrl, setNewImageURL }) {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileToUpload, setFileToUpload] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const uploadImageToFirebase = async (file) => {
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(Math.round(progress));
      },
      (error) => {
        console.error("Upload failed: ", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            setUploadedFile(downloadURL);
            setNewImageURL(downloadURL);
            setFileToUpload(null);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    );
  };

  const [uploadTask, setUploadTask] = useState(null);

  const cancelUpload = () => {
    if (uploadTask) {
      uploadTask.cancel();
      setUploadProgress(0);
      setFileToUpload(null);
      alert("Upload cancelado com sucesso!");
    }
  };

  useEffect(() => {
    return () => {
      if (uploadTask) {
        uploadTask.cancel();
      }
    };
  }, [uploadTask]);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setFileToUpload({
        File: file,
        progress: 0,
      });
      uploadImageToFirebase(file);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/gif": [],
      "image/webp": [],
    },
    maxSize: 10485760, // 10MB em bytes
  });

  return (
    <div>
      {/* <div>
        <label
          {...getRootProps()}
          className="relative flex flex-col items-center justify-center w-full py-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 "
        >
          <div className=" text-center">
            <div className=" border p-2 rounded-md max-w-min mx-auto">
              <UploadCloud size={20} />
            </div>

            <p className="mt-2 text-sm text-gray-600">
              <span className="font-semibold">Arraste um arquivo aqui</span> ou
              clique para selecionar um arquivo
            </p>
          </div>
        </label>

        <input
          {...getInputProps()}
          id="dropzone-file"
          type="file"
          className="hidden"
        />
      </div> */}

      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-300"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
              clipRule="evenodd"
            />
          </svg>
          <div className="mt-4 flex text-sm leading-6 text-gray-600">
            <label
              {...getRootProps()}
              htmlFor="file-upload"
              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
            >
              <span>Envie um arquivo</span>
              <input
                {...getInputProps()}
                name="file-upload"
                className="sr-only"
                id="dropzone-file"
                type="file"
              />
            </label>

            <p className="pl-1">ou arraste e solte</p>
          </div>
          <p className="text-xs leading-5 text-gray-600">
            PNG, JPG, GIF, Webp de até 10MB
          </p>
        </div>
      </div>

      {fileToUpload && (
        <div>
          <ScrollArea className="h-40">
            <p className="font-medium my-2 mt-6 text-muted-foreground text-sm">
              Arquivo para enviar
            </p>
            <div className="space-y-2 pr-3">
              <div className="flex justify-between gap-2 rounded-lg overflow-hidden border border-slate-100">
                <div className="flex items-center flex-1 p-2">
                  <div className="text-white">
                    <FileImage size={40} className="fill-current" />
                  </div>

                  <div className="w-full ml-2 space-y-1">
                    <div className="text-sm flex justify-between">
                      <p className="text-muted-foreground ">
                        {fileToUpload.File.name.slice(0, 25)}
                      </p>
                      <span className="text-xs">{uploadProgress}%</span>
                    </div>
                    <Progress
                      value={Number(uploadProgress)}
                      // className="bg-blue-600"
                    />
                  </div>
                </div>
                <button
                  onClick={() => {
                    setFileToUpload(null);
                    cancelUpload();
                  }}
                  className="bg-red-500 text-white px-2"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          </ScrollArea>
        </div>
      )}

      {imageUrl && (
        <div>
          <p className="font-medium my-2 mt-6 text-muted-foreground text-sm">
            Arquivo enviado
          </p>
          <div className="space-y-2 pr-3">
            <div className="flex justify-between gap-2 rounded-lg overflow-hidden border border-slate-100">
              <div className="flex items-center flex-1 p-2">
                <Image
                  src={imageUrl}
                  alt="Uploaded image"
                  width={40}
                  height={40}
                  objectFit="cover"
                  className="w-10 h-10 object-cover"
                />
                <p className="ml-2 text-muted-foreground text-sm">
                  Imagem enviada com sucesso!
                </p>
              </div>
              <button
                onClick={() => setFileToUpload(null)}
                className="bg-red-500 text-white px-2"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
