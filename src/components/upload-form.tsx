"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import { UploadIcon } from "lucide-react";

export function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setUploadedUrl(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a file to upload.");
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    setUploadedUrl(null);

    const formData = new FormData();
    formData.append("file", file);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/upload", true);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = (event.loaded / event.total) * 100;
        setUploadProgress(percentComplete);
      }
    };

    xhr.onload = () => {
      setUploading(false);
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        setUploadedUrl(response.url);
        toast.success("File uploaded successfully!");
      } else {
        const response = JSON.parse(xhr.responseText);
        toast.error(response.error || "An unknown error occurred.");
      }
    };

    xhr.onerror = () => {
      setUploading(false);
      toast.error("Upload failed. Please try again.");
    };

    xhr.send(formData);
  };

  return (
    <>
      <Toaster richColors />
      <Card className="w-full max-w-lg mx-auto">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="text-2xl">File Upload</CardTitle>
            <CardDescription>
              Select a file from your device and click upload.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="picture">Picture</Label>
              <Input
                id="picture"
                type="file"
                onChange={handleFileChange}
                disabled={uploading}
              />
            </div>
            {uploading && (
              <div className="space-y-2">
                <Label>Uploading...</Label>
                <Progress value={uploadProgress} />
              </div>
            )}
            {uploadedUrl && (
              <div className="space-y-2">
                <Label>Uploaded File URL</Label>
                <Input type="text" readOnly value={uploadedUrl} />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(uploadedUrl);
                    toast.info("URL copied to clipboard!");
                  }}
                >
                  Copy URL
                </Button>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={uploading || !file}>
              <UploadIcon className="mr-2 h-4 w-4" />
              {uploading ? "Uploading..." : "Upload"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </>
  );
}
