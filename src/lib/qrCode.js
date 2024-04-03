import QRCode from "qrcode";

const generateQR = async (text) => {
  try {
    const url = await QRCode.toDataURL(text.toString());
    return url;
  } catch (err) {
    return err;
  }
};

export { generateQR };
