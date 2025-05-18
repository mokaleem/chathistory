"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { Upload, User, UserRound } from "lucide-react";
import { useChatStore } from "../store/chatStore";

// Define the available ethnicities
const ethnicities = [
  "European",
  "African",
  "Asian",
  "South Asian",
  "Middle Eastern",
  "East Asian",
];

interface ProfilePictureDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function ProfilePictureDialog({
  open,
  onOpenChange,
}: ProfilePictureDialogProps) {
  // State to track the current step in the dialog
  const [step, setStep] = useState("initial"); // initial, male, female, upload
  const [selectedEthnicity, setSelectedEthnicity] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [loadedImages, setLoadedImages] = useState({});
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const setOtherAvatar = useChatStore(
    (state) => state.otherParticipant.setOtherAvatar
  );

  // Function to simulate loading images for a specific gender and ethnicity
  const loadImagesForEthnicity = (gender, ethnicity) => {
    // This would be replaced with your actual image loading logic
    // For demo purposes, we'll create placeholder images
    const key = `${gender}-${ethnicity}`;

    if (loadedImages[key]) return loadedImages[key];

    // Simulate loading delay
    const images = Array.from({ length: 12 }, (_, i) => ({
      id: `${gender}-${ethnicity}-${i}`,
      src: `/placeholder.svg?height=100&width=100`,
      alt: `${gender} ${ethnicity} profile ${i}`,
    }));

    setLoadedImages((prev) => ({ ...prev, [key]: images }));
    return images;
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle drag and drop
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Reset dialog state when closed
  const handleDialogClose = () => {
    setStep("initial");
    setSelectedEthnicity("");
    setSelectedImage("");
    setUploadedImage(null);
    onOpenChange(false);
  };

  // Handle avatar selection confirmation
  const handleConfirmSelection = () => {
    if (uploadedImage) {
      setOtherAvatar(uploadedImage);
    } else if (selectedImage) {
      // In a real application, this would use the actual image from selectedImage
      // For now, we'll just use a placeholder
      setOtherAvatar(
        `/placeholder.svg?height=100&width=100&id=${selectedImage}`
      );
    }

    handleDialogClose();
  };

  // Render content based on current step
  const renderContent = () => {
    switch (step) {
      case "initial":
        return (
          <div className="grid grid-cols-3 gap-4 py-4">
            <Button
              variant="outline"
              className="flex flex-col items-center justify-center h-32 p-4"
              onClick={() => setStep("male")}
            >
              <User className="h-12 w-12 mb-2" />
              <span>Male</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center justify-center h-32 p-4"
              onClick={() => setStep("female")}
            >
              <UserRound className="h-12 w-12 mb-2" />
              <span>Female</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center justify-center h-32 p-4"
              onClick={() => setStep("upload")}
            >
              <Upload className="h-12 w-12 mb-2" />
              <span>Upload Your Picture</span>
            </Button>
          </div>
        );

      case "male":
      case "female":
        return (
          <Tabs defaultValue={ethnicities[0]} className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              {ethnicities.slice(0, 3).map((ethnicity) => (
                <TabsTrigger
                  key={ethnicity}
                  value={ethnicity}
                  onClick={() => setSelectedEthnicity(ethnicity)}
                >
                  {ethnicity}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsList className="grid grid-cols-3 mb-4">
              {ethnicities.slice(3).map((ethnicity) => (
                <TabsTrigger
                  key={ethnicity}
                  value={ethnicity}
                  onClick={() => setSelectedEthnicity(ethnicity)}
                >
                  {ethnicity}
                </TabsTrigger>
              ))}
            </TabsList>

            {ethnicities.map((ethnicity) => (
              <TabsContent key={ethnicity} value={ethnicity}>
                <ScrollArea className="h-[300px] rounded-md border p-4">
                  <div className="grid grid-cols-3 gap-4">
                    {loadImagesForEthnicity(step, ethnicity)?.map((image) => (
                      <Card
                        key={image.id}
                        className={`cursor-pointer overflow-hidden ${
                          selectedImage === image.id
                            ? "ring-2 ring-primary"
                            : ""
                        }`}
                        onClick={() => setSelectedImage(image.id)}
                      >
                        <CardContent className="p-2">
                          <Image
                            src={image.src || "/placeholder.svg"}
                            alt={image.alt}
                            width={100}
                            height={100}
                            className="rounded-md object-cover w-full h-auto"
                          />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            ))}

            <div className="mt-4">
              <Button
                onClick={() => setStep("initial")}
                variant="outline"
                className="mr-2"
              >
                Back
              </Button>
              <Button
                disabled={!selectedImage}
                onClick={handleConfirmSelection}
              >
                Confirm Selection
              </Button>
            </div>
          </Tabs>
        );

      case "upload":
        return (
          <div className="py-4">
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center mb-4 ${
                isDragging ? "border-primary bg-primary/10" : "border-gray-300"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {uploadedImage ? (
                <div className="flex flex-col items-center">
                  <img
                    src={uploadedImage || "/placeholder.svg"}
                    alt="Uploaded profile"
                    className="w-32 h-32 object-cover rounded-full mb-4"
                  />
                  <Button
                    variant="outline"
                    onClick={() => setUploadedImage(null)}
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <>
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 mb-4">
                    Drag and drop your image here, or click to browse
                  </p>
                  <Input
                    id="picture-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                  <Button
                    variant="outline"
                    onClick={() => {
                      document.getElementById("picture-upload").click();
                    }}
                  >
                    Browse Files
                  </Button>
                </>
              )}
            </div>

            <div className="flex justify-between">
              <Button onClick={() => setStep("initial")} variant="outline">
                Back
              </Button>
              <Button
                disabled={!uploadedImage}
                onClick={handleConfirmSelection}
              >
                Confirm Upload
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Change Profile Picture</DialogTitle>
          <DialogDescription>
            Choose an available profile picture or upload your own picture
          </DialogDescription>
        </DialogHeader>
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
}

export default ProfilePictureDialog;
