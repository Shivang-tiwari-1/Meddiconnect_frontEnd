export const hashData = async (incoming_Data: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(incoming_Data);
  const hash = await crypto.subtle.digest("SHA-256", data);
  const hashed = Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashed;
};

export const encrypt = async (incoming_Data: string, keyString: any) => {
  const encoder = new TextEncoder();
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encodedData = encoder.encode(incoming_Data);

  const encrypted = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    keyString,
    encodedData
  );
  const encryptedArray = new Uint8Array(encrypted);
  const encryptedBase64 = btoa(String.fromCharCode(...encryptedArray));
  return {
    iv: Array.from(iv)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join(""),
    encrypted: encryptedBase64,
  };
};
