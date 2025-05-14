
import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Download, QrCode } from "lucide-react";
import QRCode from "qrcode";

const QRCodeGenerator = () => {
  const [url, setUrl] = useState("https://example.com");
  const [qrCodeDataUrl, setQRCodeDataUrl] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    generateQRCode();
  }, [url]);

  const generateQRCode = async () => {
    try {
      if (!url.trim()) {
        setQRCodeDataUrl("");
        return;
      }
      
      if (canvasRef.current) {
        await QRCode.toCanvas(canvasRef.current, url, {
          width: 300,
          margin: 1,
          color: {
            dark: "#000000",
            light: "#ffffff",
          },
        });
        
        const dataUrl = canvasRef.current.toDataURL("image/png");
        setQRCodeDataUrl(dataUrl);
      }
    } catch (error) {
      console.error("Error generating QR code:", error);
      toast({
        title: "Error",
        description: "Failed to generate QR code. Please try again.",
        variant: "destructive",
      });
    }
  };

  const downloadQRCode = () => {
    if (!qrCodeDataUrl) {
      toast({
        title: "No QR Code",
        description: "Please generate a QR code first.",
        variant: "destructive",
      });
      return;
    }

    const link = document.createElement("a");
    link.href = qrCodeDataUrl;
    link.download = "qrcode.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Success",
      description: "QR code downloaded successfully!",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generateQRCode();
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <QrCode className="h-6 w-6" />
          QR Code Generator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">Enter URL or text</Label>
            <Input
              id="url"
              value={url}
              onChange={handleInputChange}
              placeholder="https://example.com"
              className="w-full"
            />
          </div>
          <Button type="submit" className="w-full">
            Generate QR Code
          </Button>
        </form>
        
        <div className="mt-6 flex justify-center">
          <div className="border rounded-lg p-4 bg-white">
            <canvas
              ref={canvasRef}
              className="mx-auto"
              width={300}
              height={300}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={downloadQRCode} 
          variant="outline" 
          className="w-full"
          disabled={!qrCodeDataUrl}
        >
          <Download className="mr-2 h-4 w-4" /> Download QR Code
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QRCodeGenerator;
