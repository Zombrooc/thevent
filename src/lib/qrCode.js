import QRCode from "qrcode";

const generateQR = async (text) => {
  try {
    const url = await QRCode.toDataURL(text);
    return url;
  } catch (err) {
    return err;
  }
};

export { generateQR };
