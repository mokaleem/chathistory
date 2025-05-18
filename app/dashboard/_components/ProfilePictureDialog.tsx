"use client";

import { useState, ChangeEvent, DragEvent } from "react";
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

interface AvatarImage {
  id: string;
  src: string;
  alt: string;
}

interface LoadedImages {
  [key: string]: AvatarImage[];
}

function ProfilePictureDialog({
  open,
  onOpenChange,
}: ProfilePictureDialogProps) {
  // State to track the current step in the dialog
  const [step, setStep] = useState<"initial" | "male" | "female" | "upload">(
    "initial"
  );
  const [selectedEthnicity, setSelectedEthnicity] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [loadedImages, setLoadedImages] = useState<LoadedImages>({});
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const setOtherAvatar = useChatStore(
    (state) => state.otherParticipant.setOtherAvatar
  );

  // Function to simulate loading images for a specific gender and ethnicity
  const loadImagesForEthnicity = (
    gender: string,
    ethnicity: string
  ): AvatarImage[] => {
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
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target?.result) {
          setUploadedImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle drag and drop
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target?.result) {
          setUploadedImage(event.target.result as string);
        }
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
              className="flex flex-col items-center justify-center h-32 p-4 relative border-0 before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-indigo-400 before:to-purple-500 before:content-[''] before:-z-10 hover:before:bg-gradient-to-tr hover:scale-105 transition-transform group overflow-hidden after:absolute after:inset-[3px] after:bg-white after:rounded-md after:content-[''] after:-z-[5] shadow-md hover:shadow-lg shadow-indigo-200/50 hover:shadow-indigo-300/50 transition-shadow"
              onClick={() => setStep("male")}
            >
              <div className="relative z-10 flex flex-col items-center">
                <User className="h-16 w-16 mb-2 text-indigo-500 group-hover:text-indigo-300 transition-colors" />
                <span className="font-medium">Male</span>
              </div>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center justify-center h-32 p-4 relative border-0 before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-pink-400 before:to-rose-500 before:content-[''] before:-z-10 hover:before:bg-gradient-to-tr hover:scale-105 transition-transform group overflow-hidden after:absolute after:inset-[3px] after:bg-white after:rounded-md after:content-[''] after:-z-[5] shadow-md hover:shadow-lg shadow-pink-200/50 hover:shadow-pink-300/50 transition-shadow"
              onClick={() => setStep("female")}
            >
              <div className="relative z-10 flex flex-col items-center">
                <UserRound className="h-16 w-16 mb-2 text-pink-500 group-hover:text-pink-300 transition-colors" />
                <span className="font-medium">Female</span>
              </div>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center justify-center h-32 p-4 relative border-0 before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-emerald-400 before:to-teal-500 before:content-[''] before:-z-10 hover:before:bg-gradient-to-tr hover:scale-105 transition-transform group overflow-hidden after:absolute after:inset-[3px] after:bg-white after:rounded-md after:content-[''] after:-z-[5] shadow-md hover:shadow-lg shadow-emerald-200/50 hover:shadow-emerald-300/50 transition-shadow"
              onClick={() => setStep("upload")}
            >
              <div className="relative z-10 flex flex-col items-center">
                <Upload className="h-16 w-16 mb-2 text-emerald-500 group-hover:text-emerald-300 transition-colors" />
                <span className="font-medium">Upload Your Picture</span>
              </div>
            </Button>
          </div>
        );

      case "male":
      case "female":
        return (
          <Tabs defaultValue={ethnicities[0]} className="w-full">
            <TabsList className="grid grid-cols-3 mb-4 p-1 bg-gray-100">
              {ethnicities.slice(0, 3).map((ethnicity) => (
                <TabsTrigger
                  key={ethnicity}
                  value={ethnicity}
                  onClick={() => setSelectedEthnicity(ethnicity)}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-sm transition-all"
                >
                  {ethnicity}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsList className="grid grid-cols-3 mb-4 p-1 bg-gray-100">
              {ethnicities.slice(3).map((ethnicity) => (
                <TabsTrigger
                  key={ethnicity}
                  value={ethnicity}
                  onClick={() => setSelectedEthnicity(ethnicity)}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-sm transition-all"
                >
                  {ethnicity}
                </TabsTrigger>
              ))}
            </TabsList>

            {ethnicities.map((ethnicity) => (
              <TabsContent key={ethnicity} value={ethnicity}>
                <ScrollArea className="h-[300px] rounded-md border p-4">
                  <div className="grid grid-cols-3 gap-4">
                    {loadImagesForEthnicity(step, ethnicity)?.map(
                      (image: AvatarImage) => (
                        <Card
                          key={image.id}
                          className={`cursor-pointer overflow-hidden transition-all ${
                            selectedImage === image.id
                              ? "ring-2 ring-indigo-500 scale-105 shadow-md"
                              : "hover:ring-1 hover:ring-indigo-300 hover:scale-105"
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
                      )
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>
            ))}

            <div className="mt-4">
              <Button
                onClick={() => setStep("initial")}
                variant="outline"
                className="mr-2 border border-gray-300 hover:bg-gray-50"
              >
                Back
              </Button>
              <Button
                disabled={!selectedImage}
                onClick={handleConfirmSelection}
                className="relative border-0 overflow-hidden rounded-md before:absolute before:inset-0 before:bg-gradient-to-r before:from-indigo-500 before:to-purple-500 before:content-[''] before:-z-10 hover:before:bg-gradient-to-tr transition-all disabled:before:bg-gray-300 disabled:before:from-gray-300 disabled:before:to-gray-300 disabled:text-gray-400 after:absolute after:inset-[2px] after:bg-white after:rounded-[3px] after:content-[''] after:-z-[5] shadow-md hover:shadow-lg shadow-indigo-200/50 hover:shadow-indigo-300/50 transition-shadow disabled:shadow-none"
              >
                <span className="relative z-10 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 bg-clip-text text-transparent font-medium">
                  Confirm Selection
                </span>
              </Button>
            </div>
          </Tabs>
        );

      case "upload":
        return (
          <div className="py-4">
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center mb-4 transition-all group ${
                isDragging
                  ? "bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-400"
                  : "border-gray-300 hover:border-gray-400"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {uploadedImage ? (
                <div className="flex flex-col items-center">
                  <img
                    src={uploadedImage}
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
                  <Upload className="mx-auto h-16 w-16 text-emerald-500 group-hover:text-emerald-300 transition-colors" />
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
                      const uploadInput = document.getElementById(
                        "picture-upload"
                      ) as HTMLInputElement;
                      if (uploadInput) {
                        uploadInput.click();
                      }
                    }}
                    className="relative border-0 overflow-hidden rounded-md before:absolute before:inset-0 before:bg-gradient-to-r before:from-emerald-500 before:to-teal-500 before:content-[''] before:-z-10 hover:before:bg-gradient-to-tr transition-all after:absolute after:inset-[2px] after:bg-white after:rounded-[3px] after:content-[''] after:-z-[5] shadow-md hover:shadow-lg shadow-emerald-200/50 hover:shadow-emerald-300/50 transition-shadow"
                  >
                    <span className="relative z-10 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 bg-clip-text text-transparent font-medium">
                      Browse Files
                    </span>
                  </Button>
                </>
              )}
            </div>

            <div className="flex justify-between">
              <Button
                onClick={() => setStep("initial")}
                variant="outline"
                className="border border-gray-300 hover:bg-gray-50"
              >
                Back
              </Button>
              <Button
                disabled={!uploadedImage}
                onClick={handleConfirmSelection}
                className="relative border-0 overflow-hidden rounded-md before:absolute before:inset-0 before:bg-gradient-to-r before:from-emerald-500 before:to-teal-500 before:content-[''] before:-z-10 hover:before:bg-gradient-to-tr transition-all disabled:before:bg-gray-300 disabled:before:from-gray-300 disabled:before:to-gray-300 disabled:text-gray-400 after:absolute after:inset-[2px] after:bg-white after:rounded-[3px] after:content-[''] after:-z-[5] shadow-md hover:shadow-lg shadow-emerald-200/50 hover:shadow-emerald-300/50 transition-shadow disabled:shadow-none"
              >
                <span className="relative z-10 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 bg-clip-text text-transparent font-medium">
                  Confirm Upload
                </span>
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
