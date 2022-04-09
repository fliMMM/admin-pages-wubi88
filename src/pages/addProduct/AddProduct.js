import React from "react";
import styles from "./style.module.css";
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


const formGroup = [
  { label: "Tên sản phẩm", name: "name" },
  { label: "Tác giả", name: "author" },
  { label: "Nội dung", name: "description" },
  { label: "Thể loại", name: "categories" },
  { label: "Giá", name: "price" },
  { label: "Sô lượng", name: "inStock" },
];
function AddProduct() {
  const {Add} = useContext(ProductContext);
  const [loading, setLoading] = useState(false);
console.log(loading);
  const formik = useFormik({
    initialValues: {
      name: "",
      author: "",
      description: "",
      categories: "",
      price: "",
      inStock: "",
    },
    onSubmit: async (values) => {
      const res = await Add(values); 
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
                      style={{marginLeft:"10px", paddingRight: "10px", minWidth:"80%"}}
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
                  onChange={formik.handleChange}
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
