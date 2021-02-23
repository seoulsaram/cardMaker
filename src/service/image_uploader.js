class ImageUploader {
  async upload(file) {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "f1wn3wkl");
    const res = await fetch("https://api.cloudinary.com/v1_1/dfb7x1lp3/upload", {
      method: "POST",
      body: data,
    });
    return await res.json();
    //서버에 업로드하고 업로드가 완료되면 그 결과값을 리턴하니까 async를 사용
  }
}

export default ImageUploader;
