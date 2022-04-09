import React from "react";
import styles from "./style.module.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
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
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const formGroup = [
  { label: "Tên sản phẩm", name: "name" },
  { label: "Tác giả", name: "author" },
  { label: "Nội dung", name: "description" },
  { label: "Thể loại", name: "categories" },
  { label: "Giá", name: "price" },
  { label: "Sô lượng", name: "inStock" },
];
 
function Info() {
  const navigate = useNavigate();
  const { getProductById, product1,updateProduct } = useContext(ProductContext);
  useEffect(() => {
    getProductById(id);
  }, []);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const id = location.pathname.split("/")[3];
  const [product, setProduct] = useState(product1);
  
  const [file, setFile] = useState();

  const handleInfo = (id, values) => {
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
        const res = await updateProduct(id,{ ...values, image: downloadURL });
        if(res.success === true){
          alert(res.message)
        }
      }
    );
  };

  const formik = useFormik({
    initialValues: product,
    onSubmit: async (values) => {
      handleInfo(id, values)
    },
  });
  return (
    <div className={styles.container}>
      <Grid container justify="center" alignContent="center">
        <Grid item>
          <Paper elevation={4}>
            <Typography variant="h5" height={"30px"} gutterBottom>
              Sửa sản phẩm
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
                >
                  Sửa
                </Button>
              </FormControl>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
export default Info;
