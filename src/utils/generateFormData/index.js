export function generateFormData(data) {
  const formData = new FormData();

  const dataValue = Object.values(data);
  const dataKeys = Object.keys(data);

  for (let i = 0; i < dataValue.length; i++) {
    if (dataValue[i]) {
      formData.append(dataKeys[i], dataValue[i] || "");
    }
  }

  return formData;
}
