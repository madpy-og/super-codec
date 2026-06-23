export async function encodeMessage(file: File, secretText: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject('No canvas context');
        ctx.drawImage(img, 0, 0);
        
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        const encoder = new TextEncoder();
        const textBytes = encoder.encode(secretText);
        
        const totalBitsNeeded = 32 + (textBytes.length * 8);
        const maxBitsAvailable = (data.length / 4) * 3;
        
        if (totalBitsNeeded > maxBitsAvailable) {
          return reject('Image is too small to hold this message');
        }
        
        const bits: number[] = [];
        
        for (let i = 31; i >= 0; i--) {
          bits.push((textBytes.length >> i) & 1);
        }
        
        for (let i = 0; i < textBytes.length; i++) {
          for (let j = 7; j >= 0; j--) {
            bits.push((textBytes[i] >> j) & 1);
          }
        }
        
        let bitIndex = 0;
        for (let i = 0; i < data.length; i++) {
          if ((i + 1) % 4 === 0) continue; 
          
          if (bitIndex < bits.length) {
            data[i] = (data[i] & ~1) | bits[bitIndex];
            bitIndex++;
          } else {
            break;
          }
        }
        
        ctx.putImageData(imageData, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      };
      img.onerror = () => reject('Error loading image');
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export async function decodeMessage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject('No canvas context');
        ctx.drawImage(img, 0, 0);
        
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        let bitIndex = 0;
        let payloadLength = 0;
        
        for (let i = 0; i < data.length; i++) {
          if ((i + 1) % 4 === 0) continue;
          
          if (bitIndex < 32) {
            const lsb = data[i] & 1;
            payloadLength = (payloadLength << 1) | lsb;
            bitIndex++;
          } else {
            break;
          }
        }
        
        if (payloadLength <= 0 || payloadLength > (data.length / 4) * 3 / 8) {
           return reject('No hidden message found or message is corrupted');
        }
        
        const textBytes = new Uint8Array(payloadLength);
        let byteIndex = 0;
        let currentByte = 0;
        let currentBitInByte = 0;
        
        let dataIndex = 0;
        let skippedBits = 0;
        
        while (skippedBits < 32 && dataIndex < data.length) {
           if ((dataIndex + 1) % 4 !== 0) {
              skippedBits++;
           }
           dataIndex++;
        }
        
        for (let i = dataIndex; i < data.length; i++) {
          if ((i + 1) % 4 === 0) continue;
          
          const lsb = data[i] & 1;
          currentByte = (currentByte << 1) | lsb;
          currentBitInByte++;
          
          if (currentBitInByte === 8) {
            textBytes[byteIndex] = currentByte;
            byteIndex++;
            currentByte = 0;
            currentBitInByte = 0;
            
            if (byteIndex === payloadLength) {
              break;
            }
          }
        }
        
        const decoder = new TextDecoder();
        resolve(decoder.decode(textBytes));
      };
      img.onerror = () => reject('Error loading image');
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}
