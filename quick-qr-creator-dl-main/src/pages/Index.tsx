
import QRCodeGenerator from "@/components/QRCodeGenerator";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">QR Code Generator</h1>
        <p className="text-center text-gray-600 mb-12">Generate and download QR codes for your URLs or text</p>
        
        <QRCodeGenerator />
      </div>
    </div>
  );
};

export default Index;
