import React from "react";
import styles from "./style.module.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  Input,
  FormControl,
  InputLabel,
  Button,
  Paper,
  Grid,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { ProductContext } from "../../context/ProductContext";
import { useContext, useState } from "react";
import app from "../../firebase";
import { CircularProgress} from "@mui/material";
import { Login } from "@mui/icons-material";

const formGroup = [
  { label: "Tên sản phẩm", name: "name" },
  { label: "Tác giả", name: "author" },
  { label: "Nội dung", name: "description" },
  { label: "Thể loại", name: "categories" },
  { label: "Giá", name: "price" },
  { label: "Sô lượng", name: "inStock" },
  { label: "Đối tượng", name: "target" },
  { label: "Số trang", name: "soTrang" },
  { label: "Khổ giấy", name: "khuonKho" },
  { label: "Trọng lượng", name: "weight" },
  { label: "Bộ sách", name: "combo" },
  { label: "Ngày phát hành", name: "ngayPhatHanh" }
];
function AddProduct() {
  const { Add } = useContext(ProductContext);
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);

  const handleInfo = (values) => {
    const filename = new Date().getTime() + file.name;

    const storage = getStorage();

    // Create the file metadata
    /** @type {any} */
    const metadata = {
      contentType: "image/jpeg",
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, "images/" + filename);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default: 
            console.log("Done"); 
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
          default:
        }
      },
      async () => {
        // Upload completed successfully, now we can get the download URL
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
        const res = await Add({ ...values, image: downloadURL });
        if(res.success === true){
          alert(res.message)
          setLoading(false)
        }
      }
    );
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      author: "",
      description: "",
      categories: "",
      price: "",
      inStock: "",
      target: '',
      khuonKho: '',
      soTrang: '',
      weight:'',
      combo: '',
      ngayPhatHanh: ''
    },
    onSubmit: async (values) => {
      setLoading(true)
      values = {...values,categories: values.categories.split('-') }
      handleInfo(values);
      setLoading(false)
      
    },
  });
  return (
    <div className={styles.container}>
      <Grid container justify="center" alignContent="center">
        <Grid item>
          <Paper elevation={4}>
            <Typography variant="h5" height={"30px"} gutterBottom>
              Thêm sản phẩm
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              {formGroup.map((form) => {
                return (
                  <FormControl key={form.label} fullWidth margin="normal">
                    <InputLabel>{form.label}</InputLabel>
                    <Input
                      name={form.name}
                      id={form.name}
                      type="text"
                      style={{
                        marginLeft: "10px",
                        paddingRight: "10px",
                        minWidth: "80%",
                      }}
                      onChange={formik.handleChange}
                    />
                  </FormControl>
                );
              })}
              <FormControl fullWidth margin="normal">
                <Input
                  name="image"
                  fullWidth
                  id="image"
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <Button
                  variant="extendedFab"
                  style={{
                    backgroundColor: "#d1cbcb",
                    margin: "0 auto",
                  }}
                  type="submit"
                  startIcon={
                  loading ? (
                    <CircularProgress size={16} style={{ color: "#fff" }} />
                  ) : (
                    <Login />
                  )
                }
                >
                  Thêm
                </Button>
              </FormControl>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
export default AddProduct;
