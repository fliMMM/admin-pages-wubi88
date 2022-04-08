import React from "react";
import {
  Input,
  FormControl,
  InputLabel,
  Button,
  Paper,
  Grid,
  Typography,
  FormHelperText,
  CircularProgress,
  IconButton,
  InputAdornment,
} from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { Login, Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";

const validationSchema = yup.object({
  username: yup.string().required("Bạn chưa nhập tài khoản!"),

  password: yup.string().required("Bạn chưa nhập mật khẩu!"),
});

function LoginForm() {

  const isMobile = useMediaQuery('(min-width:450px)');

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <Grid paddingTop={"50px"} container justify="center" alignContent="center">
      <Grid
        item
        xs={8}
        md={4}
        style={{
          margin: "50px auto",
        }}
      >
        <Paper
          elevation={4}
          style={{ padding: "20px 30px", marginTop: "30px" }}
        >
          <Typography
            variant="h5"
            textAlign={"center"}
            height={"30px"}
            gutterBottom
          >
            Đăng Nhập
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Tên đăng nhập</InputLabel>
              <Input
                name="username"
                fullWidth
                id="username"
                error={
                  formik.touched?.username && Boolean(formik.errors?.username)
                }
                onChange={formik.handleChange}
              />
              <FormHelperText error id="username">
                {formik.touched.username && formik.errors.username}
              </FormHelperText>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Mật khẩu</InputLabel>
              <Input
                fullWidth
                name="password"
                type= {showPassword? "text": "password"}
                id="password"
                onChange={formik.handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {!showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
              />
              <FormHelperText error id="password">
                {formik.touched.password && formik.errors.password}
              </FormHelperText>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <Button
                variant="extendedFab"
                style={{ backgroundColor: "#d1cbcb",
                width: !isMobile ? "143px" : " ",
                margin : "0 auto"
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
                Đăng nhập
              </Button>
              
            </FormControl>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}
export default LoginForm;
